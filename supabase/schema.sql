-- SouthernCare Roadside — Supabase schema
-- Run this in the Supabase SQL Editor

-- Invoices table
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  customer_address text,
  line_items jsonb not null default '[]'::jsonb,
  subtotal numeric(10, 2) not null default 0,
  tax_rate numeric(5, 4) not null default 0.07,
  tax_amount numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid')),
  notes text,
  due_date date,
  sent_at timestamptz,
  paid_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bookings from public form
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  location text not null,
  vehicle text,
  service_type text not null,
  preferred_time text,
  notes text,
  created_at timestamptz not null default now()
);

-- SOS requests
create table if not exists public.sos_requests (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  location text not null,
  service_type text not null,
  notes text,
  created_at timestamptz not null default now()
);

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists invoices_updated_at on public.invoices;
create trigger invoices_updated_at
  before update on public.invoices
  for each row execute function public.set_updated_at();

-- RLS
alter table public.invoices enable row level security;
alter table public.bookings enable row level security;
alter table public.sos_requests enable row level security;

-- Only authenticated users can manage invoices
create policy "Admins can read invoices"
  on public.invoices for select
  to authenticated
  using (true);

create policy "Admins can insert invoices"
  on public.invoices for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Admins can update invoices"
  on public.invoices for update
  to authenticated
  using (auth.uid() = created_by);

create policy "Admins can delete invoices"
  on public.invoices for delete
  to authenticated
  using (auth.uid() = created_by);

-- Bookings/SOS: anyone can insert (public forms), only auth can read
create policy "Anyone can submit bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read bookings"
  on public.bookings for select
  to authenticated
  using (true);

create policy "Anyone can submit SOS"
  on public.sos_requests for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read SOS"
  on public.sos_requests for select
  to authenticated
  using (true);

-- Invoice number sequence helper
create sequence if not exists invoice_number_seq start 1001;

create or replace function public.generate_invoice_number()
returns text as $$
begin
  return 'SCR-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('invoice_number_seq')::text, 4, '0');
end;
$$ language plpgsql;
