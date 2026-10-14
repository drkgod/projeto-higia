# T7 — REFACTOR/REGRESSÃO: voltar versão e acessos continuam negados (CA-1-02, CA-1-42)

Data: 2026-10-14 · Task ffe9ee34 · SPEC-1-001
Provas contra a instância real.

| # | Ação | Resultado observado | Esperado | OK |
|---|---|---|---|---|
| 1 | Editar conteúdo da versão guardada v1 (nome) | HTTP 400 "A versão guardada não muda. Para alterar o conteúdo, salve uma nova versão ou ative esta." | recusado | ✔ |
| 2 | Reativar v1 (`ativo=true`, gestor) | HTTP 200; v1 ativa de novo | versão anterior ativa | ✔ |
| 3 | SDR tentar salvar ICP (regressão do T2) | HTTP 400 (regra da coleção nega) | negado | ✔ |

Limpeza: rota `/backend/v1/teste/limpar` apagou 2 ICPs, 1 execução e 1 evento de teste e desativou os 4 usuários de teste; os 3 usuários reais (Dario, Igor, Jesus) permanecem ativos e intocados.
