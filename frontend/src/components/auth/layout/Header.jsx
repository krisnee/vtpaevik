import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          
          {/* Desktop Navigation */}
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
                  to="/diary" 
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
                <Link 
                  to="/login" 
                  className="px-3 py-2 text-white hover:bg-primary-dark rounded-md"
                >
                  Logi sisse
                </Link>
                <Link 
                  to="/register" 
                  className="ml-4 px-3 py-2 text-white bg-primary-dark hover:bg-primary-light rounded-md"
                >
                  Registreeru
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
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

      {/* Mobile menu, show/hide based on menu state */}
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
                to="/diary"
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
              <Link
                to="/login"
                className="block px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Logi sisse
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-white hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Registreeru
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}