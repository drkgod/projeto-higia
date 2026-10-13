# SPEC-1-004 — Cadência automática por e-mail

**Fase:** 1
**Status:** planejada (v1.1, revisada pelo painel)
**Dono:** Dario Calçada, com o Maestro; Igor aprova os modelos
**Origem no escopo:** fase 1, capacidade 7; D-10, D-11; RQ-011; CL-PEND-001
**Degrau da solução:** construção mínima — integração com a API do serviço de envio escolhido na Q-15, chamada por hooks do Skip; nada de servidor de e-mail próprio.

## Contexto e decisões fechadas

- **Estado atual:** a Higia não faz disparo de e-mail para listas (KO). A SDR manda e-mail um a um pelo Dealwise.
- **Estado desejado:** os passos de e-mail da cadência saem sozinhos do domínio separado, com o modelo aprovado e saída por descadastro; respostas, rejeições e reclamações voltam para o histórico da clínica.
- **Decisões já fechadas:**
  - Serviço de envio (Resend ou Brevo) num domínio separado do usado com clientes, escolhido pelo Dario na Q-15 depois de ler a política de cada um.
  - Só e-mail com canal válido (SPEC-1-002, RN-10), no limite diário.
  - Cada envio tem endereço de resposta próprio no subdomínio de respostas.
  - Webhook autenticado por token no caminho; nenhum evento é aplicado sem conferir no provedor.
  - Antes de chamar o provedor, o remetente executa `lib/pode_enviar.js` (SPEC-1-003).
  - O canal só é ligado depois do domínio verificado e do e-mail de teste entregue; o modo de teste continua ligado até a SPEC-1-007.
- **Bloqueios:** Q-15 definida; domínio comprado por quem a Higia indicar (CL-PEND-001) e verificado; chaves e token digitados pelo Dario nos segredos do Skip; modelos aprovados.

## Resultado observável

Uma clínica de teste da lista permitida recebe o e-mail do dia certo da cadência, assinado pela Higia, com link de descadastro. Ela responde e a resposta aparece no histórico da clínica, com a cadência pausada nos dois canais.

## Limites e dependências

- **Inclui:** remetente agendado; webhook de eventos; recebimento de respostas; descadastro com confirmação; pausa por reputação; alarme de silêncio do webhook; ligar o canal.
- **Fora de escopo:** validação por serviço externo (fase 2); IA sugerindo resposta (fase 4).
- **Entradas e pré-condições:** SPEC-1-001 (`eventos_webhook`, `alertas`, `configuracao.email`, simulação); SPEC-1-003 (`envios` de canal `email`, `lib/pode_enviar.js`); domínio verificado (SPF e DKIM do serviço) e MX do subdomínio de respostas.
- **Saídas/artefatos:** `envios` com `provedor_id`; atividades de saída e entrada.
- **Dependências e responsáveis:** quem a Higia indicar compra o domínio; o Dario cria a conta, configura o DNS, gera o token e digita chaves e token nos segredos do Skip; o Igor aprova os modelos.
- **Atores e permissões mínimas:** só hooks enviam; `admin` liga e desliga o canal.
- **Superfícies/arquivos/configurações afetadas:** `pb_hooks/email_envio.pb.js` (agendamento), `pb_hooks/webhook_email.pb.js`, `pb_hooks/descadastro.pb.js`, `pb_hooks/silencio_email.pb.js`.
- **Risco e plano B:** suspensão da conta pela política do serviço → o canal pausa; a cadência segue com WhatsApp e tarefas; troca de serviço vira emenda.
- **Rollback ou reversão:** `canal_email_ativo=false`.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Resend — envio `POST https://api.resend.com/emails` | Resend | `from` (`configuracao.email.remetente_*`), `to`, `subject`, `html` e `text` do modelo, `reply_to` = `r+{id do envio}@{dominio_respostas}`, cabeçalho `List-Unsubscribe` com o link de descadastro | `Authorization: Bearer $secrets.get("RESEND_API_KEY")` | `Idempotency-Key` = `chave_idempotencia` (guardada 24 h pelo serviço); até 10 requisições por segundo; timeout 15 s | não-2xx: `tentativas+1`; 3 falhas = `falhou` + tarefa `erro` |
| Resend — webhook `/backend/v1/webhooks/email/{token}` | Resend | eventos `email.sent`, `email.delivered`, `email.bounced`, `email.complained`, `email.received`; cabeçalhos `svix-id`, `svix-timestamp` | `{token}` comparado com `$secrets.get("EMAIL_WEBHOOK_TOKEN")` por `$security.equal`; `svix-timestamp` no máximo 5 min | `svix-id` único em `eventos_webhook`; repetido responde 200 e é ignorado | evento desconhecido: guarda e responde 200 |
| Resend — conferência | Resend | `email.received`: buscar o e-mail recebido pela Receiving API; `email.bounced`/`email.complained`: buscar o envio pelo ID (`GET /emails/{id}`) | Bearer | uma busca por evento | se a busca não confirmar, o evento é guardado como `nao_confirmado` e nada é aplicado |
| Brevo (se escolhida) — `POST https://api.brevo.com/v3/smtp/email`; eventos transacionais e recebimento de respostas por webhook | Brevo | `sender`, `to`, `subject`, `htmlContent`, `replyTo`, `headers` | `api-key: $secrets.get("BREVO_API_KEY")`; mesmo token no caminho | mesma idempotência | mesma conferência pela API antes de aplicar |
| Descadastro `GET` e `POST /backend/v1/descadastro/{t}` | CRM | `t` = id do envio + HMAC do id com `$secrets.get("LINK_CHAVE")` | assinatura conferida por `$security.equal` | idempotente | assinatura inválida: página neutra, nada gravado |

