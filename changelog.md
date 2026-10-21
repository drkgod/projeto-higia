# Changelog — Higia Tecnologia

## 13/10/2026 — Pacote da fase 1 preparado

- 7 SPECs (v1.1, revisadas por painel) e 36 tasks, com questionário guiado do Maestro na SPEC-1-001.
- Publicado no repositório privado `drkgod/projeto-higia`, com o código do CRM como submódulo em `07-sistemas/CRM_Higia/`.

## 13/10/2026 — Respostas do questionário e decisões do cliente

- Respostas literais registradas em `06_notas/questionario-fase-1.md` (Igor Alves, chat ETHOS).
- DECISÃO DO CLIENTE (a validar na autorização da task ed14fa15): Q-01 papéis — Dario e Igor como `admin` (resposta: "admin e gestor" para ambos; o campo aceita um papel e admin inclui gestor); SDR Jesus Vasconcelos (comercial@) como `sdr`.
- DECISÃO DO CLIENTE (a validar): Q-15 domínio — resposta literal `higiatec.com.br`; a SPEC pede domínio separado para aquecer; proposta de subdomínio dedicado (outbound.higiatec.com.br).
- Q-17: Igor e Dario triam as licitações — sem usuário dedicado com papel `licitacao` por ora.
- Q-11: "10 dias parados" → `regra_esgotamento` {tipo: dias_sem_resposta, valor: 10}.
- Pendentes: Q-02 (horas da SDR), Q-14 (API de WhatsApp — bloqueia SPEC-1-005), Q-18 (mínimo de contatos efetivos — bloqueia o painel da SPEC-1-007).

## 13/10/2026 · Jarvis (ETHOS) · Task ed14fa15 concluída: usuários e papéis do CRM

