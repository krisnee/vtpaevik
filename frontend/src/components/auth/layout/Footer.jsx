import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rakenduse info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Vaimse Tervise Päevik</h3>
            <p className="text-gray-300">
              Jälgi oma meeleolu ja heaolu igapäevaselt. 
              Märka mustreid ja paranda oma vaimset tervist.
            </p>
          </div>
          
          {/* Kiirlingid */}
          <div>
            <h3 className="text-lg font-medium mb-4">Kasulikud lingid</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Avaleht
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Meist
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  Privaatsuspoliitika
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  Kasutustingimused
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kriisiabi */}
          <div>
            <h3 className="text-lg font-medium mb-4">Kriisiabi</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Emotsionaalne tugi: <a href="tel:116123" className="text-primary-light hover:underline">116 123</a>
              </li>
              <li className="text-gray-300">
                Lasteabi: <a href="tel:116111" className="text-primary-light hover:underline">116 111</a>
              </li>
              <li className="text-gray-300">
                Kiirabi: <a href="tel:112" className="text-primary-light hover:underline">112</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-300 text-center">
            © {new Date().getFullYear()} Vaimse Tervise Päevik. Kõik õigused kaitstud.
          </p>
        </div>
      </div>
    </footer>
  );
}