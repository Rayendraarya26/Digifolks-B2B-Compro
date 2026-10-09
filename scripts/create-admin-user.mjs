import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tcqykhpivalgfzavjkze.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcXlraHBpdmFsZ2Z6YXZqa3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNTU2OTYsImV4cCI6MjA5ODYzMTY5Nn0.442aUF9zjNGJfjyieB6buKiisq5UQ7O9mM1lPm8iSuw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'admin@digifolks.id';
  const password = 'Digifolks#2025!';

  console.log(`Checking/creating admin user: ${email}...`);

  // Attempt to sign in first
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (signInData?.user) {
    console.log("Admin user already exists and credentials are verified!");
    return;
  }

  // If not existing, sign up
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'admin',
        full_name: 'Digifolks Administrator'
      }
    }
  });

  if (signUpError) {
    console.error("SignUp error:", signUpError.message);
  } else {
    console.log("Admin user created successfully:", signUpData.user?.email);
  }
}

createAdmin();
