# STATUS — Higia Tecnologia

Atualizado: 16/10/2026
Fase atual: 1 — CRM de prospecção rodando o piloto de clínicas de imagem

Progresso: 6 de 36 tasks concluídas (17%). Concluídas: ed14fa15 (13/10), ffe9ee34 (14/10), 65b55cab (14/10), c02b4c1d (14/10), c014826a (14/10), 34655984 (15/10 — pontuação explicável + fila /clinicas + correções pós-revisão do Igor: navegação, enriquecimento Receita (231 com porte/CNAE), UF como sigla, coluna Origem, paginação com seletor, município por nome; versão final 3151f61). Sistema no ar: https://crmhigia-581c7.goskip.app

Próxima ação: análise da task a1326b8f (revisão da SDR — aprovar, corrigir ou descartar clínicas; CA-1-10, CA-1-41; prova T7) quando o Igor pedir. Fila real: 372 em revisão (154 PI com município por nome, 218 da planilha sem UF/CNPJ), 235 descartadas, 0 acionáveis — equipamentos completam nas rodadas diárias (~7 dias).

Em aberto (não bloqueiam a próxima task):
- Questionário: Q-02 (horas da SDR), Q-14 (API de WhatsApp — bloqueia SPEC-1-005) e Q-18 (mínimo de contatos efetivos — bloqueia o painel da SPEC-1-007).
- Campo versao do ICP gravado como 0 (hook icps_create não incrementa) — sem impacto na pontuação (pesos lidos ao vivo); corrigir numa próxima task.
- Senhas provisórias semeadas na migration 0002 (Higia@2026): trocar no primeiro acesso de cada usuário.
- Mapas de municípios por UF na configuração (municipios_22 carregado; CE/MA/SP etc. carregar quando expandir).
