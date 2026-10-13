# SPEC-1-003 — Pipelines, cadência e caixa de trabalho da SDR

**Fase:** 1
**Status:** planejada (v1.1, revisada pelo painel)
**Dono:** Dario Calçada, com o Maestro; a SDR valida a caixa de trabalho
**Origem no escopo:** fase 1, capacidades 5, 6 e 9; D-01, D-05, D-11, D-12; RQ-009, RQ-010, RQ-013, RQ-016
**Degrau da solução:** recurso nativo da plataforma com construção mínima — coleções, agendamento e telas do Skip.

## Contexto e decisões fechadas

- **Estado atual:** a SDR trabalha no Dealwise pela aba de tarefas e marca “Perder / Sem conexão” no 7º contato sem retorno (vídeo da rotina). O Dealwise fica só para consulta; o CRM começa zerado.
- **Estado desejado:** clínica acionável vira oportunidade na pipeline privada; o motor agenda cada passo (e-mail e WhatsApp automáticos; ligação e LinkedIn como tarefa); qualquer resposta, recusa ou opt-out pausa todos os canais daquele contato; a SDR trabalha numa caixa só.
- **Decisões já fechadas:**
  - Oportunidade nasce da organização `acionavel` com o contato principal (SPEC-1-002); uma ativa por organização na pipeline privada. A pipeline pública da fase 1 não usa `oportunidades` (SPEC-1-006).
  - Estado do contato na cadência: `aguardando` (fila de entrada), `ativo`, `pausado` ou `esgotado`.
  - Só o motor desta SPEC cria e cancela `envios`; só os remetentes das SPECs 1-004 e 1-005 mudam `agendado` para `enviando`, `enviado` ou `falhou`.
  - Antes de qualquer chamada a provedor, o remetente executa a conferência `lib/pode_enviar.js` definida aqui.
  - LinkedIn e Instagram nunca são automatizados.
- **Bloqueios:** etapas (Q-08), motivos (Q-09), cadência (Q-10, Q-11, Q-13) e modelos (Q-12) aprovados na SPEC-1-001.

## Resultado observável

A SDR abre a caixa de trabalho e vê, por prioridade, as respostas, as ligações e mensagens de LinkedIn do dia, os retornos combinados e as clínicas para revisar, cada item com o motivo da prioridade. Quando uma clínica responde em qualquer canal, a cadência para nos dois canais e aparece uma tarefa para a SDR.

## Limites e dependências

- **Inclui:** coleções `oportunidades`, `atividades`, `tarefas`, `envios`; criação de oportunidades; fila de entrada; motor da cadência; retomada; estado único por contato; conferência de envio; caixa; telas de pipeline e de oportunidade.
- **Fora de escopo:** chamada a provedores (SPECs 1-004 e 1-005); regras do funil pós-reunião (fase 3); IA classificando respostas (fase 4).
- **Entradas e pré-condições:** SPEC-1-001 (pipeline, cadência e modelos aprovados; `alertas`; `configuracao`) e SPEC-1-002 (organizações acionáveis e contato principal).
- **Saídas/artefatos:** oportunidades com histórico; envios agendados; tarefas.
- **Dependências e responsáveis:** Dario constrói; a SDR testa a caixa.
- **Atores e permissões mínimas:** `sdr` lê e edita só oportunidades, atividades e tarefas em que é responsável (regra: `oportunidade.responsavel = @request.auth.id`); `admin` e `gestor` veem tudo; `licitacao` não vê.
- **Superfícies/arquivos/configurações afetadas:** projeto Skip “CRM”: coleções; `pb_hooks/oportunidade_*.pb.js`, `pb_hooks/cadencia_motor.pb.js`, `pb_hooks/estado_contato.pb.js`, `pb_hooks/lib/pode_enviar.js`; telas `/pipeline/:id`, `/oportunidade/:id`, `/caixa`.
- **Risco e plano B:** agendamento falha → o passo continua `agendado` e é tratado no ciclo seguinte sem duplicar (chave de idempotência).
- **Rollback ou reversão:** `pausa_geral=true` para tudo; desativar a cadência não apaga histórico.

## Dados e integrações

