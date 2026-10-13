# SPEC-1-005 — Cadência automática por WhatsApp

**Fase:** 1
**Status:** planejada (v1.1, revisada pelo painel)
**Dono:** Dario Calçada (escolha da API e número), com o Maestro; Igor de acordo com a consequência
**Origem no escopo:** fase 1, capacidade 8; D-09, D-11; RQ-012; CL-PEND-002
**Degrau da solução:** construção mínima — integração com a API de WhatsApp que o Dario confirmar (Uazapi ou oficial da Meta), chamada por hooks do Skip.

## Contexto e decisões fechadas

- **Estado atual:** a SDR usa o WhatsApp Web na mão. A cadência da Higia manda WhatsApp nos dias 2, 4, 6, 8 e 10 (Processo com WhatsApp).
- **Estado desejado:** os passos de WhatsApp da cadência saem sozinhos de um número dedicado; respostas voltam para o histórico e pausam a cadência; “SAIR” bloqueia para sempre.
- **Decisões já fechadas:**
  - O Maestro faz a Q-14 ao Dario lendo as duas consequências e só integra depois da escolha registrada em `06_notas/decisao-whatsapp.md`, com o de acordo do Igor.
  - **Caminho U (Uazapi):** permite o primeiro contato frio; o número pode ser banido; risco aceito por escrito.
  - **Caminho M (Meta):** envia só para contato com `optin_whatsapp=true` (marcado pela SDR com a evidência do consentimento), com modelo aprovado pela Meta (`modelos_mensagem.meta_template`) fora da janela de 24 horas; sem consentimento, o passo vira tarefa `whatsapp_manual` da SDR.
  - Número dedicado à prospecção; nunca número pessoal nem linha de atendimento.
  - Implementar só o caminho escolhido.
  - Antes de chamar o provedor, o remetente executa `lib/pode_enviar.js` (SPEC-1-003).
  - O canal só é ligado depois da mensagem de teste nos dois sentidos; o modo de teste continua ligado até a SPEC-1-007.
- **Bloqueios:** Q-14 registrada; número dedicado ativo; credenciais e token digitados pelo Dario nos segredos do Skip; modelos aprovados (Q-12).

## Resultado observável

O Igor recebe no celular (lista permitida) o WhatsApp do dia certo da cadência, vindo do número dedicado. Ele responde e a resposta aparece no histórico da clínica, com a cadência pausada nos dois canais.

## Limites e dependências

