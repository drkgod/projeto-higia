# AP-2026-10-14-1605 — campo JSON lido com getBool devolve sempre false

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia)
- Task/SPEC: ffe9ee34 · SPEC-1-001
- Sinal: em hooks do PocketBase (goja), `record.getBool('campo')` em um campo `json` devolve `0`/`false` para qualquer valor armazenado, sem erro — as rotas de teste respondiam 403 "só com o modo de teste ligado" mesmo com `modo_teste=true`.
- Evidência: logs da instância (16:11 UTC) mostram as 4 rotas respondendo 403 com modo de teste ligado; após trocar para `JSON.parse(record.getString('campo')) === true` (versão 471668d), todas passaram (200/403 esperados).
- Regra reutilizável: ler campo JSON em hook/migration com `JSON.parse(record.getString('campo')) ?? padrao`, nunca com `getBool`/`getInt`/`getFloat` — eles retornam valor padrão silenciosamente.
- Quando aplicar: qualquer leitura de campo `json` (configuracao.valor, historico, passos, fatores) em hooks ou migrações do Skip Cloud.
- Quando não aplicar: campos bool/number nativos — nesses, os getters tipados são os corretos.
- Confiança: alta — falha observada em produção e corrigida com prova antes/depois na mesma task.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
