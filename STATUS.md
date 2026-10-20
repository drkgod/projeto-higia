# STATUS — Higia Tecnologia

Atualizado: 20/10/2026
Fase atual: 1 — CRM de prospecção rodando o piloto de clínicas de imagem

Progresso: 13 de 36 tasks concluídas (36%). Concluídas: ed14fa15 (13/10), ffe9ee34 (14/10), 65b55cab (14/10), c02b4c1d (14/10), c014826a (14/10), 34655984 (15/10 — pontuação explicável + fila /clinicas + correções pós-revisão do Igor), a1326b8f (16/10 — revisão da SDR + edição de dados), 2da63fc2 (16/10 — oportunidade na pipeline), 1cc6e53d (16/10 — motor da cadência), b43ce6d9 (16/10 — resposta pausa a cadência), b19368a9 (16/10 — caixa de trabalho da SDR; versão final 6d8d768), 6d68f7ab (20/10 — telas /pipeline com agrupamento por rede, /pipeline/:id Kanban e /oportunidade/:id com histórico; RN-10; migration 0011; teste do Igor aprovado; correção de sessão expirada f4e3ea9; versão final c92d1fd). Sistema no ar: https://crmhigia-581c7.goskip.app

Próxima ação: ligar os canais (segredos/número/SMTP do Dario). WhatsApp (SPEC-1-005) e e-mail (SPEC-1-004): código implementado e provado em modo de teste 20/10 (T1–T6 em 05_entregas/fase-1/spec-1-005/t1.md; T1–T4 em 05_entregas/fase-1/spec-1-004/t1.md; versão 726b246). Decisões registradas: 1 oportunidade por REDE (16/10); Uazapi + subdomínio outbound.higiatec.com.br (20/10, 06_notas/decisao-whatsapp.md). Pendências do Dario: número dedicado + aquecimento, segredos Uazapi, conta do serviço de e-mail + DNS (SPF/DKIM/DMARC) e SMTP do projeto. Fila real: 372 em revisão, 235 descartadas, 0 acionáveis — ao aprovar, a clínica já vira oportunidade aguardando na pipeline.

Em aberto (não bloqueiam a próxima task):
- Nenhuma. Material e bases completos no repositório.
- Convite do Dario ao repositório e acesso dele ao Maestro/projeto Skip.
- Questionário: Q-02 (horas da SDR), Q-14 (API de WhatsApp — bloqueia SPEC-1-005) e Q-18 (mínimo de contatos efetivos — bloqueia o painel da SPEC-1-007).
- Senhas provisórias semeadas na migration 0002 (Higia@2026): trocar no primeiro acesso de cada usuário.
