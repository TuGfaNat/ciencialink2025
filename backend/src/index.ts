import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { Pool } from 'pg'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || '*'

// Middlewares
app.use(helmet())
app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())
app.use(morgan('dev'))

// ============================================================================
// CONEXIÓN A BASE DE DATOS DUAL: POSTGRESQL LOCAL (COOLIFY) O SUPABASE
// ============================================================================
const DATABASE_URL = process.env.DATABASE_URL
let pgPool: Pool | null = null

if (DATABASE_URL) {
  console.log('[DB] Conectando a PostgreSQL local...')
  pgPool = new Pool({
    connectionString: DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
  })
}

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

// Inicialización de tablas si usamos PostgreSQL local
const initLocalDb = async () => {
  if (!pgPool) return
  try {
    await pgPool.query(`
      create table if not exists commissions (
        id serial primary key,
        slug text unique not null,
        name text not null,
        short_name text not null,
        description text not null,
        color text not null,
        icon text not null,
        leader_name text not null,
        leader_role text not null,
        leader_avatar text,
        members_count integer default 0,
        active_projects_count integer default 0,
        created_at timestamp with time zone default now()
      );

      create table if not exists commission_wall_posts (
        id serial primary key,
        commission_slug text references commissions(slug) on delete cascade,
        author_name text not null,
        author_role text not null,
        content text not null,
        tags text[] default '{}',
        likes_count integer default 0,
        created_at timestamp with time zone default now()
      );

      create table if not exists scientific_papers (
        id serial primary key,
        title text not null,
        abstract text not null,
        authors text not null,
        commission_slug text,
        category text not null,
        published_date text not null,
        doi text,
        pdf_url text,
        downloads_count integer default 0,
        created_at timestamp with time zone default now()
      );

      create table if not exists projects (
        id serial primary key,
        title text not null,
        description text not null,
        commission_slug text,
        stage text not null,
        progress_pct integer default 0,
        image_url text,
        leader text not null,
        tags text[] default '{}',
        created_at timestamp with time zone default now()
      );

      create table if not exists newsletter_subscribers (
        id serial primary key,
        email text unique not null,
        full_name text,
        interest_area text,
        created_at timestamp with time zone default now()
      );
    `)

    // Insertar comisiones semilla si está vacía
    const countRes = await pgPool.query('select count(*) from commissions')
    if (parseInt(countRes.rows[0].count) === 0) {
      console.log('[DB] Sembrando comisiones en PostgreSQL local...')
      await pgPool.query(`
        insert into commissions (slug, name, short_name, description, color, icon, leader_name, leader_role, leader_avatar, members_count, active_projects_count)
        values
          ('ia', 'Inteligencia Artificial y Aprendizaje Automático', 'IA & Machine Learning', 'Investigación y aplicación de modelos de lenguaje y visión artificial.', '#00529C', 'Bot', 'MSc. Roberto Mendoza', 'Coordinador IA', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', 34, 4),
          ('robotica', 'Robótica, Automatización y Mecatrónica', 'Robótica & Mecatrónica', 'Robótica educativa, cinemática y control de actuadores.', '#F80034', 'Cpu', 'Ing. Carlos Mamani', 'Coordinador Robótica', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 42, 6),
          ('iot', 'Internet de las Cosas y Sistemas Embebidos', 'IoT & Hardware', 'Monitoreo ambiental con LoRaWAN y microcontroladores ESP32.', '#007A3D', 'Wifi', 'Ing. Pamela Flores', 'Coordinadora IoT', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200', 28, 3),
          ('software', 'Desarrollo de Software y Plataformas Web', 'Software & Web', 'Plataformas colaborativas, apps cloud y código abierto.', '#132F42', 'Code', 'Lic. Alejandro Choque', 'Coordinador Software', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', 45, 5),
          ('biotec', 'Biotecnología y Bioingeniería', 'Biotecnología', 'Bioprocesos y modelado molecular computacional.', '#0D9488', 'Dna', 'Dra. Valeria Ramos', 'Coordinadora Bio', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200', 21, 2),
          ('3d', 'Diseño 3D y Fabricación Digital', 'Diseño 3D & FabLab', 'Prototipado rápido y articulación directa con MakerLink.', '#EA580C', 'Box', 'Arq. Luis Pérez', 'Coordinador 3D', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', 30, 4),
          ('telecom', 'Telecomunicaciones y Redes', 'Telecom & Conectividad', 'Conectividad comunitaria y redes inalámbricas de largo alcance.', '#4F46E5', 'Radio', 'Ing. Sofía Méndez', 'Coordinadora Telecom', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', 18, 2),
          ('divulgacion', 'Divulgación Científica y Educación STEM', 'Educación STEM', 'Metodologías pedagógicas activas y talleres escolares.', '#CA8A04', 'GraduationCap', 'Lic. Gabriela Paz', 'Coordinadora STEM', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200', 50, 7);
      `)
    }
  } catch (err: any) {
    console.error('[DB] Error inicializando tablas locales:', err.message)
  }
}

initLocalDb()

// Caché en memoria (Protege la RAM de 4GB en Coolify)
interface CacheEntry<T> {
  data: T
  expiry: number
}
const cacheStore = new Map<string, CacheEntry<any>>()

