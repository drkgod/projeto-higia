// pocketbase/hooks/revisao_sdr.js
// Task a1326b8f (SPEC-1-002): ações da revisão da SDR — rota
// POST /backend/v1/clinicas/{id}/acao (papel sdr/admin/gestor) + gancho teste/semear/t7.
// Ações: aprovar (RN-12), corrigir_nota (CA-1-10; motivo_status=correcao_sdr protege da
// repontuação), descartar/reabrir (RN-07), sinais, contato_principal (RN-11) e editar_dados
// (complemento autorizado pelo Igor 16/10: CNPJ com consulta BrasilAPI na hora — recusa
// duplicado e não inventa dado se a Receita recusar; equipamentos com fonte "informado_sdr";
// e-mail/telefone/site da empresa; repontua na hora com o ICP ativo).
// Toda ação grava em alteracoes (RN-14) — gravação feita pelo servidor.
// (Espelho de referência — conteúdo completo no projeto Skip 62151, versão b30e4fc.)
