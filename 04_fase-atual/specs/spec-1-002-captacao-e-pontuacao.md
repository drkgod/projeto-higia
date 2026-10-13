# SPEC-1-002 — Captação, cadastro e pontuação das clínicas

**Fase:** 1
**Status:** planejada (v1.1, revisada pelo painel)
**Dono:** Dario Calçada, com o Maestro; Igor valida a pontuação; a SDR revisa
**Origem no escopo:** fase 1, capacidades 2, 3 e 4; D-07, D-13; RQ-003, RQ-005, RQ-006, RQ-007, RQ-015; CL-001
**Degrau da solução:** construção mínima sobre recurso nativo — coleções e hooks do Skip consumindo APIs públicas gratuitas; importação de planilha CSV em vez de integração paga.

## Contexto e decisões fechadas

- **Estado atual:** a SDR monta cerca de 10 registros por dia na mão (Instagram, Gemini para achar o CNPJ, site da Receita, WhatsApp Web), segundo o vídeo da rotina de 21/09. O Apollo gratuito traz poucos registros por mês, repetidos, com telefone da recepção ou da contabilidade.
- **Estado desejado:** o CRM capta clínicas pelo CNES e pela Receita/CNPJ, aceita planilhas, guarda a fonte de cada dado, junta repetidos, segura possíveis repetidos para a SDR decidir, dá uma nota explicável pelo ICP vigente e atende pedido de exclusão de dados.
- **Decisões já fechadas:**
  - Fontes da fase 1: CNES (dados abertos do Ministério da Saúde), Receita/CNPJ pela BrasilAPI e planilha CSV. Fonte paga não entra.
  - Chave da organização é o CNPJ; sem CNPJ, fica `em_revisao`.
  - Dado ausente aparece como “sem informação”, nunca como negativo.
  - Sócio no QSA entra como contato de papel `desconhecido`; nunca vira decisor sozinho.
  - Opt-out e exclusão valem para a pessoa (e-mail e telefone), em qualquer clínica, para sempre. A supressão guarda só um código (HMAC) do e-mail e do telefone.
  - A SDR não altera opt-out nem supressão.
- **Bloqueios:** a pontuação depende de ICP ativo (Q-04 a Q-07, SPEC-1-001). Captação e importação podem ser testadas antes com o ICP de teste e a simulação.

## Resultado observável

A SDR abre a fila de clínicas e vê as clínicas de imagem da região escolhida, cada uma com CNPJ, equipamentos, sócios, contato principal, a fonte de cada dado e a nota com os motivos. Clínicas repetidas aparecem uma vez; possíveis repetidas ficam paradas até ela decidir. Ela aprova, corrige ou descarta.

## Limites e dependências

