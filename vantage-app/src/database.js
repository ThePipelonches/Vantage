// Vantage Database Module - localStorage based
const DB_KEY = 'vantage_platform_v3';

const defaultData = {
  users: [
    { id: '1', email: 'andresclinicapsicologica@gmail.com', password: '1234', name: 'Andrés', role: 'admin', verified: true, avatar: 'AN' },
    { id: '2', email: 'chav.negocios@gmail.com', password: '1234', name: 'Chav', role: 'admin', verified: true, avatar: 'CH' },
    { id: '3', email: 'sebastian@bbr.mx', password: '1234', name: 'Sebastián', role: 'admin', verified: true, avatar: 'SE' },
    { id: '4', email: 'christian@metodovantage.com', password: '1234', name: 'Christian Rendon', role: 'psychologist', verified: true, avatar: 'CR' },
    { id: '5', email: 'valentina@metodovantage.com', password: '1234', name: 'Valentina Rios', role: 'psychologist', verified: true, avatar: 'VR' },
    { id: '6', email: 'isabel@metodovantage.com', password: '1234', name: 'Maria Isabel', role: 'closer', verified: true, avatar: 'MI' },
    { id: '7', email: 'setter@metodovantage.com', password: '1234', name: 'Setter', role: 'setter', verified: true, avatar: 'ST' }
  ],
  clients: [
    { id: 'c1', name: 'Carlos Mendoza', phone: '+525512345678', email: 'carlos@empresa.com', psychologistId: '4', psychologistName: 'Christian Rendon', motivoConsulta: 'Toma de decisiones bajo presión', sesionesPaquete: 12, sesionesRealizadas: 5, tipoPaquete: 'Executive Premium', pagoCartera: 'completo', createdAt: new Date('2024-01-15').toISOString() },
    { id: 'c2', name: 'Ana Patricia Gómez', phone: '+525587654321', email: 'ana@corporativo.mx', psychologistId: '5', psychologistName: 'Valentina Rios', motivoConsulta: 'Burnout por alta carga decisional', sesionesPaquete: 8, sesionesRealizadas: 3, tipoPaquete: 'Executive Basic', pagoCartera: 'comprometido', createdAt: new Date('2024-02-01').toISOString() },
    { id: 'c3', name: 'Roberto Sánchez', phone: '+525511223344', email: 'roberto@holdings.com', psychologistId: '4', psychologistName: 'Christian Rendon', motivoConsulta: 'Gestión de equipos de alto rendimiento', sesionesPaquete: 10, sesionesRealizadas: 10, tipoPaquete: 'Executive Premium', pagoCartera: 'completo', createdAt: new Date('2024-01-20').toISOString() }
  ],
  sessions: [
    { id: 's1', clientId: 'c1', date: new Date('2024-03-01').toISOString(), notes: 'Primera sesión exploratoria', tareas: 'Ejercicio de priorización', psicologoId: '4' },
    { id: 's2', clientId: 'c1', date: new Date('2024-03-08').toISOString(), notes: 'Seguimiento. Mejora reportada', tareas: 'Técnica de bloqueo de tiempo', psicologoId: '4' },
    { id: 's3', clientId: 'c2', date: new Date('2024-03-05').toISOString(), notes: 'Evaluación DASS-21 aplicada', tareas: 'Registro de sueño', psicologoId: '5' }
  ],
  assessments: [
    { id: 'a1', clientId: 'c1', type: 'DASS-21', period: 'pre', date: new Date('2024-03-01').toISOString(), stressScore: 28, anxietyScore: 12, depressionScore: 14, psicologoId: '4' },
    { id: 'a2', clientId: 'c2', type: 'MBI', period: 'pre', date: new Date('2024-03-05').toISOString(), emotionalExhaustion: 32, depersonalization: 14, personalAccomplishment: 28, psicologoId: '5' },
    { id: 'a3', clientId: 'c1', type: 'PCQ', period: 'pre', date: new Date('2024-03-01').toISOString(), selfEfficacy: 4.2, hope: 5.1, resilience: 3.8, optimism: 4.5, totalScore: 4.4, psicologoId: '4' }
  ],
  leads: [
    { id: 'l1', name: 'Fernando López', phone: '+525599887766', email: 'fernando@techcorp.com', origin: 'calendly', entryTime: new Date(Date.now() - 1000 * 60 * 3).toISOString(), contactTime: null, contactResult: null, status: 'new', closerId: '6' },
    { id: 'l2', name: 'Patricia Morales', phone: '+525566778899', email: 'patricia@financegroup.mx', origin: 'calendly', entryTime: new Date(Date.now() - 1000 * 60 * 8).toISOString(), contactTime: new Date(Date.now() - 1000 * 60 * 4).toISOString(), contactResult: 'Contactado', status: 'contacted', closerId: '6' }
  ],
  appointments: [
    { id: 'ap1', clientId: 'c1', clientName: 'Carlos Mendoza', date: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), status: 'Confirmada', calendlyLink: 'https://calendly.com/vantage/carlos', googleCalendarLink: 'https://calendar.google.com/event/123', callLink: 'https://meet.google.com/abc-defg-hij', psicologoId: '4' },
    { id: 'ap2', clientId: 'c2', clientName: 'Ana Patricia Gómez', date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), status: 'Confirmada', calendlyLink: 'https://calendly.com/vantage/ana', googleCalendarLink: 'https://calendar.google.com/event/456', callLink: 'https://meet.google.com/xyz-mnop-qrs', psicologoId: '5' }
  ],
  salesCalls: [
    { id: 'sc1', leadId: 'l2', leadName: 'Patricia Morales', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), closerId: '6', fathomLink: 'https://fathom.video/share/abc123', outcome: 'Agendado', packageSold: 'Executive Premium', value: 15000, collected: true }
  ],
  psychologists: [
    { id: '4', name: 'Christian Rendon', email: 'christian@metodovantage.com' },
    { id: '5', name: 'Valentina Rios', email: 'valentina@metodovantage.com' }
  ],
  closers: [
    { id: '6', name: 'Maria Isabel', email: 'isabel@metodovantage.com' }
  ],
  verificationCodes: []
};

