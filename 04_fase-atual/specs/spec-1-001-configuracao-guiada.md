# SPEC-1-001 — Configuração guiada do CRM (questionário do Maestro)

**Fase:** 1
**Status:** planejada (v1.2: configuração a partir dos documentos)
**Dono:** Dario Calçada (técnico) e Igor Alves (negócio), com o Maestro
**Origem no escopo:** fase 1, capacidade 1; D-03, D-04, D-08, D-13; RQ-001, RQ-002, RQ-004, RQ-010, RQ-016; CL-002, CL-PEND-003
**Degrau da solução:** recurso nativo da plataforma — coleções, regras de acesso, rotas e telas do próprio projeto Skip “CRM”.

## Contexto e decisões fechadas

- **Estado atual:** projeto Skip “CRM” criado em 29/09 e ligado ao repositório `Higia01/CRM_Higia`, só com o modelo em branco. A Higia mandou em 06/10 o material comercial (blueprint, processo outbound, guia do Apollo, cadência com WhatsApp, matriz de objeções, funil, indicadores), mas não confirmou os parâmetros.
- **Estado desejado:** o CRM tem usuários com papel, a base comum que as outras SPECs usam (registros de execução, eventos, alertas, ganchos de teste) e toda a configuração de negócio editável no admin, preenchida pelas respostas do Dario e do Igor ao questionário desta SPEC.
- **Decisões já fechadas:**
  - Parâmetros de negócio nunca ficam no código: ficam nas coleções desta SPEC e só mudam pelo admin.
  - A configuração sai dos documentos da Higia: o Maestro pede o material, lê, monta uma proposta com a fonte de cada item e o Igor revisa e aprova. Só vira pergunta o que não está em nenhum documento (marcado “pergunta” na tabela abaixo). A Higia sempre pode corrigir a proposta. Sem documento nem resposta, nada é preenchido: a função dependente fica bloqueada e o resto segue.
  - Detalhes técnicos de API (rotas, campos, limites) o Maestro tira da documentação oficial do provedor; nunca pergunta ao cliente.
  - Papéis: `admin` (Dario), `gestor` (Igor), `sdr`, `licitacao`. Cadastro público de usuário desligado.
  - Modo de teste começa ligado, com simulação dos provedores, e só é desligado pela SPEC-1-007.
  - Credenciais e tokens são gerados e digitados pelo Dario direto nos segredos do Skip; o Maestro nunca os vê.
- **Bloqueios:** nenhum para começar. Cada função posterior depende das perguntas indicadas.

## Resultado observável

O Igor abre a área de administração, vê o ICP do piloto com os fatores e pesos que ele respondeu, muda um peso e salva uma nova versão, sem ninguém mexer no código. O Dario vê os usuários, a matriz de acesso funcionando e o registro de todas as respostas do questionário.

## Limites e dependências

- **Inclui:** coleções `users` (campo `papel`), `produtos`, `icps`, `pipelines`, `cadencias`, `modelos_mensagem`, `configuracao`, `questionario`, `importacoes`, `eventos_webhook`, `alertas`; telas `/admin/*`; questionário; rotas de teste; catálogo de sinais da nota.
- **Fora de escopo:** captação e pontuação (SPEC-1-002); pipelines em uso e caixa (SPEC-1-003); envio por e-mail e WhatsApp (SPECs 1-004 e 1-005); PNCP (SPEC-1-006).
- **Entradas e pré-condições:** acesso do Maestro ao projeto Skip “CRM”; Dario e Igor disponíveis para responder.
- **Saídas/artefatos:** coleções, regras, telas e rotas no Skip; `06_notas/proposta-configuracao.md` com cada item, valor proposto, fonte (documento e trecho, resposta ou padrão) e aprovação; `06_notas/questionario-fase-1.md` com as poucas perguntas diretas e as respostas.
- **Dependências e responsáveis:** Dario coloca o material comercial da Higia em `01_documentos/material-comercial/` e manda a lista de CNPJs dos clientes atuais; Dario e Igor respondem as perguntas diretas; Igor revisa a proposta e aprova ICP, cadência e modelos.
- **Atores e permissões mínimas:** ver a matriz de acesso abaixo.
- **Superfícies/arquivos/configurações afetadas:** projeto Skip “CRM” (coleções, regras, `pb_hooks/`, telas `/admin/*`); `06_notas/questionario-fase-1.md`.
- **Risco e plano B:** Higia demora a responder → o Maestro pergunta na call de construção; pergunta pendente bloqueia só a função dependente.
- **Rollback ou reversão:** ICP, cadência e modelo são versionados; voltar é ativar a versão anterior.

