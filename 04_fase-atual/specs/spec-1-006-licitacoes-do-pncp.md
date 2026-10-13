# SPEC-1-006 — Licitações do PNCP na pipeline pública

**Fase:** 1
**Status:** planejada (v1.1, revisada pelo painel)
**Dono:** Dario Calçada (construção), responsável pela pipeline pública (triagem), com o Maestro
**Origem no escopo:** fase 1, capacidade 10; D-06; RQ-008; CL-002, CL-PEND-004
**Degrau da solução:** construção mínima sobre recurso nativo — agendamento do Skip consumindo a API pública de consultas do PNCP; filtro de palavras feito no próprio sistema.

## Contexto e decisões fechadas

- **Estado atual:** a Higia cata licitações “no milho” e tem ata de registro de preço que pode oferecer a outros municípios (C1 15:22–16:50). Não há rotina nem ferramenta.
- **Estado desejado:** todo dia o CRM traz as contratações publicadas no PNCP nas modalidades escolhidas, filtra pelas palavras do questionário e mostra as que combinam na pipeline pública, para a pessoa da Higia triar.
- **Decisões já fechadas:**
  - Fonte: API pública de consultas do PNCP, sem autenticação.
  - A API não filtra por palavra: a consulta é por modalidade e data, e o filtro de palavras e UFs roda no sistema sobre o objeto da contratação.
  - CPSI não tem código de modalidade: é achada pela palavra no objeto, dentro das modalidades consultadas (Q-16).
  - Dispensa fica de fora (C1 16:50).
  - A pipeline pública da fase 1 é a coleção `oportunidades_publicas`, com etapas fixas `nova` → `em_triagem` → `aderente` ou `descartada`; não cria registros em `oportunidades`.
  - O sistema encontra e organiza; nunca envia proposta, documento ou participa de disputa.
- **Bloqueios:** Q-16 (palavras, modalidades, UFs) e Q-17 (responsável) definidas.

## Resultado observável

O responsável abre a pipeline pública e vê os editais publicados no dia anterior que citam as soluções da Higia, cada um com órgão, UF, objeto, prazo de proposta, link e as palavras do match, e marca cada um como aderente ou descartado.

## Limites e dependências

- **Inclui:** coleção `oportunidades_publicas`; consulta diária; filtro local; tela `/publico`; triagem; ajuste do filtro no admin.
- **Fora de escopo:** alertas de prazo, oferta de ata e rotina (fase 3); proposta, habilitação e disputa (fora do ciclo).
- **Entradas e pré-condições:** SPEC-1-001 (`configuracao.pncp`, `importacoes`, `alertas`, papel `licitacao`, simulação). Não depende das SPECs 1-002 a 1-005.
- **Saídas/artefatos:** oportunidades públicas; registro de cada consulta em `importacoes`.
- **Dependências e responsáveis:** Igor e Dario respondem a Q-16; o responsável da Q-17 tria.
- **Atores e permissões mínimas:** `licitacao`, `gestor` e `admin` leem e triam; `sdr` não vê; rotas exigem login e papel.
- **Superfícies/arquivos/configurações afetadas:** `pb_hooks/pncp_consulta.pb.js` (agendamento), coleção `oportunidades_publicas`, tela `/publico`.
- **Risco e plano B:** PNCP fora do ar ou 429 → a janela do dia fica pendente e é consultada de novo; a busca manual no portal continua possível.
- **Rollback ou reversão:** `configuracao.pncp.ativo=false`, sem perder o que entrou.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| PNCP — `GET https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao` | PNCP | obrigatórios: `dataInicial` e `dataFinal` (AAAAMMDD), `codigoModalidadeContratacao`, `pagina`; `tamanhoPagina` de 10 a 50 (usar 50). Usados: número de controle PNCP, objeto da compra, órgão, unidade (UF e município), data de encerramento da proposta, valor estimado, link do sistema de origem | pública | uma chamada por modalidade e página; espera de 4 s entre chamadas; 429 = esperar 60 s e repetir até 3 vezes; 204 = sem resultados; timeout 30 s | falha persistente: janela pendente em `importacoes` e `alertas` tipo `pncp_pendente` |
| PNCP — lista de modalidades `https://pncp.gov.br/api/pncp/v1/modalidades` | PNCP | código e nome (19 códigos) | pública | consultada uma vez e guardada | — |
| Coleção `oportunidades_publicas` | CRM | `pncp_id` (único), `orgao`, `uf`, `municipio`, `objeto` (texto), `modalidade`, `data_publicacao`, `data_encerramento`, `valor_estimado`, `link`, `termos_match` (json), `status` (`nova`/`em_triagem`/`aderente`/`descartada`), `responsavel`, `motivo`, `triado_em`, `teste` | `licitacao`/`gestor`/`admin` | `pncp_id` único | — |

