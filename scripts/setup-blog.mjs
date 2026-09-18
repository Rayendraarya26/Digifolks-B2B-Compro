import pg from 'pg';
const { Client } = pg;

async function setupBlog() {
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

    // 1. Create Tables
    console.log("Creating blog_categories and blog_posts tables...");
    await client.query(`
      -- Blog Categories Table
      CREATE TABLE IF NOT EXISTS blog_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Blog Posts Table
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        cover_image_url TEXT,
        cover_image_alt TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT 'Digifolks Team',
        category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        reading_time_minutes INTEGER NOT NULL DEFAULT 5,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT FALSE,
        published_at TIMESTAMPTZ,
        seo_title TEXT NOT NULL DEFAULT '',
        meta_description TEXT NOT NULL DEFAULT '',
        canonical_url TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Indexes
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
      CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

      -- RLS
      ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Public can view blog_categories" ON blog_categories;
      CREATE POLICY "Public can view blog_categories" ON blog_categories FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Public can view published blog_posts" ON blog_posts;
      CREATE POLICY "Public can view published blog_posts" ON blog_posts FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Authenticated users have full access to blog_categories" ON blog_categories;
      CREATE POLICY "Authenticated users have full access to blog_categories" ON blog_categories FOR ALL USING (auth.role() = 'authenticated');

      DROP POLICY IF EXISTS "Authenticated users have full access to blog_posts" ON blog_posts;
      CREATE POLICY "Authenticated users have full access to blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
    `);
    console.log("Tables and RLS policies created successfully!");

    // 2. Create Storage Bucket for blog images
    console.log("Setting up blog-images storage bucket...");
    await client.query(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES (
        'blog-images', 
        'blog-images', 
        true, 
        10485760, -- 10MB limit
        ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
      )
      ON CONFLICT (id) DO UPDATE 
      SET public = true, 
          file_size_limit = 10485760;

      DROP POLICY IF EXISTS "Public can view blog-images" ON storage.objects;
      CREATE POLICY "Public can view blog-images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'blog-images');

      DROP POLICY IF EXISTS "Anyone can upload blog-images" ON storage.objects;
      CREATE POLICY "Anyone can upload blog-images"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'blog-images');

      DROP POLICY IF EXISTS "Anyone can update blog-images" ON storage.objects;
      CREATE POLICY "Anyone can update blog-images"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'blog-images');

      DROP POLICY IF EXISTS "Anyone can delete blog-images" ON storage.objects;
      CREATE POLICY "Anyone can delete blog-images"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'blog-images');
    `);
    console.log("Storage bucket 'blog-images' ready!");

    // 3. Seed default categories if empty
    const catCheck = await client.query('SELECT COUNT(*) FROM blog_categories');
    if (parseInt(catCheck.rows[0].count) === 0) {
      console.log("Seeding default categories...");
      await client.query(`
        INSERT INTO blog_categories (name, slug, description, sort_order)
        VALUES 
          ('Engineering & Tech', 'engineering-tech', 'Modern software engineering, architecture, and technology deep dives.', 1),
          ('Product & UX Design', 'product-design', 'Design systems, user experience strategy, and intuitive digital interfaces.', 2),
          ('Digital Transformation', 'digital-transformation', 'Insights on scaling digital products and enterprise modernisation.', 3),
          ('Industry Insights', 'industry-insights', 'Market trends, tech ecosystem, and business case studies.', 4)
        ON CONFLICT (slug) DO NOTHING;
      `);
      console.log("Default categories seeded!");
    } else {
      console.log(`blog_categories already has ${catCheck.rows[0].count} items.`);
    }

    // 4. Check if there are any existing services in the services table
    const serviceCount = await client.query('SELECT COUNT(*) FROM services');
    console.log(`Current services in database: ${serviceCount.rows[0].count}`);

    const services = await client.query('SELECT id, slug, num, title FROM services ORDER BY num ASC');
    console.log("Existing services in DB:", services.rows);

  } catch (err) {
    console.error("Error setting up blog database:", err);
    throw err;
  } finally {
    await client.end();
  }
}

setupBlog();
