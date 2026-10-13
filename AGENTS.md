# Instruções para execução da fase atual

Leia `04_fase-atual/fase.md` e o índice de `04_fase-atual/specs/`. A SPEC define resultado, limites, dependências, critérios e prova. Não execute todas as tasks em lote.

## Uma task por vez

- Escolha uma task aberta cuja dependência esteja comprovada; preserve o ID existente.
- Leia toda a SPEC, implemente só o recorte da task e execute RED/GREEN/regressão aplicáveis.
- Registre evidência em `05_entregas/fase-1/spec-1-00N/`, no caminho da SPEC.
- Mostre o resultado esperado e peça o teste humano aplicável. Só conclua depois de prova e confirmação explícita. Silêncio e ausência de erro relatado não aprovam.
- Se o teste falhar, mantenha a task aberta, corrija na SPEC de origem e repita a prova. Não comece a próxima task antes do gate.

## Configuração a partir dos documentos

Não pergunte o que já está escrito. Peça ao Dario o material comercial da Higia (em `01_documentos/material-comercial/`), leia e monte `06_notas/proposta-configuracao.md` com o valor e o trecho de origem de cada item; o Igor aprova numa revisão. Pergunte diretamente só os 7 itens de `06_notas/questionario-fase-1.md`. Detalhes de API (rotas, campos, limites) saem da documentação oficial do provedor, nunca de pergunta ao cliente. Sem fonte nem resposta, não preencha: deixe a função dependente bloqueada e siga com o resto.

## Limites

- Código no projeto Skip “CRM”, sincronizado com `Higia01/CRM_Higia`, que está neste repositório como submódulo em `07-sistemas/CRM_Higia/`.
- Modo de teste ligado até o teste do ciclo (SPEC-1-007); nenhum envio para fora da lista permitida.
- Resposta, recusa ou opt-out em qualquer canal pausa todos os canais. Opt-out vale para sempre.
- LinkedIn e Instagram nunca são automatizados. Licitação é só triagem: nada de proposta, documento ou participação.
- Credenciais são digitadas pela pessoa direto nos segredos do Skip; nunca copiar para chat, Git ou evidência.
- Sem dados de pacientes ou prontuário.

## Sincronização

`04_fase-atual/fase.md` é a projeção operacional dos cards. Preserve status, responsável, prazo, descrição, hierarquia, visibilidade e ID em qualquer merge; task nova aguarda ID do portal. Não adicionar documentos privados do consultor ou fases futuras a esta pasta. Não publicar nem alterar permissões sem autorização explícita.
