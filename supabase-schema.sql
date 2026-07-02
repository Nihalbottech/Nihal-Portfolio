-- 1. Create the portfolio table
create table if not exists public.portfolio (
  id text primary key,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.portfolio enable row level security;

-- 3. Create security policies
-- Policy to allow anonymous read access (everyone can see the portfolio)
create policy "Allow public read access" on public.portfolio
  for select using (true);

-- Policy to allow authenticated users to insert (required for seeding if authenticated)
create policy "Allow authenticated insert access" on public.portfolio
  for insert with check (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update (required for admin edits)
create policy "Allow authenticated update access" on public.portfolio
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 4. Enable Postgres Realtime replication for portfolio updates
alter publication supabase_realtime add table public.portfolio;