let db = null;

export const initializeDB = () => {
  if (!db) {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      db = JSON.parse(stored);
    } else {
      db = JSON.parse(JSON.stringify(defaultData));
      saveDB();
    }
  }
  return db;
};

const saveDB = () => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const auth = {
  login: (email, password) => {
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('vantage_user', JSON.stringify(user));
      return user;
    }
    return null;
  },
  logout: () => localStorage.removeItem('vantage_user'),
  getCurrentUser: () => {
    const stored = localStorage.getItem('vantage_user');
    return stored ? JSON.parse(stored) : null;
  },
  needsVerification: (email) => {
    const user = db.users.find(u => u.email === email);
    if (!user) return false;
    if (user.role === 'setter') return false;
    return !user.verified;
  },
  sendVerificationCode: (email) => {
    const user = db.users.find(u => u.email === email);
    if (!user) return { success: false, message: 'Usuario no encontrado' };
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    db.verificationCodes.push({ email, code, expiresAt: Date.now() + 10 * 60 * 1000 });
    saveDB();
    console.log(`[EMAIL SIMULADO] Código para ${email}: ${code}`);
    return { success: true, message: 'Código enviado a tu correo', simulatedCode: code };
  },
  verifyCode: (email, code) => {
    const verification = db.verificationCodes.find(v => v.email === email && v.code === code && v.expiresAt > Date.now());
    if (!verification) return { success: false, message: 'Código inválido o expirado' };
    const user = db.users.find(u => u.email === email);
    if (user) {
      user.verified = true;
      saveDB();
      localStorage.setItem('vantage_user', JSON.stringify(user));
      return { success: true, message: 'Verificación exitosa' };
    }
    return { success: false, message: 'Usuario no encontrado' };
  },
  addUser: (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      verified: false,
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    };
    db.users.push(newUser);
    if (userData.role === 'psychologist') db.psychologists.push({ id: newUser.id, name: userData.name, email: userData.email });
    else if (userData.role === 'closer') db.closers.push({ id: newUser.id, name: userData.name, email: userData.email });
    saveDB();
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    db.verificationCodes.push({ email: userData.email, code, expiresAt: Date.now() + 10 * 60 * 1000 });
    saveDB();
    return { success: true, code, user: newUser };
  }
};

