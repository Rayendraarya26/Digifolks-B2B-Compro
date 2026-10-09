import pg from 'pg';
const { Client } = pg;

async function setupStorage() {
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
    console.log("Connected to Supabase PostgreSQL database...");

    // 1. Create storage bucket
    await client.query(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES (
        'portfolio-images', 
        'portfolio-images', 
        true, 
        10485760, -- 10MB limit
        ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
      )
      ON CONFLICT (id) DO UPDATE 
      SET public = true, 
          file_size_limit = 10485760;
    `);
    console.log("Storage bucket 'portfolio-images' created / updated as PUBLIC!");

    // 2. Setup RLS Policies on storage.objects
    await client.query(`
      DROP POLICY IF EXISTS "Public can view portfolio-images" ON storage.objects;
      CREATE POLICY "Public can view portfolio-images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'portfolio-images');

      DROP POLICY IF EXISTS "Anyone can upload portfolio-images" ON storage.objects;
      CREATE POLICY "Anyone can upload portfolio-images"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'portfolio-images');

      DROP POLICY IF EXISTS "Anyone can update portfolio-images" ON storage.objects;
      CREATE POLICY "Anyone can update portfolio-images"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'portfolio-images');

      DROP POLICY IF EXISTS "Anyone can delete portfolio-images" ON storage.objects;
      CREATE POLICY "Anyone can delete portfolio-images"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'portfolio-images');
    `);
    console.log("Storage policies for 'portfolio-images' created successfully!");

    // 3. Update existing 8 portfolios cover_image_url from .png to .webp in database
    const updateRes = await client.query(`
      UPDATE portfolios
      SET cover_image_url = REPLACE(cover_image_url, '.png', '.webp')
      WHERE cover_image_url LIKE '%.png'
      RETURNING slug, cover_image_url;
    `);
    console.log("Updated portfolio cover image extensions to .webp:", updateRes.rows);

  } catch (err) {
    console.error("Error setting up storage:", err);
  } finally {
    await client.end();
  }
}

setupStorage();
