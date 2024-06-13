# Inngest Flow Control demo

## Requirements:

- Inngest Dev Server
- Supabase database

## Setup

1. Create a new Supabase database
2. Add the credentials to a new `.env.local` file (see `.env.example`)
3. Run `init.sql` in the Supabase dashboard
4. Install dependencies: `pnpm install`
5. Start the server: `pnpm run dev`
6. Start the Inngest Dev Server: `npx inngest-cli@latest dev -u http://localhost:3000/api/inngest --no-discovery

Open `http://localhost:3000` in your browser to demo!
