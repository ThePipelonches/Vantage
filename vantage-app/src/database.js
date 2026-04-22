// Database utilities using localStorage

const DB_KEYS = {
  USERS: 'vantage_users',
  LEADS: 'vantage_leads',
  CLIENTS: 'vantage_clients',
  SESSIONS: 'vantage_sessions',
  ASSESSMENTS: 'vantage_assessments',
  CURRENT_USER: 'vantage_current_user'
};

// Initialize default data
export const initializeDB = () => {
  // Default users
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: '1',
        email: 'setter@vantage.com',
        password: '1234',
        name: 'María González',
        role: 'setter',
        avatar: 'MG'
      },
      {
        id: '2',
        email: 'psico@vantage.com',
        password: '1234',
        name: 'Dr. Alejandro Ruiz',
        role: 'psychologist',
        avatar: 'AR'
      },
      {
        id: '3',
        email: 'admin@vantage.com',
        password: '1234',
        name: 'Administrador',
        role: 'admin',
        avatar: 'AD'
      }
    ];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  // Sample leads
  if (!localStorage.getItem(DB_KEYS.LEADS)) {
    const now = new Date();
    const sampleLeads = [
      {
        id: '1',
        name: 'Carlos Mendoza',
        position: 'CEO',
        company: 'TechCorp Industries',
        phone: '+52 55 1234 5678',
        email: 'carlos.mendoza@techcorp.com',
        source: 'Website',
        entryTime: new Date(now.getTime() - 3 * 60000).toISOString(), // 3 min ago
        contactTime: null,
        contactResult: null,
        status: 'pending',
        notes: ''
      },
      {
        id: '2',
        name: 'Dra. Patricia Vega',
        position: 'Directora Médica',
        company: 'Hospital Santa María',
        phone: '+52 55 8765 4321',
        email: 'p.vega@hsantamaria.mx',
        source: 'Referido',
        entryTime: new Date(now.getTime() - 8 * 60000).toISOString(), // 8 min ago
        contactTime: null,
        contactResult: null,
        status: 'pending',
        notes: ''
      },
      {
        id: '3',
        name: 'Roberto Sánchez',
        position: 'CFO',
        company: 'Grupo Financiero del Norte',
        phone: '+52 81 2345 6789',
        email: 'rsanchez@gfnorte.com',
        source: 'LinkedIn',
        entryTime: new Date(now.getTime() - 2 * 60000).toISOString(),
        contactTime: new Date(now.getTime() - 1 * 60000).toISOString(),
        contactResult: 'contactado',
        status: 'contacted',
        notes: 'Interesado en sesión para manejo de estrés'
      }
    ];
    localStorage.setItem(DB_KEYS.LEADS, JSON.stringify(sampleLeads));
  }

  // Sample clients
  if (!localStorage.getItem(DB_KEYS.CLIENTS)) {
    const sampleClients = [
      {
        id: '1',
        name: 'Roberto Sánchez',
        position: 'CFO',
        company: 'Grupo Financiero del Norte',
        email: 'rsanchez@gfnorte.com',
        phone: '+52 81 2345 6789',
        assistantName: 'Laura Jiménez',
        assistantPhone: '+52 81 2345 6780',
        emergencyContact: 'Ana Sánchez (Esposa) +52 81 1111 2222',
        decisionLoad: 'high',
        treatmentPhase: 'initial',
        burnoutRisk: 'medium',
        stressFactors: ['Toma de decisiones financieras críticas', 'Gestión de equipo de 50+ personas', 'Viajes frecuentes'],
        avgSleepHours: 5.5,
        delegationLevel: 'bajo',
        executiveReason: 'Manejo de estrés por toma de decisiones bajo presión y prevención de burnout',
        createdAt: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '2',
        name: 'Lic. Fernando Torres',
        position: 'Presidente',
        company: 'Torres & Asociados',
        email: 'ftorres@torresasoc.com',
        phone: '+52 55 9999 8888',
        assistantName: 'Mónica Rivera',
        assistantPhone: '+52 55 9999 8880',
        emergencyContact: 'Carlos Torres (Hermano) +52 55 7777 6666',
        decisionLoad: 'maximum',
        treatmentPhase: 'intermediate',
        burnoutRisk: 'high',
        stressFactors: ['Responsabilidad legal de casos', 'Gestión de firma con 200 empleados', 'Imagen pública'],
        avgSleepHours: 4.5,
        delegationLevel: 'medio',
        executiveReason: 'Burnout avanzado, insomnio crónico, dificultad para delegar',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      },
      {
        id: '3',
        name: 'Dra. Elena Castillo',
        position: 'Cirujana Jefe',
        company: 'Centro Médico ABC',
        email: 'ecastillo@abcmedico.mx',
        phone: '+52 55 4444 3333',
        assistantName: 'Pedro Morales',
        assistantPhone: '+52 55 4444 3330',
        emergencyContact: 'Miguel Castillo (Padre) +52 55 2222 1111',
        decisionLoad: 'maximum',
        treatmentPhase: 'advanced',
        burnoutRisk: 'low',
        stressFactors: ['Decisiones de vida o muerte', 'Guardias de 24hrs', 'Responsabilidad médica legal'],
        avgSleepHours: 6,
        delegationLevel: 'alto',
        executiveReason: 'Gestión emocional post-cirugías complejas, equilibrio vida-trabajo',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      }
    ];
    localStorage.setItem(DB_KEYS.CLIENTS, JSON.stringify(sampleClients));
  }

  // Sample sessions
  if (!localStorage.getItem(DB_KEYS.SESSIONS)) {
    const sampleSessions = [
      {
        id: '1',
        clientId: '1',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Primera sesión. Cliente muestra signos de ansiedad moderada. Se identificaron patrones de perfeccionismo extremo.',
        tasks: 'Practicar técnica de respiración 4-7-8 antes de reuniones importantes',
        type: 'individual'
      },
      {
        id: '2',
        clientId: '2',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Sesión 4. Progreso notable en delegación de tareas. Persiste insomnio.',
        tasks: 'Implementar rutina de desconexión digital 2hrs antes de dormir',
        type: 'individual'
      },
      {
        id: '3',
        clientId: '3',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Sesión de seguimiento. Excelente manejo de situación crítica en quirófano.',
        tasks: 'Continuar con journaling post-guardias',
        type: 'followup'
      }
    ];
    localStorage.setItem(DB_KEYS.SESSIONS, JSON.stringify(sampleSessions));
  }

  // Sample assessments
  if (!localStorage.getItem(DB_KEYS.ASSESSMENTS)) {
    const sampleAssessments = [
      {
        id: '1',
        clientId: '1',
        name: 'MBI - Maslach Burnout Inventory',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        score: 'Moderado',
        findings: 'Agotamiento emocional: 28/54 (Moderado). Despersonalización: 8/30 (Bajo). Realización personal: 32/48 (Moderado)'
      },
      {
        id: '2',
        clientId: '2',
        name: 'Inventario de Estrés Ejecutivo',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        score: 'Alto',
        findings: 'Nivel de estrés percibido: 85/100. Factores críticos: carga de trabajo, responsabilidad legal, falta de sueño.'
      },
      {
        id: '3',
        clientId: '3',
        name: '360° Liderazgo',
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        score: 'Excelente',
        findings: 'Puntuación global: 4.6/5. Fortalezas: comunicación, toma de decisiones. Área de mejora: delegación.'
      }
    ];
    localStorage.setItem(DB_KEYS.ASSESSMENTS, JSON.stringify(sampleAssessments));
  }
};

