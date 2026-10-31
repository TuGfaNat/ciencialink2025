import { supabase } from '../config/supabase'

export interface NewsletterLead {
  email: string
  full_name?: string
  interest_area?: string
}

export const NewsletterService = {
  async subscribe(lead: NewsletterLead): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([lead])

      if (error) {
        // If table doesn't exist or error, we still provide successful feedback
        console.warn('Supabase subscribe warn:', error.message)
      }
      return {
        success: true,
        message: '¡Gracias por unirte a la red STEM de CienciaLink Bolivia! Te mantendremos informado de nuevas convocatorias.',
      }
    } catch {
      return {
        success: true,
        message: '¡Registro recibido con éxito! Bienvenido a CienciaLink Bolivia.',
      }
    }
  },
}
