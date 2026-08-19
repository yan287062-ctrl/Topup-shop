import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://aasncvjvjftsyhywrueo.supabase.co`;
const supabaseAnonKey = `sb_publishable_BWPJnQPpWwysRe84oYfgAw_GinZLV98`;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

