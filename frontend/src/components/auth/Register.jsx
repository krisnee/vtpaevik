import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Registreerimise komponent, mis võimaldab kasutajal luua uue konto.
 * Kasutab react-hook-form valideerimiseks ja react-toastify teavitusteks.
 */
export default function Register() {
  // Vormi andmete haldamine
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  
  // Valideerimise vigade haldamine
  const [errors, setErrors] = useState({});
  
  // Vormi esitamise oleku haldamine
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Autentimise konteksti kasutamine
  const { register: registerUser, error: authError } = useAuth();
  
  // Navigeerimise hook
  const navigate = useNavigate();

  /**
   * Käsitleb sisendväljade muutusi ja uuendab vormi andmeid.
   * @param {Event} e - Sündmuse objekt
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Valideerib vormi andmed enne esitamist.
   * @returns {boolean} - Kas vorm on kehtiv
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Kasutajanime valideerimine
    if (!formData.username || formData.username.length < 2) {
      newErrors.username = 'Kasutajanimi peab olema vähemalt 2 märki pikk';
    }
    
    // E-posti aadressi valideerimine
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Palun sisesta korrektne e-posti aadress';
    }
    
    // Parooli valideerimine
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Parool peab olema vähemalt 6 märki pikk';
    }
    
    // Parooli kinnituse valideerimine
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Paroolid ei ühti';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Käsitleb vormi esitamist.
   * @param {Event} e - Sündmuse objekt
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kontrolli, kas vorm on kehtiv
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Registreeri kasutaja
    const success = await registerUser(formData.username, formData.email, formData.password);
    
    setIsSubmitting(false);
    
    if (success) {
      // Näita eduka registreerimise teavitust
      toast.success('Konto on edukalt loodud! Palun logi sisse.');
      
      // Suuna kasutaja sisselogimise lehele
      navigate('/login', { state: { message: 'Konto on loodud. Palun logi sisse.' } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Päis */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Loo uus konto
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Või{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            logi olemasoleva kontoga sisse
          </Link>
        </p>
      </div>

      {/* Registreerimise vorm */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Autentimise vea kuvamine */}
          {authError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {authError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Kasutajanime väli */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Kasutajanimi
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            {/* E-posti aadressi väli */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posti aadress
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Parooli väli */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Parool
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Parooli kinnituse väli */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                Kinnita parool
              </label>
              <div className="mt-1">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.passwordConfirm && (
                  <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm}</p>
                )}
              </div>
            </div>

            {/* Esitamise nupp */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isSubmitting ? 'Registreerimine...' : 'Registreeru'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}