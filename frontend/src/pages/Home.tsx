import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  Image,
  Badge,
  Input,
  Progress,
  Avatar,
  Card,
  CardBody,
  useToast,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Section } from '../components/Section'
import { CourseCard } from '../components/CourseCard'
import {
  Cpu,
  Users,
  Compass,
  ArrowRight,
  Send,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import { MilestoneService, Milestone } from '../services/milestoneService'
import { ProjectService, Project } from '../services/projectService'
import { ScientificPaperService, ScientificPaper } from '../services/scientificPaperService'
import { NewsletterService } from '../services/newsletterService'

export const Home = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [papers, setPapers] = useState<ScientificPaper[]>([])
  const [leadEmail, setLeadEmail] = useState('')
  const [leadName, setLeadName] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const [milesData, projsData, papersData] = await Promise.all([
        MilestoneService.getAll(),
        ProjectService.getAll(),
        ScientificPaperService.getAll(),
      ])
      setMilestones(milesData)
      setProjects(projsData.slice(0, 4))
      setPapers(papersData.slice(0, 3))
    }
    fetchData()
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadEmail.trim()) return

    setIsSubscribing(true)
    const res = await NewsletterService.subscribe({
      email: leadEmail.trim(),
      full_name: leadName.trim(),
      interest_area: 'STEM General',
    })

    toast({
      title: '¡Bienvenido a CienciaLink!',
      description: res.message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setLeadEmail('')
    setLeadName('')
    setIsSubscribing(false)
  }

  return (
    <Box>
      {/* 1. HERO SECTION (Inicio / Impacto) */}
      <Box
        bg="#132F42"
        color="white"
        py={{ base: 14, md: 24 }}
        px={4}
        position="relative"
        overflow="hidden"
        borderBottom="4px solid #00529C"
      >
        {/* Subtle backdrop overlay */}
        <Box
          position="absolute"
          top="-50%"
          right="-10%"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(0,82,156,0.3) 0%, rgba(19,47,66,0) 70%)"
          pointerEvents="none"
        />

        <Container maxW="container.xl">
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 10, lg: 12 }} alignItems="center">
            <VStack align="flex-start" spacing={6} flex={1}>
              <HStack spacing={2}>
                <Badge bg="#F80034" color="white" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="700">
                  Comunidad STEM Bolivia
                </Badge>
                <Badge bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full" fontSize="xs">
                  8 Comisiones Activas
                </Badge>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '5xl', lg: '5xl' }}
                fontWeight="900"
                lineHeight="1.15"
                letterSpacing="-0.5px"
              >
                Impulsando el futuro <Text as="span" color="#60A1E8">STEM en Bolivia</Text>
              </Heading>

              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.200" lineHeight="tall">
                Punto de encuentro y conexión para el ecosistema científico, tecnológico y educativo. Robótica, inteligencia artificial, IoT y divulgación científica con impacto real para transformar nuestra realidad.
              </Text>

              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} w={{ base: 'full', sm: 'auto' }}>
                <Button
                  as={RouterLink}
                  to="/cursos"
                  size="lg"
                  bg="#00529C"
                  color="white"
                  px={8}
                  _hover={{ bg: '#004380' }}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Inscríbete a nuestros cursos
                </Button>
                <Button
                  as={RouterLink}
                  to="/comisiones"
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.400"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.100', borderColor: 'white' }}
                >
                  Conoce las 8 Comisiones
                </Button>
              </Stack>
            </VStack>

            {/* Video / Preview de Evento (LINKUP & Ruta Master) */}
            <Box flex={1} w="full">
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 20px 40px rgba(0,0,0,0.4)"
                border="2px solid"
                borderColor="whiteAlpha.200"
                bg="#0E2332"
              >
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80"
                  alt="Estudiantes en el Torneo LINKUP CienciaLink"
                  w="100%"
                  h={{ base: '260px', md: '360px' }}
                  objectFit="cover"
                  filter="brightness(0.9)"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  p={6}
                  bg="linear-gradient(to top, rgba(14,35,50,0.95), transparent)"
                >
                  <HStack spacing={2} mb={2}>
                    <Badge colorScheme="red">Evento Destacado</Badge>
                    <Text fontSize="xs" color="gray.300">Torneo LINKUP 2026 & Ruta Master</Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="600" color="white">
                    Más de 40 equipos de robótica e inteligencia artificial resolviendo desafíos en Bolivia.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* 2. IDENTIDAD INSTITUCIONAL (Quiénes Somos) */}
      <Section
        title="Identidad Institucional"
        subtitle="CienciaLink Bolivia no es una institución cerrada ni una empresa tradicional; somos una comunidad en movimiento."
        bg="#FFFFFF"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Box p={8} bg="#F3F3F3" borderRadius="2xl" borderTop="4px solid #00529C">
            <Flex w={12} h={12} borderRadius="xl" bg="#00529C" color="white" align="center" justify="center" mb={4}>
              <Compass size={24} />
            </Flex>
            <Heading size="md" color="#132F42" mb={3}>
              Difusión Científica
            </Heading>
            <Text color="gray.600" fontSize="sm" lineHeight="tall">
              Compartimos el conocimiento desde la mirada crítica, creativa y profundamente humana, brindando acceso universal a herramientas de punta.
            </Text>
          </Box>

          <Box p={8} bg="#F3F3F3" borderRadius="2xl" borderTop="4px solid #007A3D">
            <Flex w={12} h={12} borderRadius="xl" bg="#007A3D" color="white" align="center" justify="center" mb={4}>
              <Users size={24} />
            </Flex>
            <Heading size="md" color="#132F42" mb={3}>
              Construcción Colectiva
            </Heading>
            <Text color="gray.600" fontSize="sm" lineHeight="tall">
              Creemos firmemente en que la ciencia y la tecnología se hacen mejor cuando se hacen entre todos, desde la colaboración horizontal.
            </Text>
          </Box>

          <Box p={8} bg="#F3F3F3" borderRadius="2xl" borderTop="4px solid #F80034">
            <Flex w={12} h={12} borderRadius="xl" bg="#F80034" color="white" align="center" justify="center" mb={4}>
              <Cpu size={24} />
            </Flex>
            <Heading size="md" color="#132F42" mb={3}>
              Robótica e Innovación
            </Heading>
            <Text color="gray.600" fontSize="sm" lineHeight="tall">
              En la precisión de la tecnología también cabe la pasión por descubrir. Convertimos ideas en prototipos tangibles y funcionales.
            </Text>
          </Box>
        </SimpleGrid>
      </Section>

      {/* 3. EL HUB DE APRENDIZAJE (Cursos y Convocatorias Activas) */}
      <Section
        title="El Hub de Aprendizaje"
        subtitle="Cursos vigentes con enfoque 100% práctico, kits incluidos e inversión clara en Bolivianos (Bs)."
        bg="#F3F3F3"
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={10}>
          <CourseCard
            id={1}
            title="Inteligencia Artificial y Machine Learning"
            description="Fundamentos de IA generativa, redes neuronales y visión por computadora con Python y PyTorch."
            image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800"
            price="220 Bs"
            badges={['Virtual', 'Certificado']}
          />
          <CourseCard
            id={2}
            title="Robótica con Arduino & ESP32"
            description="Construcción y control de robots móviles, sensores ultrasónicos y control vía Bluetooth/WiFi."
            image="https://images.unsplash.com/photo-1555679427-1f6dfcce943b?w=800"
            price="250 Bs"
            badges={['Presencial', 'Kit Incluido']}
          />
          <CourseCard
            id={3}
            title="Diseño 3D y Fabricación Digital"
            description="Modelado paramétrico, calibración de impresoras FDM y articulación directa con MakerLink."
            image="https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=800"
            price="200 Bs"
            badges={['Taller Práctico', 'FabLab']}
          />
        </SimpleGrid>

        {/* Calendario de Próximas Actividades */}
        <Box bg="white" p={{ base: 6, md: 8 }} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.200">
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} mb={6} gap={4}>
            <Box>
              <Heading size="md" color="#132F42" display="flex" alignItems="center" gap={2}>
                <Calendar size={20} color="#00529C" />
                Calendario de Próximas Actividades STEM
              </Heading>
              <Text fontSize="sm" color="gray.500">Talleres, webinars y fechas límite de inscripción</Text>
            </Box>
            <Button as={RouterLink} to="/eventos" size="sm" variant="outline" colorScheme="blue">
              Ver calendario completo
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                title: 'Inicio Ciclo Robótica Primavera',
                date: '15 de Noviembre 2026',
                modality: 'Presencial - La Paz',
                tag: 'Curso',
              },
              {
                title: 'Hackathon LINKUP Bolivia',
                date: '28 de Noviembre 2026',
                modality: 'Híbrido',
                tag: 'Certamen',
              },
              {
                title: 'Webinar: IoT y Monitoreo Ambiental',
                date: '05 de Diciembre 2026',
                modality: 'Virtual - Gratuito',
                tag: 'Webinar',
              },
            ].map((ev, i) => (
              <Box key={i} p={4} bg="gray.50" borderRadius="xl" borderLeft="4px solid #00529C">
                <Badge colorScheme="blue" fontSize="2xs" mb={1}>{ev.tag}</Badge>
                <Heading size="xs" color="#132F42" mb={1}>{ev.title}</Heading>
                <Text fontSize="xs" color="gray.600" mb={1}>📅 {ev.date}</Text>
                <Text fontSize="xs" color="gray.500">📍 {ev.modality}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Section>

      {/* 4. MEMORIA INSTITUCIONAL (Historial de Actividades / Timeline) */}
      <Section
        title="Memoria Institucional"
        subtitle="Un historial de hitos que genera confianza y autoridad ante padres de familia, estudiantes y aliados."
        bg="#FFFFFF"
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {milestones.map((m) => (
            <Box
              key={m.id}
              p={6}
              bg="#F3F3F3"
              borderRadius="2xl"
              position="relative"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-3px)', boxShadow: 'md' }}
            >
              <HStack justify="space-between" mb={3}>
                <Badge bg="#132F42" color="white" px={3} py={1} borderRadius="md" fontWeight="800">
                  {m.year}
                </Badge>
                <Badge colorScheme="green" fontSize="2xs">
                  {m.impact_metric}
                </Badge>
              </HStack>
              <Heading size="sm" color="#132F42" mb={2}>
                {m.title}
              </Heading>
              <Text fontSize="xs" color="gray.600" lineHeight="tall">
                {m.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Section>

      {/* 5. PORTAFOLIO DE PROYECTOS POR ÁREAS (Registro de Avances) */}
      <Section
        title="Portafolio de Proyectos por Áreas"
        subtitle="Tablero visual tipo pipeline que refleja la transparencia y el talento de nuestras comisiones."
        bg="#F3F3F3"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
          {projects.map((proj) => (
            <Card key={proj.id} bg="white" borderRadius="2xl" boxShadow="sm" overflow="hidden">
              <CardBody p={6}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Badge colorScheme="blue" textTransform="uppercase">{proj.commission_slug}</Badge>
                  <Badge colorScheme={proj.stage === 'Pruebas' ? 'purple' : 'orange'}>{proj.stage}</Badge>
                </Flex>
                <Heading size="md" color="#132F42" mb={2}>{proj.title}</Heading>
                <Text fontSize="xs" color="gray.600" mb={4}>{proj.description}</Text>

                <Box mb={2}>
                  <Flex justify="space-between" fontSize="xs" mb={1} fontWeight="700">
                    <Text color="gray.600">Avance de Desarrollo</Text>
                    <Text color="#00529C">{proj.progress_pct}%</Text>
                  </Flex>
                  <Progress
                    value={proj.progress_pct}
                    size="sm"
                    borderRadius="full"
                    colorScheme={proj.progress_pct > 80 ? 'green' : 'blue'}
                  />
                </Box>
                <Text fontSize="2xs" color="gray.400">Responsable: {proj.leader}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Box textAlign="center">
          <Button as={RouterLink} to="/proyectos" variant="outline" colorScheme="blue">
            Ver todos los proyectos en avance →
          </Button>
        </Box>
      </Section>

      {/* 6. REPOSITORIO CIENTÍFICO (Artículos y Publicaciones) */}
      <Section
        title="Repositorio Científico"
        subtitle="Biblioteca digital para los artículos y papers de investigación publicados por nuestros miembros."
        bg="#FFFFFF"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={8}>
          {papers.map((paper) => (
            <Card key={paper.id} bg="#F3F3F3" borderRadius="2xl" border="1px solid" borderColor="gray.200">
              <CardBody p={6}>
                <Badge bg="#EBF4FC" color="#00529C" px={2} py={1} borderRadius="md" fontSize="2xs" mb={2}>
                  {paper.category}
                </Badge>
                <Heading size="xs" color="#132F42" mb={2} noOfLines={2}>
                  {paper.title}
                </Heading>
                <Text fontSize="xs" color="gray.600" mb={4} noOfLines={3}>
                  {paper.abstract}
                </Text>
                <Flex justify="space-between" align="center" fontSize="2xs" color="gray.500" pt={2} borderTop="1px solid" borderColor="gray.200">
                  <Text>{paper.published_date}</Text>
                  <Button as={RouterLink} to="/repositorio" size="2xs" variant="link" colorScheme="blue">
                    Leer más
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Box textAlign="center">
          <Button as={RouterLink} to="/repositorio" bg="#00529C" color="white" _hover={{ bg: '#004380' }}>
            Explorar Biblioteca Científica Completa
          </Button>
        </Box>
      </Section>

      {/* 7. ECOSISTEMA DE ALIADOS Y COLABORACIONES */}
      <Section title="Ecosistema de Aliados" subtitle="Instituciones y universidades que respaldan y colaboran con CienciaLink." bg="#F3F3F3">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} alignItems="center" justifyItems="center">
          <Box p={6} bg="white" borderRadius="xl" textAlign="center" w="full" boxShadow="sm">
            <Heading size="sm" color="#132F42">Fundación Patiño</Heading>
            <Text fontSize="2xs" color="gray.500">Cultura y Educación</Text>
          </Box>
          <Box p={6} bg="white" borderRadius="xl" textAlign="center" w="full" boxShadow="sm">
            <Heading size="sm" color="#132F42">UMSA</Heading>
            <Text fontSize="2xs" color="gray.500">Facultad de Ingeniería</Text>
          </Box>
          <Box p={6} bg="white" borderRadius="xl" textAlign="center" w="full" boxShadow="sm">
            <Heading size="sm" color="#132F42">MakerLink</Heading>
            <Text fontSize="2xs" color="gray.500">Manufactura Aditiva</Text>
          </Box>
          <Box p={6} bg="white" borderRadius="xl" textAlign="center" w="full" boxShadow="sm">
            <Heading size="sm" color="#132F42">Red STEM Bolivia</Heading>
            <Text fontSize="2xs" color="gray.500">Alianza Educativa</Text>
          </Box>
        </SimpleGrid>
      </Section>

      {/* 8. CONEXIÓN DE ECOSISTEMA (Enlace a MakerLink) */}
      <Box bg="#132F42" color="white" py={12} px={4} borderTop="4px solid #EA580C">
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'center' }}
            gap={6}
          >
            <Box maxW="2xl">
              <HStack spacing={2} mb={2}>
                <Badge bg="#EA580C" color="white" px={3} py={1} borderRadius="full">
                  Startup de Manufactura
                </Badge>
                <Text fontSize="xs" color="gray.300">Conexión de Ecosistema</Text>
              </HStack>
              <Heading size="lg" mb={2}>
                ¿Buscas soluciones tecnológicas y fabricación?
              </Heading>
              <Text fontSize="sm" color="gray.300">
                Conoce nuestra startup aliada de manufactura: <strong>MakerLink</strong>. Especialistas en corte láser, impresión 3D industrial y prototipado rápido para ingenieros y empresas en Bolivia.
              </Text>
            </Box>

            <Button
              as="a"
              href="https://makerlink.bo"
              target="_blank"
              rel="noopener noreferrer"
              bg="#EA580C"
              color="white"
              size="lg"
              _hover={{ bg: '#C2410C' }}
              rightIcon={<ExternalLink size={18} />}
              flexShrink={0}
            >
              Conocer MakerLink
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* 9. TESTIMONIOS Y VALOR AGREGADO */}
      <Section title="Casos de Éxito y Testimonios" subtitle="Historias de estudiantes y docentes transformados por CienciaLink." bg="#FFFFFF">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box p={8} bg="#F3F3F3" borderRadius="2xl" borderLeft="4px solid #00529C">
            <Text fontStyle="italic" fontSize="md" color="gray.700" mb={4}>
              "CienciaLink me permitió armar mi primer robot y presentar mi proyecto en el torneo LINKUP. Hoy estoy postulando a becas de ingeniería con un portafolio real."
            </Text>
            <HStack spacing={3}>
              <Avatar size="sm" name="Camila Rocha" />
              <Box>
                <Text fontWeight="700" fontSize="sm" color="#132F42">Camila Rocha</Text>
                <Text fontSize="xs" color="gray.500">Estudiante de Secundaria - La Paz</Text>
              </Box>
            </HStack>
          </Box>

          <Box p={8} bg="#F3F3F3" borderRadius="2xl" borderLeft="4px solid #007A3D">
            <Text fontStyle="italic" fontSize="md" color="gray.700" mb={4}>
              "Los kits didácticos y el soporte técnico nos facilitaron implementar talleres de Arduino en el colegio sin complicaciones. La calidad es de nivel internacional."
            </Text>
            <HStack spacing={3}>
              <Avatar size="sm" name="Carlos Mamani" />
              <Box>
                <Text fontWeight="700" fontSize="sm" color="#132F42">Prof. Carlos Mamani</Text>
                <Text fontSize="xs" color="gray.500">Docente de Tecnología - El Alto</Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>
      </Section>

      {/* 10. NEWSLETTER STEM / REGISTRO DE MIEMBROS (Lead Magnet) */}
      <Box bg="#00529C" color="white" py={16} px={4}>
        <Container maxW="container.md" textAlign="center">
          <Badge bg="#F80034" color="white" px={3} py={1} borderRadius="full" mb={4} textTransform="uppercase">
            Comunidad Abierta
          </Badge>
          <Heading size="xl" mb={4} fontWeight="800">
            Únete a la Red de CienciaLink Bolivia
          </Heading>
          <Text fontSize="md" color="blue.100" mb={8} maxW="xl" mx="auto">
            Regístrate para recibir convocatorias a cursos, aperturas de comisiones, acceso a papers y próximos torneos STEM.
          </Text>

          <Box as="form" onSubmit={handleNewsletterSubmit} maxW="lg" mx="auto">
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
              <Input
                placeholder="Tu correo electrónico"
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                bg="white"
                color="#132F42"
                _placeholder={{ color: 'gray.400' }}
              />
              <Button
                type="submit"
                bg="#132F42"
                color="white"
                px={8}
                isLoading={isSubscribing}
                rightIcon={<Send size={16} />}
                _hover={{ bg: '#0E2332' }}
              >
                Registrarme
              </Button>
            </Stack>
            <Text fontSize="xs" color="blue.200" mt={3}>
              🔒 Respetamos tu privacidad. Sin spam, solo contenido científico relevante.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
