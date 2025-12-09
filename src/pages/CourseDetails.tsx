import { Box, Button, Container, Flex, Heading, Image, List, ListIcon, ListItem, SimpleGrid, Stack, Text, VStack, Badge, Spinner, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { CheckCircle, Clock, Calendar, Video } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CourseService, Course } from '../services/courseService'

const CourseDetails = () => {
  const { id } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadCourse = async () => {
      if (id) {
        const data = await CourseService.getById(parseInt(id))
        setCourse(data)
      }
      setLoading(false)
    }
    loadCourse()
  }, [id])

  const handleEnroll = async () => {
    if (!course || !formData.name || !formData.email || !formData.phone) {
      toast({ title: 'Error', description: 'Por favor completa todos los campos', status: 'error' })
      return
    }

    setSubmitting(true)
    try {
      await CourseService.enroll({
        course_id: course.id,
        student_name: formData.name,
        student_email: formData.email,
        student_phone: formData.phone
      })
      toast({ title: '¡Inscripción Exitosa!', description: 'Nos pondremos en contacto contigo pronto.', status: 'success', duration: 5000 })
      onClose()
      setFormData({ name: '', email: '', phone: '' })
    } catch (error) {
      toast({ title: 'Error', description: 'Hubo un problema al inscribirte. Intenta de nuevo.', status: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Center py={20}><Spinner size="xl" color="brand.500" /></Center>
  if (!course) return <Center py={20}><Text>Curso no encontrado</Text></Center>

  return (
    <Box>
      {/* Hero */}
      <Box bg="brand.900" color="white" py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <VStack align="flex-start" spacing={6}>
              <Badge colorScheme="green" fontSize="md" px={3} py={1} borderRadius="full">Inscripciones Abiertas</Badge>
              <Heading size="2xl">{course.title}</Heading>
              <Text fontSize="xl" color="gray.300">
                {course.description}
              </Text>
              <Stack direction="row" spacing={6} color="brand.200">
                <Flex align="center"><Clock size={20} style={{ marginRight: '8px' }} /> {course.duration}</Flex>
                <Flex align="center"><Video size={20} style={{ marginRight: '8px' }} /> {course.modality}</Flex>
                <Flex align="center"><Calendar size={20} style={{ marginRight: '8px' }} /> {course.schedule}</Flex>
              </Stack>
            </VStack>
            <Box>
              <Image 
                src={course.image} 
                borderRadius="xl" 
                boxShadow="2xl"
                border="4px solid white"
                maxH="400px"
                objectFit="cover"
                w="full"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
          {/* Main Content */}
          <Box gridColumn={{ lg: 'span 2' }}>
            <Heading size="lg" mb={6}>Lo que aprenderás</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={10}>
              <List spacing={3}>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Fundamentos sólidos</ListItem>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Proyectos prácticos</ListItem>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Metodología STEM</ListItem>
              </List>
              <List spacing={3}>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Uso de herramientas profesionales</ListItem>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Trabajo en equipo</ListItem>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Resolución de problemas</ListItem>
              </List>
            </SimpleGrid>

            <Heading size="lg" mb={6}>Instructor</Heading>
            <Box p={6} bg="gray.50" borderRadius="lg">
              <Text fontWeight="bold" fontSize="lg" mb={2}>{course.instructor}</Text>
              <Text color="gray.600">Experto en el área con años de experiencia enseñando a jóvenes y adultos.</Text>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box>
            <Box p={6} border="1px" borderColor="gray.200" borderRadius="xl" position="sticky" top={24} bg="white" boxShadow="sm">
              <Heading size="xl" mb={2} color="brand.600">{course.price} Bs</Heading>
              <Text color="gray.500" mb={6}>Pago único</Text>
              
              <Button size="lg" colorScheme="brand" w="full" mb={4} onClick={onOpen}>Inscribirme Ahora</Button>
              <Text fontSize="sm" color="gray.500" textAlign="center" mb={6}>Cupos limitados</Text>

              <Heading size="md" mb={4}>Este curso incluye:</Heading>
              <List spacing={3}>
                <ListItem><ListIcon as={Video} color="brand.500" />Clases en vivo</ListItem>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Material digital</ListItem>
                <ListItem><ListIcon as={CheckCircle} color="brand.500" />Certificado de finalización</ListItem>
              </List>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Enrollment Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inscripción al Curso</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4} color="gray.600">Completa tus datos para reservar tu cupo en <strong>{course.title}</strong>.</Text>
            
            <FormControl mb={4} isRequired>
              <FormLabel>Nombre Completo</FormLabel>
              <Input placeholder="Ej. Juan Perez" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input type="email" placeholder="ejemplo@correo.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Teléfono / WhatsApp</FormLabel>
              <Input placeholder="Ej. 77712345" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleEnroll} isLoading={submitting}>
              Confirmar Inscripción
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CourseDetails
