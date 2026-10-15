# Mapa — CRM_Higia (versão Skip 45dce2d)

## Rotas
| Rota | Página | Observações |
|---|---|---|
| `/login` | src/pages/Login.tsx | navegação por papel após entrar |
| `/` | src/pages/Index.tsx (Guard) | botões Clínicas + Administração (por permissão) |
| `/clinicas` | src/pages/Clinicas.tsx (Guard) | fila com nota, filtros, busca, paginação; botão Início |
| `/clinica/:id` | src/pages/ClinicaDetalhe.tsx (Guard) | nota fator por fator + fonte por campo |
| `/admin` | AdminLayout (Guard exigeAdmin) | menu desktop + Sheet no celular; botão Início no topo |
| `/admin` (index) | AdminInicio | — |
| `/admin/produtos` `/admin/icps` `/admin/pipelines` `/admin/cadencias` `/admin/modelos` | telas de configuração | versionamento e aprovação |
| `/admin/configuracao` | Configuracao | switches modo teste/simulação/canais |
| `/admin/usuarios` | Usuarios | editar/excluir com confirmação |
| `/admin/alertas` `/admin/execucoes` `/admin/eventos` `/admin/questionario` | operação | — |
| `/admin/importar` | Importar | upload CSV + relatório |
| `/admin/captacao` | Captacao | rodar CNES/CNPJ + histórico de lotes |

## Coleções
| Coleção | Campos principais | Regras (resumo) |
|---|---|---|
| users | papel (admin/gestor/sdr/licitacao), ativo, teste | authRule bloqueia desativado |
| produtos, icps, pipelines, cadencias, modelos_mensagem | versao, ativo, aprovado_por/em, historico | versão ativa imutável; ativar exige aprovação |
| configuracao | chave/valor (modo_teste, simulacao, feriados, dominios_pessoais, cnpjs_clientes…) | escrita via hook configuracao_update |
| importacoes | fonte, estado, inseridos/duplicados/rejeitados, erros, arquivo_hash, autor, teste | hash recusa reenvio |
| eventos_webhook, alertas | — | — |
| organizacoes | nome (obrigatório), cnpj/cnpj_raiz, cnes, razao_social, nome_fantasia, tipo_unidade, natureza_juridica, uf, municipio, porte, situacao_cadastral, cnae_principal, equipamentos (json), site, telefone_empresa, email_empresa, fontes (json), sinais_sdr, status, pontuacao, fatores_pontuacao, icp_versao, motivo_status, contato_principal, lote_importacao, teste | índice único cnpj; escrita por hooks/admin |
| contatos | organizacao, nome, cargo, papel, email, telefone, whatsapp, linkedin, fonte, confianca, optout_*, optin_*, excluido, teste | sdr edita; licitacao não vê |
| alteracoes | colecao, registro, campo, antes, depois, autor, quando, motivo | só admin escreve |
| supressao | codigo (HMAC), canal, motivo, quando | só admin |

## Hooks (pocketbase/hooks/)
| Arquivo | O que faz |
|---|---|
| pontuacao.js | rota /backend/v1/pontuacao/rodar + cron pontuacao_diaria (10:40 UTC): fila por -updated (teto 200), fatores com pesos do ICP ATIVO, bloqueios (natureza 1xxx; cnpj_inativo compara em minúsculas), canal válido RN-10, status RN-05/06/07, contato principal RN-11; fila reavalia descartadas por unidade_publica/nota_abaixo_do_limiar/cnpj_inativo |
| captacao_cnes.js | rota /backend/v1/captacao/rodar + cron captacao_diaria (10:00 UTC): CNES tipos 39/36/22, cursor em importacoes, RN-01, bloqueios ja_cliente (esfera NÃO descarta mais), fonte por campo, equipamentos (competência retroativa, teto 30 buscas/rodada) |
| captacao_cnpj.js | rota /backend/v1/captacao/cnpj + cron captacao_cnpj_diaria (10:20 UTC): BrasilAPI 1/s (teto 30); fila por fontes SEM captacao_receita_v2 (não por razao_social vazia — as 407 da planilha têm razão social); inclui descartadas por nota_abaixo_do_limiar e cnpj_inativo (re-consulta com mapeamento corrigido); porte = objeto {descricao} ou string; CNAE = cnae_fiscal_descricao; sócios como contatos |
| importar.js | rota /backend/v1/importar: CSV com hash, mapeamento modelo+RD, RN-01/RN-02 |
| icps_create/update, cadencias_*, modelos_* | versionamento e aprovação (pendência: icps_create não incrementa versao) |
| configuracao_update.js | trilha da configuração |
| admin_pausa.js | pausa geral |
| teste_evento, teste_limpar, teste_rodar, teste_semear_organizacoes | ganchos de teste (limpeza cobre contatos/organizacoes) |

## Padrões observados
- React + TS + Vite + Tailwind + shadcn; rotas em App.tsx; dados só por services/ ou pb.send para /backend/v1/*.
- Hooks: lógica inline nos callbacks (VM separada); res.json para corpo HTTP; campo json lido com JSON.parse(getString()); pesos/limiares lidos do registro ativo; fila com sort nativo (teto corta antes do sort em memória); marcador de "já processado" por fonte gravada pela própria rotina.
- Mensagens de erro em PT-BR; toasts sonner.

## Arquivos gerados que não se editam
.skip.config.json, src/lib/pocketbase/client.ts, src/lib/pocketbase/errors.ts, src/hooks/use-realtime.ts, src/components/ui/*, package.json, lockfiles, vite.config.ts, tsconfig*.json, .oxlintrc.json
