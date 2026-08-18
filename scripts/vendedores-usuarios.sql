-- Crear los 3 usuarios vendedores del portal
-- Ejecutar en el SQL Editor de Supabase (o psql con el role de servicio).
--
-- IMPORTANTE:
--   1. Cambiar las contraseñas temporales ANTES de entregar cada cuenta.
--   2. Usar la funcion privada crypt() de pgcrypto para generar el hash bcrypt
--      compatible con el formato que espera auth.users (alg=bf, 10 rounds).
--      Si no tienes pgcrypto, genera el hash con Node y pegalo abajo.

-- 1) Asegurar extension pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) Crear los usuarios (idempotente: no falla si ya existe el email)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
) VALUES
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'jepherson@aruca.com',
  crypt('Cambiar123!', gen_salt('bf', 10)),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"JEPHERSON PEREZ"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'gustavo@aruca.com',
  crypt('Cambiar123!', gen_salt('bf', 10)),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"GUSTAVO ROSALES"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'franklin@aruca.com',
  crypt('Cambiar123!', gen_salt('bf', 10)),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"FRANKLIN SEGOVIA"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- 3) Registrar las identidades (necesario para que Auth funcione con email/password)
INSERT INTO auth.identities (
  provider_id,
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  u.id,
  gen_random_uuid(),
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email),
  'email',
  now(),
  now(),
  now()
FROM auth.users u
WHERE u.email IN ('jepherson@aruca.com', 'gustavo@aruca.com', 'franklin@aruca.com')
  AND NOT EXISTS (
    SELECT 1 FROM auth.identities i WHERE i.user_id = u.id AND i.provider = 'email'
  );
