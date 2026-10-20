# Estado atual — Adapta Cliente

- schema_version: adapta-cliente-state/v2
- task_id: SPEC-1-004 (email) — código
- executor: Jarvis (ETHOS)
- owner_informativo: Dario Calçada
- spec: 04_fase-atual/specs (SPEC-1-004; domínio em 06_notas/decisao-whatsapp.md)
- etapa: codigo_implementado_e_provado — aguardando canal (Dario)
- autorizacao_implementacao: confirmada 2026-10-20 ("pode seguir" — Igor Alves)
- teste_humano: provas T1–T4 por API em modo de teste (05_entregas/fase-1/spec-1-004/t1.md); teste de entrega real só após SMTP/DNS
- verificacao_automatica: passou (QA 0.0.83–0.0.85 verde; versão final 726b246 publicada)
- aprendizado: capturado (mail client do PocketBase; HMAC $security.hs256(valor, chave); rotas de hook sem /api)
- sistema: CRM_Higia
- skip_projeto: 62151
- skip_versao: 726b246 (0.0.85)
- skip_publicacao: publicada:726b246 em 2026-10-20T17:58:11Z
- pendente_github: fase.md (marcadores [/] das 2 tasks de e-mail), STATUS e changelog — sincronizar
- ultima_acao: SPEC-1-004 implementada e provada em modo de teste (remetente + webhook de entrada); limpeza executada; fila real intacta
- proxima_acao: Dario ligar os canais (e-mail: conta+DNS+SMTP; WhatsApp: número+segredos+webhook); depois provas de entrega real (T7/T8)
- atualizado_em: 2026-10-20T15:00:00-03:00