Antes de codificar, conferir no Swagger (`https://pncp.gov.br/api/consulta/swagger-ui/index.html`) os nomes dos campos e o código de cada modalidade escolhida na Q-16, e registrar em `06_notas/fontes-fase-1.md`. Não usar a busca por palavra do portal: não é documentada e é ignorada pela API.

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | casamento | objeto e palavras normalizados (minúsculas, sem acento); palavra de até 4 letras (PACS, RIS) casa só como palavra inteira; mais longa casa como trecho | — | Q-16 |
| RN-02 | objeto casa com pelo menos uma palavra e UF está na lista (lista vazia = todas as UFs) | cria oportunidade `nova` com `termos_match` | — | Q-16 |
| RN-03 | lista de palavras vazia | a consulta não roda e gera `alertas` tipo `pncp_pendente` com “filtro sem palavras” | — | — |
| RN-04 | modalidade dispensa | nunca consulta | — | C1 16:50 |
| RN-05 | contratação já existe pelo `pncp_id` | atualiza prazo e valor; não duplica | — | — |
| RN-06 | triagem | `aderente` ou `descartada` exige responsável e motivo | — | RQ-008 |
| RN-07 | ação externa (proposta, documento, contato com órgão) | não existe no sistema; sempre fora dele e humana | — | D-06 |

## Fluxo e regras

1. O Maestro guarda a lista de modalidades e confere os campos no Swagger.
2. Agendamento diário às 10:00 UTC (07:00 em Brasília): para cada modalidade da Q-16, consulta a janela do dia anterior em America/Sao_Paulo (`dataInicial` = `dataFinal` = ontem), página a página, com espera; salva o cursor (modalidade e página) em `importacoes` para continuar no ciclo seguinte se passar de 30 minutos.
3. Aplica RN-01 a RN-05 e grava as oportunidades.
4. A tela `/publico` mostra a pipeline pública ordenada pelo prazo, com triagem (RN-06); objeto e órgão aparecem como texto.
5. O `admin` ajusta palavras, modalidades e UFs em `configuracao.pncp`; vale na consulta seguinte.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | pregão eletrônico publicado ontem com “PACS” no objeto | oportunidade nova | — |
| Limite | mais de 1.000 pregões no dia | todas as páginas lidas, com espera; se passar de 30 min, continua pelo cursor | — |
| Falha | 429 seguido | espera e repete; depois de 3 tentativas a janela fica pendente | próximo ciclo retoma |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC, SPEC-1-001 e o projeto Skip.
2. **Alterar somente:** a coleção, o agendamento e a tela desta SPEC.
3. **Não alterar:** pipelines privadas; nada de envio.
4. **Executar nesta ordem:** Swagger e modalidades → coleção → consulta de um dia em teste → filtro local → agendamento → tela e triagem.
5. **Parar e pedir validação quando:** Q-16 ou Q-17 sem resposta; o Swagger mostrar campo ou parâmetro diferente do descrito.
6. **Estado válido ao parar:** nenhuma oportunidade duplicada; cursor salvo.

**Contexto técnico do Skip:** ver SPEC-1-001. Testes usam o gancho `POST /backend/v1/teste/rodar/pncp` e `simulacao.respostas.pncp` para 429 e 204.

## Checklist de execução

- [ ] Campos e modalidades conferidos e registrados.
- [ ] Coleção com `pncp_id` único e regras por papel.
- [ ] Consulta diária com espera, retentativa e cursor.
- [ ] Filtro local (RN-01 a RN-03).
- [ ] Tela `/publico` com triagem e motivo.
- [ ] Evidências em `05_entregas/fase-1/spec-1-006/`.

## Critérios de aceite

