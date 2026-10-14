# Análise do material comercial — base para a proposta de configuração (task 65b55cab)

Data: 14/10/2026 · Material lido: 13 arquivos de 01_documentos/material-comercial/ + bases (clientes, leads).

## O que cada documento fornece (com fonte)

### 1. Produtos (Blueprint Estratégico)
- PACS (armazenamento/distribuição de imagens), Report (gestão de laudos), Telelaudo (corpo clínico terceirizado, 15 médicos especialistas).
- Modelo: MRR por porte + nº/tipo de equipamentos; sem taxa de setup/onboarding; implantação em 7 dias; ANVISA como diferencial.

### 2. ICP (Passo a passo Apollo)
- **ICP 01 — Clínicas de diagnóstico por imagem (PME)**: 1–50 funcionários; regiões Norte/Nordeste (prioridade); 2–3 equipamentos; dores: custo de película, lentidão, implantação rápida.
- **ICP 02 — Hospitais de médio porte / centros de telediagnóstico**: 51–500 funcionários; nacional; PACS robusto ou telelaudo terceirizado.
- Filtros Apollo: Industry (Hospital & Health Care, Medical Practice, Medical Equipment), keywords (clínica de imagem, ultrassom, radiologia...).

### 3. Bloqueios (Blueprint + Cadastro de Clientes)
- Já é cliente: lista de 18 CNPJs ativos (Higia_clientes_ativos.csv) — inclui unidades públicas (Prefeitura de Parnaíba, ISACs, UPA, SESC).
- Unidade pública: bloqueio adicional da SPEC (CA-1-40) — coincide com a lista de clientes ISAC.
- CNPJ inativo: da Receita (SPEC-1-002).

### 4. Pipeline (Sales Planning + Funil.xlsx — abas 1 e 2)
- Pré-vendas: Lista de Leads → Tentativa de Contato (estagnação 10 dias; motivo de perda: Sem conexão) → Lead Conectado (5 dias) → Reunião agendada (3 dias; motivo: No-show).
- Vendas: Reunião realizada (2 dias) → Proposta (5 dias) → Negociação (5 dias) → Fechamento.
- Ferramentas citadas: Apollo, Snovio, Lusha, CRM, ClickUp, Agenda.

### 5. Cadência (Processo Outbound com WhatsApp — 11 dias, multicanal)
- D1 LinkedIn 01 / D2 WhatsApp 01 / D3 LinkedIn 02 / D4 WhatsApp 02 / D5 Email 01 / D6 WhatsApp 03 / D7 Email 02 / D8 WhatsApp 04 / D9 Email 03 / D10 WhatsApp 05 / D11 Ligação.
- WhatsApp como reforço do canal anterior (maior taxa de resposta).
- Esgotamento: 10 dias sem resposta (Q-11 respondido pelo Igor em 13/10).

### 6. Modelos de mensagem (Outbound + Matriz de Objeções WhatsApp)
- LinkedIn 01 e 02, WhatsApp 01–05, Email 01–03 (assuntos definidos), roteiro de ligação com gatekeeper e decisor.
- Metodologia AIDA + gatilhos mentais; variáveis: {{primeiro_nome}}, {{empresa}}, {{seu_nome}}, {{nome_do_decisor}}.
- Matriz de objeções: princípios (agilidade, validar antes de rebater, mensagens curtas, reconduzir ao agendamento, nunca condições comerciais por WhatsApp).

### 7. Indicadores (Template Rotina Comercial + Indicadores Dealwise + Análise Crítica)
- Taxas de conexão, agendamento e comparecimento "abaixo do esperado" (baseline da operação atual).
- Rotinas: weekly, daily, acompanhamento de pipe.

## Pendências sem fonte documental (perguntas ao Igor na proposta)
- Q-02: horas da SDR por semana.
- Q-14: API de WhatsApp (Uazapi vs Meta) — bloqueia SPEC-1-005.
- Q-18: mínimo de contatos efetivos a cada 100 — bloqueia o painel da SPEC-1-007.
