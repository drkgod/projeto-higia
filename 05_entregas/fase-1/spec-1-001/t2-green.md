# T2 — GREEN (depois das regras)

Data: 2026-10-13 · Task ed14fa15 · SPEC-1-001 · CA-1-01, CA-1-42
Provas executadas contra a instância real (backend https://crmhigia-581c7.shrd00.internal.goskip.dev/api), versão publicada 4aae7ec.

| # | Ação (do TDD T2) | Resultado observado | Esperado | OK |
|---|---|---|---|---|
| 1 | Anônimo lista `users` | 200, `totalItems: 0` (lista vazia) | nada devolvido | ✔ |
| 2 | Anônimo lista `icps` | 200, `totalItems: 0` | nada devolvido | ✔ |
| 3 | Anônimo cria usuário | **400** "Failed to create record" | negado | ✔ |
| 4 | SDR (comercial@) autentica | token emitido (224 chars) | login ok | ✔ |
| 5 | SDR salva ICP | **400** | negado | ✔ |
| 6 | SDR muda o próprio `papel` para admin | **404** (regra nega a leitura do campo alheio; alteração não acontece) | negado | ✔ |
| 7 | SDR lê `produtos` | **200** | permitido (só leitura) | ✔ |
| 8 | SDR lê `questionario` | 200, `totalItems: 0` (só admin vê; lista vazia) | nada devolvido | ✔ |
| 9 | Admin (igor.alves@) autentica | token emitido | login ok | ✔ |
| 10 | Admin cria usuário de teste `licitacao` | criado (id h2ifsiu7lhumxs0) | permitido | ✔ |
| 11 | `licitacao` lê `organizacoes` | 200, `totalItems: 0` | nada devolvido | ✔ |
| 12 | `licitacao` lê `icps` | 200, `totalItems: 0` | nada devolvido | ✔ |
| 13 | Admin lê `questionário` | **200** | permitido | ✔ |
| 14 | Admin lista usuários | 3 usuários: Dario (admin), Igor (admin), Jesus (sdr) | correto | ✔ |
| 15 | Limpeza: admin apaga usuário de teste | **204**; contagem volta a 3 | removido | ✔ |

## Conclusão

CA-1-01 e CA-1-42 passam: sem login nada é devolvido; cadastro público negado; SDR não salva ICP,
não muda o próprio papel e lê só o que pode; `licitacao` não lê clínicas nem organizações; admin
cria e gerencia usuários. Base de usuários real: dariobcalcada@ (admin), igor.alves@ (admin),
comercial@ (sdr, Jesus Vasconcelos).
