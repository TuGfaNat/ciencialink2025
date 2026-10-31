import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Badge,
  Button,
  Avatar,
  Progress,
  Input,
  Textarea,
  HStack,
  VStack,
  useToast,
  Tabs,
  TabList,
  Tab,
  Card,
  CardBody,
} from '@chakra-ui/react'
import {
  Bot,
  Cpu,
  Wifi,
  Code,
  Dna,
  Box as BoxIcon,
  Radio,
  GraduationCap,
  Users,
  FolderGit2,
  Send,
  FileText,
  Sparkles,
} from 'lucide-react'
import { CommissionService, Commission, CommissionPost } from '../services/commissionService'
import { ProjectService, Project } from '../services/projectService'
import { ScientificPaperService, ScientificPaper } from '../services/scientificPaperService'

const ICON_MAP: Record<string, any> = {
  Bot,
  Cpu,
  Wifi,
  Code,
  Dna,
  Box: BoxIcon,
  Radio,
  GraduationCap,
}

export const Commissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [activeSlug, setActiveSlug] = useState<string>('ia')
  const [wallPosts, setWallPosts] = useState<CommissionPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [papers, setPapers] = useState<ScientificPaper[]>([])
  const [newPostContent, setNewPostContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      const data = await CommissionService.getAll()
      setCommissions(data)
      if (data.length > 0) {
        setActiveSlug(data[0].slug)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!activeSlug) return
    const loadDetails = async () => {
      const [postsData, projectsData, papersData] = await Promise.all([
        CommissionService.getWallPosts(activeSlug),
        ProjectService.getByCommission(activeSlug),
        ScientificPaperService.getByCommission(activeSlug),
      ])
      setWallPosts(postsData)
      setProjects(projectsData)
      setPapers(papersData)
    }
    loadDetails()
  }, [activeSlug])

  const activeCommission = commissions.find((c) => c.slug === activeSlug) || commissions[0]

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) return

    setIsSubmitting(true)
    const author = authorName.trim() || 'Miembro Colaborador'
    const success = await CommissionService.addWallPost({
      commission_slug: activeSlug,
      author_name: author,
      author_role: 'Miembro Activo',
      content: newPostContent.trim(),
      tags: ['Aporte', 'Comunidad'],
    })

    if (success) {
      toast({
        title: 'Mensaje publicado',
        description: 'Tu aporte ha sido agregado al muro de la comisión.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setNewPostContent('')
      const updated = await CommissionService.getWallPosts(activeSlug)
      setWallPosts(updated)
    } else {
      // Local fallback append
      setWallPosts([
        {
          id: Date.now(),
          commission_slug: activeSlug,
          author_name: author,
          author_role: 'Miembro Activo',
          content: newPostContent.trim(),
          tags: ['Aporte', 'Comunidad'],
          likes_count: 1,
          created_at: new Date().toLocaleDateString('es-BO'),
        },
        ...wallPosts,
      ])
      setNewPostContent('')
      toast({
        title: 'Aporte registrado',
        status: 'success',
        duration: 3000,
      })
    }
    setIsSubmitting(false)
  }

  const CurrentIcon = activeCommission ? ICON_MAP[activeCommission.icon] || Cpu : Cpu

  return (
    <Box pb={20}>
      {/* Header institucional */}
      <Box bg="#132F42" color="white" py={{ base: 12, md: 16 }} px={4} textAlign="center">
        <Container maxW="container.lg">
          <Badge bg="#F80034" color="white" px={3} py={1} borderRadius="full" mb={4} textTransform="uppercase">
            Estructura Oficial 2026
          </Badge>
          <Heading as="h1" size="2xl" mb={4} fontWeight="800">
            Las 8 Comisiones Tecnológicas
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" maxW="2xl" mx="auto">
            Un ecosistema inteligente y unificado donde estudiantes, profesionales e investigadores desarrollan soluciones aplicadas con impacto real para Bolivia.
          </Text>
        </Container>
      </Box>

      <Container maxW="container.xl" mt={-8}>
        {/* Selector de Comisiones */}
        <Box bg="white" p={4} borderRadius="xl" boxShadow="md" mb={8} overflowX="auto">
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            index={commissions.findIndex((c) => c.slug === activeSlug)}
            onChange={(idx) => setActiveSlug(commissions[idx]?.slug || 'ia')}
          >
            <TabList flexWrap="nowrap" gap={2} pb={2}>
              {commissions.map((comm) => {
                const TabIcon = ICON_MAP[comm.icon] || Cpu
                const isSelected = comm.slug === activeSlug
                return (
                  <Tab
                    key={comm.slug}
                    flexShrink={0}
                    fontSize="sm"
                    fontWeight="600"
                    bg={isSelected ? comm.color : 'gray.100'}
                    color={isSelected ? 'white' : '#132F42'}
                    _hover={{ bg: isSelected ? comm.color : 'gray.200' }}
                    gap={2}
                  >
                    <TabIcon size={16} />
                    {comm.short_name}
                  </Tab>
                )
              })}
            </TabList>
          </Tabs>
        </Box>

        {activeCommission && (
          <Box>
            {/* Tarjeta de Identidad de la Comisión Seleccionada */}
            <Box
              bg="white"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="lg"
              borderTop={`6px solid ${activeCommission.color}`}
              mb={10}
            >
              <Box p={{ base: 6, md: 8 }}>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  justify="space-between"
                  align={{ base: 'flex-start', md: 'center' }}
                  gap={6}
                >
                  <HStack spacing={4} align="center">
                    <Flex
                      w={16}
                      h={16}
                      borderRadius="xl"
                      bg={`${activeCommission.color}15`}
                      color={activeCommission.color}
                      align="center"
                      justify="center"
                    >
                      <CurrentIcon size={36} />
                    </Flex>
                    <Box>
                      <Heading size="lg" color="#132F42">
                        {activeCommission.name}
                      </Heading>
                      <Text color="gray.500" fontSize="sm">
                        Comisión Técnica Oficial de CienciaLink Bolivia
                      </Text>
                    </Box>
                  </HStack>

                  <HStack spacing={6}>
                    <VStack align="center" spacing={0}>
                      <HStack color="#00529C">
                        <Users size={18} />
                        <Text fontWeight="800" fontSize="xl">{activeCommission.members_count}</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">Miembros</Text>
                    </VStack>
                    <VStack align="center" spacing={0}>
                      <HStack color="#007A3D">
                        <FolderGit2 size={18} />
                        <Text fontWeight="800" fontSize="xl">{activeCommission.active_projects_count}</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">Proyectos</Text>
                    </VStack>
                  </HStack>
                </Flex>

                <Text mt={6} fontSize="md" color="gray.700" lineHeight="tall">
                  {activeCommission.description}
                </Text>

                {/* Coordinador */}
                <Flex
                  mt={6}
                  p={4}
                  bg="gray.50"
                  borderRadius="xl"
                  align="center"
                  justify="space-between"
                  flexWrap="wrap"
                  gap={4}
                >
                  <HStack spacing={4}>
                    <Avatar
                      size="md"
                      name={activeCommission.leader_name}
                      src={activeCommission.leader_avatar}
                    />
                    <Box>
                      <Text fontWeight="700" color="#132F42">{activeCommission.leader_name}</Text>
                      <Text fontSize="xs" color="gray.600">{activeCommission.leader_role}</Text>
                    </Box>
                  </HStack>
                  <Button
                    size="sm"
                    bg={activeCommission.color}
                    color="white"
                    _hover={{ opacity: 0.9 }}
                    onClick={() => {
                      toast({
                        title: 'Conexión con el Líder',
                        description: `Puedes comunicarte con la coordinación de ${activeCommission.short_name} a través de nuestro canal de WhatsApp.`,
                        status: 'info',
                      })
                    }}
                  >
                    Contactar Coordinación
                  </Button>
                </Flex>
              </Box>
            </Box>

            {/* Cuadrícula de 2 Columnas: Proyectos / Papers y Muro Interactivo */}
            <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={8}>
              {/* Columna Izquierda: Proyectos y Papers (7 columnas) */}
              <Box gridColumn={{ lg: 'span 7' }}>
                {/* Proyectos de la Comisión */}
                <Box mb={8}>
                  <Flex align="center" justify="space-between" mb={4}>
                    <Heading size="md" color="#132F42" display="flex" alignItems="center" gap={2}>
                      <FolderGit2 size={20} color={activeCommission.color} />
                      Proyectos en Avance
                    </Heading>
                    <Badge colorScheme="blue">{projects.length} en curso</Badge>
                  </Flex>

                  {projects.length === 0 ? (
                    <Card p={6} textAlign="center" bg="white">
                      <Text color="gray.500" fontSize="sm">
                        La comisión está estructurando nuevos proyectos para la siguiente iteración de Sprints.
                      </Text>
                    </Card>
                  ) : (
                    <VStack spacing={4} align="stretch">
                      {projects.map((proj) => (
                        <Card key={proj.id} bg="white" shadow="sm" borderRadius="xl" overflow="hidden">
                          <CardBody p={5}>
                            <Flex justify="space-between" align="flex-start" mb={2}>
                              <Heading size="sm" color="#132F42">{proj.title}</Heading>
                              <Badge
                                colorScheme={
                                  proj.stage === 'Completado'
                                    ? 'green'
                                    : proj.stage === 'Pruebas'
                                    ? 'purple'
                                    : 'orange'
                                }
                              >
                                {proj.stage}
                              </Badge>
                            </Flex>
                            <Text fontSize="xs" color="gray.600" mb={4}>{proj.description}</Text>
                            
                            <Box mb={3}>
                              <Flex justify="space-between" fontSize="xs" mb={1} fontWeight="600">
                                <Text color="gray.600">Progreso</Text>
                                <Text color={activeCommission.color}>{proj.progress_pct}%</Text>
                              </Flex>
                              <Progress
                                value={proj.progress_pct}
                                size="sm"
                                borderRadius="full"
                                colorScheme={proj.progress_pct > 80 ? 'green' : 'blue'}
                              />
                            </Box>

                            <HStack spacing={1} flexWrap="wrap">
                              {proj.tags.map((t, idx) => (
                                <Badge key={idx} variant="subtle" fontSize="2xs" colorScheme="gray">
                                  #{t}
                                </Badge>
                              ))}
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  )}
                </Box>

                {/* Papers y Artículos de la Comisión */}
                <Box>
                  <Flex align="center" justify="space-between" mb={4}>
                    <Heading size="md" color="#132F42" display="flex" alignItems="center" gap={2}>
                      <FileText size={20} color={activeCommission.color} />
                      Publicaciones & Papers
                    </Heading>
                  </Flex>

                  {papers.length === 0 ? (
                    <Card p={6} textAlign="center" bg="white">
                      <Text color="gray.500" fontSize="sm">
                        No hay artículos registrados para esta comisión aún en el Repositorio Científico.
                      </Text>
                    </Card>
                  ) : (
                    <VStack spacing={4} align="stretch">
                      {papers.map((paper) => (
                        <Card key={paper.id} bg="white" shadow="sm" borderRadius="xl">
                          <CardBody p={5}>
                            <Badge colorScheme="blue" fontSize="2xs" mb={2}>{paper.category}</Badge>
                            <Heading size="xs" color="#132F42" mb={2}>{paper.title}</Heading>
                            <Text fontSize="xs" color="gray.600" mb={3} noOfLines={3}>
                              {paper.abstract}
                            </Text>
                            <Flex justify="space-between" align="center" fontSize="2xs" color="gray.500">
                              <Text>Autores: {paper.authors}</Text>
                              <Text>{paper.published_date}</Text>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  )}
                </Box>
              </Box>

              {/* Columna Derecha: Muro Interactivo de Discusión (5 columnas) */}
              <Box gridColumn={{ lg: 'span 5' }}>
                <Box bg="white" p={6} borderRadius="2xl" boxShadow="md" position="sticky" top="90px">
                  <Heading size="md" color="#132F42" mb={2} display="flex" alignItems="center" gap={2}>
                    <Sparkles size={20} color="#F80034" />
                    Muro de Discusión
                  </Heading>
                  <Text fontSize="xs" color="gray.500" mb={4}>
                    Espacio interactivo para compartir consultas, aportes y convocatorias internas.
                  </Text>

                  {/* Formulario para publicar en el muro */}
                  <Box as="form" onSubmit={handleCreatePost} mb={6} p={4} bg="gray.50" borderRadius="xl">
                    <VStack spacing={3}>
                      <Input
                        placeholder="Tu nombre o alias"
                        size="sm"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        bg="white"
                      />
                      <Textarea
                        placeholder={`Escribe un mensaje o consulta técnica para ${activeCommission.short_name}...`}
                        size="sm"
                        rows={3}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        bg="white"
                        required
                      />
                      <Button
                        type="submit"
                        size="sm"
                        w="full"
                        bg={activeCommission.color}
                        color="white"
                        isLoading={isSubmitting}
                        rightIcon={<Send size={14} />}
                        _hover={{ opacity: 0.9 }}
                      >
                        Publicar en el Muro
                      </Button>
                    </VStack>
                  </Box>

                  {/* Lista de Aportes en el Muro */}
                  <VStack spacing={3} align="stretch" maxH="450px" overflowY="auto" pr={1}>
                    {wallPosts.map((post) => (
                      <Box key={post.id} p={3} bg="gray.50" borderRadius="lg" borderLeft={`3px solid ${activeCommission.color}`}>
                        <Flex justify="space-between" align="center" mb={1}>
                          <Text fontWeight="700" fontSize="xs" color="#132F42">
                            {post.author_name}
                          </Text>
                          <Text fontSize="2xs" color="gray.400">
                            {post.created_at}
                          </Text>
                        </Flex>
                        <Text fontSize="xs" color="gray.700" mb={2}>
                          {post.content}
                        </Text>
                        <HStack spacing={1}>
                          {post.tags.map((t, i) => (
                            <Badge key={i} fontSize="2xs" colorScheme="gray">
                              #{t}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Commissions
