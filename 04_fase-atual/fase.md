# Fase 1 — Tarefas

<!-- fase-format:2 -->

Cada linha é uma tarefa da Jornada de Execução. **Tudo que cabe num card cabe nesta linha** — se um
campo não estiver aqui, ele não tem como ser preenchido, porque é este arquivo que cria a tarefa.

```
- [ ] Título da tarefa @responsável !30/09/2026 #projeto [interno]   <!-- id:… -->
      > descrição da tarefa, uma ou mais linhas
  - [ ] subtarefa (basta indentar 2 espaços)                         <!-- id:… -->
    - [ ] sub-subtarefa (indente mais 2)                             <!-- id:… -->
```

| marcador | o que define | se você não escrever |
|---|---|---|
| `- [ ]` / `- [/]` / `- [x]` | a fazer / em andamento / concluída | a fazer |
| `@nome` | responsável (`@"Nome Composto"` com aspas) | fica **sem responsável** |
| `!dd/mm/aaaa` | prazo | fica **sem prazo** |
| `#projeto` / `#aculturamento` | tipo | Projeto de IA |
| `[interno]` | o cliente **não** vê esta tarefa | o cliente vê |
| `> texto` na linha de baixo | descrição (aparece ao abrir o card) | sem descrição |
| indentar 2 espaços | vira subtarefa da tarefa acima (vale em qualquer profundidade) | tarefa de topo |

Os marcadores só valem **no fim da linha** — `Revisar #3 do contrato` continua sendo um título.
Um título que TERMINA na forma de um marcador sai escapado com `\\` (`Ligar para \\@joao`); a barra é
só para o parser e nunca aparece no card. Você não precisa escrever isso à mão.
Marque `[x]` para concluir e adicione linhas novas à vontade: elas entram no quadro na próxima
sincronização e voltam aqui com o `<!-- id:… -->` preenchido. **Não apague o marcador de id** das
tarefas que já têm um.

- [x] Criar os usuários e papéis do CRM @"Dario Calçada" !16/10/2026 [interno]  <!-- id:ed14fa15-ebe9-480c-8594-5cdea093763a -->
  > Usuários de Dario (admin), Igor (gestor), SDR e responsável por licitações, sem cadastro público; cada papel vê só o que a matriz de acesso permite.
  > SPEC-1-001 · CA-1-01, CA-1-42 · Prova: T1, T2.
  > Concluída 13/10/2026: versão 4aae7ec publicada e testada pelo Igor; provas T1/T2 em 05_entregas/fase-1/spec-1-001/ (t2-green.md, 15 casos contra o backend real).
- [x] Montar a área de administração do CRM @"Dario Calçada" !21/10/2026 [interno]  <!-- id:ffe9ee34-5704-4f54-adee-b29b1ab0dab0 -->
  > Telas de produtos, ICP, pipelines, cadência, modelos e configuração, com versões e aprovação; base comum (alertas, eventos, execuções) e ganchos de teste; modo de teste e simulação ligados.
  > SPEC-1-001 · CA-1-02, CA-1-03, CA-1-05 · Prova: T3, T4, T6, T7.
  > Concluída 14/10/2026: versão 57b2875 publicada e testada pelo Igor (2 correções do teste: interruptores de configuração na e645d88, editar/inativar/excluir usuários na 57b2875); provas em 05_entregas/fase-1/spec-1-001/ (t3, t4, t6, t7-regressao, t8-correcao, t9-usuarios).
