import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ypfduxmpahqamwpqsivc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZmR1eG1wYWhxYW13cHFzaXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MDc3NTQsImV4cCI6MjA4MDI4Mzc1NH0.ZVTaZQiE4bIHv0Euis6FEJ_ifvL1950kMzWRK7MwYnQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