## Dados e integrações

| Coleção | Campos | Regras |
|---|---|---|
| `users` (auth) | `name`, `email`, `papel` (`admin`/`gestor`/`sdr`/`licitacao`), `ativo`, `teste` (bool) | criar: só `admin` (cadastro público desligado); editar `papel` e `ativo`: só `admin`; o próprio usuário edita só `name` |
| `produtos` | `nome` (único), `descricao`, `ativo` | `admin`/`gestor` editam; usuários logados leem |
| `icps` | `nome`, `pipeline`, `produto`, `versao`, `ativo`, `filtros` (json: `tipos_unidade_cnes`, `cnaes`, `ufs`, `municipios`, `portes`), `fatores` (json: `{chave, parametro, peso}` com chaves do catálogo), `bloqueios` (json: chaves do catálogo), `limiar_acionavel`, `limiar_revisao`, `aprovado_por`, `aprovado_em` | `admin`/`gestor` editam; salvar cria nova versão; só uma ativa por pipeline; ativar exige aprovação |
| `pipelines` | `nome`, `tipo` (`privada`/`publica`), `etapas` (json: `{nome, ordem, tipo: aberta/reuniao_agendada/ganho/perdido}`), `motivos_perda` (json) | `admin`/`gestor`; pipeline privada exige uma etapa `ganho`, uma `perdido` e uma `reuniao_agendada`. A pipeline pública da fase 1 tem as etapas fixas da SPEC-1-006 |
| `cadencias` | `pipeline`, `nome`, `versao`, `ativa`, `teste` (bool), `passos` (json: `{ordem, dia, canal: email/whatsapp/ligacao/linkedin, modelo, tipo: auto/tarefa}`), `dias_uteis`, `janela_inicio`, `janela_fim`, `regra_esgotamento` (json: `{tipo: toques/dias_sem_resposta, valor, motivo_perda}`), `aprovado_por`, `aprovado_em` | `admin`/`gestor`; ativar exige aprovação e modelo aprovado em todo passo; `teste=true` só funciona com modo de teste e lê `dia` como minutos |
| `modelos_mensagem` | `canal` (`email`/`whatsapp`/`linkedin`), `nome`, `assunto`, `corpo` (variáveis `{{empresa}}`, `{{contato}}`, `{{cidade}}`, `{{produto}}`, `{{sdr}}`), `meta_template` (nome do modelo aprovado na Meta, quando aplicável), `versao`, `aprovado_por`, `aprovado_em`, `ativo` | `gestor` aprova; sem aprovação não é usado |
| `configuracao` | `chave` (única), `valor` (json), `versao`, `autor`, `vigente_desde`, `historico` (json) | escrita só por `admin`; `pausa_geral` também por `gestor`, pela rota `/backend/v1/admin/pausa` |
| `questionario` | `pergunta_id` (Q-NN), `origem` (`documento`/`pergunta`/`padrao`), `fonte` (documento e trecho, quando houver), `valor_proposto`, `status` (`pendente`/`proposto`/`aprovado`), `confirmado_por`, `confirmado_em`, `aplicado_em` | só `admin` |
| `importacoes` | `fonte`, `arquivo_hash`, `parametros`, `cursor`, `inseridos`, `atualizados`, `duplicados`, `rejeitados`, `erros` (json, sem dado pessoal), `autor`, `estado` | `admin`/`gestor` leem; hooks gravam. Também registra cada consulta ao PNCP (SPEC-1-006) |
| `eventos_webhook` | `provedor`, `evento_id` (único), `tipo`, `recebido_em`, `processado`, `resultado` | só hooks; `admin` lê. Usada pelas SPECs 1-004 e 1-005 |
| `alertas` | `tipo` (`falha_fonte`/`canal_pausado`/`silencio_webhook`/`pncp_pendente`/`resposta_sem_dono`/`exclusao_pedida`), `mensagem` (sem dado pessoal), `responsavel`, `status` (`aberto`/`resolvido`), `criado_em` | `admin`/`gestor` leem e resolvem; aparecem na caixa da SPEC-1-003 |

