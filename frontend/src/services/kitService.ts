import { supabase } from '../config/supabase'

export interface Kit {
  title: string
  price: string
  image: string
  tag: string
}

export interface PurchaseData {
  kit_title: string
  price: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address?: string
}

export const KitService = {
  purchase: async (data: PurchaseData) => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.from('kit_purchases').insert([data])
      if (error) throw error
      return true
    }
    return true
  }
}
