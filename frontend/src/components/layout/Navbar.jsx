import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, BarChart2, Home, Heart, Info, PhoneCall } from 'lucide-react';

// Navigatsioonimenüü komponent - kohandatud Headeriga kasutamiseks
const Navbar = ({ className, mobileMenuInHeader, closeParentMenu }) => {
  // Seisundid (states)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menüü avatud/suletud olek
  const [isDarkMode, setIsDarkMode] = useState(false); // Tume/hele režiim
  
  // Menüü avamise/sulgemise funktsioon
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Menüü sulgemise funktsioon
  const closeMenu = () => {
    setIsMenuOpen(false);
    // Kui see funktsioon on määratud, sulge ka ülemmenüü
    if (closeParentMenu) {
      closeParentMenu();
    }
  };
  
  // Tumeda/heleda režiimi lülitamise funktsioon
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Siin võiks lisada teemalülituse loogika
    // document.documentElement.classList.toggle('dark');
  };
  
  // Menüüelemendid - kergesti muudetav nimekiri
  const menuItems = [
    { id: 'home', name: 'Avaleht', icon: <Home size={20} /> },
    { id: 'statspage', name: 'Ülevaade', icon: <BarChart2 size={20} /> },
    { id: 'journal', name: 'Päevik', icon: <User size={20} /> },
    { id: 'tips', name: 'Nipid ja harjutused', icon: <Heart size={20} /> },
    { id: 'settings', name: 'Seaded', icon: <User size={20} /> },
    { id: 'profile', name: 'Profiil', icon: <User size={20} /> },
    { id: 'contact', name: 'Kontakt / Abi', icon: <PhoneCall size={20} /> },
    { id: 'about', name: 'Meist', icon: <Info size={20} /> },
  ];

  // Kui komponendi on mobiilimenüüs Headeri sees
  if (mobileMenuInHeader) {
    return (
      <>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={`/${item.id === 'home' ? '' : item.id}`}
            className="flex items-center px-3 py-2 text-white hover:bg-primary-dark"
            onClick={closeMenu}
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
        
        {/* Tume/hele režiim lüliti */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center w-full px-3 py-2 text-white hover:bg-primary-dark rounded-md"
        >
          <span className="mr-2">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          <span>{isDarkMode ? 'Hele režiim' : 'Tume režiim'}</span>
        </button>
      </>
    );
  }

  // Tavalises vaates Header-i sees
  if (className && className.includes('navbar-in-header')) {
    return (
      <div className="flex items-center">
        {/* "Rohkem" menüü */}
        <div className="relative group">
          <button className="flex items-center text-white hover:text-gray-200 transition duration-200 p-2 rounded-md hover:bg-primary-dark">
            <Menu size={20} />
            <span className="ml-1">Menüü</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
            {menuItems.map((item) => (
              <Link 
                key={item.id}
                to={`/${item.id === 'home' ? '' : item.id}`} 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Tume/hele režiimi lüliti */}
        <button 
          onClick={toggleDarkMode} 
          className="ml-2 p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition duration-200"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    );
  }

  // Täielik iseseisev komponent
  return (
    <div className={`font-sans ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {/* Fikseeritud ülamenüü */}
      <nav className="w-full px-4 py-3 shadow-md" style={{ backgroundColor: '#6fb5b2' }}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo ja pealkiri */}
          <div className="flex items-center space-x-2">
            <img 
              src="/api/placeholder/40/40" 
              alt="Vaimse Tervise Päevik" 
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-semibold text-white">Vaimse Tervise Päevik</h1>
          </div>
          
          {/* Töölaua navigatsioon suurematele ekraanidele */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Menüüelemendid */}
            {menuItems.slice(0, 4).map((item) => (
              <Link 
                key={item.id}
                to={`/${item.id === 'home' ? '' : item.id}`} 
                className="flex items-center text-white hover:text-gray-200 transition duration-200"
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* "Rohkem" menüü */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-gray-200 transition duration-200">
                <span>Rohkem</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                {menuItems.slice(4).map((item) => (
                  <Link 
                    key={item.id}
                    to={`/${item.id === 'home' ? '' : item.id}`} 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tume/hele režiimi lüliti */}
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition duration-200"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Mobiilimenüü nupp */}
          <button 
            className="md:hidden p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition duration-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobiilimenüü (kuvatakse ainult kui isMenuOpen === true ja väikestel ekraanidel) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex justify-end">
          <div 
            className={`w-64 h-full shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transform transition-transform duration-300 ease-in-out`}
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Menüü</h2>
                <button onClick={toggleMenu}>
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.id === 'home' ? '' : item.id}`}
                  className={`flex items-center px-4 py-3 hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  onClick={toggleMenu}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="px-4 py-3 border-t mt-2">
                <button 
                  onClick={toggleDarkMode} 
                  className="flex items-center"
                >
                  <span className="mr-3">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </span>
                  <span>{isDarkMode ? 'Hele režiim' : 'Tume režiim'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;