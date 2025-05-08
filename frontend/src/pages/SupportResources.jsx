import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  Wind, 
  Coffee, 
  Smile, 
  Zap,
  Sun,
  Clock
} from 'lucide-react';

const SupportResources = () => {
  const [activeTab, setActiveTab] = useState('tips');

  const mentalHealthTips = [
    "Leia endale päevas 15 minutit ainult iseendale",
    "Liiguta ennast iga päev vähemalt 30 minutit",
    "Hoia regulaarset und - mine magama ja tõuse iga päev samal ajal",
    "Räägi oma tunnetest kellegagi, keda usaldad",
    "Joo piisavalt vett ja söö tervislikult",
    "Praktiseeri tänulikkust - kirjuta üles kolm asja, mille eest oled tänulik",
    "Võta aega looduses viibimiseks - see vähendab stressi",
    "Piira sotsiaalmeedia ja uudiste tarbimist kui tunned ärevust",
    "Proovi mediteerida või teha mindfulness harjutusi",
    "Sea endale realistlikud eesmärgid ja tähista väikeseid võite"
  ];

  const inspirationalQuotes = [
    {
      quote: "Iga päev on uus algus. Võta see vastu kui kingitus.",
      author: "Dalai Laama"
    },
    {
      quote: "Sinust endast sõltub kõige rohkem, kuidas sa oma päeva näed.",
      author: "Henry Ford"
    },
    {
      quote: "Rahu ei tähenda, et probleeme ei oleks. Rahu tähendab, et sa suudad nendega toime tulla.",
      author: "Steve Maraboli"
    },
    {
      quote: "Pole olemas olukorda, mis oleks lootusetult halb. Isegi pimedus hajub, kui sa ise valgust lood.",
      author: "Juhan Liiv"
    },
    {
      quote: "Õnn ei peitu selles, et teha, mida armastad, vaid armastada seda, mida pead tegema.",
      author: "Goethe"
    },
    {
      quote: "Kõige olulisem on teekond, mitte sihtpunkt.",
      author: "Konfutsius"
    }
  ];

  const relaxationExercises = [
    {
      name: "Sügav hingamine",
      description: "Sisse 4 sekundit, kinni 4 sekundit, välja 4 sekundit",
      duration: "5 minutit"
    },
    {
      name: "Progressiivne lihaste lõdvestamine",
      description: "Pinguta ja lõdvesta erinevaid lihasgruppe järjekorras",
      duration: "10 minutit"
    },
    {
      name: "Viie meele tähelepanuharjutus",
      description: "Märka 5 asja, mida näed; 4 asja, mida kuuled; 3 asja, mida tunned; 2 asja, mida lõhnad; 1 asja, mida maitset",
      duration: "3 minutit"
    },
    {
      name: "Keha skaneerimine",
      description: "Suuna teadlikult tähelepanu oma keha erinevatele osadele varbast peast",
      duration: "8 minutit"
    },
    {
      name: "Visualiseerimine",
      description: "Kujuta ette rahulikku kohta kõigi detailidega ja tunne end seal turvaliselt",
      duration: "5 minutit"
    },
    {
      name: "Müüri vaatamine",
      description: "Vaata üht punkti seinal ja keskendu ainult sellele, lastes mõtetel mööduda",
      duration: "2 minutit"
    }
  ];

  // Kontaktide sektsioon eemaldatud, kuna olemas eraldi lehel

  const renderSection = () => {
    switch(activeTab) {
      case 'tips':
        return (
          <div className="bg-primary-light bg-opacity-20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-primary-dark">
              <Zap className="mr-3 text-peach-dark" size={28} /> Vaimse Tervise Nipid
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mentalHealthTips.map((tip, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Heart className="mr-4 text-salmon-DEFAULT flex-shrink-0" size={24} />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'quotes':
        return (
          <div className="space-y-5 p-6 bg-peach-light bg-opacity-20 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-peach-dark">
              <BookOpen className="mr-3" size={28} /> Inspireerivad Tsitaadid
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {inspirationalQuotes.map((quote, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-lg border-l-4 border-peach-DEFAULT shadow-md hover:shadow-lg transition-all"
                >
                  <Coffee className="text-peach-dark mb-3" size={24} />
                  <p className="italic mb-3 text-lg">"{quote.quote}"</p>
                  <p className="text-right font-semibold text-peach-dark">- {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'exercises':
        return (
          <div className="p-6 bg-primary-light bg-opacity-20 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-primary-dark">
              <Smile className="mr-3" size={28} /> Lõõgastusharjutused
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {relaxationExercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  <Wind className="text-primary-DEFAULT mb-3" size={28} />
                  <h3 className="font-bold text-xl mb-3 text-primary-dark">{exercise.name}</h3>
                  <p className="mb-3 text-lg text-gray-dark">{exercise.description}</p>
                  <div className="flex items-center text-primary-DEFAULT font-medium">
                    <Clock className="mr-2" size={20} />
                    <span>{exercise.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // Kontaktide sektsioon eemaldatud
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-lightest min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary-DEFAULT text-white p-8 text-center" style={{ backgroundImage: 'linear-gradient(135deg, #5bbfb5 0%, #4a9c94 100%)' }}>
          <h1 className="text-4xl font-bold mb-2">
            Vaimse Tervise Päevik
          </h1>
          <p className="text-xl opacity-90">Sinu heaolu on oluline. Siit leiad tööriistad, et oma vaimset tervist hoida.</p>
        </div>

        <div className="flex justify-center mt-6 mb-6 space-x-3 p-4">
          {[
            { key: 'tips', label: 'Nipid', icon: Zap, color: 'text-peach-dark' },
            { key: 'quotes', label: 'Tsitaadid', icon: BookOpen, color: 'text-peach-dark' },
            { key: 'exercises', label: 'Harjutused', icon: Wind, color: 'text-primary-dark' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center px-5 py-3 rounded-full transition-all text-lg font-medium
                ${activeTab === tab.key 
                  ? 'bg-peach-dark text-white shadow-md transform scale-110' 
                  : 'bg-gray-light text-gray-dark hover:bg-primary-light hover:text-white'
                }
              `}
            >
              <tab.icon className={`mr-2 ${activeTab === tab.key ? 'text-white' : tab.color}`} size={22} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderSection()}
        </div>

        <div className="bg-primary-light bg-opacity-20 p-6 text-center">
          <p className="text-primary-dark text-lg">
            Mäleta - abi küsimine on tugevuse märk, mitte nõrkus. Sa ei ole kunagi üksi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportResources;