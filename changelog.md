# Changelog — Higia Tecnologia

## 13/10/2026 — Pacote da fase 1 preparado

- 7 SPECs (v1.1, revisadas por painel) e 36 tasks, com questionário guiado do Maestro na SPEC-1-001.
- Publicado no repositório privado `drkgod/projeto-higia`, com o código do CRM como submódulo em `07-sistemas/CRM_Higia/`.

## 13/10/2026 — Respostas do questionário e decisões do cliente

- Respostas literais registradas em `06_notas/questionario-fase-1.md` (Igor Alves, chat ETHOS).
- DECISÃO DO CLIENTE (validada na autorização da task ed14fa15): Q-01 papéis — Dario e Igor como `admin` (resposta original "admin e gestor" para ambos; o campo aceita um papel e admin inclui gestor); SDR Jesus Vasconcelos (comercial@) como `sdr`.
- DECISÃO DO CLIENTE (validada): Q-15 domínio — resposta literal `higiatec.com.br`; a SPEC pede domínio separado para aquecer; aprovado subdomínio dedicado (outbound.higiatec.com.br).
- Q-17: Igor e Dario triam as licitações — sem usuário dedicado com papel `licitacao` por ora.
- Q-11: "10 dias parados" → `regra_esgotamento` {tipo: dias_sem_resposta, valor: 10}.
- Pendentes: Q-02 (horas da SDR), Q-14 (API de WhatsApp — bloqueia SPEC-1-005), Q-18 (mínimo de contatos efetivos — bloqueia o painel da SPEC-1-007).

## 13/10/2026 · Jarvis (ETHOS) · Task ed14fa15 concluída: usuários e papéis do CRM

- Versão 4aae7ec aplicada e publicada (https://crmhigia-581c7.goskip.app) em 13/10 20:44 UTC; verificação automática verde (versões 0.0.4 6b5a35a e 0.0.5 4aae7ec).
- Migrações 0001 (schema + matriz de acesso, cadastro público desligado) e 0002 (usuários: Dario/Igor admin, Jesus Vasconcelos sdr) aplicadas e confirmadas na instância.
- Login, guardas de rota por papel e área /admin com acesso controlado; provas T1/T2 em 05_entregas/fase-1/spec-1-001/ (t2-green.md: 15 casos contra o backend real, incluindo caminhos de erro).
- Teste humano aprovado pelo Igor (13/10). DECISÃO DO CLIENTE: papéis admin para Dario e Igor e sdr para Jesus (comercial@); subdomínio dedicado outbound.higiatec.com.br para a cadência de e-mail.
- Achado registrado: senha provisória de primeiro acesso semeada na migration 0002 — cada usuário troca no primeiro login; tela de troca de senha fica como melhoria para task futura.
