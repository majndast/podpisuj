-- Podpisuj.cz Database Schema
-- Run this in Supabase SQL Editor

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  tier text not null default 'free' check (tier in ('free', 'pro', 'team')),
  team_id uuid references public.teams(id) on delete set null,
  payment_id text,
  jp_vision_client boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Teams table
create table public.teams (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid references auth.users on delete cascade not null,
  brand_kit jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Now add the foreign key on profiles.team_id
-- (teams must exist first)
alter table public.profiles
  add constraint profiles_team_id_fkey
  foreign key (team_id) references public.teams(id) on delete set null;

-- Team members table
create table public.team_members (
  id uuid default gen_random_uuid() primary key,
  team_id uuid references public.teams(id) on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  role text not null default 'member' check (role in ('owner', 'member')),
  invited_at timestamptz not null default now(),
  joined_at timestamptz,
  unique(team_id, user_id)
);

-- Signatures table
create table public.signatures (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  template_id text not null,
  name text not null default 'Můj podpis',
  data jsonb not null default '{}',
  style jsonb not null default '{}',
  logo_url text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger signatures_updated_at
  before update on public.signatures
  for each row execute procedure public.handle_updated_at();

-- Row Level Security

-- Profiles: users can only read/update their own
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Signatures: users can CRUD their own
alter table public.signatures enable row level security;

create policy "Users can view own signatures"
  on public.signatures for select
  using (auth.uid() = user_id);

create policy "Users can create signatures"
  on public.signatures for insert
  with check (auth.uid() = user_id);

create policy "Users can update own signatures"
  on public.signatures for update
  using (auth.uid() = user_id);

create policy "Users can delete own signatures"
  on public.signatures for delete
  using (auth.uid() = user_id);

-- Teams: owner can manage, members can view
alter table public.teams enable row level security;

create policy "Team owner can manage team"
  on public.teams for all
  using (auth.uid() = owner_id);

create policy "Team members can view team"
  on public.teams for select
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = teams.id
      and team_members.user_id = auth.uid()
    )
  );

-- Team members: owner can manage, members can view
alter table public.team_members enable row level security;

create policy "Team owner can manage members"
  on public.team_members for all
  using (
    exists (
      select 1 from public.teams
      where teams.id = team_members.team_id
      and teams.owner_id = auth.uid()
    )
  );

create policy "Members can view team members"
  on public.team_members for select
  using (
    exists (
      select 1 from public.team_members as tm
      where tm.team_id = team_members.team_id
      and tm.user_id = auth.uid()
    )
  );

-- Storage bucket for logos and photos
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

create policy "Anyone can view avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "Users can update own avatars"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own avatars"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
