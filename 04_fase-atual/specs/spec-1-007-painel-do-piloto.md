# SPEC-1-007 — Painel do piloto, linha de base, teste do ciclo e veredito

**Fase:** 1
**Status:** planejada (v1.1, revisada pelo painel)
**Dono:** Igor Alves (meta, leitura e veredito), Dario Calçada (construção e liberação), com o Maestro
**Origem no escopo:** fase 1, capacidade 11; D-04; RQ-014; CL-007
**Degrau da solução:** recurso nativo da plataforma — rota agregada e tela no próprio Skip sobre as coleções do CRM.

## Contexto e decisões fechadas

- **Estado atual:** a Higia não acompanha indicadores (DMO). No kickoff, de 100 leads a SDR aproveita 5 a 10, e a meta é 30 a 40; a SDR gasta cerca de 2 horas por dia montando lista.
- **Estado desejado:** um painel mostra o piloto com definições fixas, ao lado da linha de base e do mínimo da Higia; o ciclo é testado por Dario e Igor; os envios reais só começam depois disso; no fim, o Igor registra o veredito do público.
- **Decisões já fechadas:**
  - Linha de base = como a SDR trabalha hoje, declarada no questionário (Q-19 e Q-20) e registrada pelo Igor antes de liberar os envios reais.
  - Indicadores do piloto são calculados das coleções; só a linha de base e o “tempo depois” são declarados, e o painel mostra quais são declarados.
  - Registros `teste=true` nunca entram nos números.
  - O mínimo, a amostra e a definição de contato efetivo vêm do questionário (Q-18) e são versionados com data.
  - Abaixo do mínimo, com amostra suficiente, o Igor escolhe outro público e o ICP é trocado pelo admin, sem código.
- **Bloqueios:** Q-18 a Q-21 definidas.

## Resultado observável

O Igor abre o painel e vê, por pipeline e período, os nove indicadores ao lado da linha de base e do mínimo. Dario e Igor fazem o teste do ciclo com uma clínica de teste e, aprovado, os envios reais começam. Depois de 100 leads trabalhados, o Igor registra se mantém ou troca o público.

## Limites e dependências

- **Inclui:** rota `/backend/v1/painel` e tela `/painel`; registro da linha de base; roteiro do teste do ciclo; liberação dos envios reais; fechamento com veredito.
- **Fora de escopo:** painel do funil pós-reunião (fase 3); loops de meta (fase 4).
- **Entradas e pré-condições:** SPECs 1-001 a 1-005 entregues para o teste do ciclo; Q-18 a Q-21 definidas. A SPEC-1-006 não é pré-condição.
- **Saídas/artefatos:** painel; `configuracao.linha_de_base` e `configuracao.tempo_sdr`; `05_entregas/fase-1/spec-1-007/aceite.md` e `veredito.md`.
- **Dependências e responsáveis:** Igor lê, registra e decide; Dario constrói e libera.
- **Atores e permissões mínimas:** `gestor` e `admin` veem o painel completo; `sdr` vê só os próprios números; a rota exige login e confere papel.
- **Superfícies/arquivos/configurações afetadas:** `pb_hooks/painel.pb.js` (rota), tela `/painel`.
- **Risco e plano B:** definição de contato efetivo muda no meio → o painel recalcula a partir da `vigente_desde` da nova versão e mostra as duas.
- **Rollback ou reversão:** o painel só lê; liberar os envios reais é revertido religando `modo_teste`.

## Dados e integrações

| Indicador | Definição fixa (sempre sem registros `teste=true`) | Tipo |
|---|---|---|
| Candidatos | organizações criadas no período | calculado |
| Qualificados | organizações que chegaram a `acionavel` no período (automático ou aprovadas pela SDR) | calculado |
| Acionáveis trabalhados | oportunidades com pelo menos um envio `enviado` ou uma ligação registrada | calculado |
| Contatados por canal | oportunidades com pelo menos um envio `enviado` (e-mail, WhatsApp) ou ligação registrada, por canal | calculado |
| Contatos efetivos | oportunidades com ligação ou resposta cuja categoria está em `contato_efetivo` vigente (SPEC-1-003: `categoria_ligacao`, `tipo_resposta`) | calculado |
| Contatos efetivos a cada 100 | contatos efetivos ÷ acionáveis trabalhados × 100 | calculado |
| Respostas | oportunidades com atividade de entrada, sem contar `resposta_automatica` | calculado |
| Reuniões | oportunidades que chegaram à etapa do tipo `reuniao_agendada` | calculado |
| Tempo da SDR para montar 100 leads | antes: Q-19; depois: medido pela SDR numa semana de piloto e registrado pelo Igor | declarado |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | linha de base | registrada pelo Igor com Q-19 e Q-20 antes de liberar os envios reais; depois disso só muda com justificativa | — | D-04 |
| RN-02 | veredito | com menos de `amostra_minima` acionáveis trabalhados: “amostra insuficiente”; com amostra suficiente: “no mínimo ou acima” ou “abaixo do mínimo” | Q-18 sem resposta: “mínimo não definido” | DC-03 |
| RN-03 | liberar os envios reais | só com: teste do ciclo aceito por Dario e Igor; linha de base registrada; Q-14 e Q-15 decididas; cadência e modelos aprovados; canais ligados. O Dario desliga `modo_teste` e `simulacao` | — | segurança |
| RN-04 | fechamento | com amostra suficiente: Igor registra o tempo depois, lê o veredito e decide manter ou trocar o público; trocar = nova versão do ICP (SPEC-1-001) | — | D-04 |

