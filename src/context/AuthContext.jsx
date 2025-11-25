// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Configurar axios con el token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Verificar token al cargar la app
  const verifyToken = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/verify');
      setUser(response.data);
    } catch (error) {
      console.error('Token inválido:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      const { token, id, email: userEmail, roles } = response.data;

      // Guardar token
      localStorage.setItem('token', token);
      setToken(token);

      // Guardar datos del usuario
      const userData = {
        id,
        email: userEmail,
        roles: roles.map(r => r.authority)
      };
      setUser(userData);

      return { success: true, data: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data || 'Error al iniciar sesión'
      };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userData);
      return { success: true, message: response.data };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.response?.data || 'Error al registrarse'
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  

  // Verificar si es admin
  const isAdmin = () => {
    return user?.roles?.includes('ROLE_ADMINISTRADOR');
  };

  // Verificar si está autenticado
const isAuthenticated = () => {
    return !!user && !!token;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};