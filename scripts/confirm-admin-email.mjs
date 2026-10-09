import pg from 'pg';
const { Client } = pg;

async function confirmEmail() {
  const client = new Client({
    user: 'postgres.tcqykhpivalgfzavjkze',
    password: 'Digifolks#2025!',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Supabase Postgres database...");

    const res = await client.query(`
      UPDATE auth.users
      SET email_confirmed_at = NOW()
      WHERE email = 'admin@digifolks.id'
      RETURNING id, email, email_confirmed_at;
    `);

    if (res.rows.length === 0) {
      console.log("No user found with email admin@digifolks.id");
    } else {
      console.log("Admin email confirmed successfully:", res.rows[0]);
    }
  } catch (err) {
    console.error("Error confirming email:", err);
  } finally {
    await client.end();
  }
}

confirmEmail();
