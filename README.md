# Kuka Cast

Plataforma institucional e educacional do Kuka Cast, construída com **React + Vite + TypeScript + Tailwind CSS** e integração com **Supabase**.

## Rodando no GitHub Codespaces

1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. Rode o projeto:
   ```bash
   npm run dev
   ```

A aplicação sobe na porta padrão do Vite.

## Rotas principais

- `/` home institucional
- `/sobre`
- `/felipe-costa`
- `/episodios`
- `/episodio/:slug`
- `/workshops`
- `/workshop/:slug`
- `/comunidade`
- `/area-do-participante`
- `/admin` (protegida)

## Supabase

- Schema: `supabase/schema.sql`
- Seed inicial: `supabase/seed.sql`
- Usuário admin esperado no Auth: `admin@kukacast.com` / `123456`

## Estrutura

```txt
src/
  components/
  pages/
  layouts/
  hooks/
  lib/
  services/
  types/
  data/
  routes/
  integrations/
  styles/
```
