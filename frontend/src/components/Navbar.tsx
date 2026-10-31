import {
  Box,
  Flex,
  Button,
  Stack,
  Link as ChakraLink,
  Container,
  IconButton,
  useDisclosure,
  Collapse,
  VStack,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: '8 Comisiones', path: '/comisiones' },
    { label: 'Cursos & Hub', path: '/cursos' },
    { label: 'Repositorio', path: '/repositorio' },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contacto' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <Box
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex={100}
      boxShadow="0 2px 10px rgba(19, 47, 66, 0.05)"
    >
      <Container maxW="container.xl">
        <Flex h="72px" alignItems="center" justifyContent="space-between">
          {/* Logo Oficial CienciaLink Bolivia */}
          <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Logo size="md" variant="horizontal" colorMode="dark" />
          </ChakraLink>

          {/* Desktop Menu */}
          <Stack
            direction="row"
            spacing={6}
            alignItems="center"
            display={{ base: 'none', lg: 'flex' }}
          >
            {navLinks.map((link) => (
              <ChakraLink
                key={link.path}
                as={RouterLink}
                to={link.path}
                fontWeight="600"
                fontSize="sm"
                color={isActive(link.path) ? '#00529C' : '#132F42'}
                borderBottom={isActive(link.path) ? '2px solid #00529C' : '2px solid transparent'}
                pb={1}
                transition="all 0.2s"
                _hover={{
                  color: '#00529C',
                  textDecoration: 'none',
                  borderBottom: '2px solid #00529C',
                }}
              >
                {link.label}
              </ChakraLink>
            ))}

            <Button
              as={RouterLink}
              to="/cursos"
              size="sm"
              bg="#00529C"
              color="white"
              px={5}
              _hover={{ bg: '#004380' }}
            >
              Inscripciones
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <X size={24} /> : <Menu size={24} />}
            variant="ghost"
            color="#132F42"
            aria-label="Abrir menú"
          />
        </Flex>

        {/* Mobile Menu Collapse */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={6} display={{ lg: 'none' }} borderTop="1px solid" borderColor="gray.100" pt={4}>
            <VStack spacing={3} align="stretch">
              {navLinks.map((link) => (
                <ChakraLink
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  py={2}
                  px={3}
                  borderRadius="md"
                  fontWeight="600"
                  color={isActive(link.path) ? '#00529C' : '#132F42'}
                  bg={isActive(link.path) ? '#EBF4FC' : 'transparent'}
                  onClick={onToggle}
                  _hover={{ textDecoration: 'none', bg: '#EBF4FC' }}
                >
                  {link.label}
                </ChakraLink>
              ))}
              <Button
                as={RouterLink}
                to="/cursos"
                bg="#00529C"
                color="white"
                size="md"
                w="full"
                mt={2}
                onClick={onToggle}
                _hover={{ bg: '#004380' }}
              >
                Inscríbete a los Cursos
              </Button>
            </VStack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  )
}

export default Navbar