| Coleção | Campos |
|---|---|
| `oportunidades` | `organizacao`, `contato`, `pipeline`, `etapa`, `responsavel`, `cadencia`, `cadencia_versao`, `inicio_cadencia`, `rodada` (int, começa 1), `estado_contato` (`aguardando`/`ativo`/`pausado`/`esgotado`), `motivo_pausa`, `proxima_acao`, `proxima_acao_em`, `motivo_perda`, `teste` (bool) |
| `atividades` | `oportunidade`, `tipo` (`email`/`whatsapp`/`ligacao`/`linkedin`/`nota`/`sistema`), `direcao` (`saida`/`entrada`), `conteudo` (texto), `categoria_ligacao` (`decisor`/`encaminha_decisor`/`recepcao_contabilidade`/`nao_atendeu`/`numero_errado`), `tipo_resposta` (`interesse`/`retorno_pedido`/`recusa`/`optout`/`exclusao`/`resposta_automatica`), `etapa_de`, `etapa_para`, `autor`, `provedor_id` (único quando houver), `criado_em`, `teste` |
| `tarefas` | `oportunidade` (opcional para `revisao` e `duplicidade`), `organizacao`, `tipo` (`ligacao`/`linkedin`/`whatsapp_manual`/`revisao`/`duplicidade`/`retorno`/`resposta`/`erro`), `responsavel`, `vencimento`, `status` (`aberta`/`feita`/`cancelada`), `motivo_prioridade`, `mensagem_sugerida`, `passo`, `teste` |
| `envios` | `oportunidade`, `passo`, `rodada`, `canal`, `modelo`, `status` (`agendado`/`enviando`/`enviado`/`falhou`/`cancelado`), `motivo`, `agendado_para`, `chave_idempotencia` (única: `oportunidade:passo:canal:rodada`), `provedor_id`, `simulado` (json), `erro`, `tentativas`, `teste` |

**Conferência de envio (`lib/pode_enviar.js`), chamada pelos remetentes imediatamente antes de chamar o provedor, dentro da transação que muda `agendado` para `enviando`:** devolve “pode” só se, naquele momento, `pausa_geral=false`; o canal está ativo; a oportunidade está `ativo`; o contato não está `excluido`, com opt-out ou inválido no canal; o destino não está em `supressao`; o horário está na janela em America/Sao_Paulo; o limite diário do canal não foi atingido; e, com `modo_teste=true`, o destino está em `destinatarios_permitidos`. Caso contrário devolve o motivo: o remetente marca `cancelado` (contato pausado, opt-out, supressão, exclusão, modo de teste) ou mantém `agendado` para o próximo horário válido (pausa geral, canal desligado, janela, limite).

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | organização vira `acionavel` | cria oportunidade na pipeline do ICP, etapa inicial, responsável = SDR do Q-01, `estado_contato=aguardando` | já existe oportunidade ativa | escopo fase 1 |
| RN-02 | fila de entrada | todo dia útil, às 07:00 de Brasília, as oportunidades `aguardando` passam a `ativo` por ordem de nota, até `limite_diario_entrada_cadencia` | — | Q-13 |
| RN-03 | oportunidade fica `ativo` | agenda todos os passos: D1 é o próprio dia, se ainda dentro da janela, ou o próximo dia válido; dias úteis pulam sábado, domingo e `feriados`; `auto` → `envios`; `tarefa` → `tarefas` | cadência `teste=true` com modo de teste: `dia` vale minutos | D-05, Q-10 |
| RN-04 | atividade de entrada em qualquer canal | `estado_contato=pausado`; cancela `envios` `agendado` e `enviando` de todos os canais; cria tarefa `resposta` para a SDR | — | D-11 |
| RN-05 | opt-out ou recusa | RN-04, marca opt-out no canal e grava HMAC em `supressao` (SPEC-1-002) | — | D-11 |
| RN-06 | regra de esgotamento atingida (`toques`: número de passos cumpridos sem resposta; `dias_sem_resposta`: dias desde o primeiro passo) | `esgotado`; oportunidade vai para a etapa `perdido` com o `motivo_perda` da regra | SDR reativa com nota | Q-11 |
| RN-07 | retomada (SDR reativa, ou tipo de resposta `resposta_automatica`, ou canal religado com passos vencidos há mais de 1 dia) | `rodada+1`; os passos restantes são reagendados a partir do próximo dia válido, mantendo os intervalos entre eles; nada vencido é enviado em lote | contato com opt-out, recusa ou exclusão nunca retoma | AC-L04 |
| RN-08 | a SDR marca o tipo da resposta | `interesse`/`retorno_pedido` → tarefa e próxima ação; `recusa`/`optout` → RN-05; `exclusao` → `alertas` tipo `exclusao_pedida` para o `admin`; `resposta_automatica` → RN-07 | — | D-11 |
| RN-09 | registro de ligação | `categoria_ligacao` obrigatória; alimenta o contato efetivo (SPEC-1-007) | — | Q-18 |
| RN-10 | mudança de etapa | grava atividade `sistema` com `etapa_de` e `etapa_para`; etapa `perdido` exige motivo | — | Q-08, Q-09 |
| RN-11 | `pausa_geral=true` | nada é agendado nem enviado; ao desligar, vale a RN-07 para o que venceu | — | segurança |

## Fluxo e regras

