# Correção 2 do teste humano (14/10) — Usuários: editar, inativar e excluir (versão 57b2875)

Data: 2026-10-14 · Task ffe9ee34 · SPEC-1-001
Origem: pergunta do Igor ("como inativar/ativar, mudar papel, excluir usuário?") — a lista não tinha os botões de ação.

O que foi corrigido (versão 0.0.11, `57b2875`, publicada 17:16 UTC):
1. **Editar** — menu ⋯ na linha → "Editar (papel e status)": nome, papel (admin/gestor/sdr/licitação) e interruptor de ativo.
2. **Excluir** — menu ⋯ → "Excluir" com confirmação; o botão não aparece para o próprio usuário logado (ninguém se exclui por engano).
3. Serviço ganhou `excluirUsuario`.

Provas contra a instância real (feito por API como o Igor):
| # | Ação | Resultado | OK |
|---|---|---|---|
| 1 | Criar usuário de prova | criado | ✔ |
| 2 | Editar papel (sdr → licitação) e inativar | papel e status mudados | ✔ |
| 3 | Login do inativado | 403 — bloqueado | ✔ |
| 4 | Excluir o usuário de prova | 204 — apagado | ✔ |

Estado final: 3 usuários reais ativos (Igor, Dario, Jesus), Danilo Borges inativo, 4 de teste desativados. Nenhum dado real tocado.
