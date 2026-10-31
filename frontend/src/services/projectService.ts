import { supabase } from '../config/supabase'

export interface Project {
  id: number
  title: string
  description: string
  commission_slug: string
  stage: 'Ideación' | 'Desarrollo' | 'Pruebas' | 'Completado'
  progress_pct: number
  image_url: string
  leader: string
  tags: string[]
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Brazo Robótico Inclusivo de Bajo Costo',
    description: 'Prótesis funcional impresa en 3D con control mioeléctrico y servomotores para personas con amputación en extremidad superior.',
    commission_slug: 'robotica',
    stage: 'Pruebas',
    progress_pct: 85,
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    leader: 'Ing. Carlos Mamani',
    tags: ['Robótica', '3D', 'Salud', 'Inclusión'],
  },
  {
    id: 2,
    title: 'Red IoT de Monitoreo de Calidad de Aire para La Paz y El Alto',
    description: 'Red comunitaria de nodos con sensores de material particulado PM2.5, temperatura, humedad y transmisión abierta LoRaWAN.',
    commission_slug: 'iot',
    stage: 'Desarrollo',
    progress_pct: 70,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    leader: 'Ing. Pamela Flores',
    tags: ['IoT', 'Medio Ambiente', 'LoRaWAN', 'Datos Abiertos'],
  },
  {
    id: 3,
    title: 'LLM Asistente Educativo STEM en Lenguas Originarias',
    description: 'Alineación y entrenamiento de modelos de lenguaje abierto para soporte escolar en quechua, aymara y castellano.',
    commission_slug: 'ia',
    stage: 'Desarrollo',
    progress_pct: 60,
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    leader: 'MSc. Roberto Mendoza',
    tags: ['IA', 'NLP', 'Lenguas Originarias', 'STEM'],
  },
  {
    id: 4,
    title: 'Portal Unificado Modular CienciaLink Bolivia',
    description: 'Arquitectura web modular responsiva (mobile-first) con soporte de caché y sincronización para las 8 comisiones tecnológicas.',
    commission_slug: 'software',
    stage: 'Pruebas',
    progress_pct: 90,
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    leader: 'Lic. Alejandro Choque',
    tags: ['React', 'TypeScript', 'Coolify', 'Open Source'],
  },
]

export const ProjectService = {
  async getAll(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('progress_pct', { ascending: false })

      if (error || !data || data.length === 0) {
        return DEFAULT_PROJECTS
      }
      return data as Project[]
    } catch {
      return DEFAULT_PROJECTS
    }
  },

  async getByCommission(commissionSlug: string): Promise<Project[]> {
    const list = await this.getAll()
    return list.filter((p) => p.commission_slug === commissionSlug)
  },
}
