const https = require("https");

const SUPABASE_URL = "https://ocuafmydwitrhxhtuole.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const sql = `
-- 1. Crear la tabla de perfiles
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Habilitar Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acceso
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
CREATE POLICY "Users can read own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all users" ON public.users;
CREATE POLICY "Admins can read all users" ON public.users
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users" ON public.users
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- 4. Trigger para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Crear el trigger en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS on_user_updated ON public.users;
CREATE TRIGGER on_user_updated
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
`;

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/pgrest_exec`);
    const body = JSON.stringify({ sql });

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// Try using the SQL API via management endpoint
async function executeViaManagementAPI(sql) {
  const query = sql.trim();

  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });

    const options = {
      hostname: new URL(SUPABASE_URL).hostname,
      path: "/rest/v1/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Prefer": "resolution=merge-duplicates",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    // Try the direct SQL endpoint
    const sqlBody = JSON.stringify({ sql: query });
    const sqlOptions = {
      hostname: new URL(SUPABASE_URL).hostname,
      path: "/sql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Length": Buffer.byteLength(sqlBody),
      },
    };

    const req = https.request(sqlOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else if (res.statusCode === 404) {
          // Try Management API
          tryMgmt(query, resolve, reject);
        } else {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", (err) => {
      tryMgmt(query, resolve, reject);
    });
    req.write(sqlBody);
    req.end();
  });
}

function tryMgmt(sql, resolve, reject) {
  const mgmtBody = JSON.stringify({ query: sql });
  const mgmtOptions = {
    hostname: "api.supabase.com",
    path: `/v1/projects/ocuafmydwitrhxhtuole/query`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Length": Buffer.byteLength(mgmtBody),
    },
  };

  const req = https.request(mgmtOptions, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(data);
      } else {
        reject(new Error(`Management API Error ${res.statusCode}: ${data}`));
      }
    });
  });

  req.on("error", reject);
  req.write(mgmtBody);
  req.end();
}

executeViaManagementAPI(sql)
  .then((result) => {
    console.log("SUCCESS:", result || "SQL executed successfully");
    // Clean up self
    require("fs").unlinkSync(__filename);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    console.log("\nPlease execute the SQL manually in Supabase Dashboard:");
    console.log("1. Go to https://supabase.com/dashboard/project/ocuafmydwitrhxhtuole");
    console.log("2. Open SQL Editor");
    console.log("3. Paste the contents of scripts/create-users-table.sql");
    console.log("4. Click Run");
  });
