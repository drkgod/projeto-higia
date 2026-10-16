# STATUS — Higia Tecnologia

Atualizado: 16/10/2026
Fase atual: 1 — CRM de prospecção rodando o piloto de clínicas de imagem

Progresso: 7 de 36 tasks concluídas (19%). Concluídas: ed14fa15 (13/10), ffe9ee34 (14/10), 65b55cab (14/10), c02b4c1d (14/10), c014826a (14/10), 34655984 (15/10 — pontuação explicável + fila /clinicas + correções pós-revisão do Igor), a1326b8f (16/10 — revisão da SDR: aprovar, corrigir nota, descartar/reabrir, sinais, contato principal, histórico; versão final 0ae88a5). Sistema no ar: https://crmhigia-581c7.goskip.app

Próxima ação: análise da task 2da63fc2 (criar a oportunidade quando a clínica for aprovada — SPEC-1-003) quando o Igor pedir. Fila real: 372 em revisão, 235 descartadas, 0 acionáveis — a revisão da SDR agora pode aprovar clínicas com canal válido direto no detalhe.

Em aberto (não bloqueiam a próxima task):
- Questionário: Q-02 (horas da SDR), Q-14 (API de WhatsApp — bloqueia SPEC-1-005) e Q-18 (mínimo de contatos efetivos — bloqueia o painel da SPEC-1-007).
- Campo versao do ICP gravado como 0 (hook icps_create não incrementa) — sem impacto na pontuação (pesos lidos ao vivo); corrigir numa próxima task.
- Senhas provisórias semeadas na migration 0002 (Higia@2026): trocar no primeiro acesso de cada usuário.
- Mapas de municípios por UF na configuração (municipios_22 carregado; CE/MA/SP etc. carregar quando expandir).
- Nota corrigida pela SDR fica protegida da repontuação (motivo_status=correcao_sdr) até existirem envios (RN-09 completa na SPEC-1-003/004).