- [x] Configurar o CRM a partir do material da Higia @"Dario Calçada" !23/10/2026 [interno]  <!-- id:65b55cab-5caa-4970-8cc5-bfa82f31cd6e -->
  > O Maestro tira a configuração dos documentos que a Higia já tem (playbook, cadência, ICP, funil, objeções), monta uma proposta com a fonte de cada item e só pergunta o que não está escrito. Detalhe técnico de API vem da documentação oficial, nunca de pergunta ao cliente.
  > SPEC-1-001 · CA-1-04 · Entrega: 06_notas/proposta-configuracao.md.
  > Concluída 14/10/2026: proposta montada com fonte por item, aplicada no CRM com autorização do Igor ("Aplique como está") e revisada por ele ("Revisado e ok"). Resquícios do teste apagados com autorização.
  - [x] Colocar o material comercial da Higia no projeto @"Dario Calçada" !16/10/2026 [interno]  <!-- id:2681936e-0542-41ad-8e3b-52ac593464e9 -->
    > Dario coloca em 01_documentos/material-comercial/ a pasta enviada em 06/10 (blueprint, processo outbound, guia do Apollo, cadência com WhatsApp, matriz de objeções, sales planning, rotina e indicadores) e a lista de CNPJs dos clientes atuais.
    > SPEC-1-001 · CA-1-04 · Entrega: lista dos arquivos recebidos.
    > Concluída 14/10/2026: entregue pelo Igor (12 arquivos na pasta + 1 na raiz a mover); lista de CNPJs de clientes e planilha de leads ficaram para o Igor enviar depois.
  - [x] Montar a proposta de configuração a partir dos documentos @"Dario Calçada" !20/10/2026 [interno]  <!-- id:be2b72dd-216a-483d-9816-11fe4b79d3f5 -->
    > O Maestro lê os documentos e preenche produtos, público, sinais e pesos, bloqueios, faixas, etapas, motivos de perda, cadência, modelos, limites, filtros de licitação e linha de base do kickoff, com o trecho de onde tirou cada um.
    > SPEC-1-001 · CA-1-04 · Entrega: 06_notas/proposta-configuracao.md.
  - [x] Responder as perguntas que os documentos não respondem @"Dario Calçada" !20/10/2026 [interno]  <!-- id:80f640c2-c65c-4120-8c60-78e1432d1744 -->
    > Só 7 itens, de uma vez: quem usa o CRM e quem é a SDR; qual regra de sem conexão vale; API e número de WhatsApp (com as consequências); domínio do e-mail; quem tria as licitações; mínimo de contatos efetivos a cada 100.
    > SPEC-1-001 · CA-1-04 · Entrega: 06_notas/questionario-fase-1.md.
  - [x] Revisar a proposta de configuração com o Igor @"Igor Alves" !22/10/2026 [interno]  <!-- id:46c1f544-708e-4276-9b39-16453419c124 -->
    > Numa sessão só, o Igor confere a proposta montada pelo Maestro e aprova ou corrige cada item.
    > SPEC-1-001 · CA-1-04 · Entrega: proposta com aprovação registrada.
  - [x] Aplicar no CRM a configuração aprovada @"Dario Calçada" !23/10/2026 [interno]  <!-- id:26ae5e08-8a63-4253-8899-84c6faebb00f -->
    > O Maestro grava no admin o que foi aprovado, com a fonte de cada item; o que ficou sem fonte nem resposta continua pendente e bloqueia só a função que depende dele.
    > SPEC-1-001 · CA-1-04 · Prova: T5 e T6.
- [ ] Aprovar o ICP do piloto no admin @"Igor Alves" !22/10/2026 [interno]  <!-- id:93c8bd88-d29b-4475-8620-0b6af5be7c09 -->
  > Igor confere o ICP montado a partir do guia do Apollo e do blueprint (filtros, sinais, bloqueios e faixas da nota) e aprova a versão 1.
  > SPEC-1-001 · CA-1-02, CA-1-03 · Prova: T3, T4.
- [x] Importar a planilha do Apollo sem repetir clínicas @"Dario Calçada" !27/10/2026 [interno]  <!-- id:c02b4c1d-5d7d-4243-81ca-e9641e67d363 -->
  > Upload de planilha CSV exportada do Apollo gratuito ou montada pela SDR, com relatório de inseridos, repetidos e rejeitados; quem está na supressão entra já bloqueado.
  > SPEC-1-002 · CA-1-07, CA-1-08 · Prova: T1, T2.
  > Concluída 14/10/2026: versão 80aebce publicada; T2 provada (t2-green.md: hash recusa reenvio, duplicados atualizados, supressão com opt-out); importação real dos 413 leads (407 inseridos, 6 duplicados, 0 rejeitados).
- [x] Trazer clínicas de imagem do CNES e da Receita @"Dario Calçada" !29/10/2026 [interno]  <!-- id:c014826a-ea15-471e-b512-7e86ace7ffec -->
  > Captação pelo CNES com os filtros do ICP (tipo de unidade, UF, município), conferida pela Receita/CNPJ (CNAE de imagem, porte, situação), com a fonte de cada dado e retomada em caso de falha.
  > SPEC-1-002 · CA-1-06, CA-1-11 · Prova: captação de uma UF e regressão de falha.
  > Concluída 14/10/2026: versão eb2114f publicada; T3 provada (t3.md: 199 organizações do CNES da UF 22 com fonte por campo, cursor sem duplicar); T9 provada (t9-regressao.md: 429 simulado adia sem perder ponto, retomada enriquece 59 orgs pela Receita).