## Fluxo e regras

1. O Maestro cria a rota agregada e a tela, com filtro de pipeline e período, a marca “declarado” nos indicadores declarados e a opção “mostrar dados de teste”, visível só para `admin` e usada apenas no teste do ciclo.
2. O Igor registra a linha de base (RN-01).
3. Dario e Igor fazem o teste do ciclo (abaixo).
4. O Dario libera os envios reais (RN-03).
5. Depois de `amostra_minima` acionáveis trabalhados, o Igor fecha o piloto (RN-04) e registra em `veredito.md`.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | 100 acionáveis trabalhados, 32 efetivos, mínimo 30 | 32 a cada 100, “no mínimo ou acima” | — |
| Limite | 40 trabalhados | “amostra insuficiente” | segue o piloto |
| Falha | Q-18 sem resposta | “mínimo não definido” | Maestro pergunta Q-18 de novo |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC e as coleções das SPECs 1-001 a 1-003.
2. **Alterar somente:** rota, tela e chaves `linha_de_base` e `tempo_sdr`.
3. **Não alterar:** dados das outras coleções; `modo_teste` só pelo Dario, na liberação.
4. **Executar nesta ordem:** rota agregada → tela → linha de base → teste do ciclo → liberação → fechamento.
5. **Parar e pedir validação quando:** Q-18 ou Q-21 sem resposta; números do painel diferentes da contagem de referência; faltar qualquer condição da RN-03.
6. **Estado válido ao parar:** painel só leitura.

**Contexto técnico do Skip:** ver SPEC-1-001. A rota devolve só números agregados, sem nome, e-mail ou telefone.

## Checklist de execução

- [ ] Rota e tela com as definições fixas e sem registros de teste.
- [ ] Linha de base registrada antes da liberação.
- [ ] Teste do ciclo feito e aceito pelos dois.
- [ ] Envios reais liberados só com todas as condições.
- [ ] Fechamento com tempo depois e veredito.
- [ ] Evidências em `05_entregas/fase-1/spec-1-007/`.

## Critérios de aceite

- [ ] **CA-1-30:** o painel mostra os nove indicadores por pipeline e período, sem registros de teste, iguais à contagem de referência da fixture.
- [ ] **CA-1-31:** a linha de base está registrada com data, antes da liberação dos envios reais.
- [ ] **CA-1-32:** o painel compara contatos efetivos a cada 100 com o mínimo e mostra o veredito, ou “amostra insuficiente” abaixo da amostra mínima.
- [ ] **CA-1-33:** Dario e Igor fizeram o teste do ciclo e registraram o aceite ou os ajustes.
- [ ] **CA-1-49:** os envios reais só são liberados com todas as condições da RN-03, e a liberação fica registrada.
- [ ] **CA-1-50:** com a amostra mínima atingida, o tempo depois e o veredito do público estão registrados pelo Igor.

## TDD da SPEC

| ID | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|
| T1 | RED | CA-1-30 | fixture de referência antes da rota | abrir painel | indicadores ausentes (falha esperada) | `05_entregas/fase-1/spec-1-007/t1-red.png` |
| T2 | GREEN | CA-1-30 | fixture com 12 oportunidades de valores conhecidos, marcadas como não teste num período isolado (e apagadas no fim), mais 3 marcadas `teste=true` | abrir painel do período | 12 candidatos, 10 qualificados, 10 trabalhados, 9 por e-mail e 6 por WhatsApp, 3 efetivos, 30 a cada 100, 4 respostas (1 automática fora), 1 reunião; os 3 de teste fora | `05_entregas/fase-1/spec-1-007/t2-green.md` |
| T3 | GREEN | CA-1-32 | mesma fixture com `amostra_minima` 100 e depois 10 (só no teste) e mínimo 30 | abrir painel | com 100: “amostra insuficiente”; com 10: “no mínimo ou acima”; `amostra_minima` volta a 100 | `05_entregas/fase-1/spec-1-007/t3.md` |
| T4 | REFACTOR/REGRESSÃO | CA-1-30 | nova versão de `contato_efetivo` sem “encaminha ao decisor” | alterar em teste | recálculo só a partir da `vigente_desde` | `05_entregas/fase-1/spec-1-007/t4-regressao.md` |
| T5 | GREEN | CA-1-31 | registrar a linha de base com Q-19 e Q-20 | tela do painel | registro com data, autor e marca “declarado” | `05_entregas/fase-1/spec-1-007/t5.md` |
| T6 | RED/GREEN | CA-1-49 | tentar desligar `modo_teste` sem aceite do CL-007 | rota de liberação | antes da RN-03: desliga (falha); depois: recusado com a lista do que falta | `05_entregas/fase-1/spec-1-007/t6.md` |
| T7 | GREEN | CA-1-50 | fechamento com amostra atingida | registro do Igor | tempo depois, veredito e decisão gravados | `05_entregas/fase-1/spec-1-007/veredito.md` |

