import { supabase } from '../config/supabase'

export interface Commission {
  id: number
  slug: string
  name: string
  short_name: string
  description: string
  color: string
  icon: string
  leader_name: string
  leader_role: string
  leader_avatar?: string
  members_count: number
  active_projects_count: number
}

export interface CommissionPost {
  id: number
  commission_slug: string
  author_name: string
  author_role: string
  content: string
  tags: string[]
  likes_count: number
  created_at: string
}

const DEFAULT_COMMISSIONS: Commission[] = [
  {
    id: 1,
    slug: 'ia',
    name: 'Inteligencia Artificial y Aprendizaje Automático',
    short_name: 'IA & Machine Learning',
    description: 'Investigación y aplicación de modelos de lenguaje, visión por computadora y automatización cognitiva para desafíos locales.',
    color: '#00529C',
    icon: 'Bot',
    leader_name: 'MSc. Roberto Mendoza',
    leader_role: 'Coordinador de IA',
    leader_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    members_count: 34,
    active_projects_count: 4,
  },
  {
    id: 2,
    slug: 'robotica',
    name: 'Robótica, Automatización y Mecatrónica',
    short_name: 'Robótica & Mecatrónica',
    description: 'Diseño de robots educativos, brazos mecánicos y sistemas autónomos aplicados a la industria y la educación boliviana.',
    color: '#F80034',
    icon: 'Cpu',
    leader_name: 'Ing. Carlos Mamani',
    leader_role: 'Coordinador de Robótica',
    leader_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    members_count: 42,
    active_projects_count: 6,
  },
  {
    id: 3,
    slug: 'iot',
    name: 'Internet de las Cosas y Sistemas Embebidos',
    short_name: 'IoT & Hardware',
    description: 'Desarrollo de estaciones de monitoreo ambiental, sensores agrícolas e integración con microcontroladores.',
    color: '#007A3D',
    icon: 'Wifi',
    leader_name: 'Ing. Pamela Flores',
    leader_role: 'Coordinadora de IoT',
    leader_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    members_count: 28,
    active_projects_count: 3,
  },
  {
    id: 4,
    slug: 'software',
    name: 'Desarrollo de Software y Plataformas Web',
    short_name: 'Software & Web',
    description: 'Creación de plataformas escalables, arquitecturas cloud, sistemas de gestión y herramientas de código abierto.',
    color: '#132F42',
    icon: 'Code',
    leader_name: 'Lic. Alejandro Choque',
    leader_role: 'Coordinador de Software',
    leader_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    members_count: 45,
    active_projects_count: 5,
  },
  {
    id: 5,
    slug: 'biotec',
    name: 'Biotecnología y Bioingeniería',
    short_name: 'Biotecnología',
    description: 'Exploración de bioprocesos, modelado computacional molecular y soluciones biotecnológicas sostenibles.',
    color: '#0D9488',
    icon: 'Dna',
    leader_name: 'Dra. Valeria Ramos',
    leader_role: 'Coordinadora de Bio',
    leader_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    members_count: 21,
    active_projects_count: 2,
  },
  {
    id: 6,
    slug: '3d',
    name: 'Diseño 3D y Fabricación Digital',
    short_name: 'Diseño 3D & FabLab',
    description: 'Modelado asistido por computadora, prototipado rápido en resina/filamento y articulación directa con MakerLink.',
    color: '#EA580C',
    icon: 'Box',
    leader_name: 'Arq. Luis Pérez',
    leader_role: 'Coordinador 3D',
    leader_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    members_count: 30,
    active_projects_count: 4,
  },
  {
    id: 7,
    slug: 'telecom',
    name: 'Telecomunicaciones y Redes',
    short_name: 'Telecom & Conectividad',
    description: 'Sistemas de comunicación, antenas de largo alcance y democratización de conectividad en comunidades.',
    color: '#4F46E5',
    icon: 'Radio',
    leader_name: 'Ing. Sofía Méndez',
    leader_role: 'Coordinadora de Telecom',
    leader_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    members_count: 18,
    active_projects_count: 2,
  },
  {
    id: 8,
    slug: 'divulgacion',
    name: 'Divulgación Científica y Educación STEM',
    short_name: 'Educación STEM',
    description: 'Estrategias pedagógicas activas, talleres prácticos para colegios y generación de contenidos de impacto masivo.',
    color: '#CA8A04',
    icon: 'GraduationCap',
    leader_name: 'Lic. Gabriela Paz',
    leader_role: 'Coordinadora STEM',
    leader_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
    members_count: 50,
    active_projects_count: 7,
  },
]

export const CommissionService = {
  async getAll(): Promise<Commission[]> {
    try {
      const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .order('id', { ascending: true })

      if (error || !data || data.length === 0) {
        return DEFAULT_COMMISSIONS
      }
      return data as Commission[]
    } catch {
      return DEFAULT_COMMISSIONS
    }
  },

  async getBySlug(slug: string): Promise<Commission | undefined> {
    const list = await this.getAll()
    return list.find((c) => c.slug === slug)
  },

  async getWallPosts(commissionSlug: string): Promise<CommissionPost[]> {
    try {
      const { data, error } = await supabase
        .from('commission_wall_posts')
        .select('*')
        .eq('commission_slug', commissionSlug)
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) {
        return [
          {
            id: 1,
            commission_slug: commissionSlug,
            author_name: 'Líder de Comisión',
            author_role: 'Coordinador',
            content: `Bienvenidos al muro interactivo de la Comisión de ${commissionSlug.toUpperCase()}. Aquí compartimos avances, papers y consultas técnicas entre miembros.`,
            tags: ['Anuncio', 'Bienvenida', 'Comunidad'],
            likes_count: 12,
            created_at: new Date().toLocaleDateString('es-BO'),
          },
        ]
      }
      return data as CommissionPost[]
    } catch {
      return [
        {
          id: 1,
          commission_slug: commissionSlug,
          author_name: 'Líder de Comisión',
          author_role: 'Coordinador',
          content: `Muro interactivo de la Comisión de ${commissionSlug.toUpperCase()}. Espacio de intercambio técnico y colaborativo.`,
          tags: ['Anuncio', 'Comunidad'],
          likes_count: 8,
          created_at: new Date().toLocaleDateString('es-BO'),
        },
      ]
    }
  },

  async addWallPost(post: Omit<CommissionPost, 'id' | 'likes_count' | 'created_at'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('commission_wall_posts')
        .insert([post])
      return !error
    } catch {
      return false
    }
  },
}