- **Inclui:** coleções `organizacoes`, `contatos`, `alteracoes`, `supressao`; captação CNES; consulta CNPJ; importação CSV; duplicidade certa e possível; pontuação; revisão pela SDR (aprovar, corrigir, descartar, marcar sinais); exclusão a pedido; telas `/clinicas`, `/clinica/:id`, `/importar`.
- **Fora de escopo:** enriquecimento pago, validação por serviço externo e papel do contato com evidência (fase 2); envio (SPECs 1-004 e 1-005).
- **Entradas e pré-condições:** SPEC-1-001 (coleções base, `importacoes`, simulação, catálogo de sinais, `dominios_pessoais`); segredo `SUPRESSAO_CHAVE` digitado pelo Dario nos segredos do Skip.
- **Saídas/artefatos:** organizações e contatos com fonte; relatório de cada importação; fila de revisão.
- **Dependências e responsáveis:** Dario dispara captações e importações; Igor confere a nota numa amostra; a SDR revisa.
- **Atores e permissões mínimas:** conforme a matriz da SPEC-1-001; só `admin` executa exclusão a pedido e desfaz lote.
- **Superfícies/arquivos/configurações afetadas:** projeto Skip “CRM”: coleções; `pb_hooks/captacao_*.pb.js`, `pb_hooks/pontuacao.pb.js`, `pb_hooks/duplicidade.pb.js`, rotas `/backend/v1/importar`, `/backend/v1/excluir-contato`, `/backend/v1/desfazer-lote`; telas.
- **Risco e plano B:** API pública fora do ar ou com limite → a coleta para, registra em `importacoes` e retoma do cursor; a importação de planilha continua.
- **Rollback ou reversão:** desfazer lote apaga só os registros criados por ele que ainda não têm atividade.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| CNES estabelecimentos: `GET https://apidadosabertos.saude.gov.br/cnes/estabelecimentos` (filtros `codigo_tipo_unidade`, `codigo_uf`, `codigo_municipio`, `status`) | CNES | código CNES, CNPJ, nome fantasia, razão social, tipo de unidade, UF, município | pública | `limit` máximo 20; `offset` é deslocamento de linha (somar 20); cursor em `importacoes`; timeout 20 s; 3 tentativas com espera crescente | erro registrado; retoma no próximo ciclo |
| CNES equipamentos: `GET https://apidadosabertos.saude.gov.br/assistencia-a-saude/cnes-equipamentos?co_cnes={cnes}&nu_comp={AAAAMM}` | CNES | equipamentos (tipo e quantidade) na competência mais recente | pública | uma chamada por estabelecimento filtrado; guardado 30 dias | sem resposta = “sem informação” |
| BrasilAPI: `GET https://brasilapi.com.br/api/cnpj/v1/{cnpj}` | Receita | razão social, nome fantasia, situação cadastral, porte (ME/EPP/DEMAIS), natureza jurídica, CNAE principal e secundários, município, UF, telefone e e-mail públicos, QSA | pública, sem limite publicado | timeout 15 s; no máximo 1 por segundo; guardado 30 dias | 404 = `em_revisao`; 429/5xx = tentar no próximo ciclo; fora do ar = pendente |
| Planilha CSV (UTF-8; quem tiver XLSX salva como CSV) | arquivo do admin | modelo padrão: nome, sobrenome, cargo, LinkedIn, e-mail, telefone, empresa, CNPJ, setor, site, e-mail da empresa, telefone da empresa; outra planilha passa por uma tela de mapeamento | upload por `admin`/`gestor` pela rota `/backend/v1/importar` | `arquivo_hash` em `importacoes`: o mesmo arquivo não importa duas vezes | linha inválida vai para o relatório de rejeitados (sem dado pessoal no relatório) |

| Coleção | Campos |
|---|---|
| `organizacoes` | `cnpj` (único, só dígitos), `cnpj_raiz` (8 dígitos), `cnes`, `razao_social`, `nome_fantasia`, `tipo_unidade`, `natureza_juridica`, `uf`, `municipio`, `porte`, `situacao_cadastral`, `cnae_principal`, `cnaes_secundarios`, `equipamentos` (json), `site`, `instagram`, `telefone_empresa`, `email_empresa`, `fontes` (json `{campo, fonte, data}`), `sinais_sdr` (json: `linkedin_decisor`, `instagram_ativo`), `status` (`candidato`/`duplicidade_pendente`/`em_revisao`/`acionavel`/`descartado`), `pontuacao`, `fatores_pontuacao` (json), `icp_versao`, `motivo_status`, `contato_principal` (relação), `lote_importacao`, `teste` (bool) |
| `contatos` | `organizacao`, `nome`, `cargo`, `papel` (`desconhecido` por padrão), `email`, `telefone`, `whatsapp`, `linkedin`, `fonte`, `confianca` (`baixa`/`media`/`alta`), `email_invalido`, `whatsapp_invalido`, `optout_email`, `optout_whatsapp`, `optin_whatsapp`, `optin_evidencia`, `optin_em`, `excluido` (bool), `teste` (bool) |
| `alteracoes` | `colecao`, `registro`, `campo`, `antes`, `depois`, `autor`, `quando`, `motivo` — para exclusão, grava só os nomes dos campos apagados, nunca os valores |
| `supressao` | `codigo` (HMAC-SHA256 do e-mail normalizado ou do telefone E.164 com `$secrets.get("SUPRESSAO_CHAVE")`), `canal` (`email`/`whatsapp`/`todos`), `motivo` (`optout`/`exclusao`), `quando` — `codigo` + `canal` únicos |

