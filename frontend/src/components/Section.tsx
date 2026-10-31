import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  bg?: string
  id?: string
}

export const Section = ({ title, subtitle, children, bg = 'white', id }: SectionProps) => {
  return (
    <Box as="section" py={16} bg={bg} id={id}>
      <Container maxW="container.xl">
        {(title || subtitle) && (
          <VStack spacing={4} mb={12} textAlign="center">
            {title && (
              <Heading as="h2" size="xl" color="brand.800">
                {title}
              </Heading>
            )}
            {subtitle && (
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                {subtitle}
              </Text>
            )}
          </VStack>
        )}
        {children}
      </Container>
    </Box>
  )
}