Antes de codificar, conferir na documentação oficial do serviço escolhido os campos de envio, eventos e busca de e-mail recebido e registrar em `06_notas/fontes-fase-1.md`.

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | envio vencido | em transação: confere que ainda está `agendado`, roda `lib/pode_enviar.js`, muda para `enviando` e só então chama o provedor; com `simulacao.ativa`, grava a requisição em `envios.simulado` e não chama a rede | — | SPEC-1-003 |
| RN-02 | `email.received` confirmado e ligado ao envio pelo `reply_to` | atividade de entrada → RN-04 da SPEC-1-003 | remetente diferente do contato: liga pela oportunidade do `reply_to` e avisa a SDR; sem envio correspondente: `alertas` tipo `resposta_sem_dono` | D-11 |
| RN-03 | `email.bounced` confirmado | `email_invalido=true`; envio `falhou`; cadência segue nos outros canais | — | — |
| RN-04 | `email.complained` confirmado ou descadastro confirmado (`POST`) | `optout_email=true`, HMAC em `supressao`, cadência pausada | o `GET` só mostra a página com o botão “Confirmar descadastro”; nada é gravado no `GET` | D-11 |
| RN-05 | reputação: a partir de 20 envios, considerando os últimos 100 (ou todos, se forem menos) | rejeições ≥ 3% ou qualquer reclamação → `canal_email_ativo=false` e `alertas` tipo `canal_pausado` | Dario reativa depois de revisar | política do serviço |
| RN-06 | silêncio do webhook | 10 ou mais envios nas últimas 24 h e nenhum evento em 6 h → `alertas` tipo `silencio_webhook` | — | — |
| RN-07 | todo e-mail | remetente e assinatura da Higia, link de descadastro no corpo e no cabeçalho; nunca se passa por pessoa que não existe | — | escopo |

## Fluxo e regras

