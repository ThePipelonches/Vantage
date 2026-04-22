import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { initializeDB, auth, leads, clients, sessions, assessments } from './database';

// Initialize database on load
initializeDB();

// Styles
const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#000000'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#0A0A0A',
    borderRight: '1px solid #1A1A1A',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '40px',
    paddingLeft: '12px',
    color: '#FFFFFF'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '4px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#888888',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },
  navItemActive: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF'
  },
  navItemIcon: {
    marginRight: '12px',
    width: '20px',
    textAlign: 'center'
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    padding: '32px 40px',
    backgroundColor: '#000000'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #1A1A1A'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '-0.5px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A',
    borderRadius: '12px',
    padding: '24px'
  },
  statValue: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '13px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '16px',
    borderBottom: '1px solid #1A1A1A',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#888888',
    fontWeight: '500'
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #1A1A1A',
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  buttonSecondary: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    border: '1px solid #2A2A2A'
  },
  buttonSmall: {
    padding: '6px 12px',
    fontSize: '12px'
  },
  input: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A',
    borderRadius: '6px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#FFFFFF',
    width: '100%',
    outline: 'none'
  },
  select: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A',
    borderRadius: '6px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#FFFFFF',
    width: '100%',
    outline: 'none',
    cursor: 'pointer'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '13px',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  textarea: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '14px',
    color: '#FFFFFF',
    width: '100%',
    minHeight: '100px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'Inter, sans-serif'
  }
};

// Login Page
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = auth.login(email, password);
    if (user) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px', textAlign: 'center' }}>VANTAGE</h1>
        <p style={{ color: '#888888', textAlign: 'center', marginBottom: '40px', fontSize: '14px' }}>Executive Wellness Platform</p>
        
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="nombre@vantage.com"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••"
              required
            />
          </div>
          
          {error && (
            <div style={{ color: '#FF6B6B', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button type="submit" style={{ ...styles.button, width: '100%', padding: '14px' }}>
            Acceder
          </button>
        </form>
        
        <div style={{ marginTop: '32px', padding: '20px', backgroundColor: '#0A0A0A', borderRadius: '8px', border: '1px solid #1A1A1A' }}>
          <p style={{ fontSize: '12px', color: '#888888', marginBottom: '12px' }}>Usuarios de prueba:</p>
          <div style={{ fontSize: '11px', color: '#666666', lineHeight: '1.8' }}>
            <div>Setter: setter@vantage.com / 1234</div>
            <div>Psicólogo: psico@vantage.com / 1234</div>
            <div>Admin: admin@vantage.com / 1234</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.getCurrentUser();

  const menuItems = {
    setter: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/leads', label: 'Solicitudes', icon: '📥' },
      { path: '/appointments', label: 'Consultas', icon: '📅' }
    ],
    psychologist: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/clients', label: 'Clientes', icon: '👥' },
      { path: '/sessions', label: 'Expedientes', icon: '📋' }
    ],
    admin: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/leads', label: 'Solicitudes', icon: '📥' },
      { path: '/appointments', label: 'Consultas', icon: '📅' },
      { path: '/clients', label: 'Clientes', icon: '👥' },
      { path: '/sessions', label: 'Expedientes', icon: '📋' }
    ]
  };

  const items = menuItems[user?.role] || menuItems.admin;

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>VANTAGE</div>
      <nav>
        {items.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.navItem,
              ...(location.pathname === item.path ? styles.navItemActive : {})
            }}
          >
            <span style={styles.navItemIcon}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #1A1A1A' }}>
        <div
          onClick={() => {
            auth.logout();
            navigate('/login');
          }}
          style={{ ...styles.navItem }}
        >
          <span style={styles.navItemIcon}>🚪</span>
          Cerrar Sesión
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  const user = auth.getCurrentUser();

  return (
    <header style={styles.header}>
      <h1 style={styles.pageTitle}>{title}</h1>
      <div style={styles.userInfo}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{user?.name}</div>
          <div style={{ fontSize: '12px', color: '#888888', textTransform: 'capitalize' }}>{user?.role === 'psychologist' ? 'Especialista' : user?.role}</div>
        </div>
        <div style={styles.avatar}>{user?.avatar}</div>
      </div>
    </header>
  );
};

