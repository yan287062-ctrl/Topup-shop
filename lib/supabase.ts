import { createClient } from '@supabase/supabase-js';

// 🌟 URL အပြည့်အစုံရရန် window.location.origin ကို ပြန်သုံးထားသည် 🌟
const getSupabaseUrl = () => {
  if (typeof window !== 'undefined') {
    // ဖုန်း/Browser ကနေ ဝင်ရင် မင်းရဲ့ website လိပ်စာအပြည့်အစုံကို အလိုလိုယူမယ်
    return window.location.origin + '/api/supabase';
  }
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lejfhsuwajmzikmudmcs.supabase.co';
};

// Vercel ကနေ Key မရခဲ့ရင်တောင် Crash မဖြစ်အောင် အရန် Key အဟောင်းကိုပါ ထည့်ထားပေးသည်
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlamZoc3V3YWptemlrbXVkbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjA4NzUsImV4cCI6MjEwMzMzNjg3NX0.x3EVXbqCmrq0yiGlKI6GrWadKWU9TuXKs5F3w8uJNQA';

export const supabase = createClient(getSupabaseUrl(), supabaseKey, {
  auth: {
    persistSession: true,
  }
});