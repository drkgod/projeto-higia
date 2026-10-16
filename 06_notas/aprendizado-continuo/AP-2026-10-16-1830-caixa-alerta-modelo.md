# AP-2026-10-16-1830 — alerta com campos errados e campo de modelo trocado

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia) · Task/SPEC: b19368a9 · SPEC-1-003
- Sinal 1: gravar em coleção com campos inexistentes dentro de try/catch falha em silêncio — o alerta de exclusão nunca era criado. Regra: nunca engolir erro de escrita em fluxo de regra de negócio; conferir o schema da coleção (mensagem/responsavel/status) antes de gravar.
- Sinal 2: o motor lia modelos_mensagem.conteudo, mas o campo real é corpo (assunto/corpo/meta_template). Regra: campo de texto de modelo é `corpo`; conferir schema antes de ler.
- Evidência: alertas pendentes zerados antes; após correção gravou. T8c com mensagem real do modelo.
- Confiança: alta.
- Privacidade: sem segredo.
