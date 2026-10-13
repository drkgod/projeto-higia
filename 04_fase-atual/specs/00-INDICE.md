# Índice de SPECs — Fase 1

**Fase:** 1 — CRM de prospecção rodando o piloto de clínicas de imagem
**Resultado da fase:** a Higia trabalha a primeira lista de clínicas dentro do próprio CRM: o sistema capta, qualifica, coloca na pipeline e envia e-mail e WhatsApp sozinho; a SDR liga, fala no LinkedIn e registra; a pipeline pública recebe licitações do PNCP.
**Versão:** 1.2 (13/10/2026: configuração a partir dos documentos) — 7 SPECs, 36 tasks, todas com ID do portal, critérios CA-1-01 a CA-1-50.

| SPEC | Entrega | Tipo de mudança | Degrau | Critérios | Tasks |
|---|---|---|---|---|---|
| [SPEC-1-001](spec-1-001-configuracao-guiada.md) | Usuários e matriz de acesso, área de administração, base comum (alertas, eventos, execuções, ganchos de teste) e configuração tirada dos documentos da Higia, com só 7 perguntas diretas | configuração e permissão | recurso nativo | CA-1-01..05, CA-1-42 | 10 |
| [SPEC-1-002](spec-1-002-captacao-e-pontuacao.md) | Captação CNES e Receita, planilhas, duplicidade, supressão, nota explicável, revisão da SDR e exclusão a pedido | dado e integração | construção mínima sobre recurso nativo | CA-1-06..11, CA-1-34, CA-1-35, CA-1-39..41 | 6 |
| [SPEC-1-003](spec-1-003-pipelines-e-caixa-da-sdr.md) | Pipelines, fila de entrada, motor da cadência, conferência de envio, pausa em todos os canais e caixa da SDR | dado e regra | recurso nativo com construção mínima | CA-1-12..17, CA-1-36..38, CA-1-43 | 5 |
| [SPEC-1-004](spec-1-004-cadencia-por-email.md) | E-mail da cadência pelo serviço de envio, com descadastro, respostas e reputação | integração | construção mínima | CA-1-18..21, CA-1-44, CA-1-46 | 3 |
| [SPEC-1-005](spec-1-005-cadencia-por-whatsapp.md) | WhatsApp da cadência pela API que o Dario confirmar | integração | construção mínima | CA-1-22..25, CA-1-45, CA-1-47 | 4 |
| [SPEC-1-006](spec-1-006-licitacoes-do-pncp.md) | Licitações do PNCP na pipeline pública, com triagem | integração | construção mínima sobre recurso nativo | CA-1-26..29 | 3 |
| [SPEC-1-007](spec-1-007-painel-do-piloto.md) | Painel do piloto, linha de base, teste do ciclo (CL-007), liberação dos envios reais e veredito do público | apresentação e validação | recurso nativo | CA-1-30..33, CA-1-49, CA-1-50 | 5 |

**Decisões transversais (valem para todas as SPECs):**
- Código no projeto Skip “CRM”, sincronizado com `Higia01/CRM_Higia`.
- Parâmetros de negócio só pelo admin. O Maestro tira a configuração dos documentos da Higia e da documentação oficial das APIs; só pergunta o que não está escrito. Sem fonte nem resposta, a função dependente fica bloqueada e nada é inventado.
- Modo de teste e simulação ligados até a liberação da SPEC-1-007; testes usam dados fictícios marcados como teste e nunca mandam mensagem real, exceto as verificações com destinatários permitidos.
- Logo antes de cada envio, a conferência comum (`lib/pode_enviar.js`) checa pausa geral, canal, contato, supressão, janela, limite e lista permitida.
- Resposta, recusa ou opt-out em qualquer canal pausa todos os canais; opt-out e exclusão valem para a pessoa, para sempre.
- Credenciais e tokens só gerados e digitados pelo Dario nos segredos do Skip; eventos de provedor só valem depois de conferidos.
- Horários em America/Sao_Paulo, agendamentos em UTC.
- Evidências em `05_entregas/fase-1/spec-1-00N/`; respostas do questionário e decisões em `06_notas/`.

**Ordem de execução (dependências por task):**
1. **Semana 1, em paralelo:** pedir os documentos da Higia; perguntas Q-14 e Q-15 e compra do domínio e do número de WhatsApp, para começar o aquecimento.
2. SPEC-1-001: usuários, área de administração e questionário (as respostas chegam ao longo da construção).
3. SPEC-1-002: importação de planilha primeiro, depois duplicidade, CNES/Receita, nota e revisão.
4. SPEC-1-003: oportunidade e fila, agendamento, pausa, conferência de envio e caixa.
5. SPEC-1-006: pode começar assim que a SPEC-1-001 estiver pronta e a Q-16 definida.
6. SPEC-1-004 e SPEC-1-005: depois da SPEC-1-003 e com domínio e número prontos.
7. SPEC-1-007: painel e linha de base; teste do ciclo; liberação; veredito depois de 100 leads trabalhados.

**Fora desta fase:** enriquecimento pago, papel do contato com evidência e validação por serviço externo (fase 2); qualificação conversacional e reengajamento (fase 2); prazos de estagnação, painel do funil e oferta de ata (fase 3); IA classificando respostas e loops (fase 4); segunda frente, auditoria completa, exportação controlada e importação do Dealwise (fase 5). Fora do projeto: LinkedIn e Instagram automáticos, ligação automática, participação em licitação.
