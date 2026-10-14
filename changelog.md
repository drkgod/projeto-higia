# Changelog — Higia Tecnologia

## 13/10/2026 — Pacote da fase 1 preparado

- 7 SPECs (v1.1, revisadas por painel) e 36 tasks, com questionário guiado do Maestro na SPEC-1-001.
- Publicado no repositório privado `drkgod/projeto-higia`, com o código do CRM como submódulo em `07-sistemas/CRM_Higia/`.

## 13/10/2026 — Respostas do questionário e decisões do cliente

- Respostas literais registradas em `06_notas/questionario-fase-1.md` (Igor Alves, chat ETHOS).
- DECISÃO DO CLIENTE (validada na autorização da task ed14fa15): Q-01 papéis — Dario e Igor como `admin` (resposta original "admin e gestor" para ambos; o campo aceita um papel e admin inclui gestor); SDR Jesus Vasconcelos (comercial@) como `sdr`.
- DECISÃO DO CLIENTE (validada): Q-15 domínio — resposta literal `higiatec.com.br`; a SPEC pede domínio separado para aquecer; aprovado subdomínio dedicado (outbound.higiatec.com.br).
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

## 14/10/2026 · Jarvis (ETHOS) · Task ffe9ee34 — correção do 1º teste humano

- Teste do Igor na tela de Configuração apontou: sem interruptor para modo de teste e simulação (só exibição); "Pausar" é da operação, não dessas chaves.
- Corrigido na versão 0.0.10 (e645d88, publicada 16:48 UTC): interruptores de modo de teste, simulação e canais na tela; trilha (versão/autor/histórico) gravada pelo servidor via hook configuracao_update; falha adicional corrigida — usuário desativado ainda logava, agora bloqueado pela authRule (migration 0006).
- Provas em 05_entregas/fase-1/spec-1-001/t8-correcao.md (login desativado 403; mudança com versão+autor+histórico; SDR negado). Aprendizado: AP-2026-10-14-1720-authrule-404.md.
- Estado: modo_teste=true restaurado, pausa_geral=false, SDR de teste desativado, 3 usuários reais intactos. Aguardando reteste do Igor.

## 14/10/2026 · Jarvis (ETHOS) · Task ffe9ee34 — correção 2 (tela de Usuários)

- Pergunta do Igor expôs falha: lista de Usuários sem botões de editar/excluir — impossível inativar, trocar papel ou excluir pela tela.
- Corrigido na versão 0.0.11 (57b2875, publicada 17:16 UTC): menu ⋯ por linha com "Editar (papel e status)" e "Excluir" com confirmação; exclusão do próprio usuário oculta na interface; serviço ganhou excluirUsuario.
- Provas por API (t9-usuarios.md): criar → editar papel+inativar → login bloqueado (403) → excluir (204). Usuários reais intactos.

## 14/10/2026 · Jarvis (ETHOS) · Task ffe9ee34 CONCLUÍDA (2/36)

- Teste humano aprovado pelo Igor às 14:59 ("Já testei — aprovar a task"), após 2 correções publicadas (e645d88 interruptores de configuração + login de desativado bloqueado; 57b2875 editar/inativar/excluir usuários).
- Verificação final: versão no ar = 57b2875 (a testada), produção HTTP 200, 4 usuários reais (3 ativos), dados do teste do Igor confirmados (1 produto, 2 ICPs, 1 pipeline, 1 cadência, 1 modelo).
- fase.md: 2 de 36 concluídas (6%). Próxima task 65b55cab (configuração) bloqueada pelo material comercial; c02b4c1d (importação Apollo) é a próxima analisável.
