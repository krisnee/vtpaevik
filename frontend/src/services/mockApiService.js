import { mockUser, mockDiaryEntries, mockStatistics } from '../data/mockData';

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
  getDiaryEntries: async () => {
    await delay(300);
    return [...mockDiaryEntries];
  },
  
  getDiaryEntry: async (id) => {
    await delay(200);
    const entry = mockDiaryEntries.find(entry => entry.id === parseInt(id));
    
    if (!entry) {
      throw new Error('Päeviku sissekannet ei leitud');
    }
    
    return entry;
  },
  
  createDiaryEntry: async (entryData) => {
    await delay(400);
    
    const newEntry = {
      id: mockDiaryEntries.length + 1,
      date: new Date(),
      ...entryData
    };
    
    mockDiaryEntries.push(newEntry);
    return newEntry;
  },
  
  updateDiaryEntry: async (id, entryData) => {
    await delay(400);
    
    const entryIndex = mockDiaryEntries.findIndex(entry => entry.id === parseInt(id));
    
    if (entryIndex === -1) {
      throw new Error('Päeviku sissekannet ei leitud');
    }
    
    const updatedEntry = {
      ...mockDiaryEntries[entryIndex],
      ...entryData
    };
    
    mockDiaryEntries[entryIndex] = updatedEntry;
    return updatedEntry;
  },
  
  deleteDiaryEntry: async (id) => {
    await delay(300);
    
    const entryIndex = mockDiaryEntries.findIndex(entry => entry.id === parseInt(id));
    
    if (entryIndex === -1) {
      throw new Error('Päeviku sissekannet ei leitud');
    }
    
    mockDiaryEntries.splice(entryIndex, 1);
    return { success: true };
  },
  
  // Statistika
  getStatistics: async (period = 'week') => {
    await delay(500);
    return mockStatistics;
  }
};

export default mockApiService;