**Chaves de `configuracao`:** `modo_teste` (começa `true`); `simulacao` (`{ativa, respostas: {provedor: status}}`, só vale com modo de teste); `destinatarios_permitidos` (e-mails e números); `pausa_geral`; `canal_email_ativo` e `canal_whatsapp_ativo` (começam `false`; ligados pelas SPECs 1-004 e 1-005); `limite_diario_email`; `limite_diario_whatsapp`; `limite_diario_entrada_cadencia`; `feriados` (lista de datas); `dominios_pessoais` (lista fechada, ver SPEC-1-002); `email` (`{provedor, remetente_nome, remetente_endereco, dominio_respostas, assinatura}`); `whatsapp` (`{provedor, numero, decisao_em}`); `pncp` (`{ativo, modalidades, palavras, ufs}`); `contato_efetivo` (`{categorias}`); `minimo_publico`; `amostra_minima` (padrão 100); `linha_de_base` e `tempo_sdr` (SPEC-1-007); `clientes_cnpjs` (lista para o bloqueio “já é cliente”); `capacidade_sdr` (`{horas_dia}`). Toda mudança grava `versao`, `autor` e `vigente_desde` e guarda o valor anterior em `historico`. Chave ausente = comportamento mais restritivo (sem envio).

**Matriz de acesso:**

| Papel | Configuração | Clínicas e contatos | Oportunidades, atividades e tarefas | Pipeline pública | Painel |
|---|---|---|---|---|---|
| `admin` | tudo | tudo | tudo | tudo | tudo |
| `gestor` | ICP, pipelines, cadência, modelos, pausa geral | tudo, sem editar opt-out | tudo | tudo | tudo |
| `sdr` | só leitura | lê; revisa, aprova, corrige nota, descarta; não altera opt-out | só onde é responsável | não vê | só os próprios números |
| `licitacao` | não | não vê | não vê | lê e tria | não |

Rotas customizadas (`routerAdd`) exigem login (`$apis.requireAuth()`) e conferem o papel dentro do handler; regra de coleção não protege rota customizada. Rotas de webhook são a única exceção e usam token (SPECs 1-004 e 1-005).

**Catálogo de sinais da nota (o motor da SPEC-1-002 só avalia estas chaves):**

| Chave | Tipo | Fonte |
|---|---|---|
| `tem_tomografo`, `tem_ressonancia`, `tem_raio_x`, `tem_ultrassom` | fator | CNES equipamentos |
| `ate_n_equipamentos` (parâmetro n) | fator | CNES equipamentos |
| `uf_prioritaria`, `municipio_prioritario` | fator | CNES/Receita × lista do ICP |
| `porte_me`, `porte_epp`, `porte_demais` | fator | Receita (porte) |
| `cnae_imagem` | fator | Receita (CNAE 8640-2/04 a 8640-2/07) |
| `socio_identificado` | fator | Receita (QSA) |
| `site_informado` | fator | planilha ou Receita |
| `linkedin_decisor`, `instagram_ativo` | fator | marcado pela SDR na revisão |
| `cnpj_inativo` | bloqueio | Receita (situação cadastral) |
| `fora_das_ufs` | bloqueio | ICP |
| `ja_cliente` | bloqueio | `configuracao.clientes_cnpjs` |
| `unidade_publica` | bloqueio | natureza jurídica pública (Receita/CNES) |

**Ganchos de teste (só com `modo_teste=true` e papel `admin`):**
- `POST /backend/v1/teste/rodar/{job}`: roda sob demanda um agendamento (`captacao`, `cadencia`, `email`, `whatsapp`, `pncp`).
- `POST /backend/v1/teste/evento/{provedor}`: entrega um evento de exemplo ao mesmo tratamento do webhook, sem token, marcado como teste.
- `configuracao.simulacao`: com `ativa=true`, os clientes de API (BrasilAPI, CNES, PNCP, e-mail, WhatsApp) não chamam a rede; gravam a requisição em `importacoes` ou em `envios.simulado` e devolvem o status configurado (200, 204, 429 ou 500).
- `POST /backend/v1/teste/limpar`: apaga registros com `teste=true` e desativa usuários de teste.

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-01 | salvar ICP, cadência ou modelo | cria nova versão; a anterior fica guardada | — | D-03 |
| RN-02 | ativar ICP, cadência ou modelo | exige `aprovado_por` com papel `gestor` ou `admin` | — | D-08 |
| RN-03 | ICP ativo muda | organizações sem atividade são repontuadas (SPEC-1-002); as já abordadas mantêm a nota da versão usada | — | escopo fase 1 |
| RN-04 | pergunta sem resposta | `status=pendente`; nenhum valor gravado; função dependente bloqueada | — | DC-02 |
| RN-05 | `modo_teste=true` | nenhum envio sai para fora de `destinatarios_permitidos`; com `simulacao.ativa`, nada sai para a rede | — | segurança |

