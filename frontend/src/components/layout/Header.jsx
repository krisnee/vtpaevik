/**
 * Header.jsx
 * 
 * Vaimse tervise päeviku rakenduse peamine navigatsioonipäis.
 * Võimaldab navigeerida rakenduse lehtede vahel ja kasutajakonto haldamist.
 * 
 * @version 1.0.0
 * @author [Kristi]
 * @date Mai 2025
 */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AuthPopup from '../auth/AuthPopup';
import { 
  Home, Book, BarChart2, Heart, 
  Menu, X, PhoneCall, Info, LayoutDashboard
} from 'lucide-react';

/**
 * Header komponent rakenduse ülaosa jaoks
 * Sisaldab navigatsiooni ja kasutajaautentimist
 */
const Header = () => {
  // --------- OLEKUD ---------
  // Põhiolekud menüü jaoks
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobiilimenüü avatud/suletud olek
  
  // Autentimisega seotud olekud
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kas kasutaja on sisse logitud
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Sisselogimise modaal
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Registreerimise modaal
  
  const location = useLocation(); // Praegune asukoht rakenduses

  // --------- EFEKTID ---------
  // Kontrollib autentimise olekut lehe laadimisel
  useEffect(() => {
    // Kontrollime, kas kasutaja on sisselogitud (token olemas)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // --------- FUNKTSIOONID ---------
  // Menüü avamine/sulgemine (mobiilivaates)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Modaalide haldamise funktsioonid
  const openLoginModal = () => {
    console.log("Sisselogimise modaali avamine");
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsMenuOpen(false); // Sulgeb mobiilimenüü, kui see oli avatud
  };
  
  const openRegisterModal = () => {
    console.log("Registreerimise modaali avamine");
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsMenuOpen(false); // Sulgeb mobiilimenüü, kui see oli avatud
  };
  
  const closeModals = () => {
    console.log("Modaalide sulgemine");
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Väljalogimine
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsMenuOpen(false); // Sulgeb mobiilimenüü pärast väljalogimist
  };

  // --------- MENÜÜELEMENDID ---------
  // Menüüelementide andmed (ikoonid, nimed, lingid)
  const menuItems = [
    { id: 'home', path: '/', name: 'Avaleht', icon: <Home size={20} />, forAll: true },
    { id: 'journal', path: '/journal', name: 'Päevik', icon: <Book size={20} />, forAll: false },
    { id: 'stats', path: '/stats', name: 'Statistika', icon: <BarChart2 size={20} />, forAll: false },
    { id: 'dashboard', path: '/dashboard', name: 'Minu profiil', icon: <LayoutDashboard size={20} />, forAll: false },
    // Alammenüü "Rohkem" sees
    { id: 'tips', path: '/tips', name: 'Nipid ja harjutused', icon: <Heart size={20} />, forAll: true },
    { id: 'contact', path: '/contact', name: 'Kontakt / Abi', icon: <PhoneCall size={20} />, forAll: true },
    { id: 'about', path: '/about', name: 'Meist', icon: <Info size={20} />, forAll: true },
  ];

  // Filtreerime menüüelemendid autentimise oleku põhjal
  const visibleMenuItems = menuItems.filter(item => isAuthenticated || item.forAll);

  // Peamenüüs näidatavad elemendid
  const mainMenuItems = [
    menuItems[0], // Avaleht
    ...(isAuthenticated ? [menuItems[1], menuItems[2], menuItems[3]] : []) // Päevik, Statistika ja Minu profiil ainult sisseloginud kasutajatele
  ];
  
  // "Rohkem" alammenüüs näidatavad elemendid
  const dropdownMenuItems = visibleMenuItems.filter(item => !mainMenuItems.includes(item));

  // --------- STIILID ---------
  // Aktiivsete ja mitteaktiivsete linkide stiilid
  const activeStyle = "text-white bg-primary-dark font-medium rounded-md px-3 py-2";
  const inactiveStyle = "text-white hover:bg-primary-dark hover:bg-opacity-70 rounded-md px-3 py-2";

  // --------- RENDERDAMINE ---------
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

          {/* Desktop navigatsioon - kuvatud ainult laiematel ekraanidel (md:) */}
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
                          isActive ? 'bg-primary-light text-primary-dark' : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                  
                  {/* Logi välja nupp - nähtav ainult sisselogitud kasutajatele */}
                  {isAuthenticated && (
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                    >
                      Logi välja
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Autentimise nupud - ainult väljalogitud kasutajatele */}
            {!isAuthenticated && (
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

          {/* Mobiilimenüü nupp - kuvatud ainult väiksematel ekraanidel */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menüü nupp"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobiilimenüü - nähtav ainult kui isMenuOpen on true */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-primary-dark">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {/* Kõik nähtavad menüüelemendid */}
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
          </div>
        </div>
      )}

      {/* Sisselogimise modaal */}
      {isLoginModalOpen && (
        <AuthPopup 
          isLoginOpen={true} 
          isRegisterOpen={false} 
          onClose={closeModals} 
          onSwitchToRegister={openRegisterModal} 
          onSwitchToLogin={openLoginModal} 
        />
      )}
 
      {/* Registreerimise modaal */}
      {isRegisterModalOpen && (
        <AuthPopup 
          isLoginOpen={false} 
          isRegisterOpen={true} 
          onClose={closeModals} 
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }} 
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }} 
        />
      )}
    </header>
  );
};

export default Header;