- **Inclui:** decisão registrada; conexão do número; remetente; webhook; opt-out por palavra; número sem WhatsApp marcado inválido; pausa automática se o número cair; alarme de silêncio; consentimento no caminho M; ligar o canal.
- **Fora de escopo:** central com várias pessoas atendendo; IA respondendo (fase 4); número pessoal.
- **Entradas e pré-condições:** SPEC-1-001 (`eventos_webhook`, `alertas`, `configuracao.whatsapp`, simulação); SPEC-1-002 (contatos, `whatsapp_invalido`, `optin_*`, supressão); SPEC-1-003 (`envios` de canal `whatsapp`, tarefas, `lib/pode_enviar.js`).
- **Saídas/artefatos:** `envios` com `provedor_id`; atividades; `06_notas/decisao-whatsapp.md`.
- **Dependências e responsáveis:** Dario escolhe, compra ou separa o número na semana 1 (aquecimento), conecta, gera o token e digita os segredos; Igor dá o de acordo.
- **Atores e permissões mínimas:** só hooks enviam; `sdr` marca consentimento com evidência; `admin` liga e desliga o canal.
- **Superfícies/arquivos/configurações afetadas:** `pb_hooks/whatsapp_envio.pb.js`, `pb_hooks/webhook_whatsapp.pb.js`, `pb_hooks/silencio_whatsapp.pb.js`; tela do contato (consentimento).
- **Risco e plano B:** número banido ou desconectado → canal pausa, alerta ao Dario, passos viram tarefa da SDR até um novo número.
- **Rollback ou reversão:** `canal_whatsapp_ativo=false`.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| U — envio de texto pela instância (`$secrets.get("UAZAPI_URL")`, rota de envio de texto de `docs.uazapi.com`) | Uazapi | número em E.164 sem “+”, texto do modelo | cabeçalho `token: $secrets.get("UAZAPI_TOKEN")` | intervalo aleatório de 40 a 90 s entre envios do mesmo número; timeout 20 s | não-2xx: `tentativas+1`; 3 falhas = `falhou` + tarefa `erro`; erro de número sem WhatsApp → `whatsapp_invalido=true` |
| U — webhook configurado por `POST /webhook` da instância, eventos `messages` e `messages_update`, destino `/backend/v1/webhooks/whatsapp/{token}` | Uazapi | mensagem recebida (remetente, texto, ID), status, `wasSentByApi` | a Uazapi não assina: `{token}` conferido com `$secrets.get("WHATSAPP_WEBHOOK_TOKEN")` por `$security.equal` | ID da mensagem único em `eventos_webhook` | repetido: 200 e ignora |
| M — `POST https://graph.facebook.com/v{versão}/{PHONE_NUMBER_ID}/messages` | Meta | `type: template` com `meta_template` e idioma `pt_BR` fora da janela de 24 h; texto livre só dentro da janela | `Authorization: Bearer $secrets.get("META_WA_TOKEN")`; `$secrets.get("META_WA_PHONE_ID")` | idem; limite inicial de 250 pessoas por 24 h; limite por pessoa para marketing no Brasil (erro 131049) | 131049: não reenviar, vira tarefa da SDR; número sem WhatsApp → inválido |
| M — webhook `GET` (verificação) e `POST` em `/backend/v1/webhooks/whatsapp/{token}` | Meta | mensagens e status | `GET`: `hub.verify_token` contra `$secrets.get("META_WA_VERIFY_TOKEN")` e devolve `hub.challenge`; `POST`: assinatura do corpo (`X-Hub-Signature-256`, a confirmar na documentação da Meta) conferida com `$security.hs256(corpo, $secrets.get("META_APP_SECRET"))` | ID único | assinatura inválida: 401 |

Antes de codificar o caminho escolhido, conferir na documentação oficial rotas e campos e registrar em `06_notas/fontes-fase-1.md`.

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | envio vencido | em transação: confere `agendado`, roda `lib/pode_enviar.js`, muda para `enviando` e chama o provedor; com `simulacao.ativa`, grava em `envios.simulado` | — | SPEC-1-003 |
| RN-02 | destino | `contatos.whatsapp`; se vazio, `telefone` quando for celular; sem destino válido, o passo vira tarefa `whatsapp_manual` | — | SPEC-1-002 RN-10 |
| RN-03 | caminho M e contato sem `optin_whatsapp` | passo vira tarefa `whatsapp_manual` com a mensagem sugerida | — | D-09 |
| RN-04 | mensagem recebida | liga ao contato pelo número normalizado (com e sem o 9 depois do DDD); atividade de entrada → RN-04 da SPEC-1-003 | número sem contato: `alertas` tipo `resposta_sem_dono` | D-11 |
| RN-05 | texto igual a SAIR, PARAR ou “não quero” (sem diferenciar maiúsculas e acentos) | `optout_whatsapp=true`, HMAC do número em `supressao`, resposta com a frase de saída aprovada na Q-12 | — | D-11 |
| RN-06 | eco do próprio envio (`wasSentByApi` ou mensagem do próprio número) | ignorado | — | — |
| RN-07 | provedor informa número desconectado ou banido | `canal_whatsapp_ativo=false`, `alertas` tipo `canal_pausado`, passos pendentes viram tarefa da SDR | — | risco R-02 |
| RN-08 | silêncio do webhook | 10 ou mais envios nas últimas 24 h e nenhum evento em 6 h → `alertas` tipo `silencio_webhook` | — | — |
| RN-09 | toda mensagem | identifica a Higia e termina com “responda SAIR para não receber mais” | — | escopo |

## Fluxo e regras

