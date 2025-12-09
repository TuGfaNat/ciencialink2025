import { Box, Image, Badge, Text, Button, Stack, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface CourseCardProps {
  id: number
  title: string
  description: string
  image: string
  price: string
  badges?: string[]
}

export const CourseCard = ({ id, title, description, image, price, badges }: CourseCardProps) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="md" transition="transform 0.2s" _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}>
      <Image src={image} alt={title} h="200px" w="100%" objectFit="cover" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {badges?.map((badge, index) => (
            <Badge borderRadius="full" px="2" colorScheme="brand" mr="2" key={index}>
              {badge}
            </Badge>
          ))}
        </Box>

        <Heading mt="1" size="md" as="h3" lineHeight="tight" noOfLines={2} mb={2}>
          {title}
        </Heading>

        <Text color="gray.600" fontSize="sm" noOfLines={3} mb={4}>
          {description}
        </Text>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="xl" color="brand.600">
            {price}
          </Text>
          <Button as={RouterLink} to={`/cursos/${id}`} colorScheme="brand" variant="solid" size="sm">
            Inscribirme
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
