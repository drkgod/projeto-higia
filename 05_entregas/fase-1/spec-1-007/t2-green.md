# t2-green.md — Prova da SPEC-1-007 (Painel do piloto) — T2 fixture

Data: 20/10/2026 · Executor: Jarvis (ETHOS) · Versão final: 1f5d09d (0.0.106, publicada 19:35 UTC)
Autorização do Igor: "Pode começar" (20/10, chat). Q-18 a Q-21 respondidas pelo Igor no formulário.

## O que foi implementado

- **Rota agregada** `GET /backend/v1/painel` (`pocketbase/hooks/painel.js`): 9 indicadores com
  definição fixa, SEM registros `teste=true` (parâmetro `teste=1` só para admin — teste do
  ciclo). Sem nome/e-mail/telefone — só números agregados. Papéis: gestor/admin veem tudo;
  sdr vê só os próprios números (filtro responsavel). Filtro de pipeline e período (default
  últimos 30 dias).
- **Tela** `/painel` (`src/pages/Painel.tsx`) + service `painel.ts` + card na home: filtros
  de/ate/pipeline, checkbox "mostrar dados de teste" (só admin), cards dos 9 indicadores,
  veredito colorido, linha de base declarada com autor e data.
- **Linha de base (RN-01)** registrada em `configuracao.linha_de_base`: tempo 2 horas por dia
  para montar 100 leads; como: CNES, contatos manuais, lista da empresa; fonte Q-19/Q-20
  respondidas pelo Igor Alves em 21/10/2026; marca "declarado".
- **Q-18**: mínimo = 30 contatos efetivos a cada 100 (config `amostra_minima` = 30).
- **Q-21**: WhatsApp do Igor 86 99493-2757; e-mail do teste ainda não criado (Dario cria no
  serviço novo — task 23/10).

## Provas (contra o backend real, fixture com valores conhecidos)

Fixture: 12 oportunidades não-teste + 3 teste=true, período isolado 2026-10-01 a 2026-10-10
(gancho de teste, removido do projeto após as provas).

- **T2 (CA-1-30) VERDE** — painel sem teste, todos os 9 batem a tabela esperada:
  | Indicador | Esperado | Obtido |
  |---|---|---|
  | Candidatos | 12 | 12 ✓ |
  | Qualificados | 10 | 10 ✓ |
  | Acionáveis trabalhados | 10 | 10 ✓ |
  | Contatados por e-mail | 9 | 9 ✓ |
  | Contatados por WhatsApp | 6 | 6 ✓ |
  | Contatos efetivos | 3 | 3 ✓ |
  | Efetivos a cada 100 | 30 | 30 ✓ |
  | Respostas | 4 | 4 ✓ |
  | Reuniões | 1 | 1 ✓ |
  Com `teste=1` (admin): candidatos sobe para 15 (os 3 de teste entram) ✓ — e sem o parâmetro
  eles ficam fora ✓.
- **T3 (CA-1-32) VERDE** — veredito: com `amostra_minima` 30 e 10 trabalhados →
  "amostra insuficiente" ✓; com `amostra_minima` 10 → "no mínimo ou acima" ✓ (restaurada para 30).
- **T4 (recálculo de contato_efetivo) VERDE** — com `contato_efetivo` sem "decisor": efetivos
  3 → 0 e efetivos_100 → 0 ✓; removida a config de teste, volta ao default e efetivos = 3 ✓.
- **T5 (CA-1-31) VERDE** — linha de base no retorno da rota com autor, data e marca
  "declarado" ✓.

## Limpeza

- Fixture T2 apagada por completo (15 organizações, oportunidades, atividades, envios,
  alterações): painel volta a zeros no período isolado ✓.
- Gancho de teste removido do projeto (0.0.105/0.0.106, manifesto regenerado com 2× apply).
- Nenhum dado de teste restante; fila real intacta.

## Pendências (não bloqueiam o painel)

1. **Teste do ciclo (CL-007)** — Dario e Igor, com a clínica de teste: precisa do e-mail do
   teste (Dario cria no serviço novo) e do WhatsApp do Igor (já registrado). Roteiro na SPEC.
2. **Liberação dos envios reais (RN-03)** — só com teste do ciclo aceito + linha de base
   (ok) + canais ligados (Dario) + cadência/modelos aprovados (Igor, 23/10).
3. **Fechamento (RN-04)** — depois da amostra mínima (30 trabalhados), Igor registra tempo
   depois e veredito em veredito.md.