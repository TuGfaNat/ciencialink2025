import { supabase } from '../config/supabase'

export interface ContactMessage {
  name: string
  email: string
  phone: string
  message: string
}

export interface EventRegistration {
  event_name: string
  name: string
  email: string
  phone: string
  comment?: string
}

export const ContactService = {
  sendMessage: async (data: ContactMessage) => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.from('messages').insert([data])
      if (error) throw error
      return true
    }
    return true
  },

  registerForEvent: async (data: EventRegistration) => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.from('event_registrations').insert([data])
      if (error) throw error
      return true
    }
    return true
  }
}