1. Semana 1: o Maestro faz a Q-14 com as consequências; o Dario registra a escolha e o número, e o Igor dá o de acordo em `06_notas/decisao-whatsapp.md`; o número começa o aquecimento.
2. O Dario conecta o número no provedor, gera um token aleatório de 32 caracteres ou mais, digita os segredos do caminho escolhido e configura o webhook com a URL completa. O Maestro nunca vê token nem chave e não grava a URL em evidência.
3. O Maestro constrói o remetente (RN-01 a RN-03), o webhook (RN-04 a RN-07) e o silêncio (RN-08); no caminho M, o campo de consentimento na tela do contato.
4. Com tudo provado em simulação, o Dario desliga a simulação só para o WhatsApp, troca uma mensagem de teste com o celular do Igor (lista permitida) e liga `canal_whatsapp_ativo=true`.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | envio D2 para o celular permitido | mensagem entregue; atividade de saída | — |
| Limite | resposta vinda de número sem o 9 | ligada ao contato certo | — |
| Falha | número desconectado | canal pausado, alerta, tarefas para a SDR | Dario reconecta e religa |
| Falha | webhook com token errado | 401, nada gravado | — |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC, SPEC-1-001, SPEC-1-002, SPEC-1-003 e o projeto Skip.
2. **Alterar somente:** hooks, rotas e tela de consentimento desta SPEC, só do caminho escolhido.
3. **Não alterar:** motor da cadência; `lib/pode_enviar.js` (só chamar); modelos sem aprovação.
4. **Executar nesta ordem:** Q-14 com consequências → registro → conexão e segredos pelo Dario → remetente em simulação → webhook → opt-out e inválido → silêncio → teste real com o celular permitido → ligar o canal.
5. **Parar e pedir validação quando:** o Dario não confirmou a API; o Igor não deu o de acordo; alguém pede para colar token no chat; vai desligar o modo de teste.
6. **Estado válido ao parar:** nenhum WhatsApp fora da lista permitida.

**Contexto técnico do Skip:** ver SPEC-1-001. Testes usam `simulacao`, o gancho `POST /backend/v1/teste/evento/whatsapp` e contatos fictícios; o “SAIR” é testado só com contatos fictícios, nunca com os celulares do teste do ciclo.

## Checklist de execução

- [ ] Q-14 com consequências, escolha e de acordo registrados.
- [ ] Número dedicado em aquecimento desde a semana 1; segredos pelo Dario.
- [ ] Remetente com transação, conferência de envio e destino correto.
- [ ] Webhook sem eco, idempotente, com opt-out e inválido.
- [ ] Caminho M: consentimento com evidência e modelo da Meta.
- [ ] Silêncio gerando alerta; canal ligado depois do teste real.
- [ ] Evidências em `05_entregas/fase-1/spec-1-005/`.

## Critérios de aceite

- [ ] **CA-1-22:** a escolha da API e do número está registrada com a consequência lida e o de acordo de Dario e Igor.
- [ ] **CA-1-23:** o número dedicado troca uma mensagem de teste nos dois sentidos pelo CRM; só então `canal_whatsapp_ativo` é ligado.
- [ ] **CA-1-24:** o WhatsApp da cadência sai no dia e na janela certos, dentro do limite; com modo de teste, nada sai para fora da lista; com contato pausado ou pausa geral, nada sai; no caminho M, contato sem consentimento vira tarefa.
- [ ] **CA-1-25:** uma resposta pausa os dois canais e aparece no histórico; “SAIR” bloqueia a pessoa para sempre; o eco não vira resposta; número sem WhatsApp fica inválido.
- [ ] **CA-1-45:** toda mensagem identifica a Higia e diz como sair.
- [ ] **CA-1-47:** sem eventos por 6 h com envios nas últimas 24 h, aparece um alerta de silêncio do webhook.

## TDD da SPEC

