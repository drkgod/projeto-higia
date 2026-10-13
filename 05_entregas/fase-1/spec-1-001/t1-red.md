# T1 — RED (estado antes das regras)

Data: 2026-10-13 · Task ed14fa15 · SPEC-1-001 · CA-1-01, CA-1-42

## Teste de mesa contra o código atual (Skip 3f5ed1d, template)

| # | Ação (do TDD T1) | Estado atual | Resultado |
|---|---|---|---|
| 1 | Como `sdr`, abrir `/admin/icps` | Não existe rota `/admin/icps` — a área toda não existe | Falha do produto (área inexistente) |
| 2 | Como `sdr`, salvar ICP | Coleção `icps` não existe | Falha do produto |
| 3 | Como `sdr`, mudar o próprio `papel` | Campo `papel` não existe em `users` | Falha do produto |
| 4 | Sem login, listar `organizacoes` | Coleção `organizacoes` não existe | Falha do produto |
| 5 | Sem login, criar usuário | `users.createRule = ""` (público) | **Falha de segurança**: qualquer um cria conta |
| 6 | Sem login, listar coleções de negócio | Coleções não existem | Falha do produto |

## Conclusão

O estado atual não passa em CA-1-01 nem em CA-1-42: não há papéis, não há guarda de área de
administração e o cadastro de usuário é público (createRule `""` no `users`). RED registrado.
A implementação (migration 0001 + telas de login e guardas) transforma isto em GREEN.
