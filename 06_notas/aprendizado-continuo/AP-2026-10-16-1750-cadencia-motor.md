# AP-2026-10-16-1750 — VM separada do PocketBase e ids de relação

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia) · Task/SPEC: 1cc6e53d · SPEC-1-003
- Sinal 1: função top-level no arquivo de hook não é visível dentro do callback (cron/router) — a VM do PocketBase executa callbacks em pool separado; QA reprova com "Hook scoping error". Correção: lógica inline no corpo de cada callback (duplicada entre cron e rota de teste).
- Sinal 2: migration com relation usando ids de coleção do TEMPLATE (pbc_2428975121 etc.) falha na validação — os ids são por projeto. Correção: consultar os ids reais (collectionId do registro existente) antes de escrever a migration.
- Evidência: QA 0.0.56 falhou nos dois pontos; 0.0.57 verde com as correções.
- Regra reutilizável: (1) em hooks do Skip, todo corpo de lógica vai inline no callback; (2) em migration, relation usa o collectionId REAL do projeto (obtido da API), nunca o do template.
- Confiança: alta — provado no mesmo ciclo.
- Privacidade: sem segredo.