Regras de acesso: `optout_*`, `optin_*`, `excluido`, `supressao` e `alteracoes` só são gravados por hooks ou `admin`; `sdr` edita `status`, `motivo_status`, `sinais_sdr`, `pontuacao` (com justificativa) e o `contato_principal`.

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | CNPJ já existe | atualiza campos vazios e acrescenta fontes; não apaga dado existente | correção manual da SDR prevalece | RQ-006 |
| RN-02 | e-mail ou telefone do contato está em `supressao` | contato entra já com opt-out e nunca volta a ser canal, em qualquer clínica | — | RQ-006; D-13 |
| RN-03 | situação cadastral diferente de ativa | bloqueio `cnpj_inativo` | — | catálogo |
| RN-04 | possível duplicidade: mesmo `cnpj_raiz` com CNPJ diferente (matriz e filial), ou mesmo telefone da empresa, ou mesmo domínio de site ou de e-mail corporativo, ou mesmo nome fantasia normalizado no mesmo município | `status=duplicidade_pendente`; não vira acionável nem entra em cadência até a SDR decidir “mesma clínica” (junta os registros, preservando fontes) ou “clínicas diferentes” (libera as duas) | — | critério 9 da fase |
| RN-05 | nota ≥ `limiar_acionavel`, sem bloqueio, sem duplicidade pendente e com canal válido | `acionavel` | — | Q-07 |
| RN-06 | nota entre os limiares, ou sem CNPJ, ou sem canal válido | `em_revisao` | — | escopo |
| RN-07 | nota < `limiar_revisao` ou bloqueio | `descartado` com motivo | SDR reabre com justificativa | Q-06/Q-07 |
| RN-08 | fator sem dado | “sem informação”: não soma nem subtrai | — | escopo |
| RN-09 | ICP ativo muda | repontua só organizações sem `envios` nem `atividades`; as demais mantêm `pontuacao` e `icp_versao` | — | critério 1 da fase |
| RN-10 | canal válido | e-mail: formato válido, domínio fora de `dominios_pessoais` e CNPJ ativo; WhatsApp: celular brasileiro (9 dígitos depois do DDD) e não marcado inválido | e-mail pessoal fica guardado mas não entra na cadência | escopo fase 1 cap. 7–8 |
| RN-11 | contato principal | o primeiro que tiver canal válido, nesta ordem: papel decisor; maior confiança; sócio do QSA; contato geral da empresa (criado com `telefone_empresa`/`email_empresa`) | SDR troca com justificativa | escopo |
| RN-12 | SDR aprova clínica `em_revisao` | `acionavel` com justificativa em `alteracoes`, desde que tenha CNPJ ativo e canal válido | duplicidade pendente não aprova | escopo, fluxo |
| RN-13 | pedido de exclusão do titular | apaga `nome`, `cargo`, `email`, `telefone`, `whatsapp` e `linkedin` do contato e marca `excluido`; grava HMAC do e-mail e do telefone em `supressao` (`todos`); substitui por “[excluído a pedido]” o `conteudo` das `atividades` e a `mensagem_sugerida` das `tarefas` desse contato; remove o contato de `fontes` e de `importacoes.erros`; troca `antes` e `depois` de `alteracoes` desse contato por “[excluído]”; registra a exclusão só com os nomes dos campos | — | D-13 |
| RN-14 | qualquer correção manual | grava em `alteracoes` com autor, antes, depois e motivo | exclusão segue a RN-13 | D-13 |
| RN-15 | captação | usa os filtros do ICP vigente (tipo de unidade, UF, município); CNAE de imagem, porte e natureza jurídica vêm da consulta CNPJ | — | escopo cap. 2 |