1. Semana 1: o Dario responde a Q-15; quem a Higia indicar compra o domínio; o Dario cria a conta, configura SPF, DKIM e o MX do subdomínio de respostas e começa o aquecimento.
2. O Dario gera um token aleatório de 32 caracteres ou mais (gerador de senha), digita `EMAIL_WEBHOOK_TOKEN`, `RESEND_API_KEY` (ou `BREVO_API_KEY`) e `LINK_CHAVE` nos segredos do Skip e cola a URL completa do webhook no painel do serviço. O Maestro nunca vê token nem chave e não grava a URL em evidência.
3. O Maestro constrói o remetente (RN-01), o webhook com conferência (RN-02 a RN-04), o descadastro, a reputação (RN-05) e o silêncio (RN-06).
4. Com tudo provado em simulação, o Dario desliga a simulação só para o e-mail, manda um e-mail de teste para um destinatário permitido e, entregue, liga `canal_email_ativo=true` (o modo de teste continua ligado).

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | envio D5 de clínica de teste permitida | e-mail entregue; atividade de saída | — |
| Limite | o agendamento roda duas vezes | um e-mail só | — |
| Falha | serviço responde 500 | nova tentativa no próximo ciclo; 3 falhas viram tarefa `erro` | — |
| Falha | webhook com token errado ou evento não confirmado | 401 ou `nao_confirmado`; nada aplicado | — |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC, SPEC-1-001, SPEC-1-003 e o projeto Skip.
2. **Alterar somente:** os hooks e rotas desta SPEC.
3. **Não alterar:** motor da cadência; `lib/pode_enviar.js` (só chamar); modelos sem aprovação.
4. **Executar nesta ordem:** pergunta Q-15 → documentação do serviço → remetente em simulação → webhook e conferência → descadastro → reputação e silêncio → teste real com destinatário permitido → ligar o canal.
5. **Parar e pedir validação quando:** Q-15 sem resposta; domínio não verificou; alguém pede para colar chave ou token no chat; vai desligar o modo de teste (isso é da SPEC-1-007).
6. **Estado válido ao parar:** nenhum e-mail fora da lista permitida; histórico consistente.

**Contexto técnico do Skip:** ver SPEC-1-001. Testes usam `simulacao`, o gancho `POST /backend/v1/teste/evento/email` (entrega o evento sem token, marcado como teste) e contatos fictícios; nenhum teste manda e-mail real, exceto o envio de verificação do passo 4 para um destinatário permitido.

## Checklist de execução

- [ ] Q-15 definida; domínio, DNS e aquecimento iniciados na semana 1.
- [ ] Segredos e URL do webhook configurados pelo Dario.
- [ ] Remetente com transação, conferência de envio e idempotência.
- [ ] Webhook com token, conferência no provedor e idempotência.
- [ ] Descadastro com confirmação.
- [ ] Reputação e silêncio gerando alertas.
- [ ] Canal ligado depois do teste real.
- [ ] Evidências em `05_entregas/fase-1/spec-1-004/`.

## Critérios de aceite

- [ ] **CA-1-18:** o domínio separado está verificado e um e-mail de teste chega a um destinatário permitido; só então `canal_email_ativo` é ligado.
- [ ] **CA-1-19:** o e-mail da cadência sai com o modelo aprovado, no dia e na janela certos, dentro do limite; com modo de teste, nada sai para fora da lista permitida; com a pausa geral ou o contato pausado, nada sai.
- [ ] **CA-1-20:** abrir o link de descadastro não grava nada; confirmar grava opt-out, pausa a cadência e o contato não recebe mais e-mail.
- [ ] **CA-1-21:** uma resposta confirmada entra no histórico da oportunidade certa e pausa os dois canais; evento repetido ou não confirmado é ignorado; rejeição marca o e-mail inválido; rejeições acima do limite pausam o canal.
- [ ] **CA-1-44:** todo e-mail traz remetente e assinatura da Higia e o link de descadastro.
- [ ] **CA-1-46:** sem eventos por 6 h com envios nas últimas 24 h, aparece um alerta de silêncio do webhook.

## TDD da SPEC

