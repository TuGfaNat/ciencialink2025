import { Box, Button, Container, Heading, SimpleGrid, Text, Image, Stack, Avatar, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BlogService, BlogPost } from '../services/blogService'
import { Search, Calendar } from 'lucide-react'

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    const loadPosts = async () => {
      const data = await BlogService.getAll()
      setPosts(data)
      setFilteredPosts(data)
    }
    loadPosts()
  }, [])

  useEffect(() => {
    const results = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.author.toLowerCase().includes(searchTerm.toLowerCase())
      
      let matchesDate = true
      if (dateFilter) {
        const filterDate = new Date(dateFilter)
        const postDate = new Date(post.date)
        // Compare year, month, and day
        matchesDate = filterDate.getDate() === postDate.getDate() &&
                      filterDate.getMonth() === postDate.getMonth() &&
                      filterDate.getFullYear() === postDate.getFullYear()
      }
      
      return matchesSearch && matchesDate
    })
    setFilteredPosts(results)
  }, [searchTerm, dateFilter, posts])

  return (
    <Box pt={10}>
      <Container maxW="container.xl">
        <Heading mb={4} color="brand.800">Blog y Noticias</Heading>
        <Text fontSize="xl" color="gray.600" mb={8}>
          Mantente al día con las últimas novedades de ciencia y tecnología.
        </Text>

        {/* Filters */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={10}>
          <InputGroup maxW={{ base: 'full', md: '400px' }}>
            <InputLeftElement pointerEvents="none">
              <Search color="#718096" size={20} />
            </InputLeftElement>
            <Input 
              placeholder="Buscar por título o autor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="white"
              pl={10}
            />
          </InputGroup>
          <InputGroup maxW={{ base: 'full', md: '200px' }}>
            <InputLeftElement pointerEvents="none">
              <Calendar color="#718096" size={20} />
            </InputLeftElement>
            <Input 
              type="date"
              placeholder="Filtrar por fecha" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              bg="white"
              pl={10}
            />
          </InputGroup>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mb={20}>
          {filteredPosts.map((post) => (
            <Box key={post.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <RouterLink to={`/blog/${post.id}`}>
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  h="200px" 
                  w="100%" 
                  objectFit="cover" 
                  transition="transform 0.2s"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </RouterLink>
              <Box p={6}>
                <Text fontSize="sm" color="gray.500" mb={2}>{post.date}</Text>
                <Heading size="md" mb={4} lineHeight="short">
                  <RouterLink to={`/blog/${post.id}`}>
                    {post.title}
                  </RouterLink>
                </Heading>
                <Stack direction="row" align="center" mt={4}>
                  <Avatar size="xs" name={post.author} />
                  <Text fontSize="sm" fontWeight="bold">{post.author}</Text>
                  <Button as={RouterLink} to={`/blog/${post.id}`} variant="link" colorScheme="brand" ml="auto" size="sm">Leer más</Button>
                </Stack>
              </Box>
            </Box>
          ))}
          {filteredPosts.length === 0 && (
            <Text color="gray.500" fontSize="lg">No se encontraron artículos.</Text>
          )}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Blog
