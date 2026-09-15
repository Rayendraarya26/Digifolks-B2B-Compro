import { createBrowserClient } from '@supabase/ssr';

const DEFAULT_URL = 'https://tcqykhpivalgfzavjkze.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcXlraHBpdmFsZ2Z6YXZqa3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNTU2OTYsImV4cCI6MjA5ODYzMTY5Nn0.442aUF9zjNGJfjyieB6buKiisq5UQ7O9mM1lPm8iSuw';

export function createClient() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  // Auto-correct common typo: supabase project API URLs end with .co, not .com
  if (url.includes('.supabase.com') && !url.includes('pooler.supabase.com')) {
    url = url.replace('.supabase.com', '.supabase.co');
  }

  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_KEY;

  return createBrowserClient(url, key);
}
