import { Box, Button, Container, Heading, SimpleGrid, Text, Badge, Stack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Events = () => {
  return (
    <Box pt={10}>
      <Container maxW="container.xl">
        <Heading mb={4} color="brand.800">Próximos Eventos</Heading>
        <Text fontSize="xl" color="gray.600" mb={12}>
          Participa en nuestros talleres, seminarios y ferias de ciencia.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={20}>
          {[
            { title: 'Feria de Robótica 2025', date: '15 de Marzo', type: 'Presencial', desc: 'Exposición de proyectos de robótica de estudiantes de todo el país.' },
            { title: 'Webinar: IA para Todos', date: '22 de Marzo', type: 'Virtual', desc: 'Introducción a la inteligencia artificial y sus aplicaciones éticas.' },
            { title: 'Taller de Arduino', date: '05 de Abril', type: 'Presencial', desc: 'Aprende a programar tu primer microcontrolador en una sesión intensiva.' },
            { title: 'Hackathon CienciaLink', date: '20 de Mayo', type: 'Híbrido', desc: '48 horas para resolver desafíos locales usando tecnología.' },
          ].map((event, i) => (
            <Box key={i} p={8} borderWidth="1px" borderRadius="xl" boxShadow="sm" _hover={{ boxShadow: 'md', borderColor: 'brand.500' }} transition="all 0.2s">
              <Stack direction="row" justify="space-between" align="center" mb={4}>
                <Badge colorScheme="brand" fontSize="sm" px={2} py={1}>{event.type}</Badge>
                <Text fontWeight="bold" color="gray.500">{event.date}</Text>
              </Stack>
              <Heading size="lg" mb={3}>{event.title}</Heading>
              <Text color="gray.600" mb={6}>{event.desc}</Text>
              <Button as={RouterLink} to="/registro" colorScheme="brand" variant="outline">Registrarme</Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Events