// Setter Dashboard
const SetterDashboard = () => {
  const [stats, setStats] = useState({
    newLeadsToday: 0,
    complianceRate: 0,
    contactRate: 0,
    scheduledToday: 0
  });

  useEffect(() => {
    const allLeads = leads.getAll();
    const today = new Date().toDateString();
    
    const leadsToday = allLeads.filter(l => new Date(l.entryTime).toDateString() === today);
    const contactedOnTime = allLeads.filter(l => {
      if (!l.contactTime) return false;
      const entry = new Date(l.entryTime);
      const contact = new Date(l.contactTime);
      const diffMin = (contact - entry) / 60000;
      return diffMin <= 5;
    });
    const contacted = allLeads.filter(l => l.contactResult !== null);
    
    setStats({
      newLeadsToday: leadsToday.length,
      complianceRate: allLeads.length > 0 ? Math.round((contactedOnTime.length / allLeads.length) * 100) : 0,
      contactRate: allLeads.length > 0 ? Math.round((contacted.length / allLeads.length) * 100) : 0,
      scheduledToday: allLeads.filter(l => l.status === 'scheduled').length
    });
  }, []);

  return (
    <>
      <Header title="Dashboard Comercial" />
      <div style={styles.cardGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.newLeadsToday}</div>
          <div style={styles.statLabel}>Nuevas Solicitudes Hoy</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.complianceRate}%</div>
          <div style={styles.statLabel}>Regla 5 Min (Cumplimiento)</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.contactRate}%</div>
          <div style={styles.statLabel}>Tasa de Contacto Ejecutivo</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.scheduledToday}</div>
          <div style={styles.statLabel}>Consultas Agendadas</div>
        </div>
      </div>
      
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Resumen Reciente</h3>
        <p style={{ color: '#888888', fontSize: '14px' }}>
          Bienvenido al dashboard comercial de Vantage. Utilice el menú lateral para gestionar solicitudes entrantes y consultas agendadas.
          Recuerde: los ejecutivos de alto nivel esperan respuesta en menos de 5 minutos.
        </p>
      </div>
    </>
  );
};