1. Hook de `organizacoes` → RN-01. Agendamento diário → RN-02. Ativação → RN-03.
2. Agendamento a cada 15 minutos cria as `tarefas` do dia (ligação, LinkedIn com `mensagem_sugerida` do modelo, `whatsapp_manual` quando a SPEC-1-005 converter o passo) e aplica RN-06.
3. Atividade de entrada → RN-04/RN-05; a SDR marca o tipo → RN-08.
4. A caixa `/caixa` lista para a SDR, nesta ordem: respostas; tarefas vencidas; ligações do dia; LinkedIn do dia; retornos combinados; revisões e duplicidades (SPEC-1-002). Para `admin` e `gestor`, mostra também os `alertas` abertos. Cada item traz o motivo da prioridade.
5. A SDR registra resultado de ligação (RN-09) ou de LinkedIn e move a etapa (RN-10).

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | clínica acionável com cadência D1–D11 | 11 passos agendados; tarefas nos dias certos | — |
| Limite | resposta no WhatsApp no D4 | envios D5–D10 cancelados nos dois canais; tarefa de resposta | — |
| Limite | 30 acionáveis no dia com limite de entrada 10 | 10 ativas; 20 aguardando por ordem de nota | — |
| Falha | agendamento roda duas vezes | nenhum envio nem tarefa duplicados | — |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC, SPEC-1-001, SPEC-1-002 e o projeto Skip.
2. **Alterar somente:** coleções, hooks, `lib/pode_enviar.js` e telas desta SPEC.
3. **Não alterar:** chamada a provedor externo; configuração de negócio.
4. **Executar nesta ordem:** coleções e regras → oportunidade e fila → motor e retomada → estado único → conferência de envio → caixa → telas de pipeline.
5. **Parar e pedir validação quando:** a cadência aprovada tiver passo sem modelo; Q-11 sem resposta (nenhum contato vira `esgotado` e isso fica como pendência).
6. **Estado válido ao parar:** nenhum envio sai sem as SPECs de canal; `pausa_geral` funcionando.

**Contexto técnico do Skip:** ver SPEC-1-001. `cronAdd` em UTC: converter janela e horário de entrada de America/Sao_Paulo. Testes usam o gancho `POST /backend/v1/teste/rodar/cadencia` e dados `teste=true`.

## Checklist de execução

- [ ] Coleções com regras por papel e por responsável.
- [ ] Oportunidade e fila de entrada com limite diário.
- [ ] Motor com D1, dias úteis, feriados, janela e retomada.
- [ ] Estado único: resposta, recusa, opt-out e exclusão.
- [ ] `lib/pode_enviar.js` com todas as conferências.
- [ ] Caixa com prioridade e motivo; alertas para `admin`/`gestor`.
- [ ] Telas de pipeline e de oportunidade com histórico de etapas.
- [ ] Evidências em `05_entregas/fase-1/spec-1-003/`.

## Critérios de aceite

- [ ] **CA-1-12:** uma clínica acionável vira oportunidade e, ao ficar ativa, recebe os passos da cadência nas datas certas (dias úteis, feriados e janela).
- [ ] **CA-1-13:** uma resposta em qualquer canal cancela os envios agendados e em andamento dos dois canais e cria tarefa para a SDR.
- [ ] **CA-1-14:** um opt-out bloqueia o canal para sempre e pausa a cadência.
- [ ] **CA-1-15:** rodar o agendamento duas vezes não duplica envio nem tarefa.
- [ ] **CA-1-16:** a SDR vê na caixa só as próprias oportunidades, na ordem de prioridade, com o motivo.
- [ ] **CA-1-17:** com `pausa_geral=true`, nada novo é agendado ou enviado, e ao desligar nada vencido sai em lote.
- [ ] **CA-1-36:** resposta marcada como automática retoma a cadência em nova rodada; marcada como recusa, nunca retoma.
- [ ] **CA-1-37:** registrar uma ligação exige a categoria do resultado.
- [ ] **CA-1-38:** a tarefa de LinkedIn aparece no dia da cadência com a mensagem do modelo aprovado.
- [ ] **CA-1-43:** com limite de entrada 10, só 10 clínicas entram na cadência no dia, por ordem de nota; as outras aguardam.

## TDD da SPEC

