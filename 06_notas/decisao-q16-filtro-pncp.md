# Q-16 — Filtro de licitações do PNCP (decisão do Igor, 20/10/2026)

Fontes: API pública do PNCP (modalidades e consulta testadas em 20/10); varredura real do dia
14/10/2026 (450 contratações de pregão eletrônico, 5 matches com as palavras específicas —
incluindo 1 do PI: ultrassonografia, 06554018000111-1-000021/2026). Sem fonte no material
comercial para modalidades/UFs — decisão do Igor registrada abaixo.

## Palavras (RN-01: até 4 letras casa como palavra inteira; mais longa casa como trecho)
- PACS (4 letras — palavra inteira)
- RIS (3 letras — palavra inteira; "riscos" NÃO casa — regra provada)
- telerradiologia
- radiologia
- raio-x (casa também "raio x" pela normalização)
- tomografia
- ultrassonografia
- mamógrafo
- laudo

## Modalidades (código PNCP — dispensa (8) NUNCA consultada, RN-04)
- 6 — Pregão - Eletrônico
- 4 — Concorrência - Eletrônica
- 7 — Pregão - Presencial
- 5 — Concorrência - Presencial

## UFs
- Lista vazia = todas as UFs (RN-02). Decisão: começar com todas (a Higia já atende fora do
  PI e a triagem humana filtra); ajustável no admin a qualquer momento (CA-1-29).

## Configuração gravada (configuracao.pncp)
```json
{
  "ativo": true,
  "palavras": ["PACS","RIS","telerradiologia","radiologia","raio-x","tomografia","ultrassonografia","mamógrafo","laudo"],
  "modalidades": [6, 4, 7, 5],
  "ufs": []
}
```