// Leads Module (Setter)
const LeadsModule = () => {
  const [leadsList, setLeadsList] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contactResult, setContactResult] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setLeadsList(leads.getAll());
  }, []);

  const handleInitiateContact = (lead) => {
    const now = new Date().toISOString();
    leads.update(lead.id, { contactTime: now });
    setLeadsList(leads.getAll());
  };

  const handleSaveContact = () => {
    if (selectedLead) {
      const updates = {
        contactResult,
        notes,
        status: contactResult === 'agendado' ? 'scheduled' : 'contacted'
      };
      
      // If scheduled, create a client
      if (contactResult === 'agendado') {
        clients.add({
          name: selectedLead.name,
          position: selectedLead.position,
          company: selectedLead.company,
          email: selectedLead.email,
          phone: selectedLead.phone,
          assistantName: '',
          assistantPhone: '',
          emergencyContact: '',
          decisionLoad: 'high',
          treatmentPhase: 'initial',
          burnoutRisk: 'low',
          stressFactors: [],
          avgSleepHours: 0,
          delegationLevel: 'medio',
          executiveReason: notes || 'Derivado de solicitud inicial',
          createdAt: new Date().toISOString(),
          status: 'active'
        });
      }
      
      leads.update(selectedLead.id, updates);
      setLeadsList(leads.getAll());
      setShowModal(false);
      setSelectedLead(null);
      setContactResult('');
      setNotes('');
    }
  };

  const getTimeSinceEntry = (entryTime) => {
    const now = new Date();
    const entry = new Date(entryTime);
    const diffMin = Math.floor((now - entry) / 60000);
    return diffMin;
  };

  const isOverdue = (lead) => {
    if (lead.contactTime) return false;
    return getTimeSinceEntry(lead.entryTime) > 5;
  };

  return (
    <>
      <Header title="Solicitudes Entrantes" />
      
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Cargo/Empresa</th>
              <th style={styles.th}>Teléfono</th>
              <th style={styles.th}>Origen</th>
              <th style={styles.th}>Hora Entrada</th>
              <th style={styles.th}>Tiempo</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leadsList.map((lead) => {
              const overdue = isOverdue(lead);
              const minutes = getTimeSinceEntry(lead.entryTime);
              
              return (
                <tr key={lead.id} style={{ 
                  borderLeft: overdue ? '3px solid #FF6B6B' : lead.contactTime ? '3px solid #4ECDC4' : '3px solid #1A1A1A',
                  backgroundColor: overdue ? 'rgba(255, 107, 107, 0.05)' : 'transparent'
                }}>
                  <td style={styles.td}>
                    <div style={{ fontWeight: '500' }}>{lead.name}</div>
                    <div style={{ fontSize: '12px', color: '#888888' }}>{lead.email}</div>
                  </td>
                  <td style={styles.td}>
                    <div>{lead.position}</div>
                    <div style={{ fontSize: '12px', color: '#888888' }}>{lead.company}</div>
                  </td>
                  <td style={styles.td}>{lead.phone}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, backgroundColor: '#1A1A1A', color: '#888888' }}>
                      {lead.source}
                    </span>
                  </td>
                  <td style={styles.td}>{new Date(lead.entryTime).toLocaleTimeString()}</td>
                  <td style={styles.td}>
                    <span style={{ color: overdue ? '#FF6B6B' : lead.contactTime ? '#4ECDC4' : '#888888' }}>
                      {lead.contactTime ? 'Contactado' : `${minutes} min`}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ 
                      ...styles.badge, 
                      backgroundColor: lead.status === 'scheduled' ? '#4ECDC4' : lead.status === 'contacted' ? '#1A1A1A' : '#FF6B6B',
                      color: lead.status === 'scheduled' ? '#000000' : '#FFFFFF'
                    }}>
                      {lead.status === 'pending' ? 'Pendiente' : lead.status === 'contacted' ? 'Contactado' : 'Agendado'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {!lead.contactTime ? (
                      <button 
                        onClick={() => handleInitiateContact(lead)}
                        style={{ ...styles.button, ...styles.buttonSmall }}
                      >
                        Iniciar Contacto
                      </button>
                    ) : !lead.contactResult ? (
                      <button 
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowModal(true);
                        }}
                        style={{ ...styles.button, ...styles.buttonSmall }}
                      >
                        Registrar Resultado
                      </button>
                    ) : (
                      <span style={{ color: '#888888', fontSize: '12px' }}>Completado</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && selectedLead && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>Registrar Contacto - {selectedLead.name}</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Resultado del Contacto</label>
              <select 
                value={contactResult} 
                onChange={(e) => setContactResult(e.target.value)}
                style={styles.select}
              >
                <option value="">Seleccionar...</option>
                <option value="contactado">Contactado Exitosamente</option>
                <option value="agendado">Contactado y Agendado</option>
                <option value="voicemail">Buzón Corporativo</option>
                <option value="no-answer">No Contesta</option>
                <option value="not-qualified">No Califica</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Notas de la Conversación</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={styles.textarea}
                placeholder="Detalles importantes de la conversación, intereses del ejecutivo, disponibilidad..."
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{ ...styles.button, ...styles.buttonSecondary }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveContact}
                style={styles.button}
                disabled={!contactResult}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Appointments Module (Setter)
