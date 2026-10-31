import React from 'react'
import { Box, Tooltip, Icon } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  phoneNumber?: string
  defaultMessage?: string
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '59170000000',
  defaultMessage = '¡Hola CienciaLink Bolivia! Quisiera más información sobre los cursos, comisiones y actividades.'
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <Box
      position="fixed"
      bottom={{ base: '20px', md: '28px' }}
      right={{ base: '20px', md: '28px' }}
      zIndex={999}
    >
      <Tooltip label="¿Tienes dudas? Escríbenos por WhatsApp" placement="left" hasArrow bg="#132F42" color="white" px={3} py={2} borderRadius="md">
        <Box
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={{ base: '54px', md: '60px' }}
          h={{ base: '54px', md: '60px' }}
          bg="#25D366"
          color="white"
          borderRadius="full"
          boxShadow="0 8px 24px rgba(37, 211, 102, 0.45)"
          transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          _hover={{
            transform: 'scale(1.1) translateY(-3px)',
            boxShadow: '0 12px 28px rgba(37, 211, 102, 0.6)',
            bg: '#20BA5A',
          }}
          _active={{
            transform: 'scale(0.95)',
          }}
          aria-label="Contactar por WhatsApp a CienciaLink Bolivia"
        >
          <Icon as={FaWhatsapp} w={{ base: 7, md: 8 }} h={{ base: 7, md: 8 }} />
        </Box>
      </Tooltip>
    </Box>
  )
}

export default WhatsAppButton
