import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'horizontal' | 'vertical' | 'icon-only'
  colorMode?: 'light' | 'dark'
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  colorMode = 'dark'
}) => {
  const iconDimensions = {
    sm: 32,
    md: 42,
    lg: 56,
  }[size]

  const titleSizes = {
    sm: 'md',
    md: 'lg',
    lg: '2xl',
  }[size]

  const subtitleSizes = {
    sm: '2xs',
    md: 'xs',
    lg: 'sm',
  }[size]

  const primaryTextColor = colorMode === 'dark' ? '#132F42' : '#FFFFFF'
  const accentTextColor = '#00529C'
  const boliviaTextColor = colorMode === 'dark' ? '#556987' : '#E2E8F0'

  return (
    <Flex
      alignItems="center"
      direction={variant === 'vertical' ? 'column' : 'row'}
      gap={variant === 'vertical' ? 2 : 3}
      cursor="pointer"
      userSelect="none"
    >
      {/* Atom SVG Graphic */}
      <Box w={`${iconDimensions}px`} h={`${iconDimensions}px`} flexShrink={0}>
        <svg viewBox="0 0 200 200" fill="none" width="100%" height="100%">
          <defs>
            <radialGradient id="clGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00529C" />
              <stop offset="100%" stop-color="#132F42" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#clGradient)" stroke="#00529C" strokeWidth="2" />
          <ellipse cx="100" cy="100" rx="72" ry="26" stroke="#FFFFFF" strokeWidth="5" fill="none" transform="rotate(0 100 100)" />
          <ellipse cx="100" cy="100" rx="72" ry="26" stroke="#FFFFFF" strokeWidth="5" fill="none" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="72" ry="26" stroke="#FFFFFF" strokeWidth="5" fill="none" transform="rotate(120 100 100)" />
          <circle cx="100" cy="100" r="16" fill="#FFFFFF" />
          {/* Bolivian flag electron dots */}
          <circle cx="50" cy="65" r="8" fill="#F80034" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="98" cy="144" r="8" fill="#FFD100" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="152" cy="74" r="8" fill="#007A3D" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      </Box>

      {variant !== 'icon-only' && (
        <Box textAlign={variant === 'vertical' ? 'center' : 'left'}>
          <Text
            fontFamily="'Verdana', 'Segoe UI', sans-serif"
            fontWeight="900"
            fontSize={titleSizes}
            lineHeight="1.1"
            letterSpacing="-0.5px"
            color={primaryTextColor}
          >
            Ciencia<Text as="span" color={accentTextColor}>Link</Text>
          </Text>
          <Text
            fontFamily="'Open Sans', sans-serif"
            fontWeight="700"
            fontSize={subtitleSizes}
            letterSpacing="2px"
            textTransform="uppercase"
            color={boliviaTextColor}
          >
            Bolivia
          </Text>
        </Box>
      )}
    </Flex>
  )
}

export default Logo
