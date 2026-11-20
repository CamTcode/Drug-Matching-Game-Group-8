import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://ivzcvyrchmtlrfbxftgc.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_o6QuULve8l6Iv6rpfVkIkg_pzcs5G4w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);