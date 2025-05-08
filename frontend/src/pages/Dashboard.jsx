import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JournalEntryModal from '../components/journal/JournalEntryModal';
import MoodChart from '../components/stats/MoodChart';
import DashboardCard from '../components/DashboardCard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [todayEntry, setTodayEntry] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Päris API päringud serverist andmete saamiseks
        const fetchTodayEntry = fetch('/api/journal/entries/date/' + new Date().toISOString().split('T')[0])
          .then(res => res.ok ? res.json() : null);
          
        const fetchRecentEntries = fetch('/api/journal/entries?limit=5')
          .then(res => res.json());
          
        const fetchStats = fetch('/api/journal/stats/' + 
          new Date().getFullYear() + '/' + (new Date().getMonth() + 1))
          .then(res => res.json());
        
        // Tee kõik päringud paralleelselt
        const [todayData, recentData, statsData] = await Promise.all([
          fetchTodayEntry, 
          fetchRecentEntries, 
          fetchStats
        ]);
        
        setTodayEntry(todayData);
        setRecentEntries(recentData);
        setStats(statsData);
      } catch (error) {
        console.error("Viga andmete laadimisel:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  // Abifunktsioon meeleolu emotikonide kuvamiseks
  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😄';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '🙁';
    return '😢';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Laadin andmeid...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Ülemine navigatsiooni riba koos kasutaja info ja väljalogimisega */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
            {user?.username?.charAt(0).toUpperCase() || 'K'}
          </div>
          <div>
            <h2 className="font-bold">{user?.username || 'Külaline'}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="space-x-2">
          <button 
            onClick={() => navigate('/profile')}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Profiil
          </button>
          <button 
            onClick={handleLogout}
            className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
          >
            Logi välja
          </button>
        </div>
      </div>

      {/* Dashboardi kaardid 2x2 layoutiga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tänane sissekanne */}
        <DashboardCard title="Tänane päev">
          {todayEntry ? (
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{getMoodEmoji(todayEntry.mood_rating)}</span>
                <div>
                  <p className="font-medium">Meeleolu: {todayEntry.mood_rating}/10</p>
                  <p className="text-gray-600">Uni: {todayEntry.sleep_quality}/10</p>
                </div>
              </div>
              <p className="text-gray-700">{todayEntry.notes}</p>
            </div>
          ) : (
            <div className="bg-primary-light bg-opacity-20 p-4 rounded-md">
              <p className="font-medium">Sa pole veel tänast päeva kirja pannud</p>
              <button 
                onClick={() => setShowModal(true)} 
                className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Lisa tänane sissekanne
              </button>
            </div>
          )}
        </DashboardCard>

        {/* Statistika */}
        <DashboardCard title="Sinu meeleolu viimase nädala jooksul">
          {stats ? (
            <div className="h-48">
              <MoodChart data={stats.moodData} />
            </div>
          ) : (
            <p className="text-gray-500">Statistika jaoks pole veel piisavalt andmeid.</p>
          )}
        </DashboardCard>

        {/* Viimased sissekanded */}
        <DashboardCard title="Viimased sissekanded" 
                      footer={
                        <button 
                          onClick={() => navigate('/journal')}
                          className="text-primary hover:underline text-sm"
                        >
                          Vaata kõiki sissekandeid →
                        </button>
                      }>
          {recentEntries.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
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
                      <span className="text-2xl mr-2">{getMoodEmoji(entry.mood_rating)}</span>
                      <span className="text-gray-600">{entry.mood_rating}/10</span>
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2">{entry.notes}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Sul pole veel sissekandeid.</p>
          )}
        </DashboardCard>

        {/* Tugi ja ressursid */}
        <DashboardCard title="Tugi ja ressursid">
          <div className="space-y-3">
            <a href="/resources/breathing" className="block p-3 bg-green-50 rounded-md hover:bg-green-100 transition">
              <h3 className="font-medium">Hingamisharjutused</h3>
              <p className="text-sm text-gray-600">Lihtsad harjutused stressi leevendamiseks</p>
            </a>
            <a href="/resources/crisis" className="block p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition">
              <h3 className="font-medium">Kriisiabi</h3>
              <p className="text-sm text-gray-600">Kontaktid ja juhised raskete hetkede jaoks</p>
            </a>
            <a href="/resources/quotes" className="block p-3 bg-purple-50 rounded-md hover:bg-purple-100 transition">
              <h3 className="font-medium">Rahustavad tsitaadid</h3>
              <p className="text-sm text-gray-600">Inspiratsiooni andvad mõtted</p>
            </a>
          </div>
        </DashboardCard>
      </div>

      {/* Sissekande modal */}
      {showModal && 
        <JournalEntryModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)}
          onSave={(newEntry) => {
            setTodayEntry(newEntry);
            setShowModal(false);
            // Värskenda recent entries
            setRecentEntries([newEntry, ...recentEntries.slice(0, 4)]);
          }}
        />
      }
    </div>
  );
}