import { supabase } from '../config/supabase'


export interface BlogPost {
  id: number
  title: string
  date: string
  image: string
  author: string
  content?: string
}


const MOCK_POSTS: BlogPost[] = [
  { 
    id: 0,
    title: 'El futuro de la IA en la educación', 
    date: '1 Mar 2025', 
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
    author: 'Ana G.',
    content: `La inteligencia artificial está transformando rápidamente la forma en que enseñamos y aprendemos...`
  },
  { 
    id: 1,
    title: 'Resumen de la Feria de Ciencias 2024', 
    date: '25 Feb 2025', 
    image: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
    author: 'Carlos M.',
    content: `La feria de este año fue un éxito rotundo con más de 200 proyectos presentados...`
  },
  { 
    id: 2,
    title: '5 Proyectos con Arduino para principiantes', 
    date: '15 Feb 2025', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
    author: 'Luis P.',
    content: `Arduino es la mejor plataforma para iniciarse en la electrónica. Aquí tienes 5 ideas...`
  },
]

export const BlogService = {
  getAll: async (): Promise<BlogPost[]> => {

    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('posts').select('*')
      if (!error && data) return data
    }

    return MOCK_POSTS
  },

  getById: async (id: number): Promise<BlogPost | undefined> => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
      if (!error && data) return data
    }
    return MOCK_POSTS[id] || MOCK_POSTS[0]
  }
}
