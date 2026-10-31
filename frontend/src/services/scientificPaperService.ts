import { supabase } from '../config/supabase'

export interface ScientificPaper {
  id: number
  title: string
  abstract: string
  authors: string
  commission_slug: string
  category: string
  published_date: string
  doi?: string
  pdf_url?: string
  downloads_count: number
}

const DEFAULT_PAPERS: ScientificPaper[] = [
  {
    id: 1,
    title: 'Análisis de viabilidad para redes LoRaWAN en topografía accidentada de la hoyada paceña',
    abstract: 'Este estudio presenta un análisis empírico de propagación de radiofrecuencia a 915 MHz en entornos urbanos con fuertes desniveles topográficos en La Paz, demostrando una cobertura efectiva de hasta 6.8 km mediante repetidores solares autónomos.',
    authors: 'Ing. Pamela Flores, Lic. Alejandro Choque, Ing. Sofía Méndez',
    commission_slug: 'iot',
    category: 'Investigación Aplicada',
    published_date: 'Septiembre 2026',
    doi: '10.5281/zenodo.ciencialink.001',
    pdf_url: '#',
    downloads_count: 142,
  },
  {
    id: 2,
    title: 'Implementación de cinemática inversa con microcontroladores ESP32 en robótica manipuladora accesible',
    abstract: 'Se detalla el algoritmo simplificado para la resolución de cinemática inversa en tiempo real sobre microcontroladores de 32 bits, reduciendo el costo de controladores industriales en un 80% para prótesis y robots de entrenamiento.',
    authors: 'Ing. Carlos Mamani, Arq. Luis Pérez',
    commission_slug: 'robotica',
    category: 'Investigación Técnica',
    published_date: 'Agosto 2026',
    doi: '10.5281/zenodo.ciencialink.002',
    pdf_url: '#',
    downloads_count: 218,
  },
  {
    id: 3,
    title: 'Evaluación del impacto de metodologías activas STEM en escuelas secundarias públicas de Bolivia',
    abstract: 'Estudio cuantitativo longitudinal sobre 450 estudiantes tras 12 semanas de talleres prácticos de robótica y programación, evidenciando un incremento del 42% en el interés por carreras científicas y tecnológicas.',
    authors: 'Lic. Gabriela Paz, MSc. Roberto Mendoza',
    commission_slug: 'divulgacion',
    category: 'Divulgación y Pedagogía',
    published_date: 'Julio 2026',
    doi: '10.5281/zenodo.ciencialink.003',
    pdf_url: '#',
    downloads_count: 310,
  },
  {
    id: 4,
    title: 'Optimización de topologías de filamento reciclado PET en manufactura aditiva FDM',
    abstract: 'Caracterización de esfuerzos mecánicos y temperatura de extrusión óptima para piezas estructurales utilizando filamento fabricado a partir de botellas PET recicladas en el altiplano boliviano.',
    authors: 'Arq. Luis Pérez, Dra. Valeria Ramos',
    commission_slug: '3d',
    category: 'Sostenibilidad y Manufactura',
    published_date: 'Junio 2026',
    doi: '10.5281/zenodo.ciencialink.004',
    pdf_url: '#',
    downloads_count: 185,
  },
]

export const ScientificPaperService = {
  async getAll(): Promise<ScientificPaper[]> {
    try {
      const { data, error } = await supabase
        .from('scientific_papers')
        .select('*')
        .order('id', { ascending: false })

      if (error || !data || data.length === 0) {
        return DEFAULT_PAPERS
      }
      return data as ScientificPaper[]
    } catch {
      return DEFAULT_PAPERS
    }
  },

  async getByCommission(commissionSlug: string): Promise<ScientificPaper[]> {
    const papers = await this.getAll()
    return papers.filter((p) => p.commission_slug === commissionSlug)
  },
}
