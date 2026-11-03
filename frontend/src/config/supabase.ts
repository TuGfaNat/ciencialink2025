import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si no hay variables de supabase válidas, usamos un dummy con métodos encadenables para no romper typescript
export const supabase: any = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('ypfduxmpahqamwpqsivc'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => {
        const chain: any = {
          select: () => chain,
          insert: () => chain,
          update: () => chain,
          delete: () => chain,
          eq: () => chain,
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => chain,
          then: (resolve: any) => resolve({ data: [], error: null }),
        }
        return chain
      },
    }
