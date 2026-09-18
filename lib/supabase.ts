import { createClient } from '@supabase/supabase-js';

const isBrowser = typeof window !== 'undefined';
// 🌟 Vercel မှတစ်ဆင့် Proxy ခေါ်ရန် /api/supabase ဟု ပြောင်းလိုက်သည် 🌟
const supabaseUrl = isBrowser ? '/api/supabase' : 'https://lejfhsuwajmzikmudmcs.supabase.co';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  }
});