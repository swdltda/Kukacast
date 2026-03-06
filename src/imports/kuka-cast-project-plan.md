Transform this Figma project into a functional web platform called "Kuka Cast".

The platform must use Supabase as backend for authentication, database and data storage.

All interface labels and database fields must be in Portuguese.

STACK

Frontend: Next.js or React
Backend: Supabase
Database: PostgreSQL via Supabase
Responsive design.

MAIN FEATURES

1. Landing Page
Users can view the workshop information and register.

Registration form fields:

nome
email
telefone
data_nascimento
cidade

When the form is submitted, the data must be saved in Supabase table "participantes".

After registration redirect the user to a confirmation page inviting them to join the WhatsApp community.

WHATSAPP LINK:
https://chat.whatsapp.com/G5pgNz1V1aOBuhJMOrjM0o

2. Participant Login

Login fields:

email
data_nascimento

Users can access the participant area.

3. Participant Dashboard

Menu:

Início
Meus Workshops
Aulas
Materiais
Perfil

Each workshop page must include:

titulo
descricao
video_youtube (embedded)
material_pdf para download

4. Admin Panel

Create a full admin dashboard.

Admin can:

Create workshops
Edit workshops
Create palestras
Create aulas
Upload materials
View participants
Edit landing page sections
Duplicate landing pages

5. Admin Account

Create a default admin user:

email: email@kukacast.com
password: 123456

6. Database Structure

Table participantes

id
nome
email
telefone
data_nascimento
cidade
data_cadastro

Table workshops

id
titulo
subtitulo
descricao
data_workshop
imagem_capa
status
data_criacao

Table palestras

id
workshop_id
titulo
descricao
video_youtube
material_pdf
ordem
data_publicacao

Table materiais

id
palestra_id
titulo
descricao
arquivo
data_upload

7. CMS Features

Admin must be able to edit:

textos da landing page
títulos
descrições
imagens
botões

8. Security

Use Supabase authentication and role system.

Roles:

admin
participante

Only admin can access the admin panel.

The interface must be modern, clean and similar to SaaS platforms.