| ID | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|
| T1 | RED/GREEN | CA-1-19 | com simulação: envio para contato fictício fora da lista; outro com contato pausado; outro com pausa geral | rodar `email` pelo gancho | antes da conferência ficam `enviando` com requisição simulada (falha esperada); depois: `cancelado` (lista, pausado) e `agendado` (pausa geral), sem requisição | `05_entregas/fase-1/spec-1-004/t1.md` |
| T2 | GREEN | CA-1-19, CA-1-44 | envio simulado de contato permitido | rodar `email` | requisição simulada com modelo, remetente, assinatura, `reply_to` próprio e link de descadastro | `05_entregas/fase-1/spec-1-004/t2.md` |
| T3 | RED/GREEN | CA-1-21 | o mesmo `email.received` duas vezes; um evento não confirmado | gancho de evento | antes da idempotência: duas atividades (falha); depois: uma atividade, cadência pausada; não confirmado não aplica | `05_entregas/fase-1/spec-1-004/t3.md` |
| T4 | GREEN | CA-1-20 | `GET` e depois `POST` no link de descadastro de contato fictício | navegador | `GET` não grava; `POST` grava opt-out e supressão | `05_entregas/fase-1/spec-1-004/t4.md` |
| T5 | GREEN | CA-1-21 | 20 envios simulados e 1 `email.bounced` + 1 `email.complained` injetados | gancho de evento | e-mail inválido; canal desligado com alerta | `05_entregas/fase-1/spec-1-004/t5.md` |
| T6 | GREEN | CA-1-46 | 10 envios simulados com data de 7 h atrás e nenhum evento | rodar `silencio_email` | alerta `silencio_webhook` | `05_entregas/fase-1/spec-1-004/t6.md` |
| T7 | GREEN | CA-1-18 | domínio verificado; e-mail real para o endereço permitido do Dario | envio de verificação | e-mail recebido; canal ligado | `05_entregas/fase-1/spec-1-004/t7.png` |
| T8 | REFACTOR/REGRESSÃO | CA-1-19, CA-1-21 | repetir T1 e T3; religar o canal desligado no T5 | ganchos | mesmos resultados; canal ativo ao final | `05_entregas/fase-1/spec-1-004/t8-regressao.md` |

**Dados/fixtures:** contatos fictícios `teste=true` com e-mails `@clinica-exemplo.invalid`; eventos de exemplo do serviço em `05_entregas/fase-1/spec-1-004/fixtures/` (sem token nem chave); e-mail corporativo do Dario na lista permitida para o T7.
**Caminhos de erro obrigatórios:** token inválido; evento repetido; evento não confirmado; 500 do serviço; rejeição; reclamação; remetente diferente do contato; resposta sem envio.

**Evidência exigida:** arquivos acima, sem token, chave ou URL de webhook.

## Teste humano do cliente

- **Origem:** não aplicável nesta SPEC (ciclo completo no CL-007, SPEC-1-007).

## Handoff e operação

- **Como demonstrar:** e-mail de teste recebido e resposta aparecendo no CRM.
- **Como operar depois:** Igor mantém os modelos; Dario acompanha rejeições e alertas.
- **Como monitorar:** alertas de canal pausado e de silêncio do webhook.
- **Pendência conhecida:** plano gratuito do Resend limita a 100 e-mails por dia.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| 292512cc-34cd-4fe8-ba9d-6ead07350eea | Conectar o serviço de e-mail no domínio novo | Dario | SPEC-1-004 | CA-1-18 | T7 | `t7.png` | Q-15 definida; domínio comprado e aquecendo desde a semana 1 | ☐ |
| b4713315-e071-4865-b655-07e305aba201 | Enviar os e-mails da cadência com saída para descadastro | Dario | SPEC-1-004 | CA-1-19, CA-1-20, CA-1-44 | T1, T2, T4, T8 | `t1.md`, `t4.md` | SPEC-1-003 agendando; modelos aprovados | ☐ |
| 0329c5bb-8acc-4dc1-b683-3cde08473c8f | Registrar respostas e rejeições de e-mail no CRM | Dario | SPEC-1-004 | CA-1-21, CA-1-46 | T3, T5, T6, T8 | `t3.md`, `t5.md` | envio funcionando | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | painel gerar-specs | v1.1 | conferência de envio, eventos confirmados no provedor, descadastro com confirmação, reputação a partir de 20 envios, alarme de silêncio, testes sem envio real, ligar o canal |
