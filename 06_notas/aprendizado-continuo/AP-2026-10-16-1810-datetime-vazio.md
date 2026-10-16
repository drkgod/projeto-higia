# AP-2026-10-16-1810 — getDateTime de campo vazio e estado inconsistente

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia) · Task/SPEC: b43ce6d9 · SPEC-1-003
- Sinal 1: op.getDateTime('campo_date') com campo vazio devolve valor que new Date(...) não aceita — "RangeError: Invalid time value at toISOString" no hook (log do servidor). Correção: ler com getString e só usar quando preenchida.
- Sinal 2: marcar recusa/optout DEPOIS de uma retomada deixava estado=ativo com motivo_pausa=optout — inconsistente e a reativação passava. Correção: recusa/optout/exclusao sempre forçam estado_contato=pausado e cancelam pendentes de novo.
- Sinal 3: prova de opt-out exige contato principal — o gancho semear não criava contato; criado no gancho.
- Evidência: logs do Skip (request 17:58 com RangeError); T3/T7 verdes após correção (9e1d302).
- Regra reutilizável: (1) campo date opcional lê-se como string e só vira Date quando preenchida; (2) transição de estado de "nunca retoma" deve forçar o estado, não só o motivo; (3) dados de teste de cadência precisam do contato principal.
- Confiança: alta — provado no mesmo ciclo.
- Privacidade: sem segredo.
