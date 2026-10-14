# Mapa — CRM_Higia (versão Skip eb2114f)

## Rotas
| Rota | Página | Observações |
|---|---|---|
| `/login` | src/pages/Login.tsx | — |
| `/` | src/pages/Index.tsx (Guard) | — |
| `/admin` | AdminLayout (Guard exigeAdmin) | menu desktop + Sheet no celular |
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
| organizacoes | nome (obrigatório), cnpj/cnpj_raiz, cnes, razao_social, nome_fantasia, tipo_unidade, uf, municipio, porte, situacao_cadastral, cnae_principal, equipamentos (json), site, telefone_empresa, email_empresa, fontes (json), sinais_sdr, status, pontuacao, fatores_pontuacao, motivo_status, contato_principal, lote_importacao, teste | índice único cnpj; escrita por hooks/admin |
| contatos | organizacao, nome, cargo, papel, email, telefone, whatsapp, linkedin, fonte, confianca, optout_*, optin_*, excluido, teste | sdr edita; licitacao não vê |
| alteracoes | colecao, registro, campo, antes, depois, autor, quando, motivo | só admin escreve |
| supressao | codigo (HMAC), canal, motivo, quando | só admin |

## Hooks (pocketbase/hooks/)
| Arquivo | O que faz |
|---|---|
| captacao_cnes.js | rota /backend/v1/captacao/rodar + cron captacao_diaria (10:00 UTC): CNES tipos 39/36/22, cursor em importacoes, RN-01, bloqueios ja_cliente/unidade_publica, fonte por campo, equipamentos (competência retroativa, teto 30 buscas/rodada) |
| captacao_cnpj.js | rota /backend/v1/captacao/cnpj + cron captacao_cnpj_diaria (10:20 UTC): BrasilAPI 1/s (teto 30), completa dados + sócios; 404→em_revisao; 429/5xx adia |
| importar.js | rota /backend/v1/importar: CSV com hash, mapeamento modelo+RD, RN-01/RN-02 |
| icps_create/update, cadencias_*, modelos_* | versionamento e aprovação |
| configuracao_update.js | trilha da configuração |
| admin_pausa.js | pausa geral |
| teste_evento, teste_limpar, teste_rodar | ganchos de teste (limpeza cobre contatos/organizacoes) |

## Padrões observados
- React + TS + Vite + Tailwind + shadcn; rotas em App.tsx; dados só por services/ ou pb.send para /backend/v1/*.
- Hooks: lógica inline nos callbacks (VM separada); res.json para corpo HTTP; campo json lido com JSON.parse(getString()).
- Mensagens de erro em PT-BR; toasts sonner.

## Arquivos gerados que não se editam
.skip.config.json, src/lib/pocketbase/client.ts, src/lib/pocketbase/errors.ts, src/hooks/use-realtime.ts, src/components/ui/*, package.json, lockfiles, vite.config.ts, tsconfig*.json, .oxlintrc.json
