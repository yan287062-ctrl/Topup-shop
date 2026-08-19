import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aasncvjvjftsyhywrueo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhc25jdmp2amZ0c3loeXdydWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MDk1MDIsImV4cCI6MjEwMjM4NTUwMn0.1EADH3wmUi10Xx-hafgl6MKqa1XZcteXGKyItGBzpqM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