// Generic CRUD operations
export const db = {
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  
  set: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  add: (key, item) => {
    const data = db.get(key);
    item.id = Date.now().toString();
    data.push(item);
    db.set(key, data);
    return item;
  },
  
  update: (key, id, updates) => {
    const data = db.get(key);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      db.set(key, data);
      return data[index];
    }
    return null;
  },
  
  delete: (key, id) => {
    const data = db.get(key);
    const filtered = data.filter(item => item.id !== id);
    db.set(key, filtered);
  },
  
  findById: (key, id) => {
    const data = db.get(key);
    return data.find(item => item.id === id);
  },
  
  findByField: (key, field, value) => {
    const data = db.get(key);
    return data.filter(item => item[field] === value);
  }
};

export const auth = {
  login: (email, password) => {
    const users = db.get(DB_KEYS.USERS);
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return null;
  },
  
  logout: () => {
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem(DB_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(DB_KEYS.CURRENT_USER);
  }
};

export const leads = {
  getAll: () => db.get(DB_KEYS.LEADS),
  add: (lead) => db.add(DB_KEYS.LEADS, lead),
  update: (id, updates) => db.update(DB_KEYS.LEADS, id, updates),
  delete: (id) => db.delete(DB_KEYS.LEADS, id),
  getById: (id) => db.findById(DB_KEYS.LEADS, id)
};

export const clients = {
  getAll: () => db.get(DB_KEYS.CLIENTS),
  add: (client) => db.add(DB_KEYS.CLIENTS, client),
  update: (id, updates) => db.update(DB_KEYS.CLIENTS, id, updates),
  delete: (id) => db.delete(DB_KEYS.CLIENTS, id),
  getById: (id) => db.findById(DB_KEYS.CLIENTS, id)
};

export const sessions = {
  getAll: () => db.get(DB_KEYS.SESSIONS),
  add: (session) => db.add(DB_KEYS.SESSIONS, session),
  update: (id, updates) => db.update(DB_KEYS.SESSIONS, id, updates),
  delete: (id) => db.delete(DB_KEYS.SESSIONS, id),
  getByClientId: (clientId) => db.findByField(DB_KEYS.SESSIONS, 'clientId', clientId)
};

export const assessments = {
  getAll: () => db.get(DB_KEYS.ASSESSMENTS),
  add: (assessment) => db.add(DB_KEYS.ASSESSMENTS, assessment),
  update: (id, updates) => db.update(DB_KEYS.ASSESSMENTS, id, updates),
  delete: (id) => db.delete(DB_KEYS.ASSESSMENTS, id),
  getByClientId: (clientId) => db.findByField(DB_KEYS.ASSESSMENTS, 'clientId', clientId)
};
