create table if not exists public.axion_landing_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  telefone text not null,
  empresa text,
  email text not null,
  mensagem text not null
);

alter table public.axion_landing_leads enable row level security;
