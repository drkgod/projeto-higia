# Mapa — CRM_Higia (versão Skip 471668d)

## Rotas
| Rota | Página | Componentes principais | Serviços |
|---|---|---|---|
| `/login` | src/pages/Login.tsx | Card, Input, Label, Button | services/auth (entrar) |
| `/` | src/pages/Index.tsx | — | services/auth (usuarioAtual) |
| `/admin` | src/pages/admin/AdminLayout.tsx (Guard exigeAdmin) | AdminInicio (cards de resumo) | — |
| `/admin/produtos` | src/pages/admin/Produtos.tsx | ConfirmarExclusao | services/admin-entidades |
| `/admin/icps` | src/pages/admin/Icps.tsx | catálogo de fatores/bloqueios | services/admin-entidades |
| `/admin/pipelines` | src/pages/admin/Pipelines.tsx | editor de etapas | services/admin-entidades |
| `/admin/cadencias` | src/pages/admin/Cadencias.tsx | editor de passos | services/admin-entidades |
| `/admin/modelos` | src/pages/admin/Modelos.tsx | variáveis {{...}} | services/admin-entidades |
| `/admin/configuracao` | src/pages/admin/Configuracao.tsx | AlertDialog da pausa | services/admin-configuracao (pausaGeral) |
| `/admin/usuarios` | src/pages/admin/Usuarios.tsx | — | services/auth (CRUD) |
| `/admin/alertas` | src/pages/admin/Alertas.tsx | — | services/admin-configuracao |
| `/admin/execucoes` | src/pages/admin/Execucoes.tsx | — | services/admin-configuracao |
| `/admin/eventos` | src/pages/admin/Eventos.tsx | — | services/admin-configuracao |
| `/admin/questionario` | src/pages/admin/Questionario.tsx | — | services/admin-configuracao |
| `*` | src/pages/NotFound.tsx | — | — |

Guardas: `src/components/Guard.tsx` — sem login → `/login`; `/admin/*` exige admin ou gestor;
sem permissão → `src/pages/SemPermissao.tsx`. AdminLayout: menu lateral (Sheet no celular).

## Coleções (13 + users)
| Coleção | Campos principais | Regras de acesso |
|---|---|---|
| users (auth) | name, papel, ativo, teste | admin+gestor listam; self view; create só admin; update admin ou self sem papel/ativo/teste; delete admin |
| produtos | nome, descricao, ativo | leitura interna; escrita admin/gestor |
| icps | nome, pipeline, produto, versao, ativo, filtros, fatores, bloqueios, limiares, aprovado_por/em, teste | leitura interna; escrita admin/gestor + hooks RN-01/RN-02 |
| pipelines | nome, tipo, etapas, motivos_perda, teste | leitura interna; escrita admin/gestor; privada exige ganho/perdido/reunião (hook em breve — validação hoje no formulário) |
| cadencias | pipeline, versao, ativa, passos, dias_uteis, janela, regra_esgotamento, aprovado_por/em, teste | leitura interna; escrita admin/gestor + hooks RN-01/RN-02 |
| modelos_mensagem | canal, nome, assunto, corpo, meta_template, versao, aprovado_por/em, ativo, teste | leitura interna; escrita admin/gestor + hooks RN-01/RN-02 |
| configuracao | chave (único), valor (json), versao, autor, vigente_desde, historico | leitura interna; escrita só admin; pausa_geral via rota (admin/gestor) |
| questionario | pergunta_id, origem, fonte, valor_proposto, status, confirmado_por/em, aplicado_em | só admin |
| importacoes | fonte, estado, inseridos/duplicados/rejeitados/atualizados, erros, autor, teste | leitura admin/gestor; escrita hooks/superuser |
| eventos_webhook | provedor, evento_id (único), tipo, processado, recebido_em, resultado, teste | leitura admin; escrita hooks/superuser |
| alertas | tipo, mensagem, responsavel, status | leitura admin/gestor; update admin/gestor; create/delete hooks/superuser |
| organizacoes | nome, cnpj, uf (esqueleto) | leitura interna; escrita definida na SPEC-1-002 |

## Hooks do servidor (pocketbase/hooks/)
| Arquivo | Gatilho | Função |
|---|---|---|
| icps_create.js / icps_update.js | create/update request em icps | RN-01/RN-02: aprovação obrigatória para ativar, catálogo fechado, único ativo por pipeline, versão guardada imutável |
| cadencias_create.js / cadencias_update.js | create/update request em cadencias | idem + modelo aprovado em todo passo automático + janela HH:mm + esgotamento |
| modelos_create.js / modelos_update.js | create/update request em modelos_mensagem | idem (identidade canal+nome) |
| admin_pausa.js | POST /backend/v1/admin/pausa | pausa geral com versão/autor/histórico |
| teste_rodar.js | POST /backend/v1/teste/rodar/{job} | gancho de teste (só modo_teste + admin) |
| teste_evento.js | POST /backend/v1/teste/evento/{provedor} | gancho de teste de evento (sem token, só modo_teste) |
| teste_limpar.js | POST /backend/v1/teste/limpar | apaga teste=true e desativa usuários de teste |

## Componentes reutilizáveis do projeto
- `src/pages/admin/AdminLayout.tsx` — shell com menu de 2 grupos (Sheet no celular).
- `src/components/admin/Estados.tsx` — EstadoCarregando/EstadoErro/EstadoVazio.
- `src/components/ConfirmarExclusao.tsx` — AlertDialog de exclusão.
- `src/components/Layout.tsx` — cabeçalho global (nome, papel, Sair).
- `src/components/Guard.tsx` — guarda de rota por login/papel.
- `src/services/auth.ts`, `admin-entidades.ts`, `admin-configuracao.ts` — única porta de dados.
- `src/lib/mensagens-erro.ts`, `src/lib/formatos.ts` — erros PT-BR e formatos PT-BR.

## Padrões observados
- React + TypeScript + Vite + Tailwind + shadcn/ui; react-router-dom no `App.tsx`.
- Componentes não chamam `pb` direto: dados só por `src/services/`.
- Erros sempre em PT-BR; estados carregando/vazio/erro em toda lista.
- Campos JSON no servidor lidos com JSON.parse(getString()) (AP-2026-10-14-1605).

## Arquivos gerados que não se editam
`.skip.config.json`, `src/lib/pocketbase/client.ts`, `src/lib/pocketbase/errors.ts`,
`src/hooks/use-realtime.ts`, `src/components/ui/*`, `package.json`, lockfiles, `vite.config.ts`,
`tsconfig*.json`, `.oxlintrc.json`.