- [x] Mostrar a nota de cada clínica com os motivos @"Dario Calçada" !30/10/2026 [interno]  <!-- id:34655984-df24-4fad-93d9-bdbecdc8d5e7 -->
  > Pontuação pelo ICP ativo mostrando o que somou, o que tirou e o que não tinha informação; mudar o ICP repontua só quem ainda não foi abordado; e-mail pessoal ou CNPJ inativo não vira canal válido.
  > SPEC-1-002 · CA-1-09, CA-1-35, CA-1-40 · Prova: T4, T5.
  > Concluída 15/10/2026: versão 2769b5c publicada; T4 provada (t4.md: 10/10 casos — nota explicável, canal válido, bloqueios pela natureza jurídica); T5 provada (t5.md: peso do ICP repontua); T4b (reavaliação das 199 captadas: 154 em revisão, 46 descartadas, 0 presas no descarte errado). Fila /clinicas + detalhe no ar. Navegação pós-login incluída (decisão do Igor).
- [x] Deixar a SDR aprovar, corrigir ou descartar clínicas @"Dario Calçada" !30/10/2026 [interno]  <!-- id:a1326b8f-c9e4-4737-9670-e0bfb26e56d9 -->
  > Na revisão, a SDR marca os sinais de LinkedIn e Instagram, aprova a clínica em revisão, corrige a nota com justificativa ou descarta com motivo; tudo fica no histórico.
  > SPEC-1-002 · CA-1-10, CA-1-41 · Prova: T7.
  > Concluída 16/10/2026: versão 0ae88a5 publicada; T7 provada (t7.md: correção de nota com justificativa em alteracoes, sinais, aprovação em_revisao→acionavel, bloqueios sem justificativa e de acionável). Painel de ações + histórico no detalhe /clinica/:id. Nota corrigida pela SDR protegida da repontuação (motivo_status=correcao_sdr).
  > Complemento autorizado pelo Igor 16/10 11:40 (b30e4fc): edição de dados no painel — CNPJ (consulta Receita na hora), equipamentos (fonte informado_sdr), e-mail/telefone/site; repontuação na hora; fonte SDR protegida da rodada diária. Provas em t7.md (complemento).
- [x] Criar a oportunidade quando a clínica for aprovada @"Dario Calçada" !04/11/2026 [interno]  <!-- id:2da63fc2-fb88-4d7d-9f6a-a25c8f6f1a4b -->
  > Clínica acionável vira oportunidade na pipeline do ICP com a SDR como responsável; entra na cadência pela fila do dia, por ordem de nota, até o limite diário de entrada.
  > SPEC-1-003 · CA-1-12, CA-1-43 · Prova: T1, T9.
  > Concluída 16/10/2026: versão 879cb9d publicada; T9 provada (t9.md: 30 acionáveis, limite 10, ativas por ordem de nota 100→82, 20 aguardando); T9b (criação automática na aprovação com pipeline/etapa/responsável/cadência corretos, idempotente, atividade sistema). Migration 0008 (oportunidades + atividades); fila de entrada RN-02 (cron 07:00 Brasília dias úteis, limite padrão 10 da Q-13); e-mail da SDR corrigido (maria.jesus@higiatec.com.br, informado pelo Igor).
- [x] Agendar os passos da cadência sem repetir envios @"Dario Calçada" !05/11/2026 [interno]  <!-- id:1cc6e53d-bb74-43b2-9bcc-12cfd0d9ae26 -->
  > Passos agendados a partir do D1 em dias úteis, sem feriados e dentro da janela; e-mail e WhatsApp viram envios, ligação e LinkedIn viram tarefas; pausa geral segura tudo e nada vencido sai em lote.
  > SPEC-1-003 · CA-1-12, CA-1-15, CA-1-17 · Prova: T1, T4, T6.
  > Concluída 16/10/2026: versão ec3274b publicada; T1 provada (t1.md: 11 passos nas datas certas, feriado pulado na T1b — D2 19/10→20/10); T4 provada (t4.md: 2ª rodada 0 novos, chave de idempotência); T6 provada (t6.md: pausa geral não agenda nada, nada vencido sai em lote). Migration 0009 (envios + tarefas), hook cadencia_motor (cron 15 min, RN-03 + RN-06 esgotamento), rota de teste rodar/cadencia.
