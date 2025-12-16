import { Box, Container, SimpleGrid, Stack, Text, Link, Icon, Flex } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { Rocket } from 'lucide-react'

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.50">
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack spacing={6}>
            <Flex alignItems="center">
              <Icon as={Rocket} w={6} h={6} color="brand.300" mr={2} />
              <Text fontSize="lg" fontWeight="bold">CienciaLink</Text>
            </Flex>
            <Text fontSize={'sm'}>
              Democratizando la educación STEM en Bolivia a través de tecnología y accesibilidad.
            </Text>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Enlaces Rápidos</Text>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/cursos'}>Cursos</Link>
            <Link href={'/eventos'}>Eventos</Link>
            <Link href={'/blog'}>Blog</Link>
            <Link href={'/faq'}>Preguntas Frecuentes</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Contacto</Text>
            <Flex align="center"><Icon as={FaWhatsapp} mr={2} /> +591 70000000</Flex>
            <Flex align="center"><Icon as={FaEnvelope} mr={2} /> info@ciencialink.bo</Flex>
            <Flex align="center"><Icon as={FaMapMarkerAlt} mr={2} /> La Paz, Bolivia</Flex>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Síguenos</Text>
            <Stack direction={'row'} spacing={6}>
              <Link href={'#'}><Icon as={FaFacebook} w={6} h={6} /></Link>
              <Link href={'#'}><Icon as={FaInstagram} w={6} h={6} /></Link>
              <Link href={'#'}><Icon as={FaTwitter} w={6} h={6} /></Link>
              <Link href={'#'}><Icon as={FaYoutube} w={6} h={6} /></Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box borderTopWidth={0} borderStyle={'solid'} borderColor={'gray.700'}>
        <Container maxW={'container.xl'} py={4}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify={{ base: 'center', md: 'space-between' }} align={{ base: 'center', md: 'center' }}>
            <Text textAlign="center">© 2025 CienciaLink Bolivia. Todos los derechos reservados.</Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
