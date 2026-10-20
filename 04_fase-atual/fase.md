# Fase atual — CRM de prospecção (fase 1)

- fase-format: 2

## Tasks

- [x] Definir usuários e acessos @"Dario Calçada" !13/10/2026 [interno]  <!-- id:ed14fa15-c9e4-4f7e-a4f2-0c1d3e5a6b7f -->
  > Papéis admin, gestor, SDR e licitação; cadastro público desligado; login com e-mail corporativo.
  > SPEC-1-001 · CA-1-01 · Prova: T1.
  > Concluída 13/10/2026.
- [x] Montar a área de administração @"Dario Calçada" !14/10/2026 [interno]  <!-- id:ffe9ee34-1a2b-4c3d-8e4f-5a6b7c8d9e0f -->
  > Produtos, ICPs, pipelines, cadências, modelos, configuração e usuários editáveis no admin.
  > SPEC-1-001 · CA-1-02 · Prova: T2 e teste do Igor.
  > Concluída 14/10/2026: versão 57b2875 publicada; 4 usuários reais intactos.
- [x] Preparar o material comercial e as bases @"Dario Calçada" !14/10/2026 [interno]  <!-- id:65b55cab-3f22-4e03-9c1d-2e4f5a6b7c8d -->
  > Material da Higia, 18 clientes ativos e 413 leads importados; proposta com fonte por item.
  > SPEC-1-001 · CA-1-04 · Prova: importação real (407 inseridos, 6 duplicados).
  > Concluída 14/10/2026.
- [x] Importar as bases de clientes e leads @"Dario Calçada" !14/10/2026 [interno]  <!-- id:c02b4c1d-8c2e-1e8b-4a4a-a79b-3c2d1e0f9a8b -->
  > Importação com hash, mapeamento RD Station, supressão e tela /admin/importar.
  > SPEC-1-002 · CA-1-05, CA-1-06 · Prova: T1–T4.
  > Concluída 14/10/2026: 413 leads → 407 inseridos.
- [x] Captar clínicas do CNES @"Dario Calçada" !15/10/2026 [interno]  <!-- id:c014826a-f69f-49c4-8a4a-a79b-3c2d1e0f9a8b -->
  > Captação diária CNES + enriquecimento Receita; ICP v2 (PI prioritário); tela /admin/captacao.
  > SPEC-1-002 · CA-1-07, CA-1-08 · Prova: T1–T3, T9.
  > Concluída 15/10/2026: 199 orgs CNES; 59 enriquecidas.
- [x] Pontuar e ordenar a fila @"Dario Calçada" !15/10/2026 [interno]  <!-- id:34655984-a7d6-4a4a-9c1d-2e4f5a6b7c8d -->
  > Pesos lidos do ICP ativo; fila /clinicas; reavaliação com dados novos.
  > SPEC-1-002 · CA-1-09, CA-1-10 · Prova: T4, T5.
  > Concluída 15/10/2026: versão final 2769b5c; correções pós-revisão do Igor.
- [x] Revisão da SDR com filtros @"Dario Calçada" !16/10/2026 [interno]  <!-- id:a1326b8f-8c2e-1e8b-4a4a-a79b-3c2d1e0f9a8b -->
  > Ações RN-12 (corrigir nota/descartar/reabrir), painel com histórico, edição com CNPJ na hora, filtros server-side.
  > SPEC-1-003 · CA-1-11 · Prova: T1–T4.
  > Concluída 16/10/2026.
- [x] Criar oportunidade automática na pipeline @"Dario Calçada" !16/10/2026 [interno]  <!-- id:2da63fc2-8c2e-1e8b-4a4a-a79b-3c2d1e0f9a8b -->
  > RN-01 idempotente; fila de entrada 07h BSB dias úteis, limite 10/dia por nota; e-mail da SDR.
  > SPEC-1-003 · CA-1-13, CA-1-14 · Prova: T1, T2.
  > Concluída 16/10/2026.
- [x] Motor da cadência @"Dario Calçada" !16/10/2026 [interno]  <!-- id:1cc6e53d-8c2e-1e8b-4a4a-a79b-3c2d1e0f9a8b -->
  > Cron 15min, RN-03+RN-06, idempotente; envios agendados e tarefas da SDR.
  > SPEC-1-003 · CA-1-15 · Prova: T1–T3.
  > Concluída 16/10/2026.
- [x] Resposta pausa a cadência @"Dario Calçada" !16/10/2026 [interno]  <!-- id:b43ce6d9-8c2e-1e8b-4a4a-a79b-3c2d1e0f9a8b -->
  > RN-04 cancela; RN-05 optout HMAC supressão; RN-07 retomada rodada+1; recusa nunca retoma.
  > SPEC-1-003 · CA-1-17 · Prova: T1–T4.
  > Concluída 16/10/2026.
