# T9 — GREEN/REGRESSÃO: falha da fonte não perde o ponto de parada nem duplica (CA-1-11)

Data: 2026-10-14 · Task c014826a · versão eb2114f

| # | Ação | Resultado observado | OK |
|---|---|---|---|
| 1 | simulacao.respostas.brasilapi = {"status": 429} | consulta de CNPJ: 30 consultados, 30 adiados, 0 completados, 0 marcados em_revisao | ✔ |
| 2 | Simulação desligada, BrasilAPI real 200 | fila retomada: 59 organizações da importação completadas (razao_social, porte, CNAE, sócios) com fonte 'receita' por campo | ✔ |
| 3 | Sem duplicação | atualização no próprio registro (RN-01); contagem estável (606 orgs no total) | ✔ |
| 4 | Cursor CNES na prática | lote pausado por falha preserva offset (código provado); retomada real do offset 200 sem duplicar (T3 passo 6) | ✔ |

Fila = cursor para o CNPJ: só entram organizações sem razao_social; 429/5xx adia sem marcar; 404 marca em_revisao (cnpj_nao_encontrado). Equipamentos: sem resposta em nenhuma competência = campo vazio ("sem informação", RN-08) — a fonte pública só tem dados para parte dos estabelecimentos.
