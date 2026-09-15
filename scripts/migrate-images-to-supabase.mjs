import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import pg from 'pg';
const { Client } = pg;

const SUPABASE_URL = 'https://tcqykhpivalgfzavjkze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcXlraHBpdmFsZ2Z6YXZqa3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNTU2OTYsImV4cCI6MjA5ODYzMTY5Nn0.442aUF9zjNGJfjyieB6buKiisq5UQ7O9mM1lPm8iSuw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BASE_DIR = path.join(process.cwd(), 'public', 'Image', 'Portfolio');

const projects = [
  'digital-assessment',
  'gorillacoach',
  'homestay',
  'kawan-kita-semua',
  'kazeer',
  'malaka',
  'positive-strength',
  'wecore'
];

async function migrateImages() {
  console.log("Starting image migration to Supabase Storage bucket 'portfolio-images'...\n");

  const pgClient = new Client({
    user: 'postgres.tcqykhpivalgfzavjkze',
    password: 'Digifolks#2025!',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  await pgClient.connect();
  console.log("Connected to PostgreSQL for database URL updates.");

  for (const slug of projects) {
    const projectDir = path.join(BASE_DIR, slug);
    if (!fs.existsSync(projectDir)) continue;

    const files = fs.readdirSync(projectDir);
    let coverUrl = null;
    const galleryUrls = [];

    console.log(`Processing project: [${slug}] (${files.length} files)`);

    for (const file of files) {
      const filePath = path.join(projectDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const storagePath = `portfolios/${slug}/${file}`;
      const contentType = file.endsWith('.webp') ? 'image/webp' : 'image/png';

      console.log(` -> Uploading ${file} to ${storagePath}...`);

      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(storagePath, fileBuffer, {
          contentType,
          upsert: true
        });

      if (error) {
        console.error(`    Upload error for ${file}:`, error.message);
      } else {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/portfolio-images/${storagePath}`;
        console.log(`    Uploaded: ${publicUrl}`);

        if (file.startsWith('cover')) {
          coverUrl = publicUrl;
        } else if (file.startsWith('gallery')) {
          galleryUrls.push(publicUrl);
        }
      }
    }

    // Update portfolios table in Supabase
    if (coverUrl || galleryUrls.length > 0) {
      console.log(` -> Updating database record for ${slug}...`);
      await pgClient.query(`
        UPDATE portfolios
        SET cover_image_url = COALESCE($1, cover_image_url),
            gallery_images = CASE WHEN $2::jsonb = '[]'::jsonb THEN gallery_images ELSE $2::jsonb END,
            updated_at = NOW()
        WHERE slug = $3;
      `, [coverUrl, JSON.stringify(galleryUrls), slug]);
      console.log(` -> Database updated for ${slug}!\n`);
    }
  }

  // Also upload root portfolio preview images
  const rootFiles = fs.readdirSync(BASE_DIR).filter(f => fs.statSync(path.join(BASE_DIR, f)).isFile());
  console.log(`Uploading ${rootFiles.length} root showcase images...`);
  for (const file of rootFiles) {
    const filePath = path.join(BASE_DIR, file);
    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `showcase/${file}`;
    const contentType = file.endsWith('.webp') ? 'image/webp' : 'image/png';

    const { error } = await supabase.storage
      .from('portfolio-images')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true
      });
    if (!error) {
      console.log(` -> Uploaded ${file} to showcase/${file}`);
    }
  }

  await pgClient.end();
  console.log("\nAll portfolio images successfully migrated to Supabase Storage!");
}

migrateImages();