| ID | Caminho | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|---|
| T1 | U e M | RED/GREEN | CA-1-24 | com simulação: envio para contato fictício fora da lista, outro pausado, outro com pausa geral | rodar `whatsapp` pelo gancho | antes da conferência ficam `enviando` com requisição simulada (falha); depois: `cancelado` ou `agendado`, sem requisição | `05_entregas/fase-1/spec-1-005/t1.md` |
| T2 | U e M | GREEN | CA-1-24, CA-1-45 | envio simulado de contato permitido | rodar `whatsapp` | requisição com o texto do modelo, identificação da Higia e instrução de saída; intervalo entre envios respeitado | `05_entregas/fase-1/spec-1-005/t2.md` |
| T3 | M | GREEN | CA-1-24 | contato fictício sem `optin_whatsapp` | rodar `whatsapp` | passo vira tarefa `whatsapp_manual` | `05_entregas/fase-1/spec-1-005/t3.md` |
| T4 | U e M | RED/GREEN | CA-1-25 | eco do próprio envio e o mesmo evento repetido | gancho de evento | antes da RN-06 vira resposta (falha); depois: ignorado e repetido descartado | `05_entregas/fase-1/spec-1-005/t4.md` |
| T5 | U e M | GREEN | CA-1-25 | contato fictício responde “Sair”; outro responde de número sem o 9 | gancho de evento | opt-out e supressão gravados; segundo ligado ao contato certo e cadência pausada | `05_entregas/fase-1/spec-1-005/t5.md` |
| T6 | U e M | GREEN | CA-1-25 | erro simulado de número sem WhatsApp; evento de número desconectado | simulação + gancho | contato inválido; canal desligado com alerta | `05_entregas/fase-1/spec-1-005/t6.md` |
| T7 | U e M | GREEN | CA-1-47 | 10 envios simulados com data de 7 h atrás e nenhum evento | rodar `silencio_whatsapp` | alerta `silencio_webhook` | `05_entregas/fase-1/spec-1-005/t7.md` |
| T8 | U e M | GREEN | CA-1-22, CA-1-23 | decisão registrada; mensagem real com o celular permitido do Igor nos dois sentidos | envio e resposta reais | atividades de saída e entrada; canal ligado | `05_entregas/fase-1/spec-1-005/t8.png` |
| T9 | U e M | REFACTOR/REGRESSÃO | CA-1-24, CA-1-25 | repetir T1 e T4; religar o canal desligado no T6 | ganchos | mesmos resultados; canal ativo ao final | `05_entregas/fase-1/spec-1-005/t9-regressao.md` |

**Dados/fixtures:** contatos fictícios `teste=true` com números `+55 86 90000-00NN`; eventos de exemplo do provedor em `05_entregas/fase-1/spec-1-005/fixtures/` (sem token); celular do Igor na lista permitida só para o T8.
**Caminhos de erro obrigatórios:** token inválido; eco; evento repetido; número desconectado; número sem WhatsApp; 131049 (caminho M); contato sem consentimento (caminho M).

**Evidência exigida:** arquivos acima, sem token nem URL de webhook.

## Teste humano do cliente

- **Origem:** não aplicável nesta SPEC (ciclo completo no CL-007, SPEC-1-007).

## Handoff e operação

- **Como demonstrar:** WhatsApp de teste recebido e resposta aparecendo no CRM.
- **Como operar depois:** Dario cuida do número; a SDR atende as respostas e marca consentimentos.
- **Como monitorar:** alertas de canal pausado e de silêncio do webhook.
- **Pendência conhecida:** risco de banimento no caminho U, aceito por escrito.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| 1cf2d10d-b3ef-4e4c-82f8-f394f5d43376 | Escolher a API e o número de WhatsApp da cadência | Dario e Igor | SPEC-1-005 | CA-1-22 | T8 (registro) | `06_notas/decisao-whatsapp.md` | — | ☐ |
| c4366a83-e88b-47cd-a98b-04455ccae0bc | Conectar o número de WhatsApp da cadência | Dario | SPEC-1-005 | CA-1-23 | T8 | `t8.png` | API escolhida; número em aquecimento | ☐ |
| 837ab8fa-becf-44d6-8034-53a20728e57a | Enviar as mensagens de WhatsApp da cadência | Dario | SPEC-1-005 | CA-1-24, CA-1-45 | T1, T2, T3, T9 | `t1.md`, `t2.md` | SPEC-1-003 agendando; modelos aprovados | ☐ |
| 22a305e2-3ea7-4e95-b472-f747c983d084 | Registrar as respostas de WhatsApp no CRM | Dario | SPEC-1-005 | CA-1-25, CA-1-47 | T4, T5, T6, T7, T9 | `t5.md`, `t6.md` | envio funcionando | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | painel gerar-specs | v1.1 | conferência de envio, destino e inválido, consentimento e modelo da Meta, alarme de silêncio, testes por caminho sem envio real, ligar o canal |
