import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Rutas que NUNCA necesitan token
const alwaysPublicPaths = [
  '/auth/login',
  '/auth/register'
];

// Función para verificar si una ruta necesita token
const needsToken = (method, url) => {
  if (!url) return false;
  
  const cleanUrl = url.split('?')[0];
  const httpMethod = method?.toUpperCase();

  // 1. Rutas de autenticación NUNCA necesitan token
  if (alwaysPublicPaths.some(path => cleanUrl.startsWith(path))) {
    return false;
  }

  // 2. Solo GET a productos y categorías es público
  if (httpMethod === 'GET') {
    if (cleanUrl === '/productos' || 
        cleanUrl === '/categorias' ||
        cleanUrl.startsWith('/productos/') ||
        cleanUrl.startsWith('/categorias/')) {
      return false;
    }
  }

  // 3. Rutas que SIEMPRE necesitan token
  if (cleanUrl.startsWith('/pedidos') ||
      cleanUrl.startsWith('/carrito') ||
      cleanUrl.startsWith('/usuarios') ||
      cleanUrl.startsWith('/admin')) {
    return true;
  }

  // 4. POST, PUT, PATCH, DELETE a productos/categorías SIEMPRE necesitan token
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(httpMethod)) {
    if (cleanUrl.startsWith('/productos') || 
        cleanUrl.startsWith('/categorias')) {
      return true;
    }
  }

  // 5. Por defecto, todo lo demás necesita token
  return true;
};

// Interceptor de REQUEST - Agregar token cuando sea necesario
axiosInstance.interceptors.request.use(
  (config) => {
    const shouldAddToken = needsToken(config.method, config.url);
    
    if (shouldAddToken) {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('❌ Se requiere token pero no está disponible');
        console.error('Ruta:', config.method?.toUpperCase(), config.url);
        // Opcional: podrías rechazar la petición aquí
        // return Promise.reject(new Error('Token no disponible'));
      } else {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔒 Token agregado a:', config.method?.toUpperCase(), config.url);
        console.log('🔑 Token (primeros 20 chars):', token.substring(0, 20) + '...');
      }
    } else {
      console.log('🔓 Petición sin token:', config.method?.toUpperCase(), config.url);
      // Asegurarse de que no haya header Authorization en rutas públicas
      delete config.headers.Authorization;
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor de RESPONSE - Manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response, config } = error;
    
    // Si es error 401 (Unauthorized)
    if (response?.status === 401) {
      console.warn('⚠️ 401 Unauthorized');
      console.warn('URL que falló:', config?.method?.toUpperCase(), config?.url);
      console.warn('Token presente:', !!localStorage.getItem('token'));
      
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirigir solo si no estamos ya en login/register
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        console.warn('🔄 Redirigiendo a login...');
        
        // Guardar la URL actual para redireccionar después del login
        sessionStorage.setItem('redirectAfterLogin', currentPath);
        
        window.location.href = '/login';
      }
    }
    
    // Si es error 403 (Forbidden) - sin permisos
    if (response?.status === 403) {
      console.error('🚫 403 Forbidden - Sin permisos para esta acción');
      console.error('URL:', config?.url);
      console.error('Método:', config?.method);
      console.error('Token presente:', !!localStorage.getItem('token'));
      console.error('Headers enviados:', config?.headers);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;