import { Box, Container, Heading, Input, InputGroup, InputLeftElement, SimpleGrid, Select, Stack, Text } from '@chakra-ui/react'
import { Search } from 'lucide-react'
import { CourseCard } from '../components/CourseCard'
import { useEffect, useState } from 'react'
import { CourseService, Course } from '../services/courseService'

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    const loadCourses = async () => {
      const data = await CourseService.getAll()
      setCourses(data)
      setFilteredCourses(data)
    }
    loadCourses()
  }, [])

  useEffect(() => {
    const results = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter ? course.category === categoryFilter : true
      return matchesSearch && matchesCategory
    })
    setFilteredCourses(results)
  }, [searchTerm, categoryFilter, courses])

  return (
    <Box pt={10}>
      <Container maxW="container.xl">
        <Heading mb={8} color="brand.800">Catálogo de Cursos</Heading>
        
        {/* Filters */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={12}>
          <InputGroup maxW={{ base: 'full', md: '400px' }}>
            <InputLeftElement pointerEvents="none">
              <Search color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Buscar cursos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
            />
          </InputGroup>
          <Select 
            placeholder="Categoría" 
            maxW={{ base: 'full', md: '200px' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            bg="white"
          >
            <option value="programacion">Programación</option>
            <option value="robotica">Robótica</option>
            <option value="diseno">Diseño 3D</option>
          </Select>
        </Stack>

        {/* Course Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={20}>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              price={`${course.price} Bs`}
              badges={[course.modality, course.duration]}
            />
          ))}
          {filteredCourses.length === 0 && (
            <Text color="gray.500" fontSize="lg">No se encontraron cursos.</Text>
          )}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Courses
