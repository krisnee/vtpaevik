import React, { useState } from 'react';

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  // Modaalne sisselogimise komponent
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Logi sisse</h2>
          <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
              placeholder="sinu@email.ee" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parool</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Jäta mind meelde
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                Unustasid parooli?
              </a>
            </div>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Logi sisse
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Pole veel kontot? {" "}
            <button 
              onClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }} 
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Registreeru siin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
  
  // Modaalne registreerimise komponent
  const RegisterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Loo uus konto</h2>
          <button onClick={() => setShowRegisterModal(false)} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nimi</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
              placeholder="Sinu nimi" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
              placeholder="sinu@email.ee" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parool</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kinnita parool</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" 
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Registreeru
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Juba on konto? {" "}
            <button 
              onClick={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }} 
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Logi sisse
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-600">Vaimse Tervise Päevik</h1>
          <div className="space-x-4">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 text-teal-600 hover:text-teal-800 font-medium"
            >
              Logi sisse
            </button>
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Registreeru
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="py-12 sm:py-16">
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
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-lg font-medium shadow-md"
                >
                  Alusta tasuta
                </button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <img 
                src="/api/placeholder/500/400" 
                alt="Vaimse tervise päevik" 
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
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-teal-600 hover:bg-teal-50"
                >
                  Alusta tasuta
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img 
                src="/api/placeholder/640/420" 
                alt="Dashboard näidis" 
                className="rounded-md shadow m-6"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Show modals if state is true */}
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
    </div>
  );
};

export default LandingPage;