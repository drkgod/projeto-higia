# Higia Tecnologia — Fase 1

Este pacote contém a fase atual do CRM de prospecção da Higia: 7 SPECs com critérios, testes e limites, e 36 tasks. Foi preparado em 13/10/2026 e publicado no repositório privado `drkgod/projeto-higia`. Não é evidência de construção nem de aceite.

## Começar

1. Leia `AGENTS.md` e `04_fase-atual/specs/00-INDICE.md`.
2. Na semana 1, faça as perguntas Q-14 e Q-15 e comece a comprar o domínio do e-mail e o número de WhatsApp, porque os dois precisam aquecer.
3. Comece pela SPEC-1-001: usuários e área de administração; depois peça ao Dario o material comercial (em `01_documentos/material-comercial/`), monte a proposta de configuração a partir dele e faça só as 7 perguntas diretas.
4. Escolha uma task em `04_fase-atual/fase.md`, leia a SPEC indicada, execute só aquela task, rode as provas e peça o teste humano antes de avançar.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `01_documentos/` | material comercial da Higia, lido pelo Maestro |
| `04_fase-atual/fase.md` | 36 tasks com ID do portal, descrição e prova |
| `04_fase-atual/specs/` | 7 SPECs da fase 1 e o índice com a ordem de execução |
| `05_entregas/` | evidências por SPEC (`fase-1/spec-1-00N/`) |
| `06_notas/` | proposta de configuração, perguntas diretas e decisões (WhatsApp, fontes); nunca preencher em nome do cliente |
| `07-sistemas/CRM_Higia/` | submódulo com o código do CRM (`Higia01/CRM_Higia`, ligado ao projeto Skip “CRM”) |

## Regras que valem sempre

- Modo de teste ligado até o teste do ciclo; nenhuma mensagem sai para fora da lista permitida.
- Senhas, chaves e tokens são digitados pelo Dario direto nos segredos do Skip; nunca por chat, Git ou evidência.
- LinkedIn e Instagram não são automatizados; licitação é só triagem.