## Fluxo e regras

1. O Maestro cria as coleções, regras, a matriz de acesso, as rotas de teste e as telas `/admin`.
2. Grava a `configuracao` inicial: `modo_teste=true`, `simulacao.ativa=true`, `pausa_geral=false`, canais desligados, `amostra_minima=100`, `dominios_pessoais` e `feriados` nacionais de 2026 e 2027.
3. Pede os documentos, monta a proposta de configuração com a fonte de cada item, faz as perguntas diretas de uma vez e registra tudo em `questionario` e nos arquivos de `06_notas/`.
4. O Igor revisa a proposta numa sessão e aprova ICP, cadência e modelos na tela; o Maestro grava o que foi aprovado.

### Configuração a partir dos documentos

**Documentos que o Maestro pede ao Dario (colocar em `01_documentos/material-comercial/`):** blueprint estratégico, processo outbound, passo a passo do Apollo, processo outbound com WhatsApp, matriz de objeções, sales planning com o funil, template de rotina comercial e indicadores (a pasta que a Higia mandou em 06/10); lista de CNPJs dos clientes atuais (exportação do Dealwise ou do financeiro).

**Como o Maestro trabalha:** lê os documentos, preenche a tabela abaixo em `06_notas/proposta-configuracao.md` com o valor proposto e o trecho de onde tirou, apresenta ao Igor numa revisão só e grava no CRM o que for aprovado. Onde o documento não traz número, propõe o padrão indicado. Pergunta diretamente só os itens marcados “pergunta”, todos de uma vez, em linguagem simples.

