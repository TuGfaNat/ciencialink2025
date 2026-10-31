import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Avatar,
  Badge,
  HStack,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { Section } from '../components/Section'
import { Compass, Cpu, Users, Award } from 'lucide-react'

const About = () => {
  const leadership = [
    {
      name: 'MSc. Roberto Mendoza',
      role: 'Director Ejecutivo & Coordinador IA',
      bio: 'Investigador en Machine Learning y tecnologías cognitivas. Impulsor de modelos accesibles para educación.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    },
    {
      name: 'Ing. Carlos Mamani',
      role: 'Director de Proyectos & Robótica',
      bio: 'Ingeniero mecatrónico especializado en robótica educativa, prototipado y cinemática en hardware libre.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    {
      name: 'Ing. Pamela Flores',
      role: 'Directora de Alianzas & IoT',
      bio: 'Especialista en redes LoRaWAN y sistemas embebidos para impacto ambiental en el occidente boliviano.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    },
    {
      name: 'Lic. Alejandro Choque',
      role: 'Director Tecnológico & Plataformas',
      bio: 'Arquitecto de software fullstack y promotor de software libre para la soberanía tecnológica nacional.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    },
    {
      name: 'Lic. Gabriela Paz',
      role: 'Directora Académica & STEM',
      bio: 'Docente apasionada por metodologías activas y divulgación científica lúdica para niños y jóvenes.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
    },
    {
      name: 'Arq. Luis Pérez',
      role: 'Coordinador de Prototipado 3D & FabLab',
      bio: 'Diseñador industrial especializado en manufactura aditiva y enlace con la startup aliada MakerLink.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    },
  ]

  return (
    <Box pb={20}>
      {/* Hero Institucional */}
      <Box bg="#132F42" color="white" py={{ base: 14, md: 20 }} textAlign="center" px={4}>
        <Container maxW="container.lg">
          <Badge bg="#F80034" color="white" px={3} py={1} borderRadius="full" mb={4} textTransform="uppercase">
            Identidad Institucional Oficial
          </Badge>
          <Heading size="2xl" mb={6} fontWeight="800">
            Quiénes Somos
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.200" maxW="3xl" mx="auto" lineHeight="tall">
            CienciaLink Bolivia es un punto de encuentro y conexión. Un espacio donde confluyen mentes curiosas para construir un ecosistema científico vivo, accesible y con verdadero impacto.
          </Text>
        </Container>
      </Box>

      {/* Declaración Central del Manual */}
      <Container maxW="container.xl" mt={-8}>
        <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" boxShadow="lg" borderTop="6px solid #00529C">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <Box>
              <Text fontSize="lg" color="#132F42" fontWeight="700" mb={4}>
                No somos una institución cerrada ni una empresa tradicional.
              </Text>
              <Text color="gray.600" lineHeight="tall" mb={4}>
                Somos una comunidad en movimiento que entiende la ciencia como un lenguaje común, una herramienta para comprender la realidad y transformarla.
              </Text>
              <Text color="gray.600" lineHeight="tall">
                Nos dedicamos a difundir conocimiento, a compartir lo que aprendemos y a crear proyectos que impulsen el sector científico desde su estado más puro: el de la exploración, la pregunta constante y la construcción colectiva. Amamos la robótica, la innovación y el aprendizaje porque creemos que en la precisión de la tecnología también cabe la pasión por descubrir.
              </Text>
            </Box>

            <Box p={8} bg="#EBF4FC" borderRadius="xl" borderLeft="4px solid #00529C">
              <Heading size="md" color="#00529C" mb={4}>
                Nuestros Pilares Estratégicos
              </Heading>
              <VStack align="flex-start" spacing={4}>
                <HStack align="flex-start" spacing={3}>
                  <Icon as={Compass} color="#00529C" w={6} h={6} mt={1} />
                  <Box>
                    <Text fontWeight="700" color="#132F42">Difusión Científica y Educación</Text>
                    <Text fontSize="sm" color="gray.600">Espacio crítico, creativo y profundamente humano para estudiantes y profesionales.</Text>
                  </Box>
                </HStack>
                <HStack align="flex-start" spacing={3}>
                  <Icon as={Users} color="#007A3D" w={6} h={6} mt={1} />
                  <Box>
                    <Text fontWeight="700" color="#132F42">Construcción Colectiva</Text>
                    <Text fontSize="sm" color="gray.600">La ciencia se hace mejor cuando se hace entre todos.</Text>
                  </Box>
                </HStack>
                <HStack align="flex-start" spacing={3}>
                  <Icon as={Cpu} color="#F80034" w={6} h={6} mt={1} />
                  <Box>
                    <Text fontWeight="700" color="#132F42">Innovación y Robótica</Text>
                    <Text fontSize="sm" color="gray.600">Proyectos prácticos con impacto tangible en Bolivia.</Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>

      {/* Misión y Visión */}
      <Section title="Misión y Visión" subtitle="Guiados por un propósito claro para Bolivia y la región.">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box bg="white" p={8} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.200">
            <Flex align="center" gap={3} mb={4}>
              <Box p={3} bg="#EBF4FC" borderRadius="lg" color="#00529C">
                <Compass size={24} />
              </Box>
              <Heading size="lg" color="#132F42">Nuestra Misión</Heading>
            </Flex>
            <Text fontSize="md" color="gray.600" lineHeight="tall">
              Inspirar, formar y articular a la comunidad científica y tecnológica de Bolivia mediante proyectos abiertos, capacitación práctica de alto nivel y espacios colaborativos que transformen el entorno educativo y productivo.
            </Text>
          </Box>

          <Box bg="white" p={8} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.200">
            <Flex align="center" gap={3} mb={4}>
              <Box p={3} bg="#EBF4FC" borderRadius="lg" color="#00529C">
                <Award size={24} />
              </Box>
              <Heading size="lg" color="#132F42">Nuestra Visión</Heading>
            </Flex>
            <Text fontSize="md" color="gray.600" lineHeight="tall">
              Consolidarnos al 2030 como la plataforma científica y tecnológica de referencia en Bolivia, conectando el talento local con redes globales de investigación y desarrollo.
            </Text>
          </Box>
        </SimpleGrid>
      </Section>

      {/* Liderazgo y Directiva (Documento 1, Sección 8) */}
      <Section title="La Directiva y Mentores" subtitle="El respaldo humano, científico y docente detrás de CienciaLink Bolivia." bg="#F3F3F3">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {leadership.map((leader, i) => (
            <VStack
              key={i}
              bg="white"
              p={6}
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
              align="center"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
            >
              <Avatar size="2xl" name={leader.name} src={leader.avatar} mb={4} border="3px solid #00529C" />
              <Heading size="md" color="#132F42">{leader.name}</Heading>
              <Text color="#00529C" fontWeight="700" fontSize="sm" mb={2}>{leader.role}</Text>
              <Text color="gray.600" fontSize="xs" lineHeight="tall">
                {leader.bio}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Section>
    </Box>
  )
}

export default About
