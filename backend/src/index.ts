import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || '*'

// Supabase client en backend
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseKey)

// Middlewares
app.use(helmet())
app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())
app.use(morgan('dev'))

// ============================================================================
// MECANISMO DE CACHÉ EN MEMORIA (Requerimiento Plan de Proyecto - Sección 6.3)
// Protege los recursos del VPS (4 GB RAM, 2 CPU) de consultas repetitivas
// ============================================================================
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
  cacheStore.set(key, {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  })
}

// Health check para Coolify
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'CienciaLink Bolivia API',
  })
})

// 1. Obtener las 8 Comisiones Tecnológicas (con caché de 10 min)
app.get('/api/commissions', async (_req: Request, res: Response) => {
  const cacheKey = 'commissions_all'
  const cached = getCached(cacheKey)
  if (cached) {
    return res.json({ source: 'cache', data: cached })
  }

  const { data, error } = await supabase.from('commissions').select('*').order('id', { ascending: true })
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  setCached(cacheKey, data, 600)
  return res.json({ source: 'database', data })
})

// 2. Muro interactivo por comisión
app.get('/api/commissions/:slug/wall', async (req: Request, res: Response) => {
  const { slug } = req.params
  const { data, error } = await supabase
    .from('commission_wall_posts')
    .select('*')
    .eq('commission_slug', slug)
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }
  return res.json(data)
})

app.post('/api/commissions/:slug/wall', async (req: Request, res: Response) => {
  const { slug } = req.params
  const { author_name, author_role, content, tags } = req.body

  if (!content) {
    return res.status(400).json({ error: 'El contenido del post es obligatorio.' })
  }

  const { data, error } = await supabase
    .from('commission_wall_posts')
    .insert([
      {
        commission_slug: slug,
        author_name: author_name || 'Miembro Anónimo',
        author_role: author_role || 'Miembro Colaborador',
        content,
        tags: tags || ['Aporte'],
      },
    ])
    .select()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json(data[0])
})

// 3. Repositorio Científico (Papers)
app.get('/api/papers', async (_req: Request, res: Response) => {
  const cacheKey = 'scientific_papers'
  const cached = getCached(cacheKey)
  if (cached) {
    return res.json({ source: 'cache', data: cached })
  }

  const { data, error } = await supabase.from('scientific_papers').select('*').order('id', { ascending: false })
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  setCached(cacheKey, data, 600)
  return res.json({ source: 'database', data })
})

// 4. Portafolio de Proyectos
app.get('/api/projects', async (_req: Request, res: Response) => {
  const cacheKey = 'projects_pipeline'
  const cached = getCached(cacheKey)
  if (cached) {
    return res.json({ source: 'cache', data: cached })
  }

  const { data, error } = await supabase.from('projects').select('*').order('progress_pct', { ascending: false })
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  setCached(cacheKey, data, 300)
  return res.json({ source: 'database', data })
})

// 5. Suscripción Newsletter STEM / Registro de Miembros
app.post('/api/newsletter', async (req: Request, res: Response) => {
  const { email, full_name, interest_area } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ingresa un correo electrónico válido.' })
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email, full_name, interest_area: interest_area || 'STEM General' }])

  if (error) {
    // Si ya existe u otro error, se entrega respuesta amigable
    return res.json({ message: '¡Gracias por confirmar tu interés en CienciaLink Bolivia!' })
  }

  return res.status(201).json({ message: '¡Registro exitoso a la red STEM de CienciaLink Bolivia!' })
})

app.listen(PORT, () => {
  console.log(`[CienciaLink API] Servidor corriendo en puerto ${PORT}`)
  console.log(`[CienciaLink API] Optimizado para despliegue en Coolify`)
})