- [x] Parar a cadência quando a clínica responder @"Dario Calçada" !06/11/2026 [interno]  <!-- id:b43ce6d9-9fb3-49cd-b8b5-c01643698c19 -->
  > Resposta, recusa ou opt-out em qualquer canal cancela os envios agendados e em andamento dos dois canais e cria tarefa para a SDR. A SDR marca o tipo da resposta; resposta automática retoma em nova rodada, recusa nunca.
  > SPEC-1-003 · CA-1-13, CA-1-14, CA-1-36 · Prova: T2, T3, T7, T10.
  > Concluída 16/10/2026: versão 9e1d302 publicada; T2 provada (t2.md: resposta pausa, 8/8 cancelados, tarefa resposta, motor não agenda para pausado, idempotência); T3 provada (t3.md: optout no contato + HMAC em supressao + reativação recusada); T7 provada (t7.md: resposta_automatica retoma rodada 2 com passos reagendados a partir do próximo dia útil; recusa nunca retoma); T10 provada (t10-regressao.md: T1 e T2 repetidos com mesmos resultados). Hook resposta_entrada (rotas atividade-entrada, resposta/{id}/tipo, oportunidade/{id}/reativar), migration 0010 (retomada_em), motor usa retomada_em.
- [x] Abrir a caixa de trabalho da SDR @"Dario Calçada" !06/11/2026 [interno]  <!-- id:b19368a9-bb07-4c27-a355-307347148e3a -->
  > Respostas, tarefas vencidas, ligações e LinkedIn do dia, retornos, revisões e duplicidades, na ordem de prioridade e com o motivo, só da carteira da SDR; ligação registrada com a categoria do resultado.
  > SPEC-1-003 · CA-1-16, CA-1-37, CA-1-38 · Prova: T5, T8.
  > Concluída 16/10/2026: versão f5fb573 publicada; T5 provada (t5.md: duas SDRs veem só a própria carteira, na ordem); T8 provada (t8.md: ligação sem categoria → 400; com categoria grava + feita; LinkedIn com mensagem do modelo aprovado). Tela /caixa + card na home; rotas ligacao/tarefa/alerta; corrigido o alerta de exclusão (campos mensagem/responsavel/status) e o campo do modelo do motor (corpo, não conteudo).
- [x] Mostrar as pipelines com o histórico de cada clínica @"Dario Calçada" !06/11/2026 [interno]  <!-- id:6d68f7ab-b0fc-4720-85ae-a4b3fb82c244 -->
  > Telas de pipeline (quadro e lista) e da oportunidade com todas as atividades e mudanças de etapa, da lista até o fechamento.
  > SPEC-1-003 · CA-1-12 · Prova: T1 e captura das telas.
  > Concluída 20/10/2026: versão c92d1fd publicada; T1 provada (t1-telas.md: P1–P9 verdes — mover etapa RN-10, nota, Perdido exige motivo, reativação, histórico ordenado); telas /pipeline, /pipeline/:id e /oportunidade/:id capturadas e verificadas; agrupamento por rede (decisão do Igor); correção pós-teste: sessão expirada não aparece mais como lista vazia (f4e3ea9).
- [ ] Conectar o serviço de e-mail no domínio novo @"Dario Calçada" !23/10/2026 [interno]  <!-- id:292512cc-34cd-4fe8-ba9d-6ead07350eea -->
  > Domínio separado comprado na semana 1 para aquecer; conta no serviço escolhido na Q-15; DNS e subdomínio de respostas; chaves e token digitados pelo Dario nos segredos do Skip; canal ligado só depois do e-mail de teste entregue.
  > SPEC-1-004 · CA-1-18 · Prova: T7.
- [/] Enviar os e-mails da cadência com saída para descadastro @"Dario Calçada" !10/11/2026 [interno]  <!-- id:b4713315-e071-4865-b655-07e305aba201 -->
  > Envios com o modelo aprovado, conferência de pausa, contato e supressão logo antes de enviar, limite diário, janela, modo de teste e descadastro com confirmação.
  > SPEC-1-004 · CA-1-19, CA-1-20, CA-1-44 · Prova: T1, T2, T4, T8.
  > Código implementado e provado em modo de teste 20/10 (05_entregas/fase-1/spec-1-004/t1.md: T1–T4 — remetente com conferência, resposta RN-04, descadastro RN-05 com HMAC na supressão, bounce marca e-mail inválido); falta o SMTP do serviço (Dario) para as provas de entrega real.