| ID | Item | Como obter | Fonte ou padrão proposto | Quem confirma | Grava em | Bloqueia |
|---|---|---|---|---|---|---|
| Q-01 | Usuários e papéis, com e-mail | pergunta | — | Dario | `users` | login |
| Q-02 | Nome da SDR e horas por dia para a prospecção | pergunta | — | Dario | `users`, `capacidade_sdr` | limite de entrada na cadência |
| Q-03 | Produtos do piloto | documento | DMO e blueprint: PACS Apollo, Higia Report, Telerradiologia, Higia Care | Igor (revisão) | `produtos` | modelos com `{{produto}}` |
| Q-04 | Público do piloto e filtros | documento | guia do Apollo (ICP 01: clínicas de diagnóstico por imagem pequenas e médias, Norte e Nordeste primeiro) e C1 10:40; filtros com fonte: tipo de unidade CNES, CNAE de imagem, porte da Receita, UFs | Igor (aprova o ICP) | `icps.filtros` | captação |
| Q-05 | Sinais e pesos da nota | documento + proposta | critérios do blueprint (equipamentos de imagem, até 2 ou 3 equipamentos, região) e AC-005 (LinkedIn e Instagram marcados pela SDR); pesos propostos pelo Maestro | Igor (aprova o ICP) | `icps.fatores` | pontuação |
| Q-06 | Bloqueios e clientes atuais | documento | catálogo de bloqueios; lista de CNPJs dos clientes atuais | Igor (aprova o ICP) | `icps.bloqueios`, `clientes_cnpjs` | pontuação |
| Q-07 | Faixas da nota | padrão | proposta do Maestro a partir de uma amostra pontuada | Igor (aprova o ICP) | `icps.limiar_*` | pontuação |
| Q-08 | Etapas da pipeline privada | documento | sales planning: lista de leads, tentativa de contato, lead conectado, reunião agendada, reunião realizada, proposta, negociação, fechamento, perdido | Igor (revisão) | `pipelines.etapas` | pipelines |
| Q-09 | Motivos de perda | documento | vídeo da rotina (“sem conexão”), matriz de objeções e sales planning | Igor (revisão) | `pipelines.motivos_perda` | perda |
| Q-10 | Sequência da cadência, dias e horário | documento + padrão | processo com WhatsApp (D1 a D11); padrão: dias úteis, das 8h às 18h, feriados nacionais | Igor (aprova a cadência) | `cadencias`, `feriados` | cadência |
| Q-11 | Quando o lead vira “sem conexão” | pergunta | o material traz 4 regras diferentes (7 tentativas, 11 toques, 10 dias parado, 3 a 4 tentativas); qual vale? | Igor | `cadencias.regra_esgotamento` | esgotamento |
| Q-12 | Modelos de e-mail, WhatsApp e LinkedIn e frase de saída | documento + padrão | processo outbound e matriz de objeções; saída: “Pronto, você não vai mais receber mensagens da Higia por aqui.” | Igor (aprova os modelos) | `modelos_mensagem` | envio e tarefas de LinkedIn |
| Q-13 | Limites diários | padrão | entrada na cadência pela capacidade da SDR (Q-02); 20 envios por dia por canal no aquecimento | Igor (revisão) | `limite_diario_*` | cadência e envio |
| Q-14 | API e número de WhatsApp | pergunta | ler as consequências: **Uazapi** permite a primeira mensagem para quem nunca falou com a Higia, mas o número pode ser banido (aceite por escrito); **oficial da Meta** só para quem deu consentimento, com modelo aprovado pela Meta, e o WhatsApp frio vira tarefa da SDR | Dario, com o de acordo do Igor | `configuracao.whatsapp` | SPEC-1-005 |
| Q-15 | Domínio novo do e-mail | pergunta | serviço de envio conforme a decisão registrada; subdomínio de respostas `r.<domínio>` e assinatura (nome da SDR + Higia) propostos pelo Maestro | Dario | `configuracao.email` | SPEC-1-004 |
| Q-16 | Palavras, modalidades e estados das licitações | proposta | palavras derivadas dos produtos (PACS, laudo, telerradiologia, RIS, diagnóstico por imagem) mais “solução inovadora”; pregão eletrônico; dispensa fora (C1 16:50); todos os estados | Igor e Dario (revisão) | `configuracao.pncp` | SPEC-1-006 |
| Q-17 | Quem tria as licitações | pergunta | — | Dario | `users` (`licitacao`) | SPEC-1-006 |
| Q-18 | Mínimo de contatos efetivos a cada 100 e o que conta como contato efetivo | pergunta (mínimo) + documento (definição) | definição: sales planning (“lead conectado”) e categorias de ligação da SPEC-1-003; mínimo sugerido: 30 (kickoff) | Igor | `contato_efetivo`, `minimo_publico` | painel |
| Q-19 | Tempo hoje para montar 100 leads | documento | kickoff: cerca de 2 horas por dia montando lista | Igor (revisão) | `linha_de_base.tempo_100_leads` | painel |
| Q-20 | Contatos efetivos hoje a cada 100 | documento | kickoff: 5 a 10 a cada 100 | Igor (revisão) | `linha_de_base.contatos_efetivos_100` | painel |
| Q-21 | Clínica de teste do ciclo | padrão | CNPJ da própria Higia, e-mail do Dario e WhatsApp do Igor (de Q-01) | Dario (revisão) | `destinatarios_permitidos` | teste do ciclo (SPEC-1-007) |

**Perguntas diretas (as únicas):** Q-01, Q-02, Q-11, Q-14, Q-15, Q-17 e o mínimo da Q-18.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Igor responde Q-04 a Q-07 e aprova | ICP versão 1 ativo | — |
| Limite | Igor muda só um peso | versão 2 ativa; versão 1 guardada | voltar = ativar versão 1 |
| Falha | Q-12 sem resposta | modelos não aprovados; envio automático bloqueado | Maestro pergunta de novo |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC e o que já existe no projeto Skip “CRM” e em `07-sistemas/`.
2. **Alterar somente:** as coleções, regras, rotas e telas desta SPEC; `06_notas/questionario-fase-1.md`.
3. **Não alterar:** nada de captação, envio ou PNCP; nenhum valor de negócio sem resposta registrada.
4. **Executar nesta ordem:** coleções e regras → matriz de acesso → rotas de teste → telas `/admin` → `configuracao` inicial → documentos → proposta → perguntas diretas → revisão e aprovações do Igor → aplicar.
5. **Parar e pedir validação quando:** um documento contradiz outro ou contradiz uma resposta; o Igor não aprovou; alguém pede para gravar credencial no chat.
6. **Estado válido ao parar:** `modo_teste=true`, `simulacao.ativa=true`, canais desligados, respostas registradas e pendências listadas.

