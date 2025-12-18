import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, VStack, useToast, Text, Select, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { ContactService } from '../services/contactService'

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
}

export const EventRegistrationModal = ({ isOpen, onClose, eventName }: EventRegistrationModalProps) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const countryCode = formData.get('country_code') as string
    const phoneNumber = formData.get('phone') as string
    const phone = `${countryCode} ${phoneNumber}`
    const comment = formData.get('comment') as string

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
      toast({ title: 'Correo inválido', description: 'Por favor ingresa un correo válido.', status: 'error', duration: 3000, isClosable: true })
      setLoading(false)
      return
    }

    if (!phoneRegex.test(phone)) {
      toast({ title: 'Teléfono inválido', description: 'El teléfono solo debe contener números.', status: 'error', duration: 3000, isClosable: true })
      setLoading(false)
      return
    }

    const data = {
      event_name: eventName,
      name,
      email,
      phone,
      comment,
    }

    try {
      await ContactService.registerForEvent(data)
      toast({
        title: 'Registro Exitoso',
        description: `Te has registrado correctamente para: ${eventName}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Error',
        description: "Hubo un problema al registrarte. Intenta nuevamente.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrarme a {eventName}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <Text fontSize="sm" color="gray.500">
                Déjanos tus datos para asegurar tu cupo en este evento.
              </Text>
              <FormControl isRequired>
                <FormLabel>Nombre Completo</FormLabel>
                <Input name="name" placeholder="Tu nombre" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input name="email" type="email" placeholder="tucorreo@ejemplo.com" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Teléfono / WhatsApp</FormLabel>
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
              <FormControl>
                <FormLabel>Comentario Adicional (Opcional)</FormLabel>
                <Input name="comment" placeholder="Alguna duda o requerimiento especial" />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="brand" type="submit" isLoading={loading}>
              Confirmar Registro
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
