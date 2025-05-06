import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Book, BarChart2, Heart, User, 
  Menu, X, Moon, Sun, PhoneCall, Info
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const location = useLocation();

  // Funktsioon, mis kontrollib autentimise olekut
  useEffect(() => {
    // Siin kontrollime, kas kasutaja on sisselogitud
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Tumeda/heleda režiimi lülitamise funktsioon
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Teema lülitamise loogika
    // document.documentElement.classList.toggle('dark');
  };

  // Menüü avamise/sulgemise funktsioon
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Modaalide haldamine
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsMenuOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsMenuOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    // Logi välja loogika
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  // Menüüelemendid
  const menuItems = [
    { id: 'home', path: '/', name: 'Avaleht', icon: <Home size={20} />, forAll: true },
    { id: 'journal', path: '/journal', name: 'Päevik', icon: <Book size={20} />, forAll: false },
    { id: 'stats', path: '/stats', name: 'Statistika', icon: <BarChart2 size={20} />, forAll: false },
    // Alammenüü "Rohkem" sees
    { id: 'tips', path: '/tips', name: 'Nipid ja harjutused', icon: <Heart size={20} />, forAll: true },
    { id: 'settings', path: '/settings', name: 'Seaded', icon: <User size={20} />, forAll: false },
    { id: 'profile', path: '/profile', name: 'Profiil', icon: <User size={20} />, forAll: false },
    { id: 'contact', path: '/contact', name: 'Kontakt / Abi', icon: <PhoneCall size={20} />, forAll: true },
    { id: 'about', path: '/about', name: 'Meist', icon: <Info size={20} />, forAll: true },
  ];

    // Leian elemendid autentimise oleku põhjal
    const visibleMenuItems = menuItems.filter(item => isAuthenticated || item.forAll);

    // Peamenüüs näidatavad elemendid (staatiliselt määratud)
    const mainMenuItems = [
      menuItems[0], // Avaleht
      ...(isAuthenticated ? [menuItems[1], menuItems[2]] : []) // Päevik ja Statistika ainult sisseloginud kasutajatele
    ];
  
    // Ülejäänud elemendid drop-down menüüs
    const dropdownMenuItems = visibleMenuItems.filter(item => !mainMenuItems.includes(item));
  
  // Defineerime aktiivsete ja mitteaktiivsete linkide stiilid
  const activeStyle = "text-white bg-primary-dark font-medium rounded-md px-3 py-2";
  const inactiveStyle = "text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md px-3 py-2";

  return (
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Pealkiri */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Vaimse Tervise Päevik
            </Link>
          </div>

          {/* Desktop navigatsioon */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Põhimenüü elemendid */}
            {mainMenuItems.map((item) => (
              <NavLink 
                key={item.id}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center transition duration-200 ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}

            {/* "Rohkem" menüü */}
            {dropdownMenuItems.length > 0 && (
              <div className="relative group">
                <button className="flex items-center text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md px-3 py-2 transition duration-200">
                  <Menu size={20} className="mr-1" />
                  <span>Rohkem</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                  {dropdownMenuItems.map((item) => (
                    <NavLink 
                      key={item.id}
                      to={item.path}
                      className={({ isActive }) => 
                        `block px-4 py-2 flex items-center ${
                          isActive ? 'bg-teal-100 text-teal-800' : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            {/* Autentimine ja teema lüliti */}
            <div className="flex items-center ml-4">
              {/* Tume/hele režiimi lüliti */}
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition duration-200 mr-3"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Autentimise nupud */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md px-3 py-2">
                    <User size={20} className="mr-1" />
                    <span>Kasutaja</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User size={20} className="mr-2" />
                      <span>Profiil</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <span>Logi välja</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <button 
                    onClick={openLoginModal} 
                    className="text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md px-3 py-2"
                  >
                    Logi sisse
                  </button>
                  <button 
                    onClick={openRegisterModal} 
                    className="ml-2 text-white bg-primary-dark hover:bg-opacity-90 rounded-md px-3 py-2"
                  >
                    Registreeru
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobiilimenüü nupp */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobiilimenüü */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-dark">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {/* Kõik menüüelemendid */}
            {visibleMenuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${
                    isActive ? 'bg-primary-dark text-white' : 'text-white hover:bg-primary-dark hover:bg-opacity-70'
                  } flex items-center`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}

            {/* Autentimise nupud mobiilis */}
            {!isAuthenticated ? (
              <>
                <button
                  className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md flex items-center"
                  onClick={openLoginModal}
                >
                  <span>Logi sisse</span>
                </button>
                <button
                  className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md flex items-center"
                  onClick={openRegisterModal}
                >
                  <span>Registreeru</span>
                </button>
              </>
            ) : (
              <button
                className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md flex items-center"
                onClick={handleLogout}
              >
                <span>Logi välja</span>
              </button>
            )}

            {/* Tume/hele režiimi lüliti */}
            <button 
              onClick={toggleDarkMode} 
              className="block w-full text-left px-3 py-2 text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md flex items-center"
            >
              <span className="mr-2">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              <span>{isDarkMode ? 'Hele režiim' : 'Tume režiim'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModals}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Logi sisse</h2>
            
            <form className="space-y-6">
              {/* Form fields */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posti aadress
                </label>
                <input
                  type="email"
                  id="email"
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
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModals}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Registreeru</h2>
            
            <form className="space-y-6">
              {/* Form fields */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nimi
                </label>
                <input
                  type="text"
                  id="name"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
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
      )}
    </header>
  );
};

export default Header;