const AppointmentsModule = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterTomorrow, setFilterTomorrow] = useState(false);

  useEffect(() => {
    const allClients = clients.getAll();
    const allSessions = sessions.getAll();
    
    const appts = allSessions.map(s => {
      const client = allClients.find(c => c.id === s.clientId);
      return { ...s, client };
    });
    
    setAppointments(appts);
  }, []);

  const toggleReminder = (id) => {
    sessions.update(id, { reminderSent: !sessions.getById(id)?.reminderSent });
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, reminderSent: !a.reminderSent } : a
    ));
  };

  const filteredAppointments = filterTomorrow 
    ? appointments.filter(a => {
        const apptDate = new Date(a.date).toDateString();
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
        return apptDate === tomorrow;
      })
    : appointments;

  return (
    <>
      <Header title="Consultas Agendadas" />
      
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={filterTomorrow}
            onChange={(e) => setFilterTomorrow(e.target.checked)}
            style={{ accentColor: '#FFFFFF' }}
          />
          <span style={{ fontSize: '14px' }}>Mostrar solo citas de mañana</span>
        </label>
      </div>
      
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Empresa</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Recordatorio VIP</th>
              <th style={styles.th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt) => (
              <tr key={appt.id}>
                <td style={styles.td}>
                  <div style={{ fontWeight: '500' }}>{appt.client?.name || 'Sin asignar'}</div>
                  <div style={{ fontSize: '12px', color: '#888888' }}>{appt.client?.position || ''}</div>
                </td>
                <td style={styles.td}>{appt.client?.company || '-'}</td>
                <td style={styles.td}>{new Date(appt.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, backgroundColor: '#1A1A1A', color: '#888888', textTransform: 'capitalize' }}>
                    {appt.type || 'individual'}
                  </span>
                </td>
                <td style={styles.td}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!appt.reminderSent}
                      onChange={() => toggleReminder(appt.id)}
                      style={{ accentColor: '#FFFFFF' }}
                    />
                    <span style={{ fontSize: '13px' }}>Enviado</span>
                  </label>
                </td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, backgroundColor: '#4ECDC4', color: '#000000' }}>
                    Confirmada
                  </span>
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="6" style={{ ...styles.td, textAlign: 'center', color: '#888888', padding: '40px' }}>
                  No hay consultas agendadas {filterTomorrow ? 'para mañana' : ''}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Psychologist Dashboard
const PsychologistDashboard = () => {
  const [stats, setStats] = useState({
    activeClients: 0,
    sessionsToday: 0,
    avgStressLevel: 0,
    assessmentsThisMonth: 0
  });

  useEffect(() => {
    const allClients = clients.getAll();
    const allSessions = sessions.getAll();
    const allAssessments = assessments.getAll();
    
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    
    const sessionsToday = allSessions.filter(s => new Date(s.date).toDateString() === today);
    const assessmentsMonth = allAssessments.filter(a => new Date(a.date).getMonth() === thisMonth);
    
    // Calculate average stress (simplified)
    const highStressClients = allClients.filter(c => c.burnoutRisk === 'high').length;
    const avgStress = allClients.length > 0 ? Math.round((highStressClients / allClients.length) * 100) : 0;

    setStats({
      activeClients: allClients.filter(c => c.status === 'active').length,
      sessionsToday: sessionsToday.length,
      avgStressLevel: avgStress,
      assessmentsThisMonth: assessmentsMonth.length
    });
  }, []);

  return (
    <>
      <Header title="Dashboard Clínico" />
      <div style={styles.cardGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.activeClients}</div>
          <div style={styles.statLabel}>Clientes Activos</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.sessionsToday}</div>
          <div style={styles.statLabel}>Sesiones de Hoy</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.avgStressLevel}%</div>
          <div style={styles.statLabel}>Nivel de Estrés Promedio</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.assessmentsThisMonth}</div>
          <div style={styles.statLabel}>Pruebas Aplicadas este Mes</div>
        </div>
      </div>
      
      <div style={styles.card}>
        <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Panel Clínico</h3>
        <p style={{ color: '#888888', fontSize: '14px' }}>
          Bienvenido al sistema de gestión clínica de Vantage. Utilice el menú lateral para acceder a los expedientes ejecutivos 
          y realizar seguimiento de sus clientes de alto rendimiento.
        </p>
      </div>
    </>
  );
};

