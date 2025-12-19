import { Box, Flex, Button, Stack, Link as ChakraLink, Heading, Container, Icon, Text, IconButton, useDisclosure, Collapse, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Rocket, Menu, X } from 'lucide-react'

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()

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

          {/* Desktop Menu */}
          <Stack direction="row" spacing={8} alignItems="center" display={{ base: 'none', md: 'flex' }}>
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

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <X size={24} /> : <Menu size={24} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        {/* Mobile Menu Links */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <VStack spacing={4} align="stretch">
              <ChakraLink as={RouterLink} to="/nosotros" py={2} fontWeight="medium" color="gray.600" onClick={onToggle}>
                Nosotros
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/contacto" py={2} fontWeight="medium" color="gray.600" onClick={onToggle}>
                Contáctanos
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/blog" py={2} fontWeight="medium" color="gray.600" onClick={onToggle}>
                Blog
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/kits" py={2} fontWeight="medium" color="gray.600" onClick={onToggle}>
                Kits
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/cursos" py={2} fontWeight="medium" color="gray.600" onClick={onToggle}>
                Cursos
              </ChakraLink>
              <Button as={RouterLink} to="/eventos" colorScheme="brand" size="sm" w="full" onClick={onToggle}>
                Eventos
              </Button>
            </VStack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  )
}

export default Navbar