| ID | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|
| T1 | GREEN | CA-1-12 | cadência de teste D1–D11 em dias úteis; oportunidade ativada numa sexta às 10h | rodar `cadencia` | D1 sexta; D2 segunda; feriado da lista pulado | `05_entregas/fase-1/spec-1-003/t1.md` |
| T2 | RED/GREEN | CA-1-13 | atividade de entrada numa oportunidade com envios `agendado` e um `enviando` | gancho de evento de teste | antes da RN-04 envios seguem (falha); depois todos `cancelado` e tarefa `resposta` | `05_entregas/fase-1/spec-1-003/t2.md` |
| T3 | GREEN | CA-1-14 | resposta com tipo `optout` | marcar tipo | opt-out gravado, HMAC em `supressao`, cadência pausada; reativar é recusado | `05_entregas/fase-1/spec-1-003/t3.md` |
| T4 | RED/GREEN | CA-1-15 | rodar o agendamento duas vezes seguidas | gancho `rodar/cadencia` 2× | antes da chave única: duplicados (falha); depois: zero duplicados | `05_entregas/fase-1/spec-1-003/t4.md` |
| T5 | GREEN | CA-1-16 | duas SDRs de teste com carteiras diferentes | login de cada uma em `/caixa` e pela API | cada uma vê só a própria carteira, na ordem definida | `05_entregas/fase-1/spec-1-003/t5.md` |
| T6 | GREEN | CA-1-17 | ligar `pausa_geral`, rodar, esperar vencer um passo, desligar | gancho + configuração | nada agendado nem enviado com a pausa; depois, passos reagendados, nenhum lote | `05_entregas/fase-1/spec-1-003/t6.md` |
| T7 | GREEN | CA-1-36 | marcar uma resposta `resposta_automatica` e outra `recusa` | pela caixa | a primeira volta em `rodada=2` com novas datas; a segunda nunca reativa | `05_entregas/fase-1/spec-1-003/t7.md` |
| T8 | GREEN | CA-1-37, CA-1-38 | registrar ligação sem categoria; abrir o dia de um passo LinkedIn | pela caixa | registro recusado sem categoria; tarefa de LinkedIn com o texto do modelo | `05_entregas/fase-1/spec-1-003/t8.md` |
| T9 | GREEN | CA-1-43 | 30 clínicas acionáveis de teste, limite 10 | rodar a fila | 10 ativas por nota, 20 aguardando | `05_entregas/fase-1/spec-1-003/t9.md` |
| T10 | REFACTOR/REGRESSÃO | CA-1-12, CA-1-13 | repetir T1 e T2 depois de todas as mudanças | ganchos | mesmos resultados | `05_entregas/fase-1/spec-1-003/t10-regressao.md` |

**Dados/fixtures:** organizações e contatos fictícios `teste=true` (domínio `@clinica-exemplo.invalid`, telefones fictícios); duas SDRs de teste; cadência de teste D1–D11; feriado de teste na lista.
**Caminhos de erro obrigatórios:** resposta duplicada do provedor; opt-out; contato sem canal; pausa geral; cadência sem modelo; envio em `enviando` no momento da resposta.

**Evidência exigida:** arquivos acima.

## Teste humano do cliente

- **Origem:** não aplicável nesta SPEC (ciclo completo no CL-007, SPEC-1-007).

## Handoff e operação

- **Como demonstrar:** criar uma oportunidade de teste, mostrar as datas e simular uma resposta para ver a pausa.
- **Como operar depois:** a SDR trabalha pela caixa todo dia.
- **Como monitorar:** erros de envio viram tarefa `erro`; falhas gerais viram `alertas`.
- **Pendência conhecida:** nenhuma.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| 2da63fc2-fb88-4d7d-9f6a-a25c8f6f1a4b | Criar a oportunidade quando a clínica for aprovada | Dario | SPEC-1-003 | CA-1-12, CA-1-43 | T1, T9 | `t9.md` | SPEC-1-002 pontuando | ☐ |
| 1cc6e53d-bb74-43b2-9bcc-12cfd0d9ae26 | Agendar os passos da cadência sem repetir envios | Dario | SPEC-1-003 | CA-1-12, CA-1-15, CA-1-17 | T1, T4, T6 | `t1.md`, `t4.md` | cadência aprovada | ☐ |
| b43ce6d9-9fb3-49cd-b8b5-c01643698c19 | Parar a cadência quando a clínica responder | Dario | SPEC-1-003 | CA-1-13, CA-1-14, CA-1-36 | T2, T3, T7, T10 | `t2.md`, `t7.md` | agendamento pronto | ☐ |
| b19368a9-bb07-4c27-a355-307347148e3a | Abrir a caixa de trabalho da SDR | Dario | SPEC-1-003 | CA-1-16, CA-1-37, CA-1-38 | T5, T8 | `t5.md`, `t8.md` | tarefas sendo criadas | ☐ |
| 6d68f7ab-b0fc-4720-85ae-a4b3fb82c244 | Mostrar as pipelines com o histórico de cada clínica | Dario | SPEC-1-003 | CA-1-12 | T1 e captura das telas com histórico de etapas | `05_entregas/fase-1/spec-1-003/telas.png` | oportunidades criadas | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | painel gerar-specs | v1.1 | conferência de envio comum, cancelamento de envios em andamento, fila de entrada com limite, retomada sem lote, tipos de tarefa, campos de categoria e tipo de resposta, histórico de etapas |