- Versão 4aae7ec aplicada e publicada (https://crmhigia-581c7.goskip.app) em 13/10 20:44 UTC; verificação automática verde (versões 0.0.4 6b5a35a e 0.0.5 4aae7ec).
- Migrações 0001 (schema + matriz de acesso, cadastro público desligado) e 0002 (usuários: Dario/Igor admin, Jesus Vasconcelos sdr) aplicadas e confirmadas na instância.
- Login, guardas de rota por papel e área /admin com acesso controlado; provas T1/T2 em 05_entregas/fase-1/spec-1-001/ (t2-green.md: 15 casos contra o backend real, incluindo caminhos de erro).
- Teste humano aprovado pelo Igor (13/10). DECISÃO DO CLIENTE: papéis admin para Dario e Igor e sdr para Jesus (comercial@); subdomínio dedicado outbound.higiatec.com.br para a cadência de e-mail.
- Achado registrado: senha provisória de primeiro acesso semeada na migration 0002 — cada usuário troca no primeiro login; tela de troca de senha fica como melhoria para task futura.

## 14/10/2026 · Jarvis (ETHOS) · Task ffe9ee34 implementada: área de administração do CRM

- Versões 0.0.6 (4aad352) e 0.0.7 (471668d) aplicadas e publicadas (https://crmhigia-581c7.goskip.app) em 14/10 16:10–16:13 UTC; QA verde em ambas (setup/static/build/integrations).
- Migrações 0003 (campos completos das coleções versionadas), 0004 (configuração inicial: modo_teste, simulação, feriados 2026–2027, domínios pessoais) e 0005 (usuários de teste da SPEC) aplicadas.
- 10 hooks: versionamento e aprovação (RN-01/RN-02) em icps/cadencias/modelos, pausa geral e 3 ganchos de teste; 12 telas de administração com menu próprio e serviços dedicados.
- Provas: T3 (ativação sem aprovação recusada 400), T4 (peso mudado como gestor → v2 ativa, v1 guardada), T7 (versão guardada imutável 400; reativação 200; regressão de acesso negada), T6 (t6.png + 6 chamadas de API: SDR 403, execução registrada, pausa com histórico, evento registrado, limpeza completa).
- Correção durante as provas: leitura de campo JSON com getBool devolvia false — corrigido para JSON.parse(getString()) na 471668d (AP-2026-10-14-1605).
- Intermitência de plataforma: o MCP do Skip ficou fora entre ~10:50 e ~13:00 UTC; implementação retomada e concluída após a volta.

## 14/10/2026 · Jarvis (ETHOS) · Task ffe9ee34 — correção 2 (tela de Usuários)

- Pergunta do Igor expôs falha: lista de Usuários sem botões de editar/excluir — impossível inativar, trocar papel ou excluir pela tela.
- Corrigido na versão 0.0.11 (57b2875, publicada 17:16 UTC): menu ⋯ por linha com "Editar (papel e status)" e "Excluir" com confirmação; exclusão do próprio usuário oculta na interface; serviço ganhou excluirUsuario.
- Provas por API (t9-usuarios.md): criar → editar papel+inativar → login bloqueado (403) → excluir (204). Usuários reais intactos.

## 14/10/2026 · Jarvis (ETHOS) · Task ffe9ee34 CONCLUÍDA (2/36)

- Teste humano aprovado pelo Igor às 14:59 ("Já testei — aprovar a task"), após 2 correções publicadas (e645d88 interruptores de configuração + login de desativado bloqueado; 57b2875 editar/inativar/excluir usuários).
- Verificação final: versão no ar = 57b2875 (a testada), produção HTTP 200, 4 usuários reais (3 ativos), dados do teste do Igor confirmados (1 produto, 2 ICPs, 1 pipeline, 1 cadência, 1 modelo).
- fase.md: 2 de 36 concluídas (6%). Próxima task 65b55cab (configuração) bloqueada pelo material comercial; c02b4c1d (importação Apollo) é a próxima analisável.

## 14/10/2026 · Material comercial colocado no projeto (pelo Igor)

- 13 arquivos enviados via interface web do GitHub (MCP não transmite binário — provado com teste controlado; caminho git sem token no sandbox).
- 12 arquivos em 01_documentos/material-comercial/ + 1 na raiz (Como Estruturar seu Modelo de Vendas.pptx) aguardando o Igor mover (delete + re-upload).
- Subtarefa do Dario (2681936e) marcada como concluída; task 65b55cab (configuração guiada) DESBLOQUEADA.
- Leitura antecipada para a configuração: Blueprint (MRR ~R$ 200 mil, ICP PME, 7 dias), Apollo (2 ICPs: clínicas 1–50 funcionários N/NE; hospitais 51–500 nacional), Outbound (cadência mista AIDA, estagnação 10 dias), Sales Planning (funil com etapas/estagnação/motivos de perda), Matriz de Objeções WhatsApp.
- Pendente com o Igor: lista de CNPJs de clientes atuais, planilha de leads (xlsx) e mover o pptx da raiz.

## 14/10/2026 · Jarvis (ETHOS) · Task 65b55cab — configuração APLICADA no CRM (autorizada pelo Igor)

- Igor autorizou às 16:52 ("Aplique como está e se depois precisar faço alterações").
- Aplicado e verificado no CRM (produção): 3 produtos (PACS Apollo corrigido, Higia Report, Telelaudo); pipeline "Pré-vendas Outbound" com 9 etapas e 6 motivos de perda; ICP 01 — Clínicas de Imagem (PME) v1 ativa com 7 fatores (soma 100) e 3 bloqueios; cadência "Cadência Mista PME" v1 ativa com 11 passos D1–D11 ligados aos modelos reais; 10 modelos de mensagem (3 e-mails, 5 WhatsApps, 2 LinkedIns) aprovados; 8 itens no questionário com a fonte de cada decisão.
- Roteiro de ligação: o campo canal só aceita email/whatsapp/linkedin (select do servidor) — o roteiro ficou documentado na proposta e entrará como tarefa da SDR na SPEC-1-003 (caixa de trabalho).
- Limpeza dos resquícios do teste humano: "Clinica Pequenas" (ICP) e "Teste de cadencia" desativados; "Teste de Pipelne" e "PACS apollo com preço diferenciado" ficam para o Igor excluir ou manter.
- Supressão: os 18 CNPJs de clientes ativos (CSV no repo) serão aplicados como bloqueio "já é cliente" na importação (c02b4c1d) — a coleção organizações só aceita escrita por hooks/superuser.
- Pendentes (sem fonte): Q-02 (horas da SDR), Q-14 (API WhatsApp), Q-18 (mínimo contatos/100).

## 14/10/2026 · Jarvis (ETHOS) · Task 65b55cab CONCLUÍDA (3/36)

- Revisão do Igor no admin: "Revisado e ok! pode seguir" (14/10 ~17:05).
- Limpeza autorizada executada: 5 resquícios do teste apagados (pipeline "Teste de Pipelne", modelo "PACS apollo com preço diferenciado", 2 ICPs "Clinica Pequenas", cadência "Teste de cadencia") — todos 204 confirmados.
- Estado final do CRM: 3 produtos, 1 pipeline (9 etapas), 1 ICP ativo (7 fatores, soma 100), 1 cadência ativa (11 passos), 10 modelos aprovados, 8 itens de questionário com fonte.
- Configuração guiada da SPEC-1-001 completa. Próxima task: c02b4c1d (importação do Apollo) — com a base real de 413 leads.

## 14/10/2026 · Jarvis (ETHOS) · Task c02b4c1d CONCLUÍDA (4/36)

- Autorizada às 17:38 ("pode seguir dessa forma pros 2"): segredo SUPRESSAO_CHAVE gerado pelo Jarvis (Dario pode trocar) e importação real dos 413 leads como validação.
- Versões 0.0.13–0.0.17 (4016094, 28f3fb4, 3dea141, 5327907, 80aebce) publicadas; QA verde em todas.
- Migration 0007: campos completos em organizacoes (cnpj_raiz, fontes, sinais_sdr, status, pontuacao etc.) + coleções contatos, alteracoes, supressao com regras da SPEC.
- Rota /backend/v1/importar: hash de arquivo (mesmo arquivo recusado), mapeamento modelo padrão + RD Station/Apollo, RN-01 (duplicado atualiza vazios + fontes), RN-02 (supressão entra com opt-out), relatório em importacoes. Tela /admin/importar com relatório e histórico.
- Provas T2 (t2-green.md): 4 inseridos; reenvio recusado 400; 3 duplicados atualizados + 1 inserido + 0 rejeitados; contato em supressão com optout_email=true; limpeza completa.
- Importação real: 413 leads → 407 inseridos, 6 duplicados, 0 rejeitados (lote imp_20261014210153, teste=false). CRM com 407 organizações e 405 contatos reais.
- Aprendizado: AP-2026-10-14-2100-hs256-json-limpeza.md (hs256 msg-primeiro; json volta como string; limpeza cobre toda coleção nova).

## 14/10/2026 · Jarvis (ETHOS) · Task c014826a CONCLUÍDA (5/36)

- Autorizada às 20:20 ("Autorizar implementação" — Igor Alves), com decisão: equipamentos do CNES buscando até 3 meses para trás; sem resposta em nenhuma competência = "sem informação".
- Versões 0.0.19–0.0.23 (ffb7775, 2f0a4c3, de68824, 12c3d0f, eb2114f) publicadas; QA verde em todas.
- Hook captacao_cnes: rota /backend/v1/captacao/rodar + cron captacao_diaria (10:00 UTC / 07:00 Brasília); pagina o CNES (tipos 39/36/22, limit 20, teto 10 páginas/rodada), cursor em importacoes (retomada sem duplicar), RN-01 (duplicado atualiza vazios + fontes), bloqueios ja_cliente (configuracao.cnpjs_clientes com os 18 CNPJs) e unidade_publica (esfera), fonte por campo, equipamentos com competência retroativa (teto de 30 buscas/rodada, dívida marcada).
- Hook captacao_cnpj: rota /backend/v1/captacao/cnpj + cron captacao_cnpj_diaria (10:20 UTC); BrasilAPI 1 consulta/segundo (teto 30/rodada), completa razão social, porte, CNAE, situação, telefone, e-mail e sócios (contatos papel desconhecido); 404 → em_revisao; 429/5xx adia; fonte por campo.
- Tela /admin/captacao (grupo Operação): dois botões (CNES e CNPJ), resumo da rodada e histórico dos lotes.
- ICP 01 v2 criada e ativada com aprovação registrada (Igor Alves): fator uf_prioritaria com parametro "22" (PI) — a v1 não definia UF e a captação depende dela.
- Correções provadas durante a execução: res.body é bytes (usar res.json); campo nome obrigatório na criação; lógica inline nos callbacks (scoping do PocketBase).
- Provas: T3 (t3.md — 199 organizações captadas da UF 22 com fonte por campo, cursor sem duplicar) e T9 (t9-regressao.md — 429 simulado adia 30 sem perder ponto; retomada real enriqueceu 59 organizações da importação pela Receita).
- Estado do CRM: 606 organizações (407 importação + 199 CNES), 59 enriquecidas pela Receita. Teste humano não se aplica (ciclo completo no CL-007).

## 15/10/2026 · Ideia registrada — navegação pós-login (Igor)

- Pedido: botão para entrar na área de administração após o login, sem digitar /admin na URL.
- Tratamento: fora da task ativa não vira trabalho — ideia guardada em 06_notas/ideia-navegacao-pos-login.md e proposta para entrar na análise da próxima task (34655984), como decisão do cliente: login leva cada papel ao seu lugar (admin/gestor → /admin; demais papéis → suas filas quando entrarem no ar) + botão "Administração" na home para quem tem permissão.

## 15/10/2026 · Jarvis (ETHOS) · Task 34655984 CONCLUÍDA (6/36)

- Autorizada às 11:09 ("Autorizar implementação" — Igor Alves), com decisão: corrigir unidade_publica pela natureza jurídica (1xxx = pública) e reavaliar as 199 captadas.
- Versões 0.0.24–0.0.32 (56db68c…2769b5c) publicadas; QA verde em todas.
- Hook pontuacao.js: rota /backend/v1/pontuacao/rodar + cron pontuacao_diaria (10:40 UTC); fila ordenada por -created (teto 200/rodada); fatores calculados com pesos LIDOS DO ICP ATIVO; bloqueios cnpj_inativo/ja_cliente/unidade_publica (natureza 1xxx); canal válido RN-10 (e-mail fora de dominios_pessoais + CNPJ ativo; WhatsApp celular); status pelas RN-05/06/07; contato principal RN-11. adapta-divida: repontua todas (RN-09 incompleta sem envios).
- Correção no captacao_cnes: não descarta mais pela esfera (campo sujo) — DECISÃO DO CLIENTE.
- Telas /clinicas (fila com nota, status, filtros, busca, paginação, cards no celular) e /clinica/:id (nota fator por fator, dados com fonte por campo, contatos). Service clinicas.ts.
- Navegação pós-login (decisão do Igor 15/10): login leva admin/gestor/licitação → /admin e sdr → /clinicas; home com botões "Clínicas" e "Administração" (só para quem tem permissão).
- Provas: T4 (t4.md — 10/10 casos, incluindo Gmail sem canal válido CA-1-35 e pública pela natureza); T5 (t5.md — peso do ICP v3 repontua, v2 restaurada); T4b (199 captadas reavaliadas: 154 em revisão, 46 descartadas, 0 presas no descarte errado).
- Fila real após a task: 372 em revisão, 235 descartadas, 0 acionáveis (equipamentos completam nas rodadas diárias; sem canal válido por ora — a fila de e-mails da base importa contatos pessoais que não valem como canal).
- Pendência de configuração detectada: campo versao do ICP gravado como 0 (hook icps_create não incrementa) — icp_versao das organizações grava 0; sem impacto na pontuação (pesos lidos ao vivo); corrigir no hook icps_create numa próxima task.

## 15/10/2026 · Jarvis (ETHOS) · Correções de navegação/layout e do enriquecimento (mesma task 34655984)

- Botão "Início" na fila de clínicas (e3262a7) — pedido do Igor (voltava só pelo navegador).
- Contêiner container mx-auto px-4 na fila e no detalhe de clínicas (conteúdo colado na borda — Igor) + botão "Início" no topo do admin (b67cdc3).
- BUG do enriquecimento (Receita/CNPJ), descoberto pelo Igor ao ver notas todas iguais (15/100): o filtro da fila exigia razao_social vazia — as 407 da planilha já têm razão social e NUNCA foram consultadas pela Receita (0 rodadas no histórico). Correções (f627856, 3813099): marcador = fontes sem captacao_receita; fila inclui descartadas por nota_abaixo_do_limiar (notas injustas sem os dados da Receita); cnpj_inativo e ja_cliente ficam fora (bloqueio real). Rodadas de 30 consultas/1s — ~13 rodadas cobrem os 189 CNPJs da planilha; o cron diário (10:20 UTC) continua o resto.

## 15/10/2026 · Jarvis (ETHOS) · Diagnóstico da fila (pergunta do Igor: notas iguais, estados, CNPJ)

- Fila em revisão (372): 154 do CNES PI (nota 15 — só UF soma; equipamentos completam em ~7 dias de rodadas) + 218 da planilha RD sem UF e sem CNPJ (nota 0 — nada soma; só a revisão da SDR preenche).
- Enriquecimento pela Receita: 231 organizações agora com porte/CNAE (231 com porte, 231 com CNAE) — mas a maioria delas está nas descartadas (nota ~20 < limiar 40). 51 ativas estavam descartadas como cnpj_inativo por case (ATIVA vs Ativa) — corrigido e re-consultadas (marcador captacao_receita_v2).
- Correções: filtro da fila do enriquecimento por fonte (não razao_social); mapeamento BrasilAPI (porte objeto/string, cnae_fiscal_descricao); comparações em minúsculas (porte, CNAE, situação); fila da pontuação reavalia descartadas por nota baixa e cnpj_inativo; sort -updated.
- Estados: captação configurada para UF 22 (PI) por decisão do ICP v2; outros estados = nova versão do ICP.
- Versões 0.0.36–0.0.39 (f627856…f03cc8d), publicadas.

## 16/10/2026 · Jarvis (ETHOS) · Task a1326b8f CONCLUÍDA (7/36)

- Autorizada às 09:02 ("entao vamos pra frente" — Igor Alves).
- Versões 0.0.48–0.0.49 (bc63391, 0ae88a5) publicadas; QA verde em ambas.
- Hook revisao_sdr.js: rota POST /backend/v1/clinicas/{id}/acao (papel sdr/admin/gestor) com ações aprovar (RN-12: exige CNPJ ativo + canal válido + justificativa; duplicidade pendente não aprova), corrigir_nota (CA-1-10: 0–100 + justificativa; motivo_status=correcao_sdr protege da repontuação), descartar/reabrir (RN-07 com motivo), sinais (linkedin_decisor, instagram_ativo) e contato_principal (RN-11: só contato com canal válido). Toda ação grava em alteracoes (RN-14) — a coleção continua com escrita restrita a admin (gravação feita pelo servidor).
- Tela /clinica/:id: painel de Revisão (aprovar, corrigir nota, descartar/reabrir, sinais com checkboxes, contato principal com select) + Histórico da clínica (últimas 10 alterações com autor, antes→depois, motivo); badge "principal" no contato escolhido; ações só para sdr/admin/gestor.
- Gancho teste/semear/t7 para a prova.
- Prova T7 (t7.md): correção de nota 15→72 com justificativa em alteracoes; sinais gravados; aprovação sem justificativa bloqueada (400); aprovação com justificativa → acionavel; descartar acionável bloqueado (400). Limpeza executada; fila real intacta (372/0/235).
- adapta-divida: exceção da RN-09 (nota corrigida pela SDR não é repontuada) até existirem envios/atividades.

## 16/10/2026 · Jarvis (ETHOS) · Complemento da a1326b8f: edição de dados no painel de revisão

- Autorizado pelo Igor 11:40 ("Autorizo") — caso de uso: clínica conhecida com tomógrafo que o CNES não registrou.
- Versão b30e4fc (0.0.50) publicada; QA verde.
- Ação `editar_dados` na rota de revisão: CNPJ (consulta BrasilAPI na hora e completa razão social, porte, CNAE, situação, município/UF e e-mail — recusa CNPJ duplicado com o nome da clínica dona e não inventa dado se a Receita recusar), equipamentos (lista substituída com fonte "informado_sdr"), e-mail/telefone/site da empresa. Repontua na hora com o ICP ativo; cada mudança grava em alteracoes (RN-14).
- Proteção: organizações com fonte informado_sdr ficam FORA da fila da repontuação diária (a SDR editou — a rodada automática não sobrescreve).
- Provas (t7.md complemento): equipamentos 15→80; CNPJ duplicado recusado com nome da clínica; CNPJ inválido não inventa dado; CNPJ real completa na hora e repontua 80→90 (porte ME); rodada diária mantém 90.
- Tela /clinica/:id: seção "Editar dados da clínica" com CNPJ, e-mail, telefone, site, equipamentos (um por linha) e justificativa obrigatória.

## 16/10/2026 · Jarvis (ETHOS) · Task 2da63fc2 CONCLUÍDA (8/36)

- Autorizada às 13:54 ("autorizo" — Igor Alves) com o e-mail da SDR: maria.jesus@higiatec.com.br (corrigido no cadastro via gancho — o registro semeado estava sem e-mail e o PATCH via API recusa).
- Versões 0.0.53–0.0.55 (82c1ace, 075afe2, 879cb9d) publicadas; QA verde.
- Migration 0008: coleções oportunidades (índice único parcial: uma ativa por organização) e atividades (provedor_id único); regras: sdr vê/edita as suas, admin/gestor tudo, licitacao nada; criação só por hooks/admin.
- Criação automática (RN-01): ao virar acionável (pontuação OU aprovação da SDR), cria oportunidade na pipeline do ICP (etapa "Lista de Leads"), responsável = primeira SDR ativa não-teste, contato principal, cadência ativa + versão, estado_contato=aguardando, rodada 1; idempotente; atividade sistema registra (RN-10).
- Fila de entrada (RN-02): cron fila_entrada_diaria 0 10 * * 1-5 (07:00 Brasília, dias úteis; feriado pela lista); ativa aguardando por ordem de nota até limite_diario_entrada_cadencia (padrão 10 da Q-13 com alerta se ausente); rota de teste /backend/v1/teste/fila-entrada.
- Provas T9 (t9.md): 30 acionáveis → 10 ativas por nota (100→82), 20 aguardando; T9b: aprovação cria oportunidade com campos corretos + atividade sistema; idempotência provada (1 oportunidade por organização).
- Limpeza executada (31 orgs, 31 oportunidades, atividades). Fila real intacta.

## 16/10/2026 · Jarvis (ETHOS) · Task 1cc6e53d CONCLUÍDA (9/36)

- Autorizada às 14:38 ("pode" — Igor Alves) após a análise do motor da cadência.
- Versões 0.0.56–0.0.58 (13c7431, 44bc592, ec3274b) publicadas; QA verde.
- Migration 0009: coleções envios (chave de idempotência única oportunidade:passo:canal:rodada) e tarefas; regras: SDR vê as suas, admin/gestor tudo, escrita por hooks/admin.
- Hook cadencia_motor: cron a cada 15 min (UTC); para cada oportunidade ativo agenda os passos da cadência ativa — passo auto → envios agendado, passo tarefa → tarefas aberta com mensagem_sugerida do modelo; D1 no próprio dia se dentro da janela (08h–18h América/Sao_Paulo), Dn = n-ésimo dia útil pulando fim de semana e feriados; RN-06 esgotamento (dias_sem_resposta → esgotado, etapa perdido com motivo, pendentes cancelados); pausa_geral=true não agenda nada novo.
- Rota de teste /backend/v1/teste/rodar/cadencia (admin + modo_teste) com data_base e cadencia_id opcionais.
- Provas: T1 (t1.md — 11 passos nas datas certas; T1b feriado 19/10 pulado: D2 19/10→20/10, D11 30/10→03/11), T4 (t4.md — 2ª rodada 0 novos), T6 (t6.md — pausa não agenda, nada vencido sai em lote). Limpeza executada; fila real intacta (372 em revisão, 0 acionável, 235 descartado).
- Aprendizado: AP-2026-10-16-1750-cadencia-motor.md (VM separada do PocketBase: função top-level não visível em callback — lógica inline; ids de coleção de relação devem ser os reais do projeto, não os do template).
- 16/10/2026 · Jarvis (ETHOS) · Task 1cc6e53d concluída (teste humano não aplicável pela SPEC; ciclo completo no CL-007).

## 16/10/2026 · Jarvis (ETHOS) · Task b43ce6d9 CONCLUÍDA (10/36)

- Autorizada às 14:57 ("pode" — Igor Alves) após a análise da pausa por resposta.
- Versões 0.0.59–0.0.61 (388acd5, c4193d2, 9e1d302) publicadas; QA verde.
- Migration 0010: campo retomada_em (date) em oportunidades (aditiva).
- Hook resposta_entrada: rota atividade-entrada (RN-04: pausa, cancela agendado/enviando de todos os canais, tarefa resposta 1×), rota resposta/{id}/tipo (RN-08: interesse/retorno_pedido → tarefa retorno D+1; recusa/optout → RN-05 opt-out no contato + HMAC em supressao + pausado para sempre; exclusao → alerta exclusao_pedida; resposta_automatica → RN-07 rodada+1, ativo, retomada_em), rota oportunidade/{id}/reativar (RN-07 pela SDR com justificativa; recusa/optout/exclusao nunca retoma).
- Motor (cadencia_motor): base de datas passa a usar retomada_em quando preenchida (reagenda passos restantes da nova rodada mantendo intervalos).
- Correções durante a prova: getDateTime de campo vazio quebrava new Date (ler string); recusa/optout/exclusao forçam pausado e cancelam pendentes mesmo após retomada; gancho semear cria contato principal de teste (opt-out precisa de contato).
- Provas: t2.md (resposta pausa, 8/8 cancelados, tarefa, motor não agenda, idempotência), t3.md (optout + supressão HMAC + reativação recusada), t7.md (resposta automática retoma rodada 2 com reagendamento; recusa nunca retoma), t10-regressao.md (T1/T2 repetidos). Limpeza executada; fila real intacta.
- Aprendizado: AP-2026-10-16-1810-datetime-vazio.md.
- 16/10/2026 · Jarvis (ETHOS) · Task b43ce6d9 concluída (teste humano não aplicável pela SPEC; ciclo completo no CL-007).

## 16/10/2026 · Jarvis (ETHOS) · Task b19368a9 CONCLUÍDA (11/36)

- Autorizada às 15:18 ("pode" — Igor Alves).
- Versões 0.0.62–0.0.65 (ac20a44, 11ad150, 073bb11, f5fb573) publicadas; QA verde.
- Tela /caixa (Caixa.tsx) + service caixa.ts + card "Caixa de trabalho" na home; rota em App.tsx (Guard sem exigeAdmin — sdr/admin/gestor).
- Hook caixa.js: rotas POST /backend/v1/ligacao (RN-09, categoria obrigatória), /tarefa/{id}/concluir, /alerta/{id}/resolver (só admin/gestor). Gancho teste_caixa.js (atribuir responsável p/ prova T5).
- Corrigido (bug preexistente): alerta de exclusão gravava com campos inexistentes — usa mensagem/responsavel/status.
- Corrigido: motor da cadência lia modelo.conteudo; campo real é modelo.corpo — tarefas de LinkedIn agora com a mensagem do modelo aprovado.
- Provas: t5.md (duas SDRs veem só a própria carteira, na ordem; admin/gestor + alertas), t8.md (ligação sem categoria 400; com categoria grava + feita; LinkedIn com mensagem do modelo). Limpeza executada; fila real intacta.
- Aprendizado: AP-2026-10-16-1830-caixa-alerta-modelo.md.
- 16/10/2026 · Jarvis (ETHOS) · Corrigido no teste da caixa: card Clínicas duplicado na home (0b77a68); caixa não carregava ao abrir (faltava useEffect), sem botão Início e botão de Administração com cor diferente — corrigidos (d7f6adf).
- 16/10/2026 · Jarvis (ETHOS) · Corrigido erro "Não foi possível carregar a caixa": a consulta de atividades usava sort por campo inexistente (created) — o servidor recusava (400). Removido o sort (7763206).
- 16/10/2026 · Jarvis (ETHOS) · Melhoria do teste: abrir a clínica pela caixa e voltar agora retorna à caixa (não à fila). Botão de volta usa o lugar de origem (6d8d768).
- 16/10/2026 · Jarvis (ETHOS) · Task b19368a9 CONCLUÍDA (12/36): teste humano aprovado pelo Igor (caixa carrega, volta para a caixa funciona). Versão final 6d8d768.
- 16/10/2026 · Jarvis (ETHOS) · DECISÃO DO CLIENTE: 1 oportunidade por rede (mesma razão social), não por unidade — grupos de clínicas (ex.: Bioanálise/Sabin, 17 unidades) entram como um cliente só na pipeline.

## 20/10/2026 · Jarvis (ETHOS) · Task 6d68f7ab IMPLEMENTADA (13/36) — telas de pipeline e oportunidade

- Autorizada pelo Igor às 10:47 ("Autorizar implementação da 6d68f7ab").
- Versões 0.0.70–0.0.74 (093515a…bd9fd62) publicadas; QA verde (0.0.71+; 0.0.70 falhou por colisão de nome Pipelines admin/tela — corrigido com alias).
- Migration 0011_datas_historico: criado_em em atividades + created/updated em oportunidades (coleções sem campo de data — histórico e listas sem ordem).
- Tela /pipeline: pipelines privadas com contagem por etapa e AGRUPAMENTO POR REDE (decisão do Igor 16/10) — "3 oportunidades · 2 redes", badge de unidades, expandir unidades.
- Tela /pipeline/:id: quadro Kanban por etapa com cards por rede e select de etapa; alternância Quadro/Lista; Perdido exige motivo da lista da pipeline.
- Tela /oportunidade/:id: dados, ações (nota + mover etapa) e histórico completo em abas (atividades com etapa_de/etapa_para, envios, tarefas).
- Hooks: oportunidade_etapa.js (RN-10: valida etapa na pipeline, Perdido exige motivo, esgota cadência e cancela envios; sair de Perdido reativa com retomada_em) e oportunidade_nota.js — 1 rota por arquivo (regra da plataforma).
- Card "Pipelines" na home; caixa linka respostas e tarefas para a oportunidade.
- Prova T1 (t1-telas.md): P1–P9 verdes por API; telas capturadas e verificadas por visão. Dados de teste no ar (limpeza na conclusão). Fila real intacta.
- Aprendizado: AP-2026-10-20-1400 (rotas sem /api; 1 routerAdd por arquivo; delete de hook exige 2× apply).

## 20/10/2026 · Jarvis (ETHOS) · Task 6d68f7ab CONCLUÍDA (13/36)

- Teste visual do Igor aprovado ("Está funcional a tela"); decisão: identidade visual fica para task própria (design depois).
- Correção pós-teste (f4e3ea9): sessão expirada não aparece mais como "nenhuma pipeline" — o serviço detecta 401/403, limpa a sessão e pede relogin.
- Limpeza executada (c92d1fd): 3 organizações, 3 oportunidades e 13 atividades de teste apagadas; 5 usuários de teste desativados; gancho teste_t1_pipeline.js removido; teste/limpar agora cobre oportunidades, atividades, envios e tarefas.
- fase.md marcado como concluída; prova em 05_entregas/fase-1/spec-1-003/t1-telas.md.

## 20/10/2026 · Jarvis (ETHOS) · Decisões Q-14 e Q-15 registradas

- Igor decidiu: WhatsApp via **Uazapi** (risco de banimento em contato frio aceito; mitigação = número dedicado + aquecimento) e e-mails pelo subdomínio dedicado **outbound.higiatec.com.br**.
- Q-14 marcada concluída no fase.md (13/36 → incluída; decisão em 06_notas/decisao-whatsapp.md); SPEC-1-005 destravada para implementação.
- Q-15 resolvida (subdomínio); falta serviço de e-mail, DNS e segredos — tarefas do Dario (23/10).
- Pendências do Dario listadas em 06_notas/decisao-whatsapp.md (número, token, webhook, DNS, segredos, aquecimento).

## 20/10/2026 · Jarvis (ETHOS) · SPEC-1-005 implementada (código pronto, canal pendente)

- Autorizado pelo Igor ("autorizo") após a decisão Q-14 (Uazapi).
- Remetente (cron 15 min): envios `agendado` do canal whatsapp vencidos → conferência de envio (inline) → Uazapi (`/chat/send/text`, Bearer) com modelo aprovado e variáveis; enviado/falhou (3 tentativas) com atividade de saída e provedor_id; sem credenciais não processa nada; alerta `silencio_webhook` (saída há 24h+ sem entrada).
- Webhook de entrada `POST /backend/v1/whatsapp/uazapi` (SEM /api): eco ignorado; SAIR → RN-05 (opt-out + HMAC `$security.hs256` na supressão, nunca retoma); "não temo whatsapp" → `whatsapp_invalido` + tarefa; resposta → RN-04 (pausa, cancela os dois canais, tarefa resposta). Verificação opcional X-Webhook-Secret.
- Provas T1–T6 contra o backend real (t1.md) — todas verdes; HMAC corrigido na prova (API certa: `$security.hs256(valor, chave)`).
- Limpeza executada; gancho de teste removido. Versão final 4779a2b (0.0.82).
- Pendências do Dario para ligar: número dedicado + aquecimento; segredos UAZAPI_TOKEN/UAZAPI_URL (e WHATSAPP_WEBHOOK_SEGREDO opcional); webhook da Uazapi → <backend>/backend/v1/whatsapp/uazapi; `limite_diario_whatsapp` (default 50) e `destinatarios_permitidos` em modo de teste; ligar `canal_whatsapp_ativo` só após teste de entrega.

## 20/10/2026 · Jarvis (ETHOS) · SPEC-1-004 implementada (código pronto, canal pendente)

- Autorizado pelo Igor ("pode seguir") após a decisão do domínio (outbound.higiatec.com.br).
- Remetente (cron 15 min): envios `agendado` do canal email vencidos → conferência de envio (inline) → envio com modelo aprovado via $app.newMailClient() (SMTP do projeto); assunto+corpo com variáveis; enviado/falhou (3 tentativas) com atividade de saída; sem SMTP não processa nada (log sem_smtp_configurado); alerta silencio_webhook.
- Webhook de entrada `POST /backend/v1/email/entrada` (SEM /api): resposta → RN-04 (pausa, cancela os dois canais, tarefa); descadastro → RN-05 (optout_email + HMAC na supressão, nunca retoma); bounce → email_invalido + tarefa. Verificação opcional X-Webhook-Secret.
- Provas T1–T4 contra o backend real (t1.md) — todas verdes.
- Limpeza executada; gancho de teste removido. Versão final 726b246 (0.0.85).
- Pendências do Dario para ligar: conta do serviço de e-mail + DNS do subdomínio (SPF/DKIM/DMARC), SMTP do projeto, webhook do serviço → <backend>/backend/v1/email/entrada, limite_diario_email (default 50), ligar canal_email_ativo só após teste de entrega.

## 20/10/2026 · Jarvis (ETHOS) · SPEC-1-006 CONCLUÍDA (14/36, 15/36, 16/36)

- Autorizada pelo Igor ("autorizo"). Q-16 decidida pelo Igor (06_notas/decisao-q16-filtro-pncp.md): palavras PACS/RIS/telerradiologia/radiologia/raio-x/tomografia/ultrassonografia/mamógrafo/laudo; modalidades 6,4,7,5 (dispensa nunca); UFs todas.
- Migration 0012 oportunidades_publicas; hook pncp_consulta (cron 10:00 UTC, cursor em importacoes com campos reais estado/cursor, 429/204, RN-01..05); hook pncp_triagem (RN-06); tela /publico + card na home.
- Provas T1–T6 verdes (t1.md): 14 oportunidades reais de 14/10 (incluindo PI ultrassonografia); idempotência (criadas:0 na 2ª consulta); falha real com cursor+alerta; triagem com motivo obrigatório; filtro sem match não cria; lista vazia não roda + alerta.
- Aprendizado: build falho (0.0.88) não regenera o manifesto de hooks — rota nova dava 404 até tocar o arquivo e reaplicar (0.0.91/0.0.92). Versão final 3de24ba.

## 20/10/2026 · Jarvis (ETHOS) · SPEC-1-007 implementada (painel no ar; teste do ciclo pendente)

- Autorizado pelo Igor ("Pode começar"). Q-18 a Q-21 respondidas no formulário: mínimo 30 efetivos/100 (Q-18); linha de base 2h/dia via CNES+contatos manuais+lista da empresa (Q-19/Q-20); teste do ciclo com WhatsApp do Igor 86 99493-2757 e e-mail a criar pelo Dario (Q-21).
- Rota agregada GET /backend/v1/painel (9 indicadores com definição fixa, sem registros teste=true; teste=1 só admin; sdr vê só os próprios números) + tela /painel + card na home.
- Linha de base registrada (RN-01) em configuracao.linha_de_base com autor, data e marca "declarado"; amostra_minima=30.
- Provas T2/T3/T4/T5 verdes (t2-green.md): fixture com 12+3 oportunidades bateu os 9 indicadores esperados (12/10/10/9/6/3/30/4/1); veredito "amostra insuficiente" com 30 e "no mínimo ou acima" com 10; recálculo de contato_efetivo provado; linha de base no retorno. Fixture e gancho de teste removidos.
- Versão final 1f5d09d (0.0.106). Pendências: teste do ciclo (CL-007, Dario+Igor), liberação dos envios reais (RN-03), fechamento com veredito (RN-04).

## 21/10/2026 · Jarvis (ETHOS) · Correções pós-demo e melhorias da tela de aprovação

- Demo à Jesus expôs fricções: aprovar travava sem explicação (RN-12: CNPJ ativo + canal válido) e "Nenhum dado mudou" ao salvar era a tela não recarregar.
- d3df272: painel de requisitos da aprovação ao vivo (✓/○), feedback do que mudou ao salvar (mudancas_detalhe) e filtros na caixa de trabalho (seções com contadores + busca).
- 5c93a9e: edição em card dedicado (botão "Editar informações" + estado "✓ Informações salvas"), erro de aprovação lista TODOS os requisitos faltantes numa mensagem só, ação voltar_revisao (acionável → em revisão, cancela oportunidade aguardando).
- Chagas Aragão restaurada para a demo (em_revisao, nota 72, sem CNPJ). Fluxo completo provado depois: CNPJ + equipamentos + e-mail → aprovar → acionável → oportunidade criada.
- 12:04 bug da pipeline vazia corrigido (c36e8db): oportunidade gravava o NOME da pipeline (vinha do ICP) em vez do ID — registro da Chagas corrigido e hook resolve nome → id na criação.

## 21/10/2026 · Jarvis (ETHOS) · E-mail no ar (tarefa do Dario cumprida com 2 dias de folga)

- DNS do outbound.higiatec.com.br configurado na HostGator (3 registros; DKIM corrigido para resend._domainkey.outbound) — domínio Verified na Resend.
- SMTP do projeto configurado no Skip (smtp.resend.com porta 465 — 587 dava erro de TLS) com remetente prospeccao@outbound.higiatec.com.br e reply-to comercial@.
- Webhook /backend/v1/email/entrada mapeado para os eventos nativos da Resend (bounced/complained → bounce; delivered → ignora).
- Teste de entrega completo nos 2 sentidos provado: e-mail chegou no Igor e resposta capturada pelo webhook pausou a cadência (RN-04) e criou tarefa para a SDR. Canal desligado de volta; gancho teste_entrega_email.js fica para remover na próxima rodada (2× apply).
- Decisão do Igor sobre a chave da Resend exposta no chat: NÃO rotacionar (nova chave também seria exposta — loop); mitigação real = escopo "Sending access" + domínio dedicado.

## 21/10/2026 · Jarvis (ETHOS) · Melhorias de navegação (67332f5)

- Botão "Abrir clínica" na tela da oportunidade (leva ao painel de edição da clínica; volta para onde veio).
- Aviso azul "clínica na cadência" no bloco de edição: os envios agendados leem os dados na hora de enviar — cadastrar canal agora já resolve o próximo passo.

## 21/10/2026 · Jarvis (ETHOS) · Emenda ENTRADA MANUAL concluída (autorizada pelo Igor)

- Caso de uso: pessoa que JÁ procurou a Higia e teve reunião (entrada quente) — não faz sentido passar por cadência fria de SDR.
- Migration 0013: campo select `origem` ('cadencia' | 'manual') em organizacoes e oportunidades.
- Rota POST /backend/v1/pipeline/{pipelineId}/entrada-manual: só admin/gestor; nome + justificativa obrigatórios; dedupe por CNPJ ou nome exato (1ª versão dedupe nome+uf criava dupla — corrigido); clínica nasce acionavel/motivo entrada_manual/pontuacao 0; oportunidade nasce estado ativo SEM cadencia, fora do ICP, responsável = quem criou; contato opcional (fonte manual, confiança alta); auditoria em alteracoes + atividades.
- Botão "Adicionar oportunidade" no quadro da pipeline (só admin/gestor) com formulário completo.
- Proteções: pontuacao.js pula origem=manual (rota E cron — provado: 198 repontuadas sem tocar a manual); cadencia_motor e fila de entrada filtram origem != 'manual'.
- Provas em produção: criação 200 com etapa escolhida; 0 envios; idempotência 400; SDR bloqueado; dados de prova apagados (0 sobras). Versão final c933f32 (0.0.124).
- Aprendizado: delete de organizacao é só superuser — limpeza de prova exige gancho temporário server-side (criar, rodar, remover 2× apply; slug não começa com ponto).

## 21/10/2026 · Jarvis (ETHOS) · LinkedIn + observações na oportunidade (438cbc0, 0.0.126)

- Pedido do Igor: sem onde registrar o que acontece com o cliente e sem o texto do LinkedIn pronto.
- Rota POST /backend/v1/tarefa/{id}/linkedin: grava atividade tipo=linkedin (saída) com o texto enviado (padrão: mensagem_sugerida da tarefa) e conclui a tarefa; sdr só na própria carteira.
- Botão "Registrar LinkedIn" com modal de texto copiável: na CAIXA (substitui "Concluir" para tipo linkedin) e na aba Tarefas da oportunidade (tarefas agora mostram a mensagem_sugerida).
- Campo "Observação — o que está acontecendo" no card Ações da oportunidade (grava via rota nota, com autor e data no histórico) — vale para oportunidade manual E de cadência.
- Provas: rota responde (404 com id inválido), 2 tarefas LinkedIn abertas da Chagas Aragão com mensagem_sugerida pronta (D1/D3). Erro de build no caminho corrigido (fechamento duplicado do componente).
- Pendência menor: o texto exibido traz a variável {{primeiro_nome}} — resolver no display é meia hora, na próxima rodada se o Igor quiser.