**Contexto técnico do Skip (PocketBase v0.36):** hooks em `pb_hooks/*.pb.js`; rotas com `routerAdd` sob `/backend/v1`, uma por arquivo; agendamentos com `cronAdd` em UTC, intervalo mínimo de 10 minutos e no máximo 30 minutos por execução; segredos com `$secrets.get("NOME")`; `$http.send` não lança erro em não-2xx, sempre conferir `statusCode`; nada de função compartilhada no topo do arquivo: dentro de cada handler, `require(`${__hooks}/lib/<arquivo>.js`)`. Regra de acesso vazia (`""`) é pública; coleção interna usa `null` ou filtro por papel. Comparar tokens com `$security.equal`. Logs nunca levam nome, e-mail, telefone ou token. Conteúdo vindo de fora (respostas, objeto de licitação) é mostrado como texto, nunca como HTML.

## Checklist de execução

- [ ] Coleções e regras da matriz de acesso, com cadastro público desligado.
- [ ] Rotas de teste e simulação funcionando só com modo de teste e `admin`.
- [ ] Telas `/admin` com versões e aprovação.
- [ ] `configuracao` inicial gravada.
- [ ] Documentos recebidos, proposta montada com fonte por item, perguntas diretas respondidas e pendências listadas.
- [ ] Evidências em `05_entregas/fase-1/spec-1-001/`.

## Critérios de aceite

- [ ] **CA-1-01:** cada usuário entra com o próprio login e vê só o que o papel permite (`sdr` não acessa `/admin`).
- [ ] **CA-1-02:** o Igor muda um peso do ICP no admin e uma nova versão fica ativa, com a anterior guardada, sem mudança de código.
- [ ] **CA-1-03:** ICP, cadência e modelo sem aprovação não ficam ativos.
- [ ] **CA-1-04:** cada item de configuração está registrado com a fonte (documento e trecho, resposta direta ou padrão aprovado), quem confirmou e quando; item sem fonte nem resposta aparece como pendente e não tem valor gravado.
- [ ] **CA-1-05:** com `modo_teste=true`, a configuração mostra a lista de destinatários permitidos e a simulação ligada.
- [ ] **CA-1-42:** sem login, nenhuma coleção devolve registros pela API; uma `sdr` não consegue mudar o próprio papel nem criar usuário; `licitacao` não lê clínicas nem oportunidades.

## TDD da SPEC

| ID | Etapa | CA | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|---|---|
| T1 | RED | CA-1-01, CA-1-42 | testes de acesso escritos antes das regras | como `sdr@exemplo.invalid`: abrir `/admin/icps`, salvar ICP, mudar o próprio `papel`; sem login: listar `organizacoes` | antes das regras, alguma ação passa (falha esperada) | `05_entregas/fase-1/spec-1-001/t1-red.md` |
| T2 | GREEN | CA-1-01, CA-1-42 | mesmas ações depois das regras | repetir T1, mais `licitacao@exemplo.invalid` lendo `organizacoes` | todas negadas (403 ou lista vazia) | `05_entregas/fase-1/spec-1-001/t2-green.md` |
| T3 | RED/GREEN | CA-1-03 | ativar ICP, cadência e modelo sem `aprovado_por` | salvar e marcar ativo | antes da RN-02 ativa; depois, recusado | `05_entregas/fase-1/spec-1-001/t3.md` |
| T4 | GREEN | CA-1-02 | mudar um peso como `gestor` | editar peso e salvar | versão N+1 ativa; N guardada | `05_entregas/fase-1/spec-1-001/t4.md` |
| T5 | GREEN | CA-1-04 | registrar Q-08 vinda de documento (com trecho), Q-11 vinda de pergunta e Q-12 ainda pendente | pelo fluxo de configuração | Q-08 com documento e trecho; Q-11 com a resposta e quem respondeu; Q-12 `pendente` sem valor em `modelos_mensagem` | `05_entregas/fase-1/spec-1-001/t5.md` |
| T6 | GREEN | CA-1-05 | conferir configuração inicial | abrir `/admin/configuracao` | `modo_teste`, `simulacao.ativa` e lista permitida visíveis | `05_entregas/fase-1/spec-1-001/t6.png` |
| T7 | REFACTOR/REGRESSÃO | CA-1-02, CA-1-42 | voltar versão e repetir T2 | ativar versão anterior; rodar T2 | versão anterior ativa; acessos continuam negados | `05_entregas/fase-1/spec-1-001/t7-regressao.md` |

