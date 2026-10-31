import { Box, Button, Container, FormControl, FormLabel, Heading, Input, SimpleGrid, Text, Textarea, VStack, Icon, Flex, useToast, Select, HStack } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { useState } from 'react'

import { ContactService } from '../services/contactService'

const Contact = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Get form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const countryCode = formData.get('country_code') as string
    const phoneNumber = formData.get('phone') as string
    const phone = phoneNumber ? `${countryCode} ${phoneNumber}` : ''
    const message = formData.get('message') as string

    // Validation
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    const phoneRegex = /^[0-9+\-\s]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nameRegex.test(name)) {
      toast({ title: 'Nombre inválido', description: 'El nombre solo debe contener letras.', status: 'error', duration: 3000, isClosable: true })
      setLoading(false)
      return
    }

    if (!emailRegex.test(email)) {
      toast({ title: 'Correo inválido', description: 'Por favor ingresa un correo electrónico válido.', status: 'error', duration: 3000, isClosable: true })
      setLoading(false)
      return
    }

    if (phone && !phoneRegex.test(phone)) {
      toast({ title: 'Teléfono inválido', description: 'El teléfono solo debe contener números.', status: 'error', duration: 3000, isClosable: true })
      setLoading(false)
      return
    }
    
    const data = { name, email, phone, message }

    try {
      await ContactService.sendMessage(data)
      toast({
        title: 'Mensaje enviado',
        description: "Gracias por contactarnos. Te responderemos pronto.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: "Hubo un problema al enviar tu mensaje. Intenta nuevamente.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

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

            {/* Map */}
            <Box mt={10} h="300px" bg="gray.100" borderRadius="xl" overflow="hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.567087968504!2d-68.13264628469795!3d-16.497475888616196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f207324796387%3A0x7d6a59178224524e!2sAv.%2016%20de%20Julio%2C%20La%20Paz!5e0!3m2!1sen!2sbo!4v1709650000000!5m2!1sen!2sbo" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Box>

          {/* Form */}
          <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" border="1px" borderColor="gray.100">
            <Heading size="lg" mb={6}>Envíanos un mensaje</Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input name="name" placeholder="Juan Pérez" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <Input name="email" type="email" placeholder="juan@ejemplo.com" />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <HStack>
                    <Select name="country_code" w="120px" defaultValue="+591">
                      <option value="+591">🇧🇴 +591</option>
                      <option value="+51">🇵🇪 +51</option>
                      <option value="+56">🇨🇱 +56</option>
                      <option value="+54">🇦🇷 +54</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+34">🇪🇸 +34</option>
                    </Select>
                    <Input name="phone" placeholder="70000000" />
                  </HStack>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mensaje</FormLabel>
                  <Textarea name="message" placeholder="Hola, quisiera información sobre..." rows={6} />
                </FormControl>
                <Button type="submit" colorScheme="brand" size="lg" w="full" isLoading={loading}>
                  Enviar Mensaje
                </Button>
              </VStack>
            </form>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Contact
