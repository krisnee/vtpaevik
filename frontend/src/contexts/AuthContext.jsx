import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kontrollime, kas kasutaja on juba sisse logitud (token on salvestatud)
    const token = localStorage.getItem('token');
    if (token) {
      // Kontrolli tokeni kehtivust
      checkTokenValidity(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkTokenValidity = async (token) => {
    try {
      // API endpoint, mis kontrollib tokeni kehtivust
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      // Token ei ole kehtiv
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      setError('Sessioon aegunud. Palun logi uuesti sisse.');
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Salvesta token
      localStorage.setItem('token', token);
      
      // Salvesta kasutaja andmed
      setUser(user);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Sisselogimine ebaõnnestus');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registreerimine ebaõnnestus');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};