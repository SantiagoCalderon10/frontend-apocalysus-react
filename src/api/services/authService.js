import axiosInstance from '../config/axiosConfig';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      
      if (response.data.token) {
        // Guardar token
        localStorage.setItem('token', response.data.token);
        
        // Transformar roles de objeto a array de strings
        const roles = response.data.roles.map(role => role.authority);
        
        // Crear objeto user normalizado
        const user = {
          id: response.data.id,
          email: response.data.email,
          roles: roles // ["ROLE_ADMINISTRADOR"] o ["ROLE_CLIENTE"]
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        console.log('✅ Login exitoso, token y usuario guardados');
        console.log('👤 Usuario:', user);
        console.log('🔑 Roles:', roles);
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      
      if (response.data.token) {
        // Guardar token
        localStorage.setItem('token', response.data.token);
        
        // Transformar roles
        const roles = response.data.roles.map(role => role.authority);
        
        // Crear objeto user normalizado
        const user = {
          id: response.data.id,
          email: response.data.email,
          roles: roles
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        console.log('✅ Registro exitoso, token y usuario guardados');
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Error en registro:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    console.log('🚪 Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parseando usuario:', e);
        return null;
      }
    }
    return null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  hasRole: (role) => {
    const user = authService.getCurrentUser();
    if (!user?.roles) return false;
    
    // Soportar ambos formatos: "ROLE_ADMINISTRADOR" y "ADMINISTRADOR"
    return user.roles.includes(role) || user.roles.includes(`ROLE_${role}`);
  },

  isAdmin: () => {
    return authService.hasRole('ROLE_ADMINISTRADOR') || authService.hasRole('ADMINISTRADOR');
  }
};

export default authService;