const getCached = <T>(key: string): T | null => {
  const item = cacheStore.get(key)
  if (!item) return null
  if (Date.now() > item.expiry) {
    cacheStore.delete(key)
    return null
  }
  return item.data
}

const setCached = <T>(key: string, data: T, ttlSeconds: number = 300) => {
  cacheStore.set(key, { data, expiry: Date.now() + ttlSeconds * 1000 })
}

// Health check para Coolify
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    mode: pgPool ? 'Local PostgreSQL' : 'Supabase Cloud',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'CienciaLink Bolivia API',
  })
})

// 1. Obtener Comisiones
app.get('/api/commissions', async (_req: Request, res: Response) => {
  const cacheKey = 'commissions_all'
  const cached = getCached(cacheKey)
  if (cached) return res.json({ source: 'cache', data: cached })

  if (pgPool) {
    try {
      const result = await pgPool.query('select * from commissions order by id asc')
      setCached(cacheKey, result.rows, 600)
      return res.json({ source: 'local_database', data: result.rows })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (supabase) {
    const { data, error } = await supabase.from('commissions').select('*').order('id', { ascending: true })
    if (error) return res.status(500).json({ error: error.message })
    setCached(cacheKey, data, 600)
    return res.json({ source: 'database', data })
  }

  return res.json({ source: 'default', data: [] })
})

// 2. Muro interactivo por comisión
app.get('/api/commissions/:slug/wall', async (req: Request, res: Response) => {
  const { slug } = req.params

  if (pgPool) {
    try {
      const result = await pgPool.query(
        'select * from commission_wall_posts where commission_slug = $1 order by created_at desc',
        [slug]
      )
      return res.json(result.rows)
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('commission_wall_posts')
      .select('*')
      .eq('commission_slug', slug)
      .order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  return res.json([])
})

app.post('/api/commissions/:slug/wall', async (req: Request, res: Response) => {
  const { slug } = req.params
  const { author_name, author_role, content, tags } = req.body

  if (!content) return res.status(400).json({ error: 'El contenido es obligatorio.' })

  if (pgPool) {
    try {
      const result = await pgPool.query(
        `insert into commission_wall_posts (commission_slug, author_name, author_role, content, tags)
         values ($1, $2, $3, $4, $5) returning *`,
        [slug, author_name || 'Miembro', author_role || 'Colaborador', content, tags || ['Aporte']]
      )
      return res.status(201).json(result.rows[0])
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('commission_wall_posts')
      .insert([
        {
          commission_slug: slug,
          author_name: author_name || 'Miembro',
          author_role: author_role || 'Colaborador',
          content,
          tags: tags || ['Aporte'],
        },
      ])
      .select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data[0])
  }

  return res.status(500).json({ error: 'No database configured' })
})

// 3. Repositorio Científico (Papers)
app.get('/api/papers', async (_req: Request, res: Response) => {
  const cacheKey = 'scientific_papers'
  const cached = getCached(cacheKey)
  if (cached) return res.json({ source: 'cache', data: cached })

  if (pgPool) {
    try {
      const result = await pgPool.query('select * from scientific_papers order by id desc')
      setCached(cacheKey, result.rows, 600)
      return res.json({ source: 'local_database', data: result.rows })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (supabase) {
    const { data, error } = await supabase.from('scientific_papers').select('*').order('id', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    setCached(cacheKey, data, 600)
    return res.json({ source: 'database', data })
  }

  return res.json({ source: 'default', data: [] })
})

// 4. Proyectos
app.get('/api/projects', async (_req: Request, res: Response) => {
  const cacheKey = 'projects_pipeline'
  const cached = getCached(cacheKey)
  if (cached) return res.json({ source: 'cache', data: cached })

  if (pgPool) {
    try {
      const result = await pgPool.query('select * from projects order by progress_pct desc')
      setCached(cacheKey, result.rows, 300)
      return res.json({ source: 'local_database', data: result.rows })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (supabase) {
    const { data, error } = await supabase.from('projects').select('*').order('progress_pct', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    setCached(cacheKey, data, 300)
    return res.json({ source: 'database', data })
  }

  return res.json({ source: 'default', data: [] })
})

// 5. Newsletter
app.post('/api/newsletter', async (req: Request, res: Response) => {
  const { email, full_name, interest_area } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ingresa un correo válido.' })
  }

  if (pgPool) {
    try {
      await pgPool.query(
        'insert into newsletter_subscribers (email, full_name, interest_area) values ($1, $2, $3) on conflict (email) do nothing',
        [email, full_name || '', interest_area || 'STEM General']
      )
      return res.status(201).json({ message: '¡Registro exitoso en CienciaLink Bolivia!' })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (supabase) {
    await supabase.from('newsletter_subscribers').insert([{ email, full_name, interest_area: interest_area || 'STEM General' }])
    return res.status(201).json({ message: '¡Registro exitoso en CienciaLink Bolivia!' })
  }

  return res.status(200).json({ message: 'Registro recibido.' })
})

app.listen(PORT, () => {
  console.log(`[CienciaLink API] Servidor corriendo en puerto ${PORT}`)
  console.log(`[CienciaLink API] Modo de base de datos: ${pgPool ? 'PostgreSQL Local' : 'Supabase Cloud'}`)
})