- [x] Caixa de trabalho da SDR @"Dario Calçada" !16/10/2026 [interno]  <!-- id:b19368a9-8c2e-1e8b-4a4a-a79b-3c2d1e0f9a8b -->
  > Tela /caixa por prioridade; ligação com categoria obrigatória (RN-09); LinkedIn com mensagem do modelo.
  > SPEC-1-003 · CA-1-16, CA-1-37, CA-1-38 · Prova: T5, T8.
  > Concluída 16/10/2026: versão final 6d8d768.
- [x] Mostrar as pipelines com o histórico de cada clínica @"Dario Calçada" !06/11/2026 [interno]  <!-- id:6d68f7ab-b0fc-4720-85ae-a4b3fb82c244 -->
  > Telas de pipeline (quadro e lista) e da oportunidade com todas as atividades e mudanças de etapa, da lista até o fechamento.
  > SPEC-1-003 · CA-1-12 · Prova: T1 e captura das telas.
  > Concluída 20/10/2026: versão c92d1fd publicada; T1 provada (t1-telas.md: P1–P9 verdes — mover etapa RN-10, nota, Perdido exige motivo, reativação, histórico ordenado); telas /pipeline, /pipeline/:id e /oportunidade/:id capturadas e verificadas; agrupamento por rede (decisão do Igor); correção pós-teste: sessão expirada não aparece mais como lista vazia (f4e3ea9).
- [ ] Conectar o serviço de e-mail no domínio novo @"Dario Calçada" !23/10/2026 [interno]  <!-- id:292512cc-34cd-4fe8-ba9d-6ead07350eea -->
  > Domínio separado comprado na semana 1 para aquecer; conta no serviço escolhido na Q-15; DNS e subdomínio de respostas; chaves e token digitados pelo Dario nos segredos do Skip; canal ligado só depois do e-mail de teste entregue.
  > SPEC-1-004 · CA-1-18 · Prova: T7.
- [ ] Enviar os e-mails da cadência com saída para descadastro @"Dario Calçada" !10/11/2026 [interno]  <!-- id:b4713315-e071-4865-b655-07e305aba201 -->
  > Envios com o modelo aprovado, conferência de pausa, contato e supressão logo antes de enviar, limite diário, janela, modo de teste e descadastro com confirmação.
  > SPEC-1-004 · CA-1-19, CA-1-20, CA-1-44 · Prova: T1, T2, T4, T8.
- [ ] Registrar respostas e rejeições de e-mail no CRM @"Dario Calçada" !11/11/2026 [interno]  <!-- id:0329c5bb-8acc-4dc1-b683-3cde08473c8f -->
  > Eventos do serviço só valem depois de conferidos no próprio serviço; resposta pausa a cadência; rejeição marca o e-mail inválido; reputação ruim desliga o canal; silêncio do webhook gera alerta.
  > SPEC-1-004 · CA-1-21, CA-1-46 · Prova: T3, T5, T6, T8.
- [ ] Escolher a API e o número de WhatsApp da cadência @"Dario Calçada" !16/10/2026 [interno]  <!-- id:1cf2d10d-b3ef-4e4c-82f8-f394f5d43376 -->
  > O Maestro lê para o Dario a consequência de cada opção (Uazapi: primeiro contato frio com risco de banimento do número; oficial da Meta: só quem deu consentimento) e registra a escolha, o número dedicado e o de acordo do Igor. O número começa a aquecer na semana 1.
  > SPEC-1-005 · CA-1-22 · Entrega: 06_notas/decisao-whatsapp.md.
- [ ] Conectar o número de WhatsApp da cadência @"Dario Calçada" !04/11/2026 [interno]  <!-- id:c4366a83-e88b-47cd-a98b-04455ccae0bc -->
  > Número dedicado ligado à API escolhida; segredos e webhook configurados pelo Dario; canal ligado só depois da mensagem de teste nos dois sentidos.
  > SPEC-1-005 · CA-1-23 · Prova: T8.
- [ ] Enviar as mensagens de WhatsApp da cadência @"Dario Calçada" !10/11/2026 [interno]  <!-- id:837ab8fa-becf-44d6-8034-53a20728e57a -->
  > Envios com o modelo aprovado, conferência logo antes de enviar, limite por número, janela, intervalo entre mensagens e modo de teste; no caminho Meta, quem não deu consentimento vira tarefa da SDR.
  > SPEC-1-005 · CA-1-24, CA-1-45 · Prova: T1, T2, T3, T9.
- [ ] Registrar as respostas de WhatsApp no CRM @"Dario Calçada" !11/11/2026 [interno]  <!-- id:22a305e2-3ea7-4e95-b472-f747c983d084 -->
  > Resposta entra no histórico e pausa a cadência; SAIR bloqueia a pessoa para sempre; eco ignorado; número sem WhatsApp marcado inválido; silêncio do webhook gera alerta.
  > SPEC-1-005 · CA-1-25, CA-1-47 · Prova: T4, T5, T6, T7, T9.
