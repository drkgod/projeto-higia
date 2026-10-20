# Estado atual — Adapta Cliente

- schema_version: adapta-cliente-state/v2
- task_id: SPEC-1-005 (whatsapp-uazapi) — código
- executor: Jarvis (ETHOS)
- owner_informativo: Dario Calçada
- spec: 04_fase-atual/specs (SPEC-1-005; decisões em 06_notas/decisao-whatsapp.md)
- etapa: codigo_implementado_e_provado — aguardando canal (Dario)
- autorizacao_implementacao: confirmada 2026-10-20 ("autorizo" — Igor Alves)
- teste_humano: provas T1–T6 por API em modo de teste (05_entregas/fase-1/spec-1-005/t1.md); teste de entrega real só após segredos/número
- verificacao_automatica: passou (QA 0.0.78–0.0.82 verde; versão final 4779a2b publicada)
- aprendizado: capturado (HMAC $security.hs256(valor, chave); rotas de hook sem /api; 1 routerAdd por arquivo)
- sistema: CRM_Higia
- skip_projeto: 62151
- skip_versao: 4779a2b (0.0.82)
- skip_publicacao: publicada:4779a2b em 2026-10-20T16:13:44Z
- pendente_github: fase.md (marcadores [/] das 2 tasks) e changelog — sincronizar ao ligar o canal
- ultima_acao: SPEC-1-005 implementada e provada em modo de teste (remetente + webhook de entrada); limpeza executada; fila real intacta
- proxima_acao: Dario ligar o canal (número dedicado, segredos UAZAPI_TOKEN/UAZAPI_URL, webhook, aquecimento); depois provas de entrega real (T7/T8) e SPEC-1-004 (e-mail)
- atualizado_em: 2026-10-20T13:20:00-03:00
