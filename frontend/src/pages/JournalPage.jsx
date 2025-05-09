import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar, BarChart2, Heart, X } from 'lucide-react';

// Main App component that manages the entire application
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation bar */}
      <nav className="w-full px-4 py-3 shadow-md bg-primary">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://placehold.co/40x40" 
              alt="Placeholder"
              width="40px"
              height="40px"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-semibold text-white">Vaimse Tervise Päevik</h1>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow">
        <HomePage />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Vaimse Tervise Päevik. Kõik õigused kaitstud.</p>
      </footer>
    </div>
  );
};

// Home page shown after login
const HomePage = () => {
  // States
  const [entries, setEntries] = useState([
    // Sample data for visualization
    { date: '2025-04-15', mood: 4, notes: 'Täna oli hea päev!' },
    { date: '2025-04-16', mood: 3, notes: 'Keskmine päev.' },
    { date: '2025-04-17', mood: 5, notes: 'Väga hea päev!' },
    { date: '2025-04-18', mood: 2, notes: 'Raske päev.' },
    { date: '2025-04-19', mood: 4, notes: 'Jälle parem.' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTodayEntered, setIsTodayEntered] = useState(false);
  const [selectedMood, setSelectedMood] = useState(3);
  const [notes, setNotes] = useState('');
  
  // Check for today's entry
  useEffect(() => {
    const checkTodayEntry = () => {
      const today = new Date().toISOString().split('T')[0];
      const hasTodayEntry = entries.some(entry => entry.date === today);
      setIsTodayEntered(hasTodayEntry);
    };
    
    checkTodayEntry();
  }, [entries]);
  
  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
    setSelectedMood(3);
    setNotes('');
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Save new entry
  const saveEntry = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      date: today,
      mood: selectedMood,
      notes: notes
    };
    
    // In a real app: API request to save the entry
    setEntries([...entries, newEntry]);
    setIsTodayEntered(true);
    closeModal();
  };
  
  // Navigate to journal page
  const navigateToJournal = () => {
    // In a real app: navigation logic
    console.log("Navigate to journal page");
  };
  
  // Navigate to statistics page
  const navigateToStats = () => {
    // In a real app: navigation logic
    console.log("Navigate to statistics page");
  };
  
  // Navigate to tips page
  const navigateToTips = () => {
    // In a real app: navigation logic
    console.log("Navigate to tips page");
  };
  
  // Main app functions - cards
  const actionCards = [
    {
      id: 'add-entry',
      title: 'Lisa tänane sissekanne',
      description: 'Märgi üles oma tänane meeleolu ja tunne',
      icon: <PlusCircle size={24} className="text-primary" />,
      action: openModal,
      primary: !isTodayEntered,
      disabled: isTodayEntered
    },
    {
      id: 'view-journal',
      title: 'Vaata päevikut',
      description: 'Sirvi varasemaid sissekandeid',
      icon: <Calendar size={24} className="text-blue-500" />,
      action: navigateToJournal
    },
    {
      id: 'view-stats',
      title: 'Vaata statistikat',
      description: 'Näe oma meeleolu dünaamikat',
      icon: <BarChart2 size={24} className="text-primary-dark" />,
      action: navigateToStats
    },
    {
      id: 'tips',
      title: 'Nipid & Harjutused',
      description: 'Leia harjutusi meeleolu parandamiseks',
      icon: <Heart size={24} className="text-red-500" />,
      action: navigateToTips
    }
  ];

  // Simple function to render mood chart
  const renderMoodChart = () => {
    const lastEntries = [...entries].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    ).slice(-7);
    
    const maxHeight = 100;
    
    return (
      <div className="flex items-end justify-around h-64 w-full">
        {lastEntries.map((entry, index) => {
          const height = (entry.mood / 5) * maxHeight;
          let color;
          
          switch(entry.mood) {
            case 1: color = "bg-red-500"; break;
            case 2: color = "bg-orange-400"; break;
            case 3: color = "bg-yellow-400"; break;
            case 4: color = "bg-green-400"; break;
            case 5: color = "bg-primary"; break;
            default: color = "bg-gray-400";
          }
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-12 rounded-t-lg ${color}`} 
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs mt-2">{new Date(entry.date).toLocaleDateString('et-EE', { month: 'short', day: 'numeric' })}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-primary to-blue-500 text-white rounded-lg p-6 mb-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">Tere tulemast, Kasutaja!</h1>
        <p>
          {isTodayEntered
            ? 'Täname, et märkisid tänase enesetunde! Vaata allpool ülevaadet oma meeleolust.'
            : 'Kuidas sa end täna tunned? Märgi oma tänane meeleolu, et jälgida oma heaolu.'}
        </p>
      </div>
      
      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {actionCards.map((card) => (
          <div 
            key={card.id}
            className={`
              bg-white rounded-lg shadow-md p-4 transition cursor-pointer
              ${card.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-1'}
              ${card.primary ? 'ring-2 ring-primary' : ''}
            `}
            onClick={card.disabled ? undefined : card.action}
          >
            <div className="flex items-start mb-2">
              {card.icon}
              <h2 className="text-lg font-semibold ml-2">{card.title}</h2>
            </div>
            <p className="text-gray-600">{card.description}</p>
            {card.disabled && (
              <div className="mt-2 text-sm text-primary">
                Juba märgitud täna
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Dashboard mini-view */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Meeleolu ülevaade</h2>
        {entries.length > 0 ? (
          renderMoodChart()
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Pole veel sissekandeid</p>
          </div>
        )}
      </div>
      
      {/* Entry modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Tänane sissekanne</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {/* Entry form content */}
            <form onSubmit={saveEntry} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Kuidas end täna tundsid?
                </label>
                <div className="flex justify-between">
                  {['😢', '😔', '😐', '🙂', '😄'].map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`flex flex-col items-center p-2 rounded-lg transition 
                        ${selectedMood === index + 1 ? 'bg-primary-light ring-2 ring-primary' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedMood(index + 1)}
                    >
                      <span className="text-3xl mb-1">{emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Märkmed (soovi korral)
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={4}
                  placeholder="Kirjuta siia oma päevast, mõtetest või tunnetest..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg transition"
                >
                  Salvesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;