# Mapa — CRM_Higia (versão Skip 4aae7ec)

## Rotas
| Rota | Página | Componentes principais | Serviços |
|---|---|---|---|
| `/login` | src/pages/Login.tsx | Card, Input, Label, Button | services/auth (entrar) |
| `/` | src/pages/Index.tsx | — | services/auth (usuarioAtual) |
| `/admin/*` | src/pages/Admin.tsx | Guard (exigeAdmin) | services/auth (podeAcessarAdmin) |
| `*` | src/pages/NotFound.tsx | — | — |

Guardas: `src/components/Guard.tsx` — sem login → `/login`; `/admin/*` exige admin ou gestor;
sem permissão → `src/pages/SemPermissao.tsx`.

## Coleções
| Coleção | Campos principais | Regras de acesso (list/view/create/update/delete) |
|---|---|---|
| users (auth) | name, avatar, papel (select admin/gestor/sdr/licitacao), ativo, teste | admin+gestor listam; self view; create só admin; update admin ou self sem papel/ativo/teste; delete admin |
| produtos | nome, descricao, ativo | leitura interna (exceto licitacao); escrita admin/gestor |
| icps | nome, versao, ativo (esqueleto) | leitura interna; escrita admin/gestor |
| pipelines | nome, tipo privada/publica (esqueleto) | leitura interna; escrita admin/gestor |
| cadencias | nome, versao, ativa, teste (esqueleto) | leitura interna; escrita admin/gestor |
| modelos_mensagem | canal, nome, versao, aprovado_por, ativo (esqueleto) | leitura interna; escrita admin/gestor |
| configuracao | chave (único), valor json, versao, autor | leitura interna; escrita só admin |
| questionario | pergunta_id, origem, fonte, valor_proposto, status | só admin |
| importacoes | fonte, estado, inseridos/duplicados/rejeitados | leitura admin/gestor; escrita hooks/superuser |
| eventos_webhook | provedor, evento_id (único), tipo, processado | leitura admin; escrita hooks/superuser |
| alertas | tipo, mensagem, responsavel, status | leitura admin/gestor; update admin/gestor; create/delete hooks/superuser |
| organizacoes | nome, cnpj, uf (esqueleto) | leitura interna; escrita definida na SPEC-1-002 |

Migrações: 0001_usuarios_e_acessos (schema + regras), 0002_seed_usuarios_higia (usuários reais).

## Componentes reutilizáveis do projeto
- `src/components/Layout.tsx` — shell com cabeçalho (nome, papel, Sair).
- `src/components/Guard.tsx` — guarda de rota por login/papel.
- `src/components/ui/*` — biblioteca shadcn completa (não editar).
- `src/services/auth.ts` — autenticação e usuários (única porta de dados).
- `src/lib/pocketbase/client.ts` (não editar), `errors.ts` (getErrorMessage/extractFieldErrors),
  `schema.json`.

## Padrões observados
- React + TypeScript + Vite + Tailwind + shadcn/ui; react-router-dom no `App.tsx`.
- Componentes não chamam `pb` direto: dados só por `src/services/`.
- Erros sempre em PT-BR, traduzidos em `services/auth.ts` (traduzErroLogin/traduzErroGeral).
- Rotas declaradas em `src/App.tsx` dentro de `<Route element={<Layout />}>`; `/login` fora.

## Arquivos gerados que não se editam
`.skip.config.json`, `src/lib/pocketbase/client.ts`, `src/lib/pocketbase/errors.ts`,
`src/hooks/use-realtime.ts`, `src/components/ui/*`, `package.json`, lockfiles, `vite.config.ts`,
`tsconfig*.json`, `.oxlintrc.json`.
