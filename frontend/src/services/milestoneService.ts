import { API_BASE_URL } from '../config/api'

export interface Milestone {
  id: number
  year: string
  date_str: string
  title: string
  description: string
  category: 'Evento' | 'Convenio' | 'Logro' | 'Expansión'
  impact_metric?: string
  image_url?: string
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: 1,
    year: '2024',
    date_str: 'Noviembre 2024',
    title: 'Nacimiento de CienciaLink Bolivia',
    description: 'Consolidación del núcleo fundador de estudiantes, docentes e ingenieros apasionados por democratizar la educación científica en el país.',
    category: 'Logro',
    impact_metric: '15 Pioneros Fundadores',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
  },
  {
    id: 2,
    year: '2025',
    date_str: 'Mayo 2025',
    title: 'Primera Semana STEM Bolivia',
    description: 'Jornada nacional de talleres prácticos de robótica, electrónica, diseño 3D e inteligencia artificial para jóvenes escolares.',
    category: 'Evento',
    impact_metric: '+600 Estudiantes',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
  },
  {
    id: 3,
    year: '2025',
    date_str: 'Agosto 2025',
    title: 'Convenio con Fundación Patiño y UMSA',
    description: 'Acuerdos de cooperación académica para facilitación de espacios de laboratorio, mentores y certámenes formativos.',
    category: 'Convenio',
    impact_metric: '2 Convenios Clave',
    image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600',
  },
  {
    id: 4,
    year: '2026',
    date_str: 'Enero 2026',
    title: 'Lanzamiento del Torneo LINKUP & Alianza MakerLink',
    description: 'Certamen interdepartamental de prototipado tecnológico y articulación con MakerLink para manufactura y fabricación aditiva.',
    category: 'Evento',
    impact_metric: '40 Equipos Competidores',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
  },
]

export const MilestoneService = {
  async getAll(): Promise<Milestone[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/milestones`)
      if (res.ok) {
        const json = await res.json()
        if (json.data && json.data.length > 0) {
          return json.data
        }
      }
      return DEFAULT_MILESTONES
    } catch {
      return DEFAULT_MILESTONES
    }
  },
}
