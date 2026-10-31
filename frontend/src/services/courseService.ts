import { supabase } from '../config/supabase'

export interface Course {
  id: number
  title: string
  description: string
  image: string
  price: number
  instructor: string
  duration: string
  schedule: string
  modality: string
  category: string
  badges?: string[]
}

export interface EnrollmentData {
  course_id: number
  student_name: string
  student_email: string
  student_phone: string
}

export const CourseService = {
  getAll: async (): Promise<Course[]> => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('courses').select('*')
      if (!error && data) return data
    }
    return []
  },

  getById: async (id: number): Promise<Course | null> => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('courses').select('*').eq('id', id).single()
      if (!error && data) return data
    }
    return null
  },

  enroll: async (data: EnrollmentData) => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { error } = await supabase.from('enrollments').insert([data])
      if (error) throw error
      return true
    }
    return true
  }
}
