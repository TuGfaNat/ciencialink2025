import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Badge,
  Progress,
  Image,
  HStack,
  Card,
  CardBody,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react'
import { ProjectService, Project } from '../services/projectService'

export const ProjectsPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedStage, setSelectedStage] = useState<string>('all')

  useEffect(() => {
    const load = async () => {
      const data = await ProjectService.getAll()
      setProjects(data)
    }
    load()
  }, [])

  const stages = [
    { label: 'Todos los proyectos', value: 'all' },
    { label: 'En Pruebas', value: 'Pruebas' },
    { label: 'En Desarrollo', value: 'Desarrollo' },
    { label: 'Completados', value: 'Completado' },
  ]

  const filtered = selectedStage === 'all'
    ? projects
    : projects.filter((p) => p.stage === selectedStage)

  return (
    <Box pb={20}>
      {/* Header */}
      <Box bg="#132F42" color="white" py={{ base: 12, md: 16 }} px={4} textAlign="center">
        <Container maxW="container.lg">
          <Badge bg="#007A3D" color="white" px={3} py={1} borderRadius="full" mb={4} textTransform="uppercase">
            Transparencia y Talento
          </Badge>
          <Heading as="h1" size="2xl" mb={4} fontWeight="800">
            Portafolio de Proyectos por Áreas
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" maxW="2xl" mx="auto">
            Tablero visual con los proyectos activos de investigación, robótica, IoT y software desarrollados por los equipos interdisciplinarios de CienciaLink.
          </Text>
        </Container>
      </Box>

      <Container maxW="container.xl" mt={-6}>
        {/* Selector de Estado */}
        <Box bg="white" p={4} borderRadius="2xl" boxShadow="md" mb={8}>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            onChange={(idx) => setSelectedStage(stages[idx].value)}
          >
            <TabList flexWrap="wrap" gap={2}>
              {stages.map((st) => (
                <Tab key={st.value} fontSize="sm" fontWeight="600">
                  {st.label}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </Box>

        {/* Grid de Proyectos */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {filtered.map((proj) => (
            <Card
              key={proj.id}
              bg="white"
              borderRadius="2xl"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg', borderColor: '#00529C' }}
            >
              <Box position="relative" h="220px">
                <Image
                  src={proj.image_url}
                  alt={proj.title}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  top={4}
                  right={4}
                  bg="rgba(19, 47, 66, 0.85)"
                  backdropFilter="blur(4px)"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  <Text color="white" fontSize="xs" fontWeight="700">
                    {proj.commission_slug.toUpperCase()}
                  </Text>
                </Box>
              </Box>

              <CardBody p={6}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Badge
                    colorScheme={
                      proj.stage === 'Completado'
                        ? 'green'
                        : proj.stage === 'Pruebas'
                        ? 'purple'
                        : 'orange'
                    }
                    px={3}
                    py={1}
                    borderRadius="md"
                  >
                    Fase: {proj.stage}
                  </Badge>
                  <Text fontSize="xs" color="gray.500" fontWeight="600">
                    Líder: {proj.leader}
                  </Text>
                </Flex>

                <Heading size="md" color="#132F42" mb={3} lineHeight="shorter">
                  {proj.title}
                </Heading>

                <Text fontSize="sm" color="gray.600" mb={5} lineHeight="tall">
                  {proj.description}
                </Text>

                {/* Pipeline / Barra de Progreso */}
                <Box mb={4} p={3} bg="gray.50" borderRadius="lg">
                  <Flex justify="space-between" fontSize="xs" mb={1} fontWeight="700">
                    <Text color="#132F42">Nivel de Madurez Tecnológica</Text>
                    <Text color="#00529C">{proj.progress_pct}%</Text>
                  </Flex>
                  <Progress
                    value={proj.progress_pct}
                    size="md"
                    borderRadius="full"
                    colorScheme={proj.progress_pct >= 80 ? 'green' : 'blue'}
                  />
                </Box>

                <HStack spacing={2} flexWrap="wrap">
                  {proj.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" colorScheme="blue" fontSize="2xs">
                      #{tag}
                    </Badge>
                  ))}
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default ProjectsPortfolio
