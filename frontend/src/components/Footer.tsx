import { Box, Container, SimpleGrid, Stack, Text, Link, Icon, Flex, Divider, Badge } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  return (
    <Box bg="#132F42" color="#F3F3F3" pt={14} pb={8} borderTop="4px solid #00529C">
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mb={10}>
          {/* Col 1: Identidad & Filosofía */}
          <Stack spacing={4}>
            <Logo size="md" variant="horizontal" colorMode="light" />
            <Text fontSize="sm" color="gray.300" lineHeight="tall">
              Punto de encuentro y conexión para el ecosistema científico, tecnológico y educativo en Bolivia. Una comunidad en movimiento para transformar la realidad a través del conocimiento colaborativo.
            </Text>
            <Flex gap={3} pt={2}>
              <Link
                href="https://www.facebook.com/ciencialinkbolivia"
                isExternal
                p={2}
                bg="whiteAlpha.100"
                borderRadius="md"
                _hover={{ bg: '#00529C', color: 'white' }}
                aria-label="Facebook de CienciaLink Bolivia"
              >
                <Icon as={FaFacebook} w={5} h={5} />
              </Link>
              <Link
                href="https://www.instagram.com/ciencialinkbolivia/"
                isExternal
                p={2}
                bg="whiteAlpha.100"
                borderRadius="md"
                _hover={{ bg: '#00529C', color: 'white' }}
                aria-label="Instagram de CienciaLink Bolivia"
              >
                <Icon as={FaInstagram} w={5} h={5} />
              </Link>
              <Link
                href="https://wa.me/59170000000"
                isExternal
                p={2}
                bg="whiteAlpha.100"
                borderRadius="md"
                _hover={{ bg: '#25D366', color: 'white' }}
                aria-label="WhatsApp de CienciaLink Bolivia"
              >
                <Icon as={FaWhatsapp} w={5} h={5} />
              </Link>
            </Flex>
          </Stack>

          {/* Col 2: Plataforma y Comisiones */}
          <Stack align="flex-start" spacing={3}>
            <Text fontWeight="700" fontSize="md" color="white" textTransform="uppercase" letterSpacing="0.5px">
              Plataforma
            </Text>
            <Link as={RouterLink} to="/comisiones" color="gray.300" _hover={{ color: 'white' }}>
              8 Comisiones Tecnológicas
            </Link>
            <Link as={RouterLink} to="/cursos" color="gray.300" _hover={{ color: 'white' }}>
              Hub de Aprendizaje (Cursos)
            </Link>
            <Link as={RouterLink} to="/repositorio" color="gray.300" _hover={{ color: 'white' }}>
              Repositorio Científico & Papers
            </Link>
            <Link as={RouterLink} to="/proyectos" color="gray.300" _hover={{ color: 'white' }}>
              Portafolio de Proyectos
            </Link>
            <Link as={RouterLink} to="/eventos" color="gray.300" _hover={{ color: 'white' }}>
              Torneo LINKUP & Eventos
            </Link>
          </Stack>

          {/* Col 3: Conexión Ecosistema MakerLink */}
          <Stack spacing={4}>
            <Flex align="center" gap={2}>
              <Text fontWeight="700" fontSize="md" color="white" textTransform="uppercase" letterSpacing="0.5px">
                Ecosistema
              </Text>
              <Badge colorScheme="orange" fontSize="2xs">Startup Aliada</Badge>
            </Flex>
            <Box p={4} bg="whiteAlpha.100" borderRadius="lg" border="1px solid" borderColor="whiteAlpha.200">
              <Text fontSize="sm" fontWeight="600" color="white" mb={1}>
                MakerLink Bolivia
              </Text>
              <Text fontSize="xs" color="gray.300" mb={3}>
                ¿Buscas soluciones tecnológicas y fabricación? Conoce nuestra startup de manufactura y prototipado rápido.
              </Text>
              <Link
                href="https://makerlink.bo"
                isExternal
                fontSize="xs"
                fontWeight="700"
                color="#60A1E8"
                display="inline-flex"
                alignItems="center"
                gap={1}
                _hover={{ color: 'white' }}
              >
                Explorar MakerLink <Icon as={FaExternalLinkAlt} w={3} h={3} />
              </Link>
            </Box>
          </Stack>

          {/* Col 4: Contacto Institucional */}
          <Stack align="flex-start" spacing={3}>
            <Text fontWeight="700" fontSize="md" color="white" textTransform="uppercase" letterSpacing="0.5px">
              Contacto
            </Text>
            <Flex align="center" color="gray.300" fontSize="sm">
              <Icon as={FaWhatsapp} mr={2} color="#25D366" /> +591 70000000
            </Flex>
            <Flex align="center" color="gray.300" fontSize="sm">
              <Icon as={FaEnvelope} mr={2} color="#60A1E8" /> contacto@ciencialink.bo
            </Flex>
            <Flex align="center" color="gray.300" fontSize="sm">
              <Icon as={FaMapMarkerAlt} mr={2} color="#F80034" /> La Paz & El Alto, Bolivia
            </Flex>
            <Text fontSize="xs" color="gray.400" pt={2}>
              Infraestructura optimizada sobre Coolify Cloud.
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.200" mb={6} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={3}
          fontSize="xs"
          color="gray.400"
        >
          <Text>© 2026 CienciaLink Bolivia. Todos los derechos reservados.</Text>
          <Text>Diseño alineado al Manual de Imagen Corporativa Oficial - Versión 2026</Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
