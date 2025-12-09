import { Box, Button, Container, Flex, Heading, Icon, SimpleGrid, Stack, Text, VStack, Image } from '@chakra-ui/react'
import { Section } from '../components/Section'
import { CourseCard } from '../components/CourseCard'
import { FaRobot, FaLaptopCode, FaMicroscope, FaUsers, FaCertificate, FaHandshake } from 'react-icons/fa'

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.50" py={20} px={4}>
        <Container maxW="container.xl">
          <Stack direction={{ base: 'column', md: 'row' }} spacing={10} alignItems="center">
            <VStack align="flex-start" spacing={6} flex={1}>
              <Heading as="h1" size="2xl" lineHeight="shorter" color="brand.900">
                Democratizamos la Educación STEM en Bolivia
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Cursos accesibles, kits de robótica y experiencias científicas para todos. Únete a la revolución educativa.
              </Text>
              <Button size="lg" colorScheme="brand" px={8}>
                Explorar Cursos
              </Button>
            </VStack>
            <Box flex={1}>
              <Image 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Estudiantes STEM" 
                borderRadius="xl" 
                boxShadow="2xl"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Featured Courses */}
      <Section title="Cursos Destacados" subtitle="Aprende las habilidades del futuro hoy mismo.">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          <CourseCard
            id={1}
            title="Programación en Python"
            description="Domina el lenguaje más popular del mundo. Desde cero hasta análisis de datos."
            image="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            price="150 Bs"
            badges={['Virtual', 'Certificado']}
          />
          <CourseCard
            id={2}
            title="Robótica con Arduino"
            description="Construye y programa tus propios robots. Incluye kit básico de componentes."
            image="https://images.unsplash.com/photo-1555679427-1f6dfcce943b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            price="250 Bs"
            badges={['Presencial', 'Kit Incluido']}
          />
          <CourseCard
            id={3}
            title="Diseño e Impresión 3D"
            description="Materializa tus ideas. Aprende modelado 3D y operación de impresoras."
            image="https://images.unsplash.com/photo-1631541909061-71e349d1f203?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            price="200 Bs"
            badges={['Taller', 'Práctico']}
          />
        </SimpleGrid>
      </Section>

      {/* Programs */}
      <Section title="Nuestros Programas" bg="gray.50">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {[
            { icon: FaLaptopCode, title: 'Cursos STEM', text: 'Programación, IA y Ciencia de Datos.' },
            { icon: FaRobot, title: 'Kits Robótica', text: 'Material educativo para aprender haciendo.' },
            { icon: FaMicroscope, title: 'CienciaLink Labs', text: 'Acceso a laboratorios y herramientas.' },
            { icon: FaUsers, title: 'Eventos', text: 'Ferias, seminarios y competencias.' },
          ].map((item, i) => (
            <VStack key={i} bg="white" p={6} borderRadius="lg" boxShadow="sm" align="center" textAlign="center">
              <Icon as={item.icon} w={10} h={10} color="brand.500" mb={4} />
              <Heading size="md" mb={2}>{item.title}</Heading>
              <Text color="gray.600">{item.text}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Section>

      {/* Benefits */}
      <Section title="¿Por qué CienciaLink?">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex align="center">
            <Icon as={FaCertificate} w={12} h={12} color="brand.500" mr={6} />
            <Box>
              <Heading size="md" mb={2}>Educación Práctica</Heading>
              <Text color="gray.600">Enfoque 100% práctico y orientado a proyectos reales.</Text>
            </Box>
          </Flex>
          <Flex align="center">
            <Icon as={FaHandshake} w={12} h={12} color="brand.500" mr={6} />
            <Box>
              <Heading size="md" mb={2}>Alianzas Estratégicas</Heading>
              <Text color="gray.600">Trabajamos con las mejores instituciones de Bolivia.</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Section>

      {/* Impact & Testimonials */}
      <Section title="Nuestro Impacto" bg="brand.50">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center" mb={16}>
          <Box>
            <Heading size="3xl" color="brand.600">+500</Heading>
            <Text fontSize="lg" color="gray.600">Estudiantes Capacitados</Text>
          </Box>
          <Box>
            <Heading size="3xl" color="brand.600">20</Heading>
            <Text fontSize="lg" color="gray.600">Instituciones Aliadas</Text>
          </Box>
          <Box>
            <Heading size="3xl" color="brand.600">50+</Heading>
            <Text fontSize="lg" color="gray.600">Proyectos Realizados</Text>
          </Box>
        </SimpleGrid>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box bg="white" p={8} borderRadius="xl" boxShadow="md" position="relative">
            <Icon as={FaUsers} w={8} h={8} color="brand.300" mb={4} />
            <Text fontStyle="italic" mb={4}>"CienciaLink cambió mi forma de ver la tecnología. Ahora quiero estudiar ingeniería mecatrónica."</Text>
            <Text fontWeight="bold">- Camila R., Estudiante de Secundaria</Text>
          </Box>
          <Box bg="white" p={8} borderRadius="xl" boxShadow="md" position="relative">
            <Icon as={FaUsers} w={8} h={8} color="brand.300" mb={4} />
            <Text fontStyle="italic" mb={4}>"Los kits de robótica son excelentes para enseñar en el aula. Muy recomendados."</Text>
            <Text fontWeight="bold">- Prof. Carlos M., Colegio Don Bosco</Text>
          </Box>
        </SimpleGrid>
      </Section>

      {/* Upcoming Events */}
      <Section title="Próximos Eventos">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {[
            { title: 'Feria de Robótica 2025', date: '15 de Marzo', type: 'Presencial' },
            { title: 'Webinar: IA para Todos', date: '22 de Marzo', type: 'Virtual' },
            { title: 'Taller de Arduino', date: '05 de Abril', type: 'Presencial' },
          ].map((event, i) => (
            <Box key={i} border="1px" borderColor="gray.200" p={6} borderRadius="lg" _hover={{ borderColor: 'brand.500' }}>
              <Text color="brand.500" fontWeight="bold" fontSize="sm" mb={2}>{event.type.toUpperCase()}</Text>
              <Heading size="md" mb={2}>{event.title}</Heading>
              <Text color="gray.600" mb={4}>{event.date}</Text>
              <Button variant="link" colorScheme="brand">Ver detalles</Button>
            </Box>
          ))}
        </SimpleGrid>
        <Box textAlign="center" mt={8}>
          <Button variant="outline" colorScheme="brand">Ver todos los eventos</Button>
        </Box>
      </Section>

      {/* Alliances */}
      <Section title="Nuestros Aliados" bg="gray.50">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} alignItems="center" opacity={0.9}>
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Logo_Fundaci%C3%B3n_Sim%C3%B3n_I._Pati%C3%B1o.png" 
            alt="Fundación Simón I. Patiño" 
            filter="grayscale(100%)" 
            _hover={{ filter: 'grayscale(0%)' }} 
            transition="all 0.3s"
            fallbackSrc="https://via.placeholder.com/150x80?text=Fundacion+Patino"
          />
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Escudo_de_la_Universidad_Mayor_de_San_Andr%C3%A9s.png" 
            alt="UMSA" 
            filter="grayscale(100%)" 
            _hover={{ filter: 'grayscale(0%)' }} 
            transition="all 0.3s"
            maxH="100px"
            mx="auto"
            fallbackSrc="https://via.placeholder.com/150x80?text=UMSA"
          />
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_UPB.png" 
            alt="UPB" 
            filter="grayscale(100%)" 
            _hover={{ filter: 'grayscale(0%)' }} 
            transition="all 0.3s"
            maxH="80px"
            mx="auto"
            fallbackSrc="https://via.placeholder.com/150x80?text=UPB"
          />
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Escudo_Colegio_San_Calixto.png/240px-Escudo_Colegio_San_Calixto.png" 
            alt="Colegio San Calixto" 
            filter="grayscale(100%)" 
            _hover={{ filter: 'grayscale(0%)' }} 
            transition="all 0.3s"
            maxH="90px"
            mx="auto"
            fallbackSrc="https://via.placeholder.com/150x80?text=San+Calixto"
          />
        </SimpleGrid>
      </Section>

      {/* Contact CTA */}
      <Box bg="brand.600" py={16} textAlign="center" color="white">
        <Container maxW="container.md">
          <Heading mb={6}>¿Listo para empezar?</Heading>
          <Text fontSize="lg" mb={8}>Únete a nuestra comunidad y descubre el mundo de la ciencia y tecnología.</Text>
          <Button size="lg" bg="white" color="brand.600" _hover={{ bg: 'gray.100' }}>
            Contáctanos
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
