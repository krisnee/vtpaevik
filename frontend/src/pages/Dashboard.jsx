import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockDiaryEntries } from '../data/mockData';
import JournalEntryModal from '../components/journal/JournalEntryModal';

export default function Dashboard() {
  const { user } = useAuth();
  const [todayEntry, setTodayEntry] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simuleerime API päringut kasutades mock andmeid
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Kontrolli, kas täna on juba sissekanne tehtud
        const today = new Date().toDateString();
        const entry = mockDiaryEntries.find(
          e => new Date(e.date).toDateString() === today
        );
        
        // Viimased 5 sissekannet
        const recent = [...mockDiaryEntries]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        
        setTodayEntry(entry || null);
        setRecentEntries(recent);
        setIsLoading(false);
      } catch (error) {
        console.error("Viga andmete laadimisel:", error);
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  // Abifunktsioon meeleolu kuvamiseks
  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😄';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '🙁';
    return '😢';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Laadin andmeid...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tervitus */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Tere, {user?.name || 'Külaline'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Kuidas sul täna läheb?
        </p>
      </div>

      {/* Tänane sissekanne või meeldetuletus */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {todayEntry ? 'Tänane sissekanne' : 'Tänane päev'}
        </h2>
        
        {todayEntry ? (
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{getMoodEmoji(todayEntry.mood)}</span>
              <div>
                <p className="font-medium">Meeleolu: {todayEntry.mood}/10</p>
                <p className="text-gray-600">Uni: {todayEntry.sleep}/10</p>
              </div>
            </div>
            <p className="text-gray-700">{todayEntry.notes}</p>
          </div>
        ) : (
          <div className="bg-primary-light bg-opacity-20 p-4 rounded-md">
            <p className="font-medium">Sa pole veel tänast päeva kirja pannud</p>
            <button onClick={() => setShowModal(true)} className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">
              Lisa tänane sissekanne
            </button>
          </div>
        )}
      </div>

      {/* Viimased sissekanded */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Viimased sissekanded
        </h2>
        
        {recentEntries.length > 0 ? (
          <div className="space-y-4">
            {recentEntries.map(entry => (
              <div key={entry.id} className="border-b border-gray-200 pb-3 last:border-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {new Date(entry.date).toLocaleDateString('et-EE', { 
                      day: 'numeric', 
                      month: 'long'
                    })}
                  </span>
                  <span className="flex items-center">
                    <span className="text-2xl mr-2">{getMoodEmoji(entry.mood)}</span>
                    <span className="text-gray-600">{entry.mood}/10</span>
                  </span>
                </div>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">{entry.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Sissekandeid pole veel tehtud.</p>
        )}
      </div>{showModal && <JournalEntryModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </div>
  );
}