- [ ] Trazer as licitações do PNCP para a pipeline pública @"Dario Calçada" !28/10/2026 [interno]  <!-- id:5534b6ad-1773-4d9b-8d0c-916a245a6687 -->
  > Consulta diária da API pública do PNCP por modalidade, com filtro de palavras e estados feito no sistema (Q-16), sem repetir edital e respeitando o limite de chamadas.
  > SPEC-1-006 · CA-1-26, CA-1-27 · Prova: T1, T2, T3, T6.
- [ ] Triar as licitações na pipeline pública @"Dario Calçada" !30/10/2026 [interno]  <!-- id:780ea26b-1773-4d9b-8d0c-916a245a6687 -->
  > O responsável marca aderente ou descartada com motivo; o sistema nunca envia proposta nem documento.
  > SPEC-1-006 · CA-1-28 · Prova: T4.
- [ ] Ajustar o filtro de licitações no admin @"Dario Calçada" !29/10/2026 [interno]  <!-- id:4c42dd0c-1773-4d9b-8d0c-916a245a6687 -->
  > Palavras, modalidades e estados editáveis no admin, com efeito na consulta seguinte; lista de palavras vazia não roda e gera alerta.
  > SPEC-1-006 · CA-1-29 · Prova: T5.
- [ ] Montar o painel do piloto @"Dario Calçada" !12/11/2026 [interno]  <!-- id:e45e573d-1773-4d9b-8d0c-916a245a6687 -->
  > Nove indicadores com definição fixa por pipeline e período, sem dados de teste, comparando contatos efetivos a cada 100 com o mínimo da Higia; abaixo da amostra mínima mostra amostra insuficiente.
  > SPEC-1-007 · CA-1-30, CA-1-32 · Prova: T1 a T4.
- [ ] Registrar a linha de base antes do primeiro envio @"Igor Alves" !12/11/2026 [interno]  <!-- id:0807ad81-1773-4d9b-8d0c-916a245a6687 -->
  > Igor registra como a SDR trabalha hoje (Q-19 e Q-20) antes de liberar os envios reais.
  > SPEC-1-007 · CA-1-31 · Prova: T5.
- [ ] Testar o ciclo completo com uma clínica de teste @"Igor Alves" !13/11/2026 [interno]  <!-- id:54b2489f-1773-4d9b-8d0c-916a245a6687 -->
  > Dario e Igor seguem o roteiro CL-007 com a clínica de teste (CNPJ da Higia) e a cadência em minutos: importar, aprovar, receber e-mail e WhatsApp, responder, ver a pausa, registrar ligação e ver o painel.
  > SPEC-1-007 · CA-1-33 · Prova: aceite dos dois em 05_entregas/fase-1/spec-1-007/aceite.md.
- [ ] Atender pedido de exclusão de dados de um contato @"Dario Calçada" !30/10/2026 [interno]  <!-- id:1d775cf8-1773-4d9b-8d0c-916a245a6687 -->
  > Quando alguém pede para apagar os dados, o admin exclui pela tela do contato; os dados pessoais somem do contato, das atividades e do histórico, e o e-mail e o telefone ficam bloqueados na supressão.
  > SPEC-1-002 · CA-1-34 · Prova: T8.
- [ ] Aprovar a cadência e os modelos de mensagem @"Igor Alves" !23/10/2026 [interno]  <!-- id:707256db-1773-4d9b-8d0c-916a245a6687 -->
  > Igor confere e aprova a cadência e cada modelo de e-mail, WhatsApp e LinkedIn montados a partir do material da Higia; sem aprovação nada é enviado.
  > SPEC-1-001 · CA-1-03 · Prova: T3.
- [ ] Resolver clínicas possivelmente repetidas @"Dario Calçada" !30/10/2026 [interno]  <!-- id:be269875-1773-4d9b-8d0c-916a245a6687 -->
  > Clínicas com o mesmo CNPJ raiz, telefone, domínio ou nome na mesma cidade ficam paradas até a SDR decide se são a mesma clínica ou clínicas diferentes; antes disso não entram na cadência.
  > SPEC-1-002 · CA-1-39 · Prova: T6.
- [ ] Liberar os envios reais depois do teste do ciclo @"Dario Calçada" !16/11/2026 [interno]  <!-- id:bd89869c-1773-4d9b-8d0c-916a245a6687 -->
  > Só com o teste do ciclo aceito pelos dois, linha de base registrada, provedores decididos, cadência e modelos aprovados e canais ligados, o Dario desliga o modo de teste.
  > SPEC-1-007 · CA-1-49 · Prova: T6.
- [ ] Fechar o piloto com o veredito do público @"Igor Alves" !27/11/2026 [interno]  <!-- id:a0379cad-1773-4d9b-8d0c-916a245a6687 -->
  > Depois de 100 leads trabalhados, o Igor registra o tempo da SDR depois, lê o veredito e decide manter ou trocar o público.
  > SPEC-1-007 · CA-1-50 · Prova: T7.
