create table if not exists public.axion_propostas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  numero text not null unique,
  status text not null default 'rascunho',
  cliente_nome text not null,
  cliente_empresa text,
  titulo_projeto text not null,
  resumo text not null,
  validade_dias integer not null default 7,
  contexto text not null,
  escopo jsonb not null default '[]'::jsonb,
  stack jsonb not null default '[]'::jsonb,
  entregaveis jsonb not null default '[]'::jsonb,
  cronograma jsonb not null default '[]'::jsonb,
  investimento_valor numeric not null,
  investimento_entrada numeric,
  investimento_saldo numeric,
  investimento_prazo text not null,
  investimento_nota text,
  fora_escopo text,
  contato_nome text,
  contato_email text,
  contato_telefone text
);

alter table public.axion_propostas enable row level security;
