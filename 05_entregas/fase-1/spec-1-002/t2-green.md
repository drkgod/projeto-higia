# T2 — GREEN: importação sem duplicar e com supressão (CA-1-07, CA-1-08)

Data: 2026-10-14 · Task c02b4c1d · SPEC-1-002 · RN-01, RN-02
Provas contra a instância real (versão 80aebce), fixtures fictícias da SPEC (planilha-a/b.csv).

| # | Ação | Resultado observado | Esperado | OK |
|---|---|---|---|---|
| 1 | Importar planilha-a (4 linhas, teste=true) | 200: 4 inseridos, 0 duplicados, 0 rejeitados; lote imp_20261014210136 | inseridos | ✔ |
| 2 | Reenviar o MESMO arquivo | 400 "Este arquivo já foi importado…" — hash recusa | recusado | ✔ |
| 3 | Importar planilha-b (3 repetidas + 1 nova) | 200: 3 duplicados (atualizados, sem criar de novo), 1 inserido, 0 rejeitados | sem duplicidade | ✔ |
| 4 | Contato em supressão (maria@…) | optout_email=true gravado no contato (RN-02) | opt-out | ✔ |
| 5 | Limpeza (teste/limpar) | apagou importações + contatos + organizações de teste | limpo | ✔ |

Correções durante a prova (todas reprovadas): hs256 com argumentos invertidos; campo json fontes lido como string (JSON.parse(getString)); limpeza não incluía contatos/organizacoes.

## Validação com a base real (decisão do Igor)
Importação do CSV real (413 leads do RD Station, mapeamento RD→modelo): **407 inseridos, 6 duplicados, 0 rejeitados** — lote imp_20261014210153, teste=false. Estado: 407 organizações, 405 contatos.
