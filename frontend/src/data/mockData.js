// Ajutised kasutaja andmed
export const mockUser = {
  id: 1,
  name: 'Testkasutaja',
  email: 'test@example.com',
};

// Ajutised päeviku sissekanded
export const mockDiaryEntries = [
  {
    id: 1,
    date: new Date('2025-04-18'),
    mood: 8,
    sleep: 7,
    notes: 'Täna oli hea päev. Veetsin aega looduses ja tundsin end värskendatuna.',
  },
  {
    id: 2,
    date: new Date('2025-04-19'),
    mood: 6,
    sleep: 5,
    notes: 'Väsinud päev. Töö oli stressirohke, aga õhtul oli aega lõõgastuda.',
  },
  {
    id: 3,
    date: new Date('2025-04-20'),
    mood: 9,
    sleep: 8,
    notes: 'Suurepärane päev! Sain sõpradega kokku ja nautisime aega koos.',
  },
];

// Statistika näidisandmed
export const mockStatistics = {
  averageMood: 7.6,
  averageSleep: 6.7,
  moodTrend: [
    { date: '2025-04-14', value: 7 },
    { date: '2025-04-15', value: 6 },
    { date: '2025-04-16', value: 6 },
    { date: '2025-04-17', value: 7 },
    { date: '2025-04-18', value: 8 },
    { date: '2025-04-19', value: 6 },
    { date: '2025-04-20', value: 9 },
  ],
  sleepTrend: [
    { date: '2025-04-14', value: 6 },
    { date: '2025-04-15', value: 5 },
    { date: '2025-04-16', value: 7 },
    { date: '2025-04-17', value: 6 },
    { date: '2025-04-18', value: 7 },
    { date: '2025-04-19', value: 5 },
    { date: '2025-04-20', value: 8 },
  ],
};