**Dados/fixtures:** fixture de referência gerada pelo Maestro com dados fictícios e a tabela de valores esperados acima, gravada em `05_entregas/fase-1/spec-1-007/fixtures/referencia.md`; apagada no fim.
**Caminhos de erro obrigatórios:** período vazio; mínimo não definido; amostra insuficiente; `sdr` vendo números de outra pessoa.

**Evidência exigida:** arquivos acima.

## Teste humano do cliente

- **Origem:** CL-007 (C1 00:08:38 — “termina ele rápido para vocês testarem”)
- **Quem testa:** Dario e Igor
- **Preparação (Maestro):** clínica de teste com o CNPJ da Higia, o e-mail corporativo do Dario e o WhatsApp do Igor (Q-21), na lista permitida; no caminho Meta, o consentimento do Igor marcado como “contato interno de teste”; cadência de teste com e-mail no minuto 0, WhatsApp no minuto 10 e ligação no minuto 20; modo de teste ligado e simulação desligada só para e-mail e WhatsApp.
- **Passos:**
  1. Importar a planilha da clínica de teste em “Importar”.
  2. Na fila de clínicas, ver a nota com os motivos e aprovar a clínica.
  3. Ver a oportunidade na pipeline e os três passos agendados.
  4. Dario recebe o e-mail; depois, Igor recebe o WhatsApp.
  5. Igor responde o WhatsApp e vocês veem a cadência parar e a tarefa aparecer na caixa da SDR.
  6. Registrar uma ligação com a categoria e mover para “Reunião agendada”.
  7. Abrir o painel com “mostrar dados de teste” e ver a clínica contada.
- **Resultado esperado:** o ciclo inteiro funciona sem planilha e sem Dealwise.
- **Evidência do aceite:** mensagem do Dario e mensagem do Igor dizendo que testaram e aprovam, ou a lista de ajustes, registradas em `05_entregas/fase-1/spec-1-007/aceite.md`.

## Handoff e operação

- **Como demonstrar:** o próprio teste do ciclo.
- **Como operar depois:** Igor olha o painel toda semana; fecha o piloto com o veredito.
- **Como monitorar:** veredito do mínimo e alertas.
- **Pendência conhecida:** nenhuma.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| e45e573d-7e0a-4e67-8852-7be68332fe04 | Montar o painel do piloto | Dario | SPEC-1-007 | CA-1-30, CA-1-32 | T1, T2, T3, T4 | `t2-green.md`, `t3.md` | SPECs 1-001 a 1-003 | ☐ |
| 0807ad81-e074-4867-a55b-cea8f766cc5d | Registrar a linha de base antes do primeiro envio | Igor | SPEC-1-007 | CA-1-31 | T5 | `t5.md` | Q-19 e Q-20 definidas | ☐ |
| 54b2489f-1b9e-4990-aa40-c1572ddd115e | Testar o ciclo completo com uma clínica de teste | Dario e Igor | SPEC-1-007 | CA-1-33 | teste humano CL-007 | `aceite.md` | SPECs 1-001 a 1-005; Q-21 definida | ☐ |
| bd89869c-45e6-4c48-a65f-0db990fd6d49 | Liberar os envios reais depois do teste do ciclo | Dario | SPEC-1-007 | CA-1-49 | T6 | `t6.md` | teste do ciclo aceito; linha de base registrada | ☐ |
| a0379cad-b9e2-4371-a947-49eda1e20f80 | Fechar o piloto com o veredito do público | Igor | SPEC-1-007 | CA-1-50 | T7 | `veredito.md` | amostra mínima atingida | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | painel gerar-specs | v1.1 | linha de base declarada, indicadores sem teste e com referência, amostra, liberação dos envios reais, fechamento com veredito, roteiro do CL-007 em minutos |
