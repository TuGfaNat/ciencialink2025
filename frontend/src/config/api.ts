// Configuración de API URL para comunicarse con el Backend en Coolify o localmente
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'https://dsqlenh27zoz9t0y5qkymh1v.runa.laotrared.net')
