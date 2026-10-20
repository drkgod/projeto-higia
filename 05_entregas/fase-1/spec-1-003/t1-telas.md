# t1-telas.md — Prova T1 da task 6d68f7ab (telas de pipeline e oportunidade)

Data: 20/10/2026 · Executor: Jarvis (ETHOS) · Versão no ar: bd9fd62 (0.0.74, publicada 14:04 UTC)

## Setup
- Migration 0011_datas_historico aplicada: criado_em em atividades; created/updated em oportunidades
  (as coleções nasceram sem campo de data — histórico e listas não tinham ordem confiável).
- Hooks divididos (1 rota por arquivo — regra da plataforma): oportunidade_etapa.js (RN-10) e
  oportunidade_nota.js. Gancho teste_t1_pipeline.js semeou 3 organizações acionáveis (2 da mesma
  rede REDE TESTE T1 LTDA + 1 independente) com 3 oportunidades na pipeline real.
- Usuários de teste reativados (estavam inativos da limpeza anterior); login da SDR de teste OK.

## Resultados (P1–P9, todos verdes)
- P1: SDR moveu a REDE (Centro) Lista de Leads → Tentativa de Contato — 200; atividade sistema
  gravada com etapa_de/etapa_para e autor (RN-10).
- P2: nota da SDR — 200; atividade nota com autor.
- P3: Perdido sem motivo → 400 "Motivo da perda obrigatório".
- P4: Perdido com motivo fora da lista → 400 "Motivo de perda inválido".
- P5: Perdido com motivo válido ("Sem fit") → 200, estado esgotado.
- P6: sair de Perdido → 200, estado ativo (cadência reativa; retomada_em gravado — motor reagenda).
- P7: token inválido → 401 (auth no servidor).
- P8: histórico ordenado por -criado_em com os 4 eventos (criação, nota, movimento, nota).
- P9: estados finais corretos nas 3 oportunidades.

## Telas (capturas verificadas por visão)
- /pipeline — "3 oportunidades · 2 redes"; contagem por etapa; REDE TESTE T1 LTDA com badge
  "2 unidades" e botão "Ver 2 unidades"; botão Quadro por linha.
- /pipeline/:id — Kanban por etapa com cards por rede (badge "2x") e select de etapa no card;
  alternância Quadro/Lista.
- /oportunidade/:id — dados (responsável, cadência v1, rodada, clínica/nota), ações (nota + mover
  etapa com motivo para Perdido) e histórico em abas (Histórico 4 / Envios 0 / Tarefas 0).

## Estado pós-prova
- Dados de teste deixados no ar para o teste visual do Igor (limpeza na conclusão, como na T7).
- Fila real intacta: 372 em revisão, 235 descartadas, 0 acionáveis.

## Aprendizados
- AP-2026-10-20-1400 (em 06_notas/aprendizado-continuo/): rotas de hook acessam-se em
  <backend>/backend/v1/... SEM /api (com /api/... devolve 404 genérico); 1 routerAdd por arquivo
  (arquivo com 2 rotas falha em silêncio); delete de hook exige 2× apply_changes (manifesto
  regenera na segunda).
