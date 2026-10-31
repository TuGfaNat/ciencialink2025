import { Box, Button, Container, Heading, SimpleGrid, Text, Image, Badge, Stack, useToast } from '@chakra-ui/react'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import PurchaseModal from '../components/PurchaseModal'
import { Kit, KitService, PurchaseData } from '../services/kitService'

const Kits = () => {
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toast = useToast()

  const kits: Kit[] = [
    { title: 'Kit Robot Buddy', price: '350 Bs', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', tag: 'Más Vendido' },
    { title: 'Kit Arduino Básico', price: '200 Bs', image: 'https://images.unsplash.com/photo-1555679427-1f6dfcce943b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', tag: 'Principiantes' },
    { title: 'Kit Sensores IoT', price: '280 Bs', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', tag: 'Avanzado' },
    { title: 'Brazo Robótico 3D', price: '450 Bs', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', tag: 'Proyecto' },
    { title: 'Kit Electrónica', price: '150 Bs', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800', tag: 'Escolar' },
    { title: 'Impresora 3D Mini', price: '2500 Bs', image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', tag: 'Pro' },
  ]

  const handleBuy = (kit: Kit) => {
    setSelectedKit(kit)
    setIsModalOpen(true)
  }

  const handlePurchase = async (data: PurchaseData) => {
    await KitService.purchase(data)
    toast({
      title: '¡Pedido Recibido!',
      description: 'Nos pondremos en contacto contigo pronto para coordinar la entrega.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Box pt={10}>
      <Container maxW="container.xl">
        <Heading mb={4} color="brand.800">Tienda de Kits</Heading>
        <Text fontSize="xl" color="gray.600" mb={12}>
          Herramientas y materiales para aprender robótica y electrónica en casa.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={20}>
          {kits.map((kit, i) => (
            <Box key={i} borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{ shadow: 'lg' }}>
              <Image src={kit.image} alt={kit.title} h="200px" w="100%" objectFit="cover" />
              <Box p={6}>
                <Stack direction="row" justify="space-between" align="center" mb={2}>
                  <Badge colorScheme="brand" borderRadius="full" px={2}>{kit.tag}</Badge>
                  <Text fontWeight="bold" fontSize="xl" color="brand.600">{kit.price}</Text>
                </Stack>
                <Heading size="md" mb={4}>{kit.title}</Heading>
                <Button 
                  leftIcon={<ShoppingCart size={18} />} 
                  colorScheme="brand" 
                  w="full"
                  onClick={() => handleBuy(kit)}
                >
                  Comprar
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {selectedKit && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          itemTitle={selectedKit.title}
          itemPrice={selectedKit.price}
          onSubmit={handlePurchase}
        />
      )}
    </Box>
  )
}

export default Kits