**Dados/fixtures:** usuários de teste `admin@exemplo.invalid`, `gestor@exemplo.invalid`, `sdr@exemplo.invalid`, `licitacao@exemplo.invalid`, todos com `teste=true` e desativados pela rota de limpeza no fim; ICP de teste com 3 fatores e 1 bloqueio.
**Caminhos de erro obrigatórios:** papel ausente; pipeline sem etapa `ganho`, `perdido` ou `reuniao_agendada`; modelo sem aprovação; chave de configuração ausente.

**Evidência exigida:** arquivos acima, sem token de sessão nem senha.

## Teste humano do cliente

- **Origem:** não aplicável nesta SPEC (o teste do ciclo, CL-007, está na SPEC-1-007).

## Handoff e operação

- **Como demonstrar:** Igor muda um peso e mostra a nova versão ativa.
- **Como operar depois:** Igor mantém ICP, cadência e modelos; Dario mantém usuários e configuração.
- **Como monitorar:** tela de configuração com modo de teste, pausa geral, canais e pendências; tela de alertas.
- **Pendência conhecida:** perguntas sem resposta ficam listadas.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| ed14fa15-ebe9-480c-8594-5cdea093763a | Criar os usuários e papéis do CRM | Dario | SPEC-1-001 | CA-1-01, CA-1-42 | T1, T2 | `t2-green.md` | Q-01 respondida | ☐ |
| ffe9ee34-5704-4f54-adee-b29b1ab0dab0 | Montar a área de administração do CRM | Dario | SPEC-1-001 | CA-1-02, CA-1-03, CA-1-05 | T3, T4, T6, T7 | `t4.md`, `t6.png` | coleções criadas | ☐ |
| 65b55cab-5caa-4970-8cc5-bfa82f31cd6e | Configurar o CRM a partir do material da Higia | Dario e Igor | SPEC-1-001 | CA-1-04 | T5 | `06_notas/proposta-configuracao.md` | área de administração pronta | ☐ |
| 2681936e-0542-41ad-8e3b-52ac593464e9 | Colocar o material comercial da Higia no projeto | Dario | SPEC-1-001 | CA-1-04 | documentos em `01_documentos/material-comercial/` | lista de arquivos | — | ☐ |
| be2b72dd-216a-483d-9816-11fe4b79d3f5 | Montar a proposta de configuração a partir dos documentos | Dario | SPEC-1-001 | CA-1-04 | T5 (itens de documento e padrão) | `06_notas/proposta-configuracao.md` | documentos no projeto | ☐ |
| 80f640c2-c65c-4120-8c60-78e1432d1744 | Responder as perguntas que os documentos não respondem | Dario e Igor | SPEC-1-001 | CA-1-04 | T5 (itens de pergunta) | `06_notas/questionario-fase-1.md` | — | ☐ |
| 46c1f544-708e-4276-9b39-16453419c124 | Revisar a proposta de configuração com o Igor | Igor | SPEC-1-001 | CA-1-04 | T5 | proposta com aprovação registrada | proposta montada | ☐ |
| 26ae5e08-8a63-4253-8899-84c6faebb00f | Aplicar no CRM a configuração aprovada | Dario | SPEC-1-001 | CA-1-04 | T5 e T6 | configuração gravada com fonte | revisão feita | ☐ |
| 93c8bd88-d29b-4475-8620-0b6af5be7c09 | Aprovar o ICP do piloto no admin | Igor | SPEC-1-001 | CA-1-02, CA-1-03 | T3, T4 | ICP v1 ativo e aprovado | Q-04 a Q-07 definidos | ☐ |
| 707256db-964b-49da-ab6e-8fc35a7fae49 | Aprovar a cadência e os modelos de mensagem | Igor | SPEC-1-001 | CA-1-03 | T3 | cadência e modelos ativos e aprovados | Q-08 a Q-13 definidos | ☐ |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-10-13 | consultor | v1.2 | configuração tirada dos documentos da Higia e aprovada numa revisão; só 7 itens viram pergunta direta; detalhes de API pela documentação oficial |
| 2026-10-13 | painel gerar-specs | v1.1 | matriz de acesso, base comum (eventos, alertas, execuções), ganchos de teste, catálogo de sinais, Q-20 e Q-21, chaves de canal |
