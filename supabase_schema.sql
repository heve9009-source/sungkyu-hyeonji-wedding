-- =========================================================
-- GREENERY GARDEN WEDDING · Supabase Database Schema
-- =========================================================

-- 1. Create Guestbook Table (방명록)
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create RSVP Table (참석 여부 및 식권 수량)
create table if not exists public.rsvp (
  id bigint generated always as identity primary key,
  name text not null,
  side text not null check (side in ('groom', 'bride')),
  attend text not null check (attend in ('yes', 'maybe', 'no')),
  count integer default 1 not null,
  message text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.guestbook enable row level security;
alter table public.rsvp enable row level security;

-- 4. Policies for Guestbook (하객 누구나 조회 및 작성 가능)
create policy "Anyone can read guestbook"
  on public.guestbook for select
  using (true);

create policy "Anyone can insert guestbook"
  on public.guestbook for insert
  with check (true);

-- 5. Policies for RSVP (하객 누구나 참석 제출 가능)
create policy "Anyone can insert rsvp"
  on public.rsvp for insert
  with check (true);

create policy "Anyone can view rsvp"
  on public.rsvp for select
  using (true);

-- 6. Enable Realtime Replication for Live Guestbook Updates
alter publication supabase_realtime add table public.guestbook;
