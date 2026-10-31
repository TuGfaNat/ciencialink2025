import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    // Paleta Oficial CienciaLink Bolivia (Manual 2026)
    brand: {
      50: '#EBF4FC',
      100: '#CBE2F8',
      200: '#99C4F1',
      300: '#60A1E8',
      400: '#2E80DE',
      500: '#00529C', // Azul Institucional Oficial (PANTONE 293 U)
      600: '#004380',
      700: '#132F42', // Azul Marino Profundo Oficial
      800: '#0E2332',
      900: '#091620',
      // Colores de Acento y Secundarios del Manual
      primary: '#00529C',
      dark: '#132F42',
      light: '#F3F3F3',
      red: '#F80034', // PANTONE RED 032 C
      yellow: '#FFD100', // Amarillo Patrio
      green: '#007A3D', // Verde Patrio
    },
    accent: {
      red: '#F80034',
      hoverRed: '#D6002D',
    },
  },
  fonts: {
    heading: `'Open Sans', 'Verdana', system-ui, -apple-system, sans-serif`,
    body: `'Open Sans', system-ui, -apple-system, sans-serif`,
    logo: `'Verdana', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#F3F3F3',
        color: '#132F42',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'md',
      },
      variants: {
        solid: (props: any) => {
          if (props.colorScheme === 'brand') {
            return {
              bg: '#00529C',
              color: 'white',
              _hover: {
                bg: '#004380',
                _disabled: {
                  bg: '#00529C',
                },
              },
            }
          }
          if (props.colorScheme === 'accent') {
            return {
              bg: '#F80034',
              color: 'white',
              _hover: {
                bg: '#D6002D',
              },
            }
          }
          return {}
        },
      },
    },
  },
})

export default theme
