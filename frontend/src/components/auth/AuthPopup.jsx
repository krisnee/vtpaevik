import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ isLoginOpen, isRegisterOpen, onClose, onSwitchToRegister, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { login, register: registerUser, error: authError } = useAuth();
  
  // Vormide olekud
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  
  // Vormide muutmise käsitlejad
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Sisselogimise esitamine
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Sisselogimise vorm esitatud andmetega:", loginFormData);
    alert("Sisselogimise vorm esitatud"); // See peaks näitama hüpikakent
    
    try {
      const success = await login(loginFormData.email, loginFormData.password);
      console.log("Login result:", success);
      if (success) {
        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  // Registreerimise esitamine
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("Registreerimise vorm esitatud andmetega:", registerFormData);
    alert("Registreerimise vorm esitatud"); // See peaks näitama hüpikakent
    
    
    // Valideerimine
    if (registerFormData.password !== registerFormData.passwordConfirm) {
      console.error("Passwords don't match");
      // Siin võiks näidata viga
      return;
    }
    
    try {
      const success = await registerUser(
        registerFormData.username, 
        registerFormData.email, 
        registerFormData.password
      );
      console.log("Register result:", success);
      
      if (success) {
        onClose();
        onSwitchToLogin(); // Avame sisselogimise modaali
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };
  
  // Login Modal
  if (isLoginOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Logi sisse</h2>
          
          {authError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {authError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posti aadress
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Parool
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Logi sisse
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <button
              onClick={onSwitchToRegister}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Loo uus konto
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Register Modal
  if (isRegisterOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Registreeru</h2>
          
          {authError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {authError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Kasutajanimi
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={registerFormData.username}
                onChange={handleRegisterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                E-posti aadress
              </label>
              <input
                type="email"
                id="register-email"
                name="email"
                value={registerFormData.email}
                onChange={handleRegisterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                Parool
              </label>
              <input
                type="password"
                id="register-password"
                name="password"
                value={registerFormData.password}
                onChange={handleRegisterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                Kinnita parool
              </label>
              <input
                type="password"
                id="password-confirm"
                name="passwordConfirm"
                value={registerFormData.passwordConfirm}
                onChange={handleRegisterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
              {registerFormData.password !== registerFormData.passwordConfirm && registerFormData.passwordConfirm && (
                <p className="mt-1 text-sm text-red-600">Paroolid ei kattu</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Registreeru
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <button
              onClick={onSwitchToLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Logi sisse
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default AuthPopup;