**`dominios_pessoais` (lista fechada, editável só pelo `admin`):** gmail.com, googlemail.com, hotmail.com, hotmail.com.br, outlook.com, outlook.com.br, live.com, msn.com, yahoo.com, yahoo.com.br, ymail.com, icloud.com, me.com, aol.com, bol.com.br, uol.com.br, terra.com.br, ig.com.br, globo.com, globomail.com, r7.com, zipmail.com.br, protonmail.com, proton.me.

## Fluxo e regras

1. Captação: o `admin` dispara pela tela ou o agendamento diário (10:00 UTC, 07:00 em Brasília) roda o lote do ICP ativo; o hook pagina o CNES com cursor, cria ou atualiza `organizacoes` e registra fonte por campo.
2. Para cada CNPJ novo, consulta a BrasilAPI (1 por segundo) e completa razão social, situação, porte, natureza, CNAE, telefone e e-mail da empresa e sócios (contatos `desconhecido`); consulta equipamentos no CNES.
3. Importação: a rota `/backend/v1/importar` recebe o CSV, confere o hash, mapeia colunas, aplica RN-01 e RN-02 e grava o relatório.
4. Duplicidade (RN-04), contato principal (RN-11) e canal válido (RN-10).
5. Pontuação: bloqueios, fatores do ICP ativo com explicação em `fatores_pontuacao`, status pelas RN-05 a RN-07.
6. Revisão em `/clinicas`: a SDR marca sinais de LinkedIn e Instagram, aprova (RN-12), corrige a nota com justificativa, descarta com motivo e decide duplicidades.
7. Exclusão a pedido: o `admin` executa em `/clinica/:id` (RN-13).

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | captação CNES de uma UF do ICP | clínicas com fonte e nota | — |
| Limite | matriz e filial com o mesmo CNPJ raiz | as duas em `duplicidade_pendente` até a SDR decidir | — |
| Falha | BrasilAPI responde 429 | consulta adiada, cursor preservado, sem duplicar | retoma no próximo ciclo |
| Falha | planilha com coluna obrigatória faltando | importação recusada com mensagem clara | admin corrige o arquivo |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC, a SPEC-1-001 e o projeto Skip.
2. **Alterar somente:** coleções, hooks, rotas e telas desta SPEC.
3. **Não alterar:** configuração de ICP (só ler a versão ativa); nada de envio.
4. **Executar nesta ordem:** coleções e regras → importação CSV (testável com simulação) → duplicidade e contato principal → captação CNES → consulta CNPJ → pontuação → revisão → exclusão.
5. **Parar e pedir validação quando:** o recurso de equipamentos não responder para a competência mais recente (registrar o que a fonte devolve e perguntar ao Dario se segue sem esse fator); alguma fonte exigir cadastro ou pagamento; não houver ICP ativo.
6. **Estado válido ao parar:** nenhum registro duplicado; organizações sem nota ficam `candidato`.

**Contexto técnico do Skip:** ver SPEC-1-001. Antes de codificar cada fonte, conferir na documentação oficial os parâmetros e campos e registrar em `06_notas/fontes-fase-1.md`. Testes usam `configuracao.simulacao` e dados fictícios marcados `teste=true`.

## Checklist de execução

- [ ] Coleções `organizacoes`, `contatos`, `alteracoes`, `supressao` com as regras de acesso.
- [ ] Importação CSV com relatório, hash e mapeamento.
- [ ] Duplicidade certa (CNPJ) e possível (RN-04) com decisão da SDR.
- [ ] Captação CNES e consulta CNPJ com cursor, limite e retomada.
- [ ] Pontuação explicável e repontuação ao mudar o ICP.
- [ ] Revisão: aprovar, corrigir, descartar, marcar sinais, trocar contato principal.
- [ ] Exclusão a pedido completa (RN-13).
- [ ] Evidências em `05_entregas/fase-1/spec-1-002/`.

