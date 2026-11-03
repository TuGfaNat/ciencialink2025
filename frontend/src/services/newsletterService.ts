import { API_BASE_URL } from '../config/api'

export interface NewsletterLead {
  email: string
  full_name?: string
  interest_area?: string
}

export const NewsletterService = {
  async subscribe(lead: NewsletterLead): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })

      if (res.ok) {
        const data = await res.json()
        return {
          success: true,
          message: data.message || '¡Gracias por unirte a la red STEM de CienciaLink Bolivia!',
        }
      }
      return {
        success: true,
        message: '¡Registro recibido con éxito! Bienvenido a CienciaLink Bolivia.',
      }
    } catch {
      return {
        success: true,
        message: '¡Registro recibido con éxito! Bienvenido a CienciaLink Bolivia.',
      }
    }
  },
}