// Clients Module (Psychologist)
const ClientsModule = () => {
  const [clientsList, setClientsList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setClientsList(clients.getAll());
  }, []);

  const getDecisionLoadLabel = (load) => {
    return load === 'maximum' ? 'Máxima' : load === 'high' ? 'Alta' : 'Media';
  };

  const getTreatmentPhaseLabel = (phase) => {
    const labels = { initial: 'Inicial', intermediate: 'Intermedia', advanced: 'Avanzada' };
    return labels[phase] || phase;
  };

  const getBurnoutRiskColor = (risk) => {
    return risk === 'high' ? '#FF6B6B' : risk === 'medium' ? '#FFD93D' : '#4ECDC4';
  };

  return (
    <>
      <Header title="Expedientes Ejecutivos" />
      
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Cargo/Empresa</th>
              <th style={styles.th}>Carga Decisional</th>
              <th style={styles.th}>Fase Tratamiento</th>
              <th style={styles.th}>Riesgo Burnout</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientsList.map((client) => (
              <tr key={client.id}>
                <td style={styles.td}>
                  <div style={{ fontWeight: '500' }}>{client.name}</div>
                  <div style={{ fontSize: '12px', color: '#888888' }}>{client.email}</div>
                </td>
                <td style={styles.td}>
                  <div>{client.position}</div>
                  <div style={{ fontSize: '12px', color: '#888888' }}>{client.company}</div>
                </td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, backgroundColor: client.decisionLoad === 'maximum' ? '#FF6B6B' : '#1A1A1A', color: '#FFFFFF' }}>
                    {getDecisionLoadLabel(client.decisionLoad)}
                  </span>
                </td>
                <td style={styles.td}>{getTreatmentPhaseLabel(client.treatmentPhase)}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, backgroundColor: getBurnoutRiskColor(client.burnoutRisk), color: client.burnoutRisk === 'high' ? '#000000' : '#000000' }}>
                    {client.burnoutRisk === 'high' ? 'Alto' : client.burnoutRisk === 'medium' ? 'Medio' : 'Bajo'}
                  </span>
                </td>
                <td style={styles.td}>
                  <button 
                    onClick={() => {
                      setSelectedClient(client);
                      setShowModal(true);
                    }}
                    style={{ ...styles.button, ...styles.buttonSmall }}
                  >
                    Ver Expediente
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedClient && (
        <ClientDetailModal 
          client={selectedClient} 
          onClose={() => {
            setShowModal(false);
            setSelectedClient(null);
          }}
        />
      )}
    </>
  );
};

