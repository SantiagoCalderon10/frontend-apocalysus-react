// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import productService from '../api/productService';

/**
 * Custom Hook para manejar productos
 * @param {Object} options - Opciones de configuración
 * @param {boolean} options.loadOnMount - Si debe cargar productos al montar
 * @param {Object} options.filters - Filtros iniciales
 * @returns {Object} Estado y funciones para manejar productos
 */
const useProducts = (options = {}) => {
  const { loadOnMount = true, filters = {} } = options;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos
  const loadProducts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts(params);
      setProducts(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al cargar productos';
      setError(errorMessage);
      console.error('Error loading products:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener producto por ID
  const getProductById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al cargar producto';
      setError(errorMessage);
      console.error('Error loading product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Buscar productos
  const searchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.searchProducts(searchTerm);
      setProducts(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error en la búsqueda';
      setError(errorMessage);
      console.error('Error searching products:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por categoría
  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductsByCategory(category);
      setProducts(data);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al filtrar por categoría';
      setError(errorMessage);
      console.error('Error filtering by category:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Recargar productos
  const refresh = () => {
    loadProducts(filters);
  };

  // Cargar al montar si está configurado
  useEffect(() => {
    if (loadOnMount) {
      loadProducts(filters);
    }
  }, [loadOnMount]);

  return {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    refresh,
  };
};

export default useProducts;