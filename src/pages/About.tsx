import { Box, Container, Heading, SimpleGrid, Text, VStack, Avatar } from '@chakra-ui/react'
import { Section } from '../components/Section'

const About = () => {
  return (
    <Box>
      <Box bg="brand.50" py={20} textAlign="center">
        <Container maxW="container.md">
          <Heading size="2xl" mb={6} color="brand.900">Sobre Nosotros</Heading>
          <Text fontSize="xl" color="gray.600">
            Somos una organización dedicada a democratizar el acceso a la educación científica y tecnológica en Bolivia.
          </Text>
        </Container>
      </Box>

      <Section title="Nuestra Misión y Visión">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
          <Box>
            <Heading size="lg" mb={4} color="brand.600">Misión</Heading>
            <Text fontSize="lg" color="gray.600">
              Inspirar y capacitar a la próxima generación de innovadores bolivianos a través de educación STEM accesible, práctica y de alta calidad.
            </Text>
          </Box>
          <Box>
            <Heading size="lg" mb={4} color="brand.600">Visión</Heading>
            <Text fontSize="lg" color="gray.600">
              Convertirnos en el referente nacional de educación tecnológica, cerrando la brecha digital y fomentando el desarrollo científico en Bolivia.
            </Text>
          </Box>
        </SimpleGrid>
      </Section>

      <Section title="Nuestro Equipo" bg="gray.50">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {[1, 2, 3].map((i) => (
            <VStack key={i} bg="white" p={6} borderRadius="xl" boxShadow="sm">
              <Avatar size="2xl" name={`Miembro ${i}`} src={`https://i.pravatar.cc/150?u=${i}`} mb={4} />
              <Heading size="md">Nombre Apellido</Heading>
              <Text color="brand.500" fontWeight="bold">Cargo / Rol</Text>
              <Text textAlign="center" color="gray.600">
                Apasionado por la educación y la tecnología. Ingeniero de sistemas con 5 años de experiencia.
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Section>
    </Box>
  )
}

export default About
