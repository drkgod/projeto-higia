# AP-2026-10-13-1750 — API do Skip Cloud não roteia pelos domínios públicos do app

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia)
- Task/SPEC: ed14fa15 · SPEC-1-001
- Sinal: as URLs de preview (`--preview.goskip.app`) e de produção (`goskip.app`) do app retornam HTML do frontend em GET e 405 (nginx) em POST para caminhos `/api/*`; a API PocketBase responde em URL própria de backend (`*.shrd00.internal.goskip.dev`, obtida com `skip_cloud_get_backend_url`).
- Evidência: provas T2 de 13/10 — curl contra preview e produção devolveu HTML/405; mesma chamada contra a URL de backend devolveu JSON (400/403/200 esperados).
- Regra reutilizável: para provar regras de coleção/rotas com curl ou SDK fora do app, usar a URL de backend do `skip_cloud_get_backend_url`, não as URLs públicas do app; e conferir que `VITE_POCKETBASE_URL` aponta para ela (o template já usa).
- Quando aplicar: qualquer teste de API, webhook ou prova TDD contra um projeto Skip Cloud.
- Quando não aplicar: teste visual de tela (aí as URLs públicas são as certas).
- Confiança: alta — observado duas vezes na mesma task, com resultado consistente.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
