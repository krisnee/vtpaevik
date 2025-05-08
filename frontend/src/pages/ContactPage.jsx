/**
 * ContactPage.jsx
 * 
 * Vaimse tervise päeviku rakenduse kontaktide leht.
 * Kuvab olulised kriisiabi telefoninumbrid ja kontaktid.
 * 
 * @version 1.0.0
 * @date Mai 2025
 */

import React, { useState } from 'react';
import { Phone, Heart, Clock, Info, ExternalLink, Search } from 'lucide-react'; // Rohkem ikoone

const ContactPage = () => {
  // Reacti olekute haldamine

  // Kategooriad ja nende värvinäitamine
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Kontaktide andmed õigete numbritega
  const contacts = [
    // KRIISIABI - salmon värvi kategooria
    {
      id: 'hädaabi',
      title: 'Hädaabi',
      number: '112',
      description: 'Kiirabi, politsei, pääste',
      icon: <Phone size={32} className="text-salmon-dark" />,
      available: '24/7',
      category: 'emergency',
      priority: 1
    },
    {
      id: 'lasteabi',
      title: 'Lasteabi telefon',
      number: '116 111',
      description: 'Tasuta nõustamistelefon lastele ja noortele',
      icon: <Phone size={32} className="text-salmon" />,
      available: '24/7',
      category: 'emergency',
      priority: 2
    },
    {
      id: 'ohvriabi',
      title: 'Ohvriabi kriisitelefon',
      number: '116 006',
      description: 'Abi traumaolukorras',
      icon: <Phone size={32} className="text-salmon" />,
      available: '24/7',
      category: 'emergency',
      priority: 3
    },
    
    // PSÜHHOLOOGILINE TUGI - peach värvi kategooria
    {
      id: 'emotsionaalne',
      title: 'Emotsionaalse toe telefon',
      number: '6 558 088',
      description: 'Psühholoogiline nõustamine',
      icon: <Heart size={32} className="text-peach" />,
      available: 'iga päev 19:00-07:00',
      category: 'psychological',
      priority: 1
    },
    {
      id: 'hingehoiutelefon',
      title: 'Hingehoiu telefon',
      number: '116 123',
      description: 'Emotsionaalne tugi ja hingehoid',
      icon: <Heart size={32} className="text-peach" />,
      available: 'iga päev 14:00-24:00',
      category: 'psychological',
      priority: 2
    },
    {
      id: 'peaasi',
      title: 'Peaasi.ee',
      number: 'veebi nõustamine',
      description: 'Vaimse tervise portaal ja nõustamine',
      icon: <Heart size={32} className="text-peach" />,
      available: 'veebis 24/7',
      website: 'https://peaasi.ee/kysi-noustajalt/',
      category: 'psychological',
      priority: 3
    },
    
    // MEDITSIINILINE ABI - primary värvi kategooria
    {
      id: 'perearst',
      title: 'Perearsti nõuandetelefon',
      number: '1220',
      description: 'Meditsiiniline nõu ja abi',
      icon: <Info size={32} className="text-primary" />,
      available: '24/7',
      category: 'medical',
      priority: 1
    },
    {
      id: 'myhygie',
      title: 'Vaimse tervise õed',
      number: '666 4050',
      description: 'Vaimse tervise õendusnõustamine',
      icon: <Info size={32} className="text-primary" />,
      available: 'E-R 9:00-17:00',
      category: 'medical',
      priority: 2
    },
    {
      id: 'mure',
      title: 'Murebaromeeter',
      number: 'veebiteenus',
      description: 'Veebitest vaimse tervise hindamiseks',
      icon: <Info size={32} className="text-primary" />,
      website: 'https://peaasi.ee/murebaromeeter/',
      available: 'veebis 24/7',
      category: 'medical',
      priority: 3
    }
  ];

  // Kategooriad filtreerimiseks
  const categories = [
    { id: 'all', name: 'Kõik kontaktid', icon: <Search size={20} />, color: 'text-primary' },
    { id: 'emergency', name: 'Kriisiabi', icon: <Phone size={20} />, color: 'text-salmon' },
    { id: 'psychological', name: 'Psühholoogiline tugi', icon: <Heart size={20} />, color: 'text-peach' },
    { id: 'medical', name: 'Meditsiiniline abi', icon: <Info size={20} />, color: 'text-primary' }
  ];

  // Filtreeritud kontaktid
  const filteredContacts = activeCategory === 'all' 
    ? contacts.sort((a, b) => a.priority - b.priority) 
    : contacts.filter(contact => contact.category === activeCategory).sort((a, b) => a.priority - b.priority);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-lightest">
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-8 text-center">Vaimse Tervise Tugi</h1>


        {/* Millal abi otsida? sektsioon */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Millal abi otsida?</h2>
          <p className="text-gray-dark mb-6 leading-relaxed">
            Kui tunned, et sinu vaimne heaolu on ohus või koged järgmisi sümptomeid pikema aja vältel:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ul className="space-y-3 text-gray-dark">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-light/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-primary text-sm font-bold">✓</span>
                </div>
                <span>Püsiv kurbus või tühjusetunne</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-light/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-primary text-sm font-bold">✓</span>
                </div>
                <span>Lootusetuse tunne või suutmatus näha olukorra paranemist</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-light/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-primary text-sm font-bold">✓</span>
                </div>
                <span>Ärevus või paanika, mis segab igapäevaelu</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-dark">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salmon-light/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-salmon text-sm font-bold">✓</span>
                </div>
                <span>Uinumisraskused või liigne unisus</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salmon-light/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-salmon text-sm font-bold">✓</span>
                </div>
                <span>Isu kadumine või ülesöömine</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salmon-light/20 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-salmon text-sm font-bold">✓</span>
                </div>
                <span>Enesevigastamise või enesetapu mõtted</span>
              </li>
            </ul>
          </div>
          <div className="bg-primary-light/10 p-6 rounded-lg border-l-4 border-primary">
            <p className="text-gray-dark leading-relaxed">
              Abi otsimine on tugevuse märk, mitte nõrkuse tunnistamine. Professionaalne tugi võib aidata 
              leida lahendusi ja toetada sinu vaimse tervise paranemist.
            </p>
          </div>
        </div>
    

        {/* Kategooria valimine */}
        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => {
                // Määrame kategooria värvi kategooria põhjal
                let activeColor = 'bg-primary';
                let hoverColor = 'hover:text-primary';
                
                if (category.id === 'emergency') {
                  activeColor = 'bg-salmon';
                  hoverColor = 'hover:text-salmon';
                } else if (category.id === 'psychological') {
                  activeColor = 'bg-peach';
                  hoverColor = 'hover:text-peach';
                }
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                      activeCategory === category.id
                        ? `${activeColor} text-white shadow-lg transform scale-105`
                        : `bg-gray-light text-gray-dark hover:bg-gray-light ${hoverColor}`
                    }`}
                  >
                    <span className={activeCategory === category.id ? 'text-white' : category.color}>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                );
              })}
          </div>
        </div>
        
        {/* Kontaktide kaardid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map(contact => {
            // Dünaamiline värvi määramine kategooria põhjal
            let cardBgColor = "bg-white";
            let iconBgColor = "bg-primary-light/15";
            let numberColor = "text-primary-dark";
            let hoverBorderColor = "hover:border-primary-light";
            
            if (contact.category === 'emergency') {
              iconBgColor = "bg-salmon-light/15";
              numberColor = "text-salmon-dark";
              hoverBorderColor = "hover:border-salmon";
            } else if (contact.category === 'psychological') {
              iconBgColor = "bg-peach-light/15";
              numberColor = "text-peach-dark";
              hoverBorderColor = "hover:border-peach";
            }
            
            return (
              <div 
                key={contact.id} 
                className={`${cardBgColor} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-light ${hoverBorderColor} transform hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 flex items-center justify-center ${iconBgColor} rounded-full mb-4`}>
                    {contact.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-dark">{contact.title}</h2>
                  <p className={`text-3xl font-bold ${numberColor} mb-3`}>{contact.number}</p>
                  <p className="text-gray-medium mb-2">{contact.description}</p>
                  <div className="flex items-center text-gray-medium mt-2">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{contact.available}</span>
                  </div>
                  {contact.website && (
                    <a 
                      href={contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`mt-3 inline-flex items-center text-sm ${
                        contact.category === 'emergency' ? 'text-salmon hover:text-salmon-dark' :
                        contact.category === 'psychological' ? 'text-peach hover:text-peach-dark' :
                        'text-primary hover:text-primary-dark'
                      } hover:underline`}
                    >
                      <span>Külasta veebilehte</span>
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Lisakontaktid ja kasulikud lingid */}
      <div className="max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Kasulikud veebiressursid</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <a 
            href="https://peaasi.ee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-gray-lightest rounded-lg hover:bg-primary-light/10 transition-colors duration-300 flex flex-col items-center text-center"
          >
            <h3 className="font-semibold text-primary-dark mb-2">Peaasi.ee</h3>
            <p className="text-gray-medium text-sm">Vaimse tervise portaal nõustamise ja materjalidega</p>
          </a>

          <a 
            href="https://lahendus.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-gray-lightest rounded-lg hover:bg-peach-light/10 transition-colors duration-300 flex flex-col items-center text-center"
          >
            <h3 className="font-semibold text-peach-dark mb-2">Lahendus.net</h3>
            <p className="text-gray-medium text-sm">Online nõustamine ja psühholoogiline tugi</p>
          </a>

          <a 
            href="https://www.palunabi.ee" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-gray-lightest rounded-lg hover:bg-salmon-light/10 transition-colors duration-300 flex flex-col items-center text-center"
          >
            <h3 className="font-semibold text-salmon-dark mb-2">Palunabi.ee</h3>
            <p className="text-gray-medium text-sm">Kriisiinfo ja abi otsimine</p>
          </a>
        </div>
      </div>

      {/* Info sektsioon */}
      <div className="mt-8 text-center text-gray-medium text-sm">
        <p>Kontaktandmed on uuendatud mai 2025 seisuga. Info võib muutuda.</p>
        <div className="mt-2 flex items-center justify-center gap-4">
          <a href="https://www.terviseinfo.ee" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark hover:underline flex items-center gap-1">
            <span>Terviseinfo</span>
            <ExternalLink size={14} />
          </a>
          <a href="https://www.lasteabi.ee" target="_blank" rel="noopener noreferrer" className="text-salmon hover:text-salmon-dark hover:underline flex items-center gap-1">
            <span>Lasteabi</span>
            <ExternalLink size={14} />
          </a>
          <a href="https://www.kriis.ee" target="_blank" rel="noopener noreferrer" className="text-peach hover:text-peach-dark hover:underline flex items-center gap-1">
            <span>Kriisiinfo</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;