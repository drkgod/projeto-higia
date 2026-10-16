# AP-2026-10-16-1400 — registro semeado sem campo required e PATCH recusado

- Status: candidato
- Escopo: projeto do cliente (CRM_Higia) · Task/SPEC: 2da63fc2 · SPEC-1-003
- Sinal: a migration 0002 semeou usuários com e-mail vazio (burlando o required via superuser); depois o PATCH via API recusa (validation_values_mismatch) e o CREATE com o mesmo e-mail recusa por unique mesmo com o usuário desativado. Correção: gravação por hook ($app.save) — servidor ignora as regras de API.
- Sinal 2: emailVisibility=false esconde o e-mail na listagem mesmo para admin — buscar usuário por e-mail via filtro falha silenciosamente; buscar por nome.
- Evidência: correção do e-mail da SDR (maria.jesus@higiatec.com.br) provada com 200.
- Regra reutilizável: (1) dado semeado por migration com campo required vazio só se corrige por hook/servidor; (2) e-mail de usuário com emailVisibility=false não é filtrável — usar nome.
- Confiança: alta — provado na mesma task.
- Privacidade: sem segredo; e-mail institucional informado pelo próprio Igor.
