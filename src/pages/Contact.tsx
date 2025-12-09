import { Box, Button, Container, FormControl, FormLabel, Heading, Input, SimpleGrid, Text, Textarea, VStack, Icon, Flex } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const Contact = () => {
  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
          {/* Contact Info */}
          <Box>
            <Heading size="2xl" mb={6} color="brand.900">Contáctanos</Heading>
            <Text fontSize="xl" color="gray.600" mb={10}>
              ¿Tienes alguna duda o quieres inscribirte? Estamos aquí para ayudarte.
            </Text>

            <VStack align="flex-start" spacing={8}>
              <Flex align="center">
                <Icon as={FaMapMarkerAlt} w={6} h={6} color="brand.500" mr={4} />
                <Box>
                  <Heading size="sm">Dirección</Heading>
                  <Text color="gray.600">Av. 16 de Julio, Edificio Cosmos, Piso 5. La Paz, Bolivia.</Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Icon as={FaPhone} w={6} h={6} color="brand.500" mr={4} />
                <Box>
                  <Heading size="sm">Teléfono / WhatsApp</Heading>
                  <Text color="gray.600">+591 70000000</Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Icon as={FaEnvelope} w={6} h={6} color="brand.500" mr={4} />
                <Box>
                  <Heading size="sm">Correo Electrónico</Heading>
                  <Text color="gray.600">info@ciencialink.bo</Text>
                </Box>
              </Flex>
            </VStack>

            {/* Map Placeholder */}
            <Box mt={10} h="300px" bg="gray.200" borderRadius="xl" display="flex" alignItems="center" justifyContent="center">
              <Text color="gray.500">Mapa de Ubicación</Text>
            </Box>
          </Box>

          {/* Form */}
          <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" border="1px" borderColor="gray.100">
            <Heading size="lg" mb={6}>Envíanos un mensaje</Heading>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre Completo</FormLabel>
                <Input placeholder="Juan Pérez" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input type="email" placeholder="juan@ejemplo.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Teléfono</FormLabel>
                <Input placeholder="+591 70000000" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mensaje</FormLabel>
                <Textarea placeholder="Hola, quisiera información sobre..." rows={6} />
              </FormControl>
              <Button colorScheme="brand" size="lg" w="full">Enviar Mensaje</Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Contact
