# Proposta de configuração do CRM — task 65b55cab (SPEC-1-001 · CA-1-04)

Data: 14/10/2026 · Montada a partir do material comercial em 01_documentos/material-comercial/.
Cada item traz o VALOR proposto e a FONTE (documento + trecho). Pendências sem fonte ficam marcadas no fim.

## 1. Produtos (fonte: Blueprint Estratégico)

| Produto | Descrição | Ativo |
|---|---|---|
| PACS Apollo | Armazenamento, visualização e distribuição de imagens médicas | Sim |
| Higia Report | Gestão de laudos, médicos e documentação | Sim |
| Telelaudo | Laudos a distância com corpo clínico terceirizado (15 especialistas) | Sim |

## 2. ICP do piloto (fonte: Passo a passo Apollo — ICP 01; Blueprint)

**ICP 01 — Clínicas de diagnóstico por imagem (PME)** — o piloto usa o ICP 01 (o ICP 02 de hospitais fica para depois da validação, conforme plano do piloto de 100 leads).

Fatores e pesos (soma 100):
| Fator | Peso | Fonte |
|---|---|---|
| Tem tomógrafo | 20 | Apollo ICP 01 (diagnóstico por imagem) + Blueprint (equipamentos conectados) |
| Tem raio-X | 15 | Apollo ICP 01 (raio-X citado nos equipamentos) |
| Tem ultrassom | 15 | Apollo ICP 01 (ultrassom citado) |
| Até N equipamentos (2–3) | 15 | Apollo ICP 01 ("estrutura enxuta, 2 a 3 equipamentos") |
| UF prioritária (N/NE) | 15 | Apollo ICP 01 ("Regiões Norte e Nordeste — Prioridade") |
| Porte ME/EPP | 10 | Apollo ICP 01 (1–50 funcionários ≈ ME/EPP) |
| CNAE de imagem | 10 | Receita/CNPJ (SPEC-1-002) — clínicas radiológicas |

Bloqueios: CNPJ inativo · Já é cliente (18 CNPJs) · Unidade pública.
Limiares: acionável ≥ 60 · revisão 40–59 · abaixo de 40 não aborda (padrão da SPEC, ajustável na revisão).

## 3. Pipelines (fonte: Sales Planning + Funil.xlsx, abas 1 e 2)

**Pipeline "Pré-vendas Outbound" (privada — a do piloto):**
1. Lista de Leads (aberta)
2. Tentativa de Contato (aberta) — estagnação 10 dias; motivo de perda: **Sem conexão**
3. Lead Conectado (aberta) — estagnação 5 dias
4. Reunião Agendada (reunião_agendada) — estagnação 3 dias; motivo: **No-show**
5. Reunião Realizada (aberta) — estagnação 2 dias
6. Proposta (aberta) — estagnação 5 dias
7. Negociação (aberta) — estagnação 5 dias
8. Fechamento (ganho)
9. Perdido (perdido)

Motivos de perda: Sem conexão · No-show · Sem fit · Preço · Concorrência · Sem retorno (os 3 últimos são padrão de mercado — o documento só define Sem conexão e No-show; os demais ficam marcados como PROPOSTOS para sua aprovação).

## 4. Cadência (fonte: Processo Outbound com WhatsApp — sequência D1–D11)

**"Cadência Mista PME" (versão 1, ativa):** 11 dias, dias úteis, janela 08:00–18:00, esgotamento 10 dias sem resposta (Q-11).

| Dia | Canal | Modelo | Tipo |
|---|---|---|---|
| 1 | LinkedIn | LinkedIn 01 | tarefa |
| 2 | WhatsApp | WhatsApp 01 | auto |
| 3 | LinkedIn | LinkedIn 02 | tarefa |
| 4 | WhatsApp | WhatsApp 02 | auto |
| 5 | E-mail | Email 01 | auto |
| 6 | WhatsApp | WhatsApp 03 | auto |
| 7 | E-mail | Email 02 | auto |
| 8 | WhatsApp | WhatsApp 04 | auto |
| 9 | E-mail | Email 03 | auto |
| 10 | WhatsApp | WhatsApp 05 | auto |
| 11 | Ligação | Roteiro de ligação | tarefa |

## 5. Modelos de mensagem (fonte: Processo Outbound c/ WhatsApp + Matriz de Objeções)

**E-mail 01** — Assunto: "Como clínicas estão eliminando o custo com impressão de exames"
**E-mail 02** — Assunto: "Seu sistema de imagem está limitando seu crescimento (e aumentando seus custos)?"
**E-mail 03** — Assunto: "Sua clínica está protegida contra custos operacionais e falhas de conformidade?"
**WhatsApp 01–05**: reforços curtos (D2, D4, D6, D8, D10) com textos literais do documento.
**LinkedIn 01–02**: primeira abordagem + proposta de 7 dias (textos literais).
**Roteiro de ligação**: gatekeeper + decisor (texto literal).
Variáveis: {{primeiro_nome}}, {{empresa}}, {{seu_nome}}, {{nome_do_decisor}}.
Todos entram APROVADOS (aprovado_por: Igor Alves Leandro) — a fonte é o material oficial da Higia.

## 6. Limites e configuração geral
- Amostra mínima do piloto: 100 leads (SPEC-1-007; Q-18 pendente para o mínimo de contatos efetivos).
- Domínios pessoais bloqueados: lista já aplicada (24 domínios).
- Feriados 2026–2027: já aplicados (22 datas).
- Canais de e-mail e WhatsApp: DESLIGADOS até prova de entrega (SPEC-1-004/1-005).

## 7. Pendências (sem fonte — bloqueiam só a função que depende delas)
- **Q-02** horas da SDR → painel de produtividade.
- **Q-14** API de WhatsApp (Uazapi vs Meta) → SPEC-1-005 inteira.
- **Q-18** mínimo de contatos efetivos/100 → veredito do painel.
- **Lista de supressão**: os 18 clientes ativos entram bloqueados; 13 inativos NÃO entram (só ativos).
