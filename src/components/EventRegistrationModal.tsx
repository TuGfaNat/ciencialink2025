import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, VStack, useToast, Text } from '@chakra-ui/react'
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

    const data = {
      event_name: eventName,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      comment: formData.get('comment') as string,
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
                <Input name="phone" placeholder="+591 70000000" />
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