export const leads = {
  getAll: () => db.leads,
  add: (data) => {
    const newLead = { id: Date.now().toString(), ...data, entryTime: new Date().toISOString(), status: 'new' };
    db.leads.push(newLead);
    saveDB();
    return newLead;
  },
  update: (id, updates) => {
    const idx = db.leads.findIndex(l => l.id === id);
    if (idx !== -1) { db.leads[idx] = { ...db.leads[idx], ...updates }; saveDB(); return db.leads[idx]; }
    return null;
  }
};

export const clients = {
  getAll: () => db.clients,
  getById: (id) => db.clients.find(c => c.id === id),
  add: (data) => {
    const newClient = { id: Date.now().toString(), ...data, createdAt: new Date().toISOString() };
    db.clients.push(newClient);
    saveDB();
    return newClient;
  },
  update: (id, updates) => {
    const idx = db.clients.findIndex(c => c.id === id);
    if (idx !== -1) { db.clients[idx] = { ...db.clients[idx], ...updates }; saveDB(); return db.clients[idx]; }
    return null;
  }
};

export const sessions = {
  getAll: () => db.sessions,
  getByClientId: (clientId) => db.sessions.filter(s => s.clientId === clientId),
  add: (data) => {
    const newSession = { id: Date.now().toString(), ...data, date: new Date().toISOString() };
    db.sessions.push(newSession);
    saveDB();
    return newSession;
  },
  update: (id, updates) => {
    const idx = db.sessions.findIndex(s => s.id === id);
    if (idx !== -1) { db.sessions[idx] = { ...db.sessions[idx], ...updates }; saveDB(); return db.sessions[idx]; }
    return null;
  }
};

export const assessments = {
  getAll: () => db.assessments,
  getByClientId: (clientId) => db.assessments.filter(a => a.clientId === clientId),
  add: (data) => {
    const newAssessment = { id: Date.now().toString(), ...data, date: new Date().toISOString() };
    db.assessments.push(newAssessment);
    saveDB();
    return newAssessment;
  }
};

export const appointments = {
  getAll: () => db.appointments,
  add: (data) => {
    const newApt = { id: Date.now().toString(), ...data };
    db.appointments.push(newApt);
    saveDB();
    return newApt;
  },
  update: (id, updates) => {
    const idx = db.appointments.findIndex(a => a.id === id);
    if (idx !== -1) { db.appointments[idx] = { ...db.appointments[idx], ...updates }; saveDB(); return db.appointments[idx]; }
    return null;
  }
};

export const salesCalls = {
  getAll: () => db.salesCalls,
  add: (data) => {
    const newCall = { id: Date.now().toString(), ...data, date: new Date().toISOString() };
    db.salesCalls.push(newCall);
    saveDB();
    return newCall;
  }
};

export const psychologists = {
  getAll: () => db.psychologists,
  add: (data) => {
    const newPsy = { id: Date.now().toString(), ...data };
    db.psychologists.push(newPsy);
    saveDB();
    return newPsy;
  }
};

export const closers = {
  getAll: () => db.closers,
  add: (data) => {
    const newCloser = { id: Date.now().toString(), ...data };
    db.closers.push(newCloser);
    saveDB();
    return newCloser;
  }
};