## Critérios de aceite

- [ ] **CA-1-06:** uma captação real de clínicas de imagem de uma UF do ICP cria organizações com a fonte de cada campo.
- [ ] **CA-1-07:** a mesma clínica vinda de duas fontes aparece uma vez só, com as duas fontes registradas.
- [ ] **CA-1-08:** uma planilha diferente com um contato já existente não cria duplicidade, e um contato que está na supressão entra com opt-out.
- [ ] **CA-1-09:** cada organização mostra a nota e os fatores que somaram, tiraram ou não tinham informação.
- [ ] **CA-1-10:** a SDR corrige uma nota com justificativa e a correção fica em `alteracoes`.
- [ ] **CA-1-11:** uma falha da API pública não perde o ponto de parada nem duplica registros.
- [ ] **CA-1-34:** um pedido de exclusão apaga os dados pessoais do contato, das atividades e do histórico de alterações, e reimportar o mesmo e-mail ou o mesmo telefone cai na supressão.
- [ ] **CA-1-35:** contato com e-mail pessoal ou de clínica com CNPJ inativo não fica com canal válido para a cadência.
- [ ] **CA-1-39:** duas clínicas com o mesmo CNPJ raiz ficam em `duplicidade_pendente`, não entram na cadência e só seguem depois da decisão da SDR.
- [ ] **CA-1-40:** mudar um peso do ICP repontua as clínicas não abordadas e mantém a nota e a versão das já abordadas.
- [ ] **CA-1-41:** a SDR aprova uma clínica em revisão com justificativa e ela passa a acionável.

## TDD da SPEC

| ID | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|
| T1 | RED | CA-1-07, CA-1-08 | importar `planilha-a.csv` e depois `planilha-b.csv` (outro arquivo, 3 empresas repetidas e 1 contato já em supressão) | upload das duas pela rota | antes das regras: repetidas duplicadas e contato suprimido ativo (falha esperada) | `05_entregas/fase-1/spec-1-002/t1-red.md` |
| T2 | GREEN | CA-1-07, CA-1-08 | repetir T1 | mesmo | 3 repetidas viram uma; contato suprimido entra com opt-out; reenviar `planilha-a.csv` é recusado pelo hash | `05_entregas/fase-1/spec-1-002/t2-green.md` |
| T3 | GREEN | CA-1-06 | captação de uma UF real com simulação desligada só para CNES e BrasilAPI (APIs públicas, sem envio de mensagem) | `POST /backend/v1/teste/rodar/captacao` | organizações com `fontes` por campo; contagem anotada | `05_entregas/fase-1/spec-1-002/t3.md` |
| T4 | GREEN | CA-1-09, CA-1-35 | pontuar 10 organizações de teste com o ICP de teste | rodar pontuação | nota e fatores gravados; ausência como “sem informação”; e-mail `@gmail.com` e CNPJ inativo sem canal válido | `05_entregas/fase-1/spec-1-002/t4.md` |
| T5 | RED/GREEN | CA-1-40 | 5 clínicas de teste, 2 com envio registrado; mudar um peso | salvar nova versão do ICP | antes da RN-09: todas repontuadas (falha); depois: só as 3 sem envio mudam | `05_entregas/fase-1/spec-1-002/t5.md` |
| T6 | RED/GREEN | CA-1-39 | matriz e filial de teste com o mesmo CNPJ raiz | importar | antes da RN-04: as duas acionáveis (falha); depois: `duplicidade_pendente`; decidir “clínicas diferentes” libera | `05_entregas/fase-1/spec-1-002/t6.md` |
| T7 | GREEN | CA-1-10, CA-1-41 | SDR de teste corrige uma nota e aprova uma clínica em revisão | pela tela | `alteracoes` com autor, antes, depois e motivo; clínica acionável | `05_entregas/fase-1/spec-1-002/t7.md` |
| T8 | RED/GREEN | CA-1-34 | contato de teste com atividade e correção registrada; pedir exclusão; reimportar planilha com o mesmo e-mail e outra com o mesmo telefone | rota de exclusão + uploads | antes da RN-13: dados permanecem (falha); depois: campos vazios, atividades e alterações sem o dado, as duas reimportações caem na supressão | `05_entregas/fase-1/spec-1-002/t8.md` |
| T9 | REFACTOR/REGRESSÃO | CA-1-11 | `simulacao.respostas.brasilapi=429` e depois 200 | rodar captação duas vezes | cursor preservado; nenhuma duplicidade na retomada | `05_entregas/fase-1/spec-1-002/t9-regressao.md` |

