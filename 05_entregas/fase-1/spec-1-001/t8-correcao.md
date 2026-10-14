# T8 — Correção do teste humano (14/10) — provas da versão e645d88

Data: 2026-10-14 · Task ffe9ee34 · SPEC-1-001
Origem: teste do Igor na tela de Configuração ("não tem a opção de pausar o modo teste e simulação").

O que foi corrigido (versão 0.0.10, `e645d88`, publicada 16:48 UTC):
1. **Interruptores na tela** — Modo de teste, Simulação, Canal de e-mail e Canal de WhatsApp agora têm chave liga/desliga (antes só exibiam).
2. **Trilha no servidor** — hook novo (`configuracao_update`): versão, autor e histórico gravados pelo servidor em qualquer mudança; o cliente não pode burlar.
3. **Falha adicional encontrada e corrigida** — usuário desativado (ativo=false) ainda conseguia entrar; agora a autenticação exige `ativo = true` (migration 0006).

Provas contra a instância real:
| # | Ação | Resultado | Esperado | OK |
|---|---|---|---|---|
| A | Login do usuário desativado (admin de teste) | HTTP 403 "não satisfaz os requisitos" | bloqueado | ✔ |
| B | Igor muda modo_teste → false | 200; versão 2; autor "Igor Alves Leandro" | trilha completa | ✔ |
| B2 | Ler o histórico da chave | 1 entrada: valor antigo (true), autor seed, período de vigência | histórico | ✔ |
| C | SDR tenta mudar modo_teste | negado (404 — o PocketBase esconde o registro quando a regra de escrita não satisfaz) | negado | ✔ |
| — | Restaurar modo_teste=true | versão 3, autor Igor | estado da SPEC | ✔ |

Estado final: modo_teste=true, pausa_geral=false, canais desligados, SDR de teste desativado, 3 usuários reais intactos.

Nota: a "Pausa geral" é outra chave de propósito diferente — pausa a OPERAÇÃO (envios/passos), não o modo de teste. A explicação no card agora deixa isso claro; o botão Pausar/Retomar continua na pausa geral.
