import { useState } from 'react';
import { Link , NavLink } from 'react-router-dom';
import { Home, Book, BarChart2, Heart, User, BookOpen, HelpCircle, Menu } from 'lucide-react'
import Navbar from './Navbar'; // Impordi Navbar komponent

export default function Header() {
  // Põhilised olekud navigatsioonile ja modaalidele
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Vormide olekud
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreeTerms: false
  });
  
  // Autentimisloogika
  const user = null; // Eeldame et kasutaja pole sisselogitud
  
  // Modaalide haldamine
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };
  
  // Vormide haldamine
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Sisselogimine:', loginFormData);
    // Siia tuleb tegelik sisselogimisfunktsionaalsus
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerFormData.password !== registerFormData.passwordConfirm) {
      console.error('Paroolid ei kattu');
      return;
    }
    console.log('Registreerimine:', registerFormData);
    // Siia tuleb tegelik registreerimisfunktsionaalsus
  };
  
  const handleLogout = () => {
    console.log('Väljalogimine (mittefunktsionaalne)');
  };

  // Stiilid navigatsioonile
  const activeStyle = "text-white bg-primary-dark font-medium rounded-md px-3 py-2";
  const inactiveStyle = "text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md px-3 py-2";
  
  const menuItems = [
    { id: 'dashboard', path: '/dashboard', name: 'Avaleht', icon: <Home size={20} /> },
    { id: 'journal', path: '/journal', name: 'Päevik', icon: <Book size={20} /> },
    { id: 'stats', path: '/stats', name: 'Statistika', icon: <BarChart2 size={20} /> },
    // Alammenüü "Rohkem" sees
    { id: 'tips', path: '/tips', name: 'Nipid ja harjutused', icon: <Heart size={20} /> },
    { id: 'reading', path: '/reading', name: 'Lugemist', icon: <BookOpen size={20} /> },
    { id: 'profile', path: '/profile', name: 'Profiil', icon: <User size={20} /> },
    { id: 'help', path: '/help', name: 'Abi', icon: <HelpCircle size={20} /> },
  ];
  

  return (
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white text-xl font-bold">
                Vaimse Tervise Päevik
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
  {/* Peamised menüüelemendid */}
  {menuItems.slice(0, 3).map((item) => (
    <NavLink 
      key={item.id}
      to={item.path}
      className={({ isActive }) => `flex items-center transition duration-200 ${isActive ? activeStyle : inactiveStyle}`}
    >
      <span className="mr-1">{item.icon}</span>
      <span>{item.name}</span>
    </NavLink>
  ))}
    {/* "Rohkem" menüü */}
    <div className="relative group">
    <button className="flex items-center text-white hover:text-gray-200 transition duration-200">
      <Menu size={20} className="mr-1" />
      <span>Rohkem</span>
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
      {menuItems.slice(3).map((item) => (
        <NavLink 
          key={item.id}
          to={item.path}
          className={({ isActive }) => `block px-4 py-2 flex items-center ${
            isActive ? 'bg-teal-100 text-teal-800' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">{item.icon}</span>
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  </div>
</div>
          
          {/* Põhiline navigatsioon */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 text-white hover:bg-primary-dark rounded-md"
                >
                  Avaleht
                </Link>
                <Link 
                  to="/journal" 
                  className="px-3 py-2 text-white hover:bg-primary-dark rounded-md"
                >
                  Päevik
                </Link>
                <Link 
                  to="/statistics" 
                  className="px-3 py-2 text-white hover:bg-primary-dark rounded-md"
                >
                  Statistika
                </Link>
                <div className="ml-3 relative">
                  <button 
                    className="ml-4 px-3 py-2 text-white hover:bg-primary-dark rounded-md"
                    onClick={handleLogout}
                  >
                    Logi välja
                  </button>
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={openLoginModal}
                  className="px-3 py-2 text-white hover:bg-primary-dark rounded-md"
                >
                  Logi sisse
                </button>
                <button 
                  onClick={openRegisterModal}
                  className="ml-4 px-3 py-2 text-white bg-primary-dark hover:bg-primary-light rounded-md"
                >
                  Registreeru
                </button>
              </>
            )}
          </div>
          
          {/* Navbar komponent paremal nurgas (desktop vaates) */}
          <div className="hidden sm:flex sm:items-center">
            <Navbar className="navbar-in-header" />
          </div>
          
          {/* Mobiilimenüü nupp */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none"
            >
              <span className="sr-only">Ava menüü</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobiilimenüü */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Avaleht
              </Link>
              <Link
                to="/journal"
                className="block px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Päevik
              </Link>
              <Link
                to="/statistics"
                className="block px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Statistika
              </Link>
              <button
                className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logi välja
              </button>
            </>
          ) : (
            <>
              <button
                className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => {
                  openLoginModal();
                  setIsMenuOpen(false);
                }}
              >
                Logi sisse
              </button>
              <button
                className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => {
                  openRegisterModal();
                  setIsMenuOpen(false);
                }}
              >
                Registreeru
              </button>
            </>
          )}
          
          {/* Navbari mobiilimenüü elemendid */}
          <div className="border-t border-gray-200 border-opacity-20 pt-2">
            <Navbar mobileMenuInHeader={true} closeParentMenu={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
      
      {/* Login Modaal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModals}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Logi sisse</h2>
            
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={loginFormData.rememberMe}
                    onChange={handleLoginChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Jäta mind meelde
                  </label>
                </div>
                
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Unustasid parooli?
                </button>
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
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Pole veel kontot?
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsRegisterModalOpen(true);
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Loo uus konto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Modaal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModals}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Registreeru</h2>
            
            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nimi
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registerFormData.name}
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
              </div>
              
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={registerFormData.agreeTerms}
                  onChange={handleRegisterChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  Nõustun kasutustingimustega
                </label>
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
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Sul on juba konto?
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsRegisterModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Logi sisse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}