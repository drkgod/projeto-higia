# Perguntas diretas — fase 1

Só o que não está em nenhum documento (SPEC-1-001). Perguntar tudo de uma vez, em linguagem simples, e registrar a resposta literal.

Respondidas em 13/10/2026 pelo Igor Alves (chat ETHOS).

| ID | Pergunta | Resposta | Quem respondeu | Data |
|---|---|---|---|---|
| Q-01 | Quem vai usar o CRM, com qual papel e e-mail? | dariobcalcada@higiatec.com.br (admin e gestor); igor.alves@higiatec.com.br (admin e gestor); comercial@higiatec.com.br (sdr) | Igor Alves | 13/10/2026 |
| Q-02 | Qual o nome da SDR e quantas horas por dia ela tem para a prospecção? | Jesus Vasconcelos; horas por dia: PENDENTE | Igor Alves | 13/10/2026 |
| Q-11 | O material traz 4 regras de sem conexão (7 tentativas, 11 toques, 10 dias parado, 3 a 4 tentativas). Qual vale? | 10 dias parados | Igor Alves | 13/10/2026 |
| Q-14 | Qual API de WhatsApp e qual número dedicado? (ler as consequências da SPEC-1-001) | PENDENTE — "ainda não decidi" | Igor Alves | 13/10/2026 |
| Q-15 | Qual domínio novo vai mandar os e-mails? | higiatec.com.br (resposta literal; VALIDADO: subdomínio dedicado outbound.higiatec.com.br) | Igor Alves | 13/10/2026 |
| Q-17 | Quem tria as licitações? | Igor e Dario | Igor Alves | 13/10/2026 |
| Q-18 | Qual o mínimo de contatos efetivos a cada 100 leads para manter o público? | PENDENTE — "não defini ainda" (sugestão do kickoff: 30) | Igor Alves | 13/10/2026 |

## DECISÃO DO CLIENTE (registro)

- **Q-01 — papéis**: validado na autorização: Dario e Igor como `admin`, SDR Jesus Vasconcelos (comercial@) como `sdr`.
- **Q-15 — domínio**: validado na autorização: subdomínio dedicado outbound.higiatec.com.br para a cadência (protege a reputação do domínio principal).
- **Q-17 — licitações**: sem usuário dedicado com papel `licitacao` por ora; Igor e Dario (admin) triam. O papel `licitacao` permanece no sistema para uso futuro.
- **Q-11 — esgotamento**: "10 dias parados" → `regra_esgotamento` = {tipo: dias_sem_resposta, valor: 10}.
