import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivzcvyrchmtlrfbxftgc.supabase.co';
const supabaseAnonKey = 'sb_publishable_o6QuULve8l6Iv6rpfVkIkg_pzcs5G4w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);