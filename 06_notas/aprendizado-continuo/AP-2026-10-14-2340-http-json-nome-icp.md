# AP-2026-10-14-2340 — três armadilhas da captação: bytes no corpo HTTP, campo obrigatório silencioso e ICP imutável

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia) · Task/SPEC: c014826a · SPEC-1-002
- Sinal 1: `$http.send` devolve o corpo em BYTES (`res.body`); `JSON.parse(res.body)` falha silenciosamente (página vazia). Usar `res.json` (já parseado) — provado: 0 páginas → 200 encontrados.
- Sinal 2: erro de linha com motivo genérico esconde a causa real (200 erros "erro ao gravar"). Causa: campo obrigatório `nome` de organizacoes não era gravado na criação pela captação. Ao gravar por hook, conferir required do schema e registrar a mensagem real no relatório.
- Sinal 3: ICP ativo é imutável (RN da SPEC-1-001) — mudar um parametro exige nova versão inativa + ativação com aprovado_por. Feito para uf_prioritaria=22 (PI).
- Evidência: T3 em 3 rodadas (0 criados → 200 erros → 199 criados, 0 erros) nas versões 2f0a4c3/de68824/eb2114f.
- Regra reutilizável: (1) res.json em todo $http.send; (2) conferir campos required do schema antes de criar registro por hook e logar o erro real; (3) parametro de fator do ICP muda por nova versão ativa com aprovação.
- Confiança: alta — antes/depois provado na mesma task.
- Privacidade: sem segredo ou dado pessoal.