**Dados/fixtures:** `05_entregas/fase-1/spec-1-002/fixtures/planilha-a.csv` e `planilha-b.csv`, gerados pelo Maestro com dados fictícios (empresas e pessoas inventadas, e-mails `@clinica-exemplo.invalid`, telefones `+55 86 90000-00NN`), seguindo as colunas do modelo padrão; registros marcados `teste=true` e apagados pela rota de limpeza.
**Caminhos de erro obrigatórios:** CNPJ inválido; CNPJ inativo; coluna faltando; API fora do ar; 429; arquivo repetido; duplicidade possível.

**Evidência exigida:** arquivos acima, sem dados reais de pessoas.

## Teste humano do cliente

- **Origem:** não aplicável nesta SPEC (ciclo completo no CL-007, SPEC-1-007).

## Handoff e operação

- **Como demonstrar:** rodar a captação de uma UF e abrir a fila com notas e motivos.
- **Como operar depois:** a captação roda todo dia; a SDR revisa a fila e as duplicidades.
- **Como monitorar:** falhas de fonte viram `alertas` (SPEC-1-001) e aparecem na caixa.
- **Pendência conhecida:** equipamentos dependem do que a fonte pública devolve.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| c02b4c1d-5d7d-4243-81ca-e9641e67d363 | Importar a planilha do Apollo sem repetir clínicas | Dario | SPEC-1-002 | CA-1-07, CA-1-08 | T1, T2 | `t2-green.md` | SPEC-1-001 com coleções | ☐ |
| c014826a-ea15-471e-b512-7e86ace7ffec | Trazer clínicas de imagem do CNES e da Receita | Dario | SPEC-1-002 | CA-1-06, CA-1-11 | T3, T9 | `t3.md` | Q-04 definida | ☐ |
| 34655984-df24-4fad-93d9-bdbecdc8d5e7 | Mostrar a nota de cada clínica com os motivos | Dario | SPEC-1-002 | CA-1-09, CA-1-35, CA-1-40 | T4, T5 | `t4.md`, `t5.md` | ICP ativo aprovado | ☐ |
| be269875-6ec7-4d3e-93ea-ad9e266d0c55 | Resolver clínicas possivelmente repetidas | Dario | SPEC-1-002 | CA-1-39 | T6 | `t6.md` | importação funcionando | ☐ |
| a1326b8f-c9e4-4737-9670-e0bfb26e56d9 | Deixar a SDR aprovar, corrigir ou descartar clínicas | Dario | SPEC-1-002 | CA-1-10, CA-1-41 | T7 | `t7.md` | fila pontuada | ☐ |
| 1d775cf8-a623-491a-9015-c66d14e78c61 | Atender pedido de exclusão de dados de um contato | Dario | SPEC-1-002 | CA-1-34 | T8 | `t8.md` | contatos importados; `SUPRESSAO_CHAVE` criada | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | painel gerar-specs | v1.1 | duplicidade possível, aprovação pela SDR, contato principal, exclusão completa, supressão por pessoa com HMAC, repontuação provada, fixtures fictícias |