- [/] Registrar respostas e rejeições de e-mail no CRM @"Dario Calçada" !11/11/2026 [interno]  <!-- id:0329c5bb-8acc-4dc1-b683-3cde08473c8f -->
  > Eventos do serviço só valem depois de conferidos no próprio serviço; resposta pausa a cadência; rejeição marca o e-mail inválido; reputação ruim desliga o canal; silêncio do webhook gera alerta.
  > SPEC-1-004 · CA-1-21, CA-1-46 · Prova: T3, T5, T6, T8.
  > Webhook de entrada implementado e provado em modo de teste 20/10 (t1.md: resposta pausa e cancela; descadastro grava opt-out + HMAC na supressão e nunca retoma; bounce marca e-mail inválido). Falta o webhook real do serviço apontando para o backend.
- [x] Escolher a API e o número de WhatsApp da cadência @"Dario Calçada" !16/10/2026 [interno]  <!-- id:1cf2d10d-b3ef-4e4c-82f8-f394f5d43376 -->
  > O Maestro lê para o Dario a consequência de cada opção (Uazapi: primeiro contato frio com risco de banimento do número; oficial da Meta: só quem deu consentimento) e registra a escolha, o número dedicado e o de acordo do Igor. O número começa a aquecer na semana 1.
  > SPEC-1-005 · CA-1-22 · Entrega: 06_notas/decisao-whatsapp.md.
  > Concluída 20/10/2026: Igor decidiu Uazapi (risco de banimento em contato frio aceito; mitigação = número dedicado + aquecimento). Número dedicado a comprar pelo Dario; entrega em 06_notas/decisao-whatsapp.md.
- [ ] Conectar o número de WhatsApp da cadência @"Dario Calçada" !04/11/2026 [interno]  <!-- id:c4366a83-e88b-47cd-a98b-04455ccae0bc -->
  > Número dedicado ligado à API escolhida; segredos e webhook configurados pelo Dario; canal ligado só depois da mensagem de teste nos dois sentidos.
  > SPEC-1-005 · CA-1-23 · Prova: T8.
- [/] Enviar as mensagens de WhatsApp da cadência @"Dario Calçada" !10/11/2026 [interno]  <!-- id:837ab8fa-becf-44d6-8034-53a20728e57a -->
  > Envios com o modelo aprovado, conferência logo antes de enviar, limite por número, janela, intervalo entre mensagens e modo de teste; no caminho Meta, quem não deu consentimento vira tarefa da SDR.
  > SPEC-1-005 · CA-1-24, CA-1-45 · Prova: T1, T2, T3, T9.
  > Código implementado e provado em modo de teste 20/10 (05_entregas/fase-1/spec-1-005/t1.md: T1–T6 — remetente Uazapi com conferência, eco, resposta RN-04, SAIR RN-05 com HMAC na supressão, número inválido); falta ligar o canal (segredos e número do Dario) para as provas de entrega real.
- [/] Registrar as respostas de WhatsApp no CRM @"Dario Calçada" !11/11/2026 [interno]  <!-- id:22a305e2-3ea7-4e95-b472-f747c983d084 -->
  > Resposta entra no histórico e pausa a cadência; SAIR bloqueia a pessoa para sempre; eco ignorado; número sem WhatsApp marcado inválido; silêncio do webhook gera alerta.
  > SPEC-1-005 · CA-1-25, CA-1-47 · Prova: T4, T5, T6, T7, T9.
  > Webhook de entrada implementado e provado em modo de teste 20/10 (t1.md: resposta pausa e cancela; SAIR grava opt-out + HMAC na supressão e nunca retoma; eco ignorado; número sem WhatsApp marcado inválido). Falta o webhook real da Uazapi apontando para o backend.
- [ ] Trazer as licitações do PNCP para a pipeline pública @"Dario Calçada" !28/10/2026 [interno]  <!-- id:5534b6ad-1773-4d9b-8d0c-916a245a6687 -->
  > Consulta diária da API pública do PNCP por modalidade, com filtro de palavras e estados feito no sistema (Q-16), sem repetir edital e respeitando o limite de chamadas.
  > SPEC-1-006 · CA-1-26, CA-1-27 · Prova: T1, T2, T3, T6.
