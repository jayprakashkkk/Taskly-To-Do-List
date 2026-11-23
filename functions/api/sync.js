const NEON_SQL_URL = 'https://ep-twilight-bonus-a12kez3u-pooler.ap-southeast-1.aws.neon.tech/sql';
const NEON_CONN_STR = 'postgresql://neondb_owner:npg_LWzKQC3h0RSt@ep-twilight-bonus-a12kez3u-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function runSql(query, params = []) {
  const res = await fetch(NEON_SQL_URL, {
    method: 'POST',
    headers: {
      'Neon-Connection-String': NEON_CONN_STR,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, params })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Database error');
  }
  const data = await res.json();
  return data.rows || [];
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
};

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json', ...corsHeaders }
});

export async function onRequest(context) {
  const { request } = context;
  const method = request.method.toUpperCase();
  const url = new URL(request.url);

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // GET /api/sync?email=...
    if (method === 'GET') {
      const email = String(url.searchParams.get('email') || '').trim().toLowerCase();
      if (!email || email === 'guest@local') {
        return json({ ok: true, tasks: [], guest: true, exists: false });
      }

      const rows = await runSql('SELECT tasks_json, updated_at FROM taskly_user_data WHERE email = $1;', [email]);
      if (rows.length === 0) {
        return json({ ok: true, tasks: null, exists: false });
      }

      let tasks = rows[0].tasks_json;
      if (typeof tasks === 'string') {
        try { tasks = JSON.parse(tasks); } catch (_) { tasks = []; }
      }
      return json({ ok: true, tasks: tasks || [], updatedAt: rows[0].updated_at, exists: true });
    }

    // POST /api/sync
    if (method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const email = String(body.email || '').trim().toLowerCase();
      if (!email || email === 'guest@local') {
        return json({ ok: true, saved: false, reason: 'guest or empty' });
      }

      const tasks = Array.isArray(body.tasks) ? body.tasks : [];
      await runSql(`
        INSERT INTO taskly_user_data (email, tasks_json, updated_at)
        VALUES ($1, $2::jsonb, NOW())
        ON CONFLICT (email) DO UPDATE SET tasks_json = EXCLUDED.tasks_json, updated_at = NOW();
      `, [email, JSON.stringify(tasks)]);

      return json({ ok: true, saved: true, count: tasks.length });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
