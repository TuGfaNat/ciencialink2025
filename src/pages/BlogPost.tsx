import { Box, Container, Heading, Text, Image, Stack, Avatar, Badge, Button, Spinner, Center } from '@chakra-ui/react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BlogService, BlogPost as BlogPostType } from '../services/blogService'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const data = await BlogService.getById(parseInt(id))
        setPost(data || null)
      }
      setLoading(false)
    }
    loadPost()
  }, [id])

  if (loading) return <Center py={20}><Spinner size="xl" color="brand.500" /></Center>
  if (!post) return <Center py={20}><Text>Artículo no encontrado</Text></Center>

  return (
    <Box pt={10} pb={20}>
      <Container maxW="container.md">
        <Button as={RouterLink} to="/blog" variant="ghost" leftIcon={<ArrowLeft size={20} />} mb={8}>
          Volver al Blog
        </Button>

        <Badge colorScheme="brand" mb={4}>Tecnología</Badge>
        <Heading size="2xl" mb={6} lineHeight="shorter">{post.title}</Heading>
        
        <Stack direction="row" spacing={6} align="center" mb={8} color="gray.500">
          <Stack direction="row" align="center">
            <Avatar size="sm" name={post.author} />
            <Text fontWeight="medium" color="gray.700">{post.author}</Text>
          </Stack>
          <Stack direction="row" align="center">
            <Calendar size={16} />
            <Text fontSize="sm">{post.date}</Text>
          </Stack>
        </Stack>

        <Image 
          src={post.image} 
          alt={post.title} 
          borderRadius="xl" 
          w="full" 
          h={{ base: "200px", md: "400px" }} 
          objectFit="cover" 
          mb={10} 
          boxShadow="lg"
        />

        <Box className="blog-content" sx={{ 
          'h2': { fontSize: '2xl', fontWeight: 'bold', mt: 8, mb: 4, color: 'brand.800' },
          'p': { fontSize: 'lg', lineHeight: 'tall', mb: 6, color: 'gray.700' }
        }}>
          {/* Simple markdown-like rendering for demo purposes */}
          {post.content?.split('\n').map((line, i) => {
            if (line.trim().startsWith('##')) {
              return <Heading key={i} size="lg" mt={8} mb={4} color="brand.800">{line.replace('##', '')}</Heading>
            }
            if (line.trim().length > 0) {
              return <Text key={i} fontSize="lg" lineHeight="tall" mb={6} color="gray.700">{line}</Text>
            }
            return null
          })}
        </Box>
      </Container>
    </Box>
  )
}

export default BlogPost
