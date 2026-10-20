# Decisão de WhatsApp — Q-14 (SPEC-1-005)

Registrada em 20/10/2026 pelo Igor Alves (chat ETHOS).

## Decisão

- **API**: Uazapi.
- **Domínio de e-mail (Q-15, mesma sessão)**: subdomínio dedicado **outbound.higiatec.com.br**.
- **Consequência aceita pelo Igor**: primeiro contato frio via Uazapi tem risco de banimento do
  número — aceito; a mitigação é o número dedicado (não o principal da empresa) e aquecimento
  gradual antes dos envios reais.

## O que isso destrava

- SPEC-1-005 inteira: conectar o número (04/11), enviar mensagens da cadência (10/11) e registrar
  respostas (11/11).
- O caminho Meta (consentimento prévio) fica registrado como alternativa descartada nesta fase.

## Pendências do Dario para ligar o canal (não bloqueiam o código)

1. Comprar o número dedicado de WhatsApp (não usar o principal da Higia).
2. Criar a conta na Uazapi e digitar o token nos segredos do Skip (não passa por chat).
3. Configurar o webhook da Uazapi apontando para `<backend>/backend/v1/...` (URL do backend do
   Skip Cloud, não do domínio público do app).
4. Aquecer o número: dias de uso leve antes do primeiro envio real da cadência.

## Pendências do Dario para o e-mail (SPEC-1-004)

1. Escolher/criar a conta do serviço de e-mail (serviço ainda não definido — Q-15 serviço).
2. DNS do outbound.higiatec.com.br: SPF, DKIM e DMARC.
3. Segredos no Skip (SMTP/API do serviço).
4. Teste de entrega antes de ligar o canal.