// Client Detail Modal
const ClientDetailModal = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [clientData, setClientData] = useState(client);
  const [clientSessions, setClientSessions] = useState([]);
  const [clientAssessments, setClientAssessments] = useState([]);
  const [newSession, setNewSession] = useState({ notes: '', tasks: '' });
  const [newAssessment, setNewAssessment] = useState({ name: '', score: '', findings: '' });
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);

  useEffect(() => {
    setClientSessions(sessions.getByClientId(client.id));
    setClientAssessments(assessments.getByClientId(client.id));
  }, [client.id]);

  const handleAddSession = () => {
    sessions.add({
      clientId: client.id,
      date: new Date().toISOString(),
      notes: newSession.notes,
      tasks: newSession.tasks,
      type: 'individual'
    });
    setClientSessions(sessions.getByClientId(client.id));
    setNewSession({ notes: '', tasks: '' });
    setShowSessionForm(false);
  };

  const handleAddAssessment = () => {
    assessments.add({
      clientId: client.id,
      name: newAssessment.name,
      date: new Date().toISOString(),
      score: newAssessment.score,
      findings: newAssessment.findings
    });
    setClientAssessments(assessments.getByClientId(client.id));
    setNewAssessment({ name: '', score: '', findings: '' });
    setShowAssessmentForm(false);
  };

  const tabs = [
    { id: 'profile', label: 'Perfil Corporativo' },
    { id: 'stress', label: 'Mapa de Estrés' },
    { id: 'sessions', label: 'Historial de Sesiones' },
    { id: 'assessments', label: 'Evaluaciones' }
  ];

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={{ ...styles.modalContent, maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px' }}>{clientData.name}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888888', fontSize: '24px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #1A1A1A', paddingBottom: '16px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.button,
                ...styles.buttonSmall,
                ...(activeTab === tab.id ? {} : styles.buttonSecondary),
                backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                color: activeTab === tab.id ? '#000000' : '#FFFFFF'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={styles.label}>Cargo</label>
                <div style={{ fontSize: '14px', padding: '10px', backgroundColor: '#0A0A0A', borderRadius: '6px' }}>{clientData.position}</div>
              </div>
              <div>
                <label style={styles.label}>Empresa</label>
                <div style={{ fontSize: '14px', padding: '10px', backgroundColor: '#0A0A0A', borderRadius: '6px' }}>{clientData.company}</div>
              </div>
              <div>
                <label style={styles.label}>Email</label>
                <div style={{ fontSize: '14px', padding: '10px', backgroundColor: '#0A0A0A', borderRadius: '6px' }}>{clientData.email}</div>
              </div>
              <div>
                <label style={styles.label}>Teléfono</label>
                <div style={{ fontSize: '14px', padding: '10px', backgroundColor: '#0A0A0A', borderRadius: '6px' }}>{clientData.phone}</div>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Asistente/Contacto de Emergencia</label>
              <div style={{ fontSize: '14px', padding: '10px', backgroundColor: '#0A0A0A', borderRadius: '6px' }}>
                <div><strong>Asistente:</strong> {clientData.assistantName || 'No registrado'} - {clientData.assistantPhone || ''}</div>
                <div style={{ marginTop: '8px' }}><strong>Emergencia:</strong> {clientData.emergencyContact || 'No registrado'}</div>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Motivo de Consulta Ejecutiva</label>
              <div style={{ fontSize: '14px', padding: '10px', backgroundColor: '#0A0A0A', borderRadius: '6px', minHeight: '60px' }}>
                {clientData.executiveReason}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stress' && (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Factores de Estrés Actuales</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {clientData.stressFactors?.map((factor, idx) => (
                  <span key={idx} style={{ ...styles.badge, backgroundColor: '#1A1A1A', color: '#FFFFFF', padding: '8px 12px' }}>
                    {factor}
                  </span>
                ))}
                {(!clientData.stressFactors || clientData.stressFactors.length === 0) && (
                  <span style={{ color: '#888888', fontSize: '14px' }}>No registrado</span>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={styles.label}>Horas de Sueño Promedio</label>
                <div style={{ fontSize: '24px', fontWeight: '600', padding: '16px', backgroundColor: '#0A0A0A', borderRadius: '6px' }}>
                  {clientData.avgSleepHours || 'N/A'} hrs
                </div>
              </div>
              <div>
                <label style={styles.label}>Nivel de Delegación</label>
                <div style={{ fontSize: '24px', fontWeight: '600', padding: '16px', backgroundColor: '#0A0A0A', borderRadius: '6px', textTransform: 'capitalize' }}>
                  {clientData.delegationLevel || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Historial de Sesiones</h3>
              <button onClick={() => setShowSessionForm(!showSessionForm)} style={{ ...styles.button, ...styles.buttonSmall }}>
                {showSessionForm ? 'Cancelar' : '+ Nueva Sesión'}
              </button>
            </div>

            {showSessionForm && (
              <div style={{ ...styles.card, marginBottom: '20px' }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Notas de Evolución</label>
                  <textarea
                    value={newSession.notes}
                    onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                    style={styles.textarea}
                    placeholder="Observaciones clínicas, progreso, insights..."
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tareas/Acuerdos</label>
                  <textarea
                    value={newSession.tasks}
                    onChange={(e) => setNewSession({ ...newSession, tasks: e.target.value })}
                    style={{ ...styles.textarea, minHeight: '60px' }}
                    placeholder="Actividades entre sesiones, compromisos..."
                  />
                </div>
                <button onClick={handleAddSession} style={styles.button}>Guardar Sesión</button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {clientSessions.map((session) => (
                <div key={session.id} style={{ padding: '16px', backgroundColor: '#0A0A0A', borderRadius: '8px', border: '1px solid #1A1A1A' }}>
                  <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px' }}>
                    {new Date(session.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div style={{ marginBottom: '12px' }}>{session.notes}</div>
                  {session.tasks && (
                    <div style={{ fontSize: '13px', color: '#888888', paddingTop: '12px', borderTop: '1px solid #1A1A1A' }}>
                      <strong>Tareas:</strong> {session.tasks}
                    </div>
                  )}
                </div>
              ))}
              {clientSessions.length === 0 && (
                <div style={{ color: '#888888', textAlign: 'center', padding: '40px' }}>No hay sesiones registradas</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Evaluaciones y Pruebas</h3>
              <button onClick={() => setShowAssessmentForm(!showAssessmentForm)} style={{ ...styles.button, ...styles.buttonSmall }}>
                {showAssessmentForm ? 'Cancelar' : '+ Nueva Prueba'}
              </button>
            </div>

            {showAssessmentForm && (
              <div style={{ ...styles.card, marginBottom: '20px' }}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre de la Prueba</label>
                  <input
                    type="text"
                    value={newAssessment.name}
                    onChange={(e) => setNewAssessment({ ...newAssessment, name: e.target.value })}
                    style={styles.input}
                    placeholder="ej. MBI para Burnout, Inventario de Estrés Ejecutivo..."
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Puntuación/Resultado</label>
                  <input
                    type="text"
                    value={newAssessment.score}
                    onChange={(e) => setNewAssessment({ ...newAssessment, score: e.target.value })}
                    style={styles.input}
                    placeholder="ej. Alto, 85/100, Moderado..."
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Resumen de Hallazgos</label>
                  <textarea
                    value={newAssessment.findings}
                    onChange={(e) => setNewAssessment({ ...newAssessment, findings: e.target.value })}
                    style={styles.textarea}
                    placeholder="Interpretación clínica de los resultados..."
                  />
                </div>
                <button onClick={handleAddAssessment} style={styles.button}>Guardar Evaluación</button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {clientAssessments.map((assessment) => (
                <div key={assessment.id} style={{ padding: '16px', backgroundColor: '#0A0A0A', borderRadius: '8px', border: '1px solid #1A1A1A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px' }}>{assessment.name}</strong>
                    <span style={{ ...styles.badge, backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>{assessment.score}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px' }}>
                    {new Date(assessment.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div style={{ fontSize: '14px' }}>{assessment.findings}</div>
                </div>
              ))}
              {clientAssessments.length === 0 && (
                <div style={{ color: '#888888', textAlign: 'center', padding: '40px' }}>No hay evaluaciones registradas</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sessions Module (Psychologist - shortcut to clients)
const SessionsModule = () => {
  return <ClientsModule />;
};

// Main Layout
const MainLayout = ({ children }) => {
  return (
    <div style={styles.app}>
      <Sidebar />
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <MainLayout>{children}</MainLayout>;
};

// Main App Component
const App = () => {
  const user = auth.getCurrentUser();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {user?.role === 'setter' ? <SetterDashboard /> : <PsychologistDashboard />}
          </ProtectedRoute>
        } />
        
        <Route path="/leads" element={
          <ProtectedRoute>
            {user?.role === 'psychologist' ? <Navigate to="/dashboard" replace /> : <LeadsModule />}
          </ProtectedRoute>
        } />
        
        <Route path="/appointments" element={
          <ProtectedRoute>
            {user?.role === 'psychologist' ? <Navigate to="/dashboard" replace /> : <AppointmentsModule />}
          </ProtectedRoute>
        } />
        
        <Route path="/clients" element={
          <ProtectedRoute>
            {user?.role === 'setter' ? <Navigate to="/dashboard" replace /> : <ClientsModule />}
          </ProtectedRoute>
        } />
        
        <Route path="/sessions" element={
          <ProtectedRoute>
            {user?.role === 'setter' ? <Navigate to="/dashboard" replace /> : <SessionsModule />}
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to={auth.isAuthenticated() ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
