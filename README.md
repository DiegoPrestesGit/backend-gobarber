# Recuperação de senha

  **Requisitos Funcionais**

  * O usuário deve poder recuperar sua senha informando seu e-mail;
  * O usuário deve receber um e-mail com instruções de recuperação de senha;
  * O usuário deve poder resetar sua senha.

  **Requisitos Não Funcionais**

  * Utilizar Mailtrap para testar envios de de e-mail em ambiente de dev;
  * Utilizar Amazon SES para envios em produção;
  * O envio de e-mails deve acontecer em segundo plano (background-job).

  **Regras de Negócio**

  * O link enviado por e-mail para resetar a senha deve expirar em 2h;
  * O usuário precisa confirmar a nova senha ao resetar sua senha.

# Atualização do perfil

  **Requisitos Funcionais**

  * O usuário deve poder atualizar seu perfil: nome, e-mail e senha;

  **Regras de Negócio**

  * O usuário não pode alterar seu e-mail para um e-mail já cadastrado por outro usuário;
  * Para atualizar sua senha o usuário deve informar a senha antiga;
  * Para atualizar sua senha o usuário deve confirmar a nova senha.

# Painel do prestador

# Agendamento de serviços
