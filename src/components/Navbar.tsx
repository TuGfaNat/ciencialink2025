import { Box, Flex, Button, Stack, Link as ChakraLink, Heading, Container, Icon, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Rocket } from 'lucide-react'

const Navbar = () => {
  return (
    <Box bg="white" boxShadow="sm" position="sticky" top="0" zIndex="sticky">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Flex alignItems="center">
              <Icon as={Rocket} w={6} h={6} color="brand.500" mr={2} />
              <Heading size="md" color="gray.800">
                CienciaLink<Text as="span" color="brand.500">2025</Text>
              </Heading>
            </Flex>
          </ChakraLink>

          <Stack direction="row" spacing={8} alignItems="center">
            <ChakraLink as={RouterLink} to="/nosotros" fontWeight="medium" color="gray.600" _hover={{ color: 'brand.500' }}>
              Nosotros
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/contacto" fontWeight="medium" color="gray.600" _hover={{ color: 'brand.500' }}>
              Contáctanos
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/blog" fontWeight="medium" color="gray.600" _hover={{ color: 'brand.500' }}>
              Blog
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/kits" fontWeight="medium" color="gray.600" _hover={{ color: 'brand.500' }}>
              Kits
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/cursos" fontWeight="medium" color="gray.600" _hover={{ color: 'brand.500' }}>
              Cursos
            </ChakraLink>
            <Button as={RouterLink} to="/eventos" colorScheme="brand" size="sm">
              Eventos
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