- [ ] **CA-1-26:** uma contratação real publicada no PNCP com palavra do filtro aparece na pipeline pública com órgão, UF, objeto, prazo, link e motivo do match.
- [ ] **CA-1-27:** consultar o mesmo dia duas vezes não duplica oportunidades, e um 429 não perde a janela.
- [ ] **CA-1-28:** a triagem exige responsável e motivo, e não existe no sistema nenhuma ação de envio para órgão.
- [ ] **CA-1-29:** mudar uma palavra no admin muda o resultado da consulta seguinte; com a lista de palavras vazia, a consulta não roda e gera alerta.

## TDD da SPEC

| ID | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|
| T1 | GREEN | CA-1-26 | o Maestro escolhe no portal do PNCP uma data passada com pelo menos um pregão eletrônico citando PACS ou telerradiologia e registra a data e o número de controle esperado | rodar `pncp` para essa data | a contratação esperada aparece com `termos_match` correto; o link abre o edital | `05_entregas/fase-1/spec-1-006/t1.md` |
| T2 | RED/GREEN | CA-1-27 | consultar a mesma data duas vezes | gancho `rodar/pncp` 2× | antes do `pncp_id` único: duplicadas (falha); depois: nenhuma duplicada | `05_entregas/fase-1/spec-1-006/t2.md` |
| T3 | GREEN | CA-1-27 | `simulacao.respostas.pncp` = 429 e depois 204 | rodar `pncp` | espera e retomada pelo cursor; 204 tratado como vazio | `05_entregas/fase-1/spec-1-006/t3.md` |
| T4 | GREEN | CA-1-28 | usuário `licitacao` de teste tria uma oportunidade sem motivo e depois com motivo; `sdr` tenta abrir `/publico` | tela e API | sem motivo é recusado; com motivo grava; `sdr` negado; nenhuma ação de envio na tela | `05_entregas/fase-1/spec-1-006/t4.md` |
| T5 | GREEN | CA-1-29 | trocar a palavra por uma que não aparece na data do T1; depois esvaziar a lista | rodar `pncp` | nenhuma nova oportunidade; com lista vazia, consulta não roda e alerta aparece | `05_entregas/fase-1/spec-1-006/t5.md` |
| T6 | REFACTOR/REGRESSÃO | CA-1-26 (RN-01) | objetos de exemplo: “Sistema PACS em nuvem”, “Gestão de riscos” | função de casamento | o primeiro casa com PACS; o segundo não casa com RIS | `05_entregas/fase-1/spec-1-006/t6-regressao.md` |

**Dados/fixtures:** a data real do T1, registrada no próprio teste; objetos de exemplo do T6; usuário `licitacao@exemplo.invalid`.
**Caminhos de erro obrigatórios:** 429; 204; PNCP fora do ar; campo ausente; filtro sem palavras.

**Evidência exigida:** arquivos acima.

## Teste humano do cliente

- **Origem:** não aplicável nesta SPEC (ciclo completo no CL-007, SPEC-1-007).

## Handoff e operação

- **Como demonstrar:** abrir a pipeline pública com os editais do dia anterior.
- **Como operar depois:** o responsável tria toda manhã.
- **Como monitorar:** janelas pendentes e filtro vazio viram `alertas`.
- **Pendência conhecida:** CPSI publicada em modalidade fora da lista da Q-16 não é vista; alertas de prazo e oferta de ata ficam para a fase 3.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| 5534b6ad-1773-4d9b-8d0c-916a245a6687 | Trazer as licitações do PNCP para a pipeline pública | Dario | SPEC-1-006 | CA-1-26, CA-1-27 | T1, T2, T3, T6 | `t1.md`, `t2.md` | Q-16 definida | ☐ |
| 780ea26b-05c1-4156-b723-996117e9f413 | Triar as licitações na pipeline pública | Dario (passa para quem a Q-17 indicar) | SPEC-1-006 | CA-1-28 | T4 | `t4.md` | oportunidades entrando; Q-17 definida | ☐ |
| 4c42dd0c-10a3-47d7-a4a7-71ea277203a0 | Ajustar o filtro de licitações no admin | Dario | SPEC-1-006 | CA-1-29 | T5 | `t5.md` | consulta funcionando | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | painel gerar-specs | v1.1 | modelo único da pipeline pública, regra de casamento, filtro vazio, horário fixo, teste com data real escolhida, dependência só da SPEC-1-001 |
