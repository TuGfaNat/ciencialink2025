import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { PurchaseData } from '../services/kitService'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  itemTitle: string
  itemPrice: string
  onSubmit: (data: PurchaseData) => Promise<void>
}

const PurchaseModal = ({ isOpen, onClose, itemTitle, itemPrice, onSubmit }: PurchaseModalProps) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({
        kit_title: itemTitle,
        price: itemPrice,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address
      })
      onClose()
      setFormData({ name: '', email: '', phone: '', address: '' })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Hubo un problema al procesar tu solicitud.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comprar {itemTitle}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <Text fontWeight="bold" color="brand.600">Precio: {itemPrice}</Text>
              
              <FormControl isRequired>
                <FormLabel>Nombre Completo</FormLabel>
                <Input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Juan Pérez" 
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="juan@ejemplo.com" 
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Teléfono / WhatsApp</FormLabel>
                <Input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="70000000" 
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dirección de Envío (Opcional)</FormLabel>
                <Input 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Zona, Calle, #Casa" 
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="brand" type="submit" isLoading={loading}>
              Confirmar Compra
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PurchaseModal
