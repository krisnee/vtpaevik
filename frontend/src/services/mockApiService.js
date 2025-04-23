import { mockUser, mockJournalEntries, mockStatistics } from '../data/mockData';

// Simuleerime API vastuse viivitust
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API teenus testimiseks
const mockApiService = {
  // Autentimine
  login: async (email, password) => {
    await delay(500); // Simuleerime võrgu viivitust
    
    if (email === 'test@example.com' && password === 'password') {
      const token = 'mock-jwt-token';
      localStorage.setItem('token', token);
      return { token, user: mockUser };
    }
    
    throw new Error('Vale e-posti aadress või parool');
  },
  
  register: async (name, email, password) => {
    await delay(500);
    
    if (email === 'test@example.com') {
      throw new Error('See e-posti aadress on juba kasutusel');
    }
    
    return { success: true };
  },
  
  logout: async () => {
    await delay(200);
    localStorage.removeItem('token');
    return { success: true };
  },
  
  // Päeviku sissekanded
  getJournalEntries: async () => {
    await delay(300);
    return [...mockJournalEntries];
  },
  
  getJournalEntry: async (id) => {
    await delay(200);
    const entry = mockJournalEntries.find(entry => entry.id === parseInt(id));
    
    if (!entry) {
      throw new Error('Päeviku sissekannet ei leitud');
    }
    
    return entry;
  },
  
  createJournalEntry: async (entryData) => {
    await delay(400);
    
    const newEntry = {
      id: mockJournalEntries.length + 1,
      date: new Date(),
      ...entryData
    };
    
    mockJournalEntries.push(newEntry);
    return newEntry;
  },
  
  updateJournalEntry: async (id, entryData) => {
    await delay(400);
    
    const entryIndex = mockJournalEntries.findIndex(entry => entry.id === parseInt(id));
    
    if (entryIndex === -1) {
      throw new Error('Päeviku sissekannet ei leitud');
    }
    
    const updatedEntry = {
      ...mockJournalEntries[entryIndex],
      ...entryData
    };
    
    mockJournalEntries[entryIndex] = updatedEntry;
    return updatedEntry;
  },
  
  deleteJournalEntry: async (id) => {
    await delay(300);
    
    const entryIndex = mockJournalEntries.findIndex(entry => entry.id === parseInt(id));
    
    if (entryIndex === -1) {
      throw new Error('Päeviku sissekannet ei leitud');
    }
    
    mockJournalEntries.splice(entryIndex, 1);
    return { success: true };
  },
  
  // Statistika
  getStatistics: async (period = 'week') => {
    await delay(500);
    return mockStatistics;
  }
};

export default mockApiService;