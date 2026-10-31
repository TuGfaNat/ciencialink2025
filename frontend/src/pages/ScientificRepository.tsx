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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  VStack,
  HStack,
  Card,
  CardBody,
  useToast,
} from '@chakra-ui/react'
import { Search, Download, BookOpen } from 'lucide-react'
import { ScientificPaperService, ScientificPaper } from '../services/scientificPaperService'

export const ScientificRepository = () => {
  const [papers, setPapers] = useState<ScientificPaper[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      const data = await ScientificPaperService.getAll()
      setPapers(data)
    }
    load()
  }, [])

  const filteredPapers = papers.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.abstract.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const handleDownload = (paper: ScientificPaper) => {
    toast({
      title: 'Descarga Iniciada',
      description: `El documento "${paper.title}" se está descargando desde el repositorio.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box pb={20}>
      {/* Header */}
      <Box bg="#132F42" color="white" py={{ base: 12, md: 16 }} px={4} textAlign="center">
        <Container maxW="container.lg">
          <Badge bg="#00529C" color="white" px={3} py={1} borderRadius="full" mb={4} textTransform="uppercase">
            Biblioteca Digital & Open Access
          </Badge>
          <Heading as="h1" size="2xl" mb={4} fontWeight="800">
            Repositorio Científico
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300" maxW="2xl" mx="auto">
            Artículos de investigación, papers técnicos y publicaciones desarrollados por miembros de las comisiones de CienciaLink Bolivia para el progreso académico del país.
          </Text>
        </Container>
      </Box>

      <Container maxW="container.xl" mt={-6}>
        {/* Filtros y Buscador */}
        <Box bg="white" p={6} borderRadius="2xl" boxShadow="md" mb={8}>
          <SimpleGrid columns={{ base: 1, md: 12 }} spacing={4}>
            <Box gridColumn={{ md: 'span 8' }}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search size={18} color="#00529C" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar por título, autor, palabras clave o tema..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  borderRadius="lg"
                />
              </InputGroup>
            </Box>
            <Box gridColumn={{ md: 'span 4' }}>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                borderRadius="lg"
              >
                <option value="all">Todas las categorías</option>
                <option value="investigación">Investigación Técnica</option>
                <option value="divulgación">Divulgación y Pedagogía</option>
                <option value="sostenibilidad">Sostenibilidad y Manufactura</option>
              </Select>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Lista de Papers */}
        <VStack spacing={6} align="stretch">
          {filteredPapers.length === 0 ? (
            <Card p={10} textAlign="center" bg="white" borderRadius="xl">
              <Text color="gray.500">No se encontraron artículos que coincidan con la búsqueda.</Text>
            </Card>
          ) : (
            filteredPapers.map((paper) => (
              <Card
                key={paper.id}
                bg="white"
                borderRadius="2xl"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.200"
                overflow="hidden"
                transition="all 0.2s"
                _hover={{ boxShadow: 'md', borderColor: '#00529C' }}
              >
                <CardBody p={{ base: 6, md: 8 }}>
                  <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap={2} mb={3}>
                    <HStack spacing={2}>
                      <Badge bg="#EBF4FC" color="#00529C" px={3} py={1} borderRadius="md" fontWeight="700">
                        {paper.category}
                      </Badge>
                      <Badge colorScheme="gray" textTransform="uppercase">
                        Comisión: {paper.commission_slug}
                      </Badge>
                    </HStack>
                    <Text fontSize="xs" color="gray.400" fontWeight="600">
                      Publicado: {paper.published_date}
                    </Text>
                  </Flex>

                  <Heading size="md" color="#132F42" mb={3} lineHeight="shorter">
                    {paper.title}
                  </Heading>

                  <Text fontSize="sm" color="gray.600" mb={4} lineHeight="tall">
                    {paper.abstract}
                  </Text>

                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align={{ base: 'flex-start', md: 'center' }}
                    pt={4}
                    borderTop="1px solid"
                    borderColor="gray.100"
                    gap={4}
                  >
                    <Box>
                      <Text fontSize="xs" fontWeight="700" color="#132F42">
                        Autores: <Text as="span" fontWeight="normal" color="gray.600">{paper.authors}</Text>
                      </Text>
                      {paper.doi && (
                        <Text fontSize="2xs" color="gray.400">
                          DOI: {paper.doi}
                        </Text>
                      )}
                    </Box>

                    <HStack spacing={3}>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="blue"
                        leftIcon={<BookOpen size={16} />}
                        onClick={() => handleDownload(paper)}
                      >
                        Leer Resumen
                      </Button>
                      <Button
                        size="sm"
                        bg="#00529C"
                        color="white"
                        leftIcon={<Download size={16} />}
                        _hover={{ bg: '#004380' }}
                        onClick={() => handleDownload(paper)}
                      >
                        Descargar PDF ({paper.downloads_count} descargas)
                      </Button>
                    </HStack>
                  </Flex>
                </CardBody>
              </Card>
            ))
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default ScientificRepository
