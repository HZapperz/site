-- ───────────────────────────────────────────────────────────────────────────
-- Auth surface for the zappstudios.us CRM.
--
-- TARGET PROJECT: ghgwsvgxlcxghppzjkrb ("zapp-studios").
-- NOT rjewjtazrezlkyemduki — that is the royalpawz project, and it is what the
-- .mcp.json in this repo still points at. Check before you run anything.
--
-- Idempotent and strictly additive. It DROPS NOTHING: public.leads in this
-- project is live production data behind the /fit funnel.
--
-- Two independent controls, and they do different jobs:
--   1. hook_restrict_signup_to_owner — wired at Auth → Hooks, runs BEFORE the
--      auth.users insert. A rejected signup leaves no row and mints no session.
--      This is the real control.
--   2. crm_admins — the app-level allow-list the DAL reads. Defence in depth,
--      revocable without touching hooks, and the seam for adding staff later.
--
-- NOTE: creating the function below does not activate it. It does nothing at
-- all until it is selected in the dashboard under Auth → Hooks → Before User
-- Created. See the deploy checklist.
-- ───────────────────────────────────────────────────────────────────────────


-- 1 ── The allow-list ──────────────────────────────────────────────────────

create table if not exists public.crm_admins (
  email       text primary key,
  role        text not null default 'owner' check (role in ('owner', 'staff')),
  disabled_at timestamptz,
  created_at  timestamptz default now()
);

comment on table public.crm_admins is
  $c$App-level allow-list for /admin. Read by app/_lib/auth/dal.ts AS THE
SIGNED-IN USER (publishable key, not service role) so the self-read RLS policy
below is what actually answers the question. Emails are stored lower-cased;
the policy lower()s the JWT claim to match.$c$;


-- 2 ── RLS: self-read, and nothing else ────────────────────────────────────
--
-- Deliberately the ONLY table in this schema with a policy. Every other CRM
-- table is deny-all with no policy and is reached only by the service-role
-- client, after the DAL has already proven identity.
--
-- The effect of this one policy: a signed-in stranger's SELECT returns zero
-- rows rather than somebody else's row. The allow-list check fails closed in
-- the database, not in application code.

alter table public.crm_admins enable row level security;

drop policy if exists crm_admins_self_read on public.crm_admins;
create policy crm_admins_self_read on public.crm_admins
  for select
  to authenticated
  using (email = lower(auth.jwt() ->> 'email'));

-- Supabase's default grants hand anon and authenticated full DML on new public
-- tables and lean entirely on RLS to stop them. RLS does stop them — there is
-- no insert/update/delete policy — but a table privilege nobody needs is a
-- table privilege that only matters the day someone adds a broader policy by
-- mistake. Take them away.
revoke all on public.crm_admins from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.crm_admins from authenticated;
grant select on public.crm_admins to authenticated;
grant all    on public.crm_admins to service_role;


-- 3 ── Before User Created hook: one address may ever sign up ──────────────
--
-- Runs before the auth.users insert, so a rejection means no user row and no
-- session — nothing to clean up afterwards.
--
-- This is why an AFTER INSERT trigger on auth.users is not good enough: by the
-- time it fires the row exists and a session may already have been minted, and
-- it would persist until someone deleted it by hand. An allow-list checked only
-- in a server guard is worse still — OAuth completes and a real, valid session
-- for a stranger sits in their browser indefinitely.
--
-- Payload shape (Supabase "Before User Created Hook"):
--   { "metadata": { … }, "user": { "email": "…", … } }
-- Return {} to allow; return an `error` object to reject.

create or replace function public.hook_restrict_signup_to_owner(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  -- Single operator. To add staff later, replace this equality test with a
  -- lookup against public.crm_admins (the function would then need
  -- `security definer` and an explicit grant on that table).
  allowed   constant text := 'hamza@zappstudios.us';
  candidate text;
begin
  candidate := lower(trim(coalesce(event -> 'user' ->> 'email', '')));

  if candidate = allowed then
    return '{}'::jsonb;
  end if;

  -- Also the answer for a phone-only or email-less signup: no email, no entry.
  return jsonb_build_object(
    'error', jsonb_build_object(
      'http_code', 403,
      'message',   'This application is not open for sign-up.'
    )
  );
end;
$$;

comment on function public.hook_restrict_signup_to_owner(jsonb) is
  $c$Before User Created auth hook. Rejects every signup except
hamza@zappstudios.us. Inert until wired at Auth → Hooks in the dashboard.$c$;

-- Only Supabase Auth may call it. A new function is executable by PUBLIC by
-- default, so the revoke has to come before the grant means anything.
revoke execute on function public.hook_restrict_signup_to_owner(jsonb)
  from public, anon, authenticated;
grant usage on schema public to supabase_auth_admin;
grant execute on function public.hook_restrict_signup_to_owner(jsonb)
  to supabase_auth_admin;


-- 4 ── Seed the operator ───────────────────────────────────────────────────
--
-- No bootstrap trigger on auth.users: with the hook above there is exactly one
-- address that can ever create an account, so the row can simply be here. A
-- trigger would only reintroduce the window this migration closes.

insert into public.crm_admins (email, role)
values ('hamza@zappstudios.us', 'owner')
on conflict (email) do nothing;
