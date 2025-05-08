import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-white min-h-screen">
      {/* Hero section */}
      <section className="py-12 sm:py-16 mt-16"> {/* Lisasin mt-16, et see ei alustaks otse headeri alt */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Jälgi oma vaimset heaolu igapäevaselt
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Sinu isiklik vaimse tervise päevik aitab jälgida meeleolu muutusi, unekvaliteeti ja igapäevaseid mõtteid, et märgata mustreid ja parandada heaolu.
              </p>
              <div className="mt-8">
                <Link 
                  to="/register" 
                  className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-lg font-medium shadow-md"
                >
                  Alusta tasuta prooviperioodi
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <img 
                src="images/heart.png"
                alt="Süda"
                  width="500px"
                  height="400px"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-12 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Funktsionaalsused
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Kõik vajalik, et jälgida ja parandada oma vaimset heaolu
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Meeleolu jälgimine</h3>
              <p className="mt-2 text-gray-500">
                Märgi oma igapäevane meeleolu lihtsalt ja kiirelt, et näha muutusi aja jooksul.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Päeviku sissekanded</h3>
              <p className="mt-2 text-gray-500">
                Lisa igapäevaseid märkmeid oma mõtetest, tunnetest ja kogemustest privaatses keskkonnas.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Statistika ja analüüs</h3>
              <p className="mt-2 text-gray-500">
                Vaata visuaalseid graafikuid ja analüüsi oma meeleolu ja unekvaliteedi trende ajas.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial/Info section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-teal-600 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Vaata oma heaolu uue pilguga</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-teal-50">
                  Vaimse tervise päevik on loodud, et aidata märgata mustreid sinu heaolus, unekvaliteedis ja meeleolus. Regulaarne enesevaatlus aitab paremini mõista, mis sind mõjutab.
                </p>
                <Link 
                  to="/register"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-teal-600 hover:bg-teal-50"
                >
                  Alusta tasuta
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img 
                src="images/sitting_rock.png"
                alt="Mees istub kivil"
                    width="640px"
                    height="420px"
                className="rounded-md shadow m-6"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 