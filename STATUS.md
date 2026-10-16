# STATUS — Higia Tecnologia

Atualizado: 16/10/2026
Fase atual: 1 — CRM de prospecção rodando o piloto de clínicas de imagem

Progresso: 9 de 36 tasks concluídas (25%). Concluídas: ed14fa15 (13/10), ffe9ee34 (14/10), 65b55cab (14/10), c02b4c1d (14/10), c014826a (14/10), 34655984 (15/10 — pontuação explicável + fila /clinicas + correções pós-revisão do Igor), a1326b8f (16/10 — revisão da SDR + edição de dados), 2da63fc2 (16/10 — oportunidade na pipeline), 1cc6e53d (16/10 — motor da cadência: 11 passos agendados em dias úteis/feriados/janela, idempotente, pausa geral e esgotamento; versão final ec3274b). Sistema no ar: https://crmhigia-581c7.goskip.app

Próxima ação: análise da task b43ce6d9 (parar a cadência quando a clínica responder — SPEC-1-003) quando o Igor pedir. Fila real: 372 em revisão, 235 descartadas, 0 acionáveis — ao aprovar, a clínica vira oportunidade e, ativada, recebe os 11 passos da cadência agendados automaticamente.

Em aberto (não bloqueiam a próxima task):
- Questionário: Q-02 (horas da SDR), Q-14 (API de WhatsApp — bloqueia SPEC-1-005) e Q-18 (mínimo de contatos efetivos — bloqueia o painel da SPEC-1-007).
- Campo versao do ICP gravado como 0 (hook icps_create não incrementa) — sem impacto na pontuação (pesos lidos ao vivo); corrigir numa próxima task.
- Senhas provisórias semeadas na migration 0002 (Higia@2026): trocar no primeiro acesso de cada usuário.
- Mapas de municípios por UF na configuração (municipios_22 carregado; CE/MA/SP etc. carregar quando expandir).
- Nota corrigida pela SDR fica protegida da repontuação (motivo_status=correcao_sdr) até existirem envios (RN-09 completa na SPEC-1-003/004).
- limite_diario_entrada_cadencia criado com 10 (Q-13) — revisar no admin conforme a capacidade da SDR.
- E-mail da SDR Jesus corrigido: maria.jesus@higiatec.com.br (informado pelo Igor 16/10).