- [ ] Triar as licitações na pipeline pública @"Dario Calçada" !30/10/2026 [interno]  <!-- id:780ea26b-05c1-4156-b723-996117e9f413 -->
  > O responsável marca aderente ou descartada com motivo; o sistema nunca envia proposta nem documento.
  > SPEC-1-006 · CA-1-28 · Prova: T4.
- [ ] Ajustar o filtro de licitações no admin @"Dario Calçada" !29/10/2026 [interno]  <!-- id:4c42dd0c-10a3-47d7-a4a7-71ea277203a0 -->
  > Palavras, modalidades e estados editáveis no admin, com efeito na consulta seguinte; lista de palavras vazia não roda e gera alerta.
  > SPEC-1-006 · CA-1-29 · Prova: T5.
- [ ] Montar o painel do piloto @"Dario Calçada" !12/11/2026 [interno]  <!-- id:e45e573d-7e0a-4e67-8852-7be68332fe04 -->
  > Nove indicadores com definição fixa por pipeline e período, sem dados de teste, comparando contatos efetivos a cada 100 com o mínimo da Higia; abaixo da amostra mínima mostra amostra insuficiente.
  > SPEC-1-007 · CA-1-30, CA-1-32 · Prova: T1 a T4.
- [ ] Registrar a linha de base antes do primeiro envio @"Igor Alves" !12/11/2026 [interno]  <!-- id:0807ad81-e074-4867-a55b-cea8f766cc5d -->
  > Igor registra como a SDR trabalha hoje (Q-19 e Q-20) antes de liberar os envios reais.
  > SPEC-1-007 · CA-1-31 · Prova: T5.
- [ ] Testar o ciclo completo com uma clínica de teste @"Igor Alves" !13/11/2026 [interno]  <!-- id:54b2489f-1b9e-4990-aa40-c1572ddd115e -->
  > Dario e Igor seguem o roteiro CL-007 com a clínica de teste (CNPJ da Higia) e a cadência em minutos: importar, aprovar, receber e-mail e WhatsApp, responder, ver a pausa, registrar ligação e ver o painel.
  > SPEC-1-007 · CA-1-33 · Prova: aceite dos dois em 05_entregas/fase-1/spec-1-007/aceite.md.
- [ ] Atender pedido de exclusão de dados de um contato @"Dario Calçada" !30/10/2026 [interno]  <!-- id:1d775cf8-a623-491a-9015-c66d14e78c61 -->
  > Quando alguém pede para apagar os dados, o admin exclui pela tela do contato; os dados pessoais somem do contato, das atividades e do histórico, e o e-mail e o telefone ficam bloqueados na supressão.
  > SPEC-1-002 · CA-1-34 · Prova: T8.
- [ ] Aprovar a cadência e os modelos de mensagem @"Igor Alves" !23/10/2026 [interno]  <!-- id:707256db-964b-49da-ab6e-8fc35a7fae49 -->
  > Igor confere e aprova a cadência e cada modelo de e-mail, WhatsApp e LinkedIn montados a partir do material da Higia; sem aprovação nada é enviado.
  > SPEC-1-001 · CA-1-03 · Prova: T3.
- [ ] Resolver clínicas possivelmente repetidas @"Dario Calçada" !30/10/2026 [interno]  <!-- id:be269875-6ec7-4d3e-93ea-ad9e266d0c55 -->
  > Clínicas com o mesmo CNPJ raiz, telefone, domínio ou nome na mesma cidade ficam paradas até a SDR decidir se são a mesma clínica ou clínicas diferentes; antes disso não entram na cadência.
  > SPEC-1-002 · CA-1-39 · Prova: T6.
- [ ] Liberar os envios reais depois do teste do ciclo @"Dario Calçada" !16/11/2026 [interno]  <!-- id:bd89869c-45e6-4c48-a65f-0db990fd6d49 -->
  > Só com o teste do ciclo aceito pelos dois, linha de base registrada, provedores decididos, cadência e modelos aprovados e canais ligados, o Dario desliga o modo de teste.
  > SPEC-1-007 · CA-1-49 · Prova: T6.
- [ ] Fechar o piloto com o veredito do público @"Igor Alves" !27/11/2026 [interno]  <!-- id:a0379cad-b9e2-4371-a947-49eda1e20f80 -->
  > Depois de 100 leads trabalhados, o Igor registra o tempo da SDR depois, lê o veredito e decide manter ou trocar o público.
  > SPEC-1-007 · CA-1-50 · Prova: T7.
