/**
 * ========================================================
 * NUBAGLOW APP - JAVASCRIPT MODULAR BEAUTY-TECH UNIFICADO
 * by Nuba Beauty (Sucre - Bolivia)
 * Arquitectura: StoreDB + Auth + Catalog + Cart + AI + QR + Tracking + Admin (5 Módulos)
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  StoreDB.init();
  AuthModule.init();
  CatalogModule.init();
  CartModule.init();
  AIAssistantModule.init();
  TrackingModule.init();
  ContactModule.init();
  AdminModule.init();
  UIModule.init();
});

/* ====================================================================================
   1. STORE DATABASE & PERSISTENCIA LOCALSTORAGE
   ==================================================================================== */
const StoreDB = {
  // Claves de almacenamiento
  KEYS: {
    PRODUCTS: 'nubaglow_products',
    CART: 'nubaglow_cart',
    SHIPPING_CITY: 'nubaglow_shipping_city',
    ORDERS: 'nubaglow_orders',
    TRANSACTIONS: 'nubaglow_transactions',
    USERS: 'nubaglow_users',
    AUDIT_LOGS: 'nubaglow_audit_logs',
    SESSION: 'nubaglow_session'
  },

  // Semilla inicial de Catálogo Beauty-Tech
  SEED_PRODUCTS: [
    {
      id: 'prod-1',
      name: 'Serum Glow Vitamina C + Ácido Hialurónico',
      category: 'Tratamiento Facial',
      skinTypes: ['mixta', 'seca', 'sensible'],
      price: 145,
      rating: 4.9,
      reviews: 84,
      stock: 9,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      description: 'Ilumina la piel, atenúa manchas y brinda un efecto glow natural sin sensación grasa.',
      aiBadge: 'Top Recomendado por IA ✨',
      tag: 'Bestseller'
    },
    {
      id: 'prod-2',
      name: 'Gel Limpiador Purificante con Ácido Salicílico',
      category: 'Limpieza Facial',
      skinTypes: ['grasa', 'mixta'],
      price: 95,
      rating: 4.8,
      reviews: 62,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      description: 'Controla el sebo, descongestiona los poros y deja la piel mate pero fresca y suave.',
      aiBadge: 'Ideal Piel Grasa 💧',
      tag: 'Control Sebo'
    },
    {
      id: 'prod-3',
      name: 'Crema Hidratante Ceramide Barrier Relief',
      category: 'Hidratación',
      skinTypes: ['seca', 'sensible'],
      price: 120,
      rating: 5.0,
      reviews: 49,
      stock: 4, // Stock bajo para alertas de almacén
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
      description: 'Restaura la barrera cutánea con 3 ceramidas esenciales, calmando rojeces y tirantez.',
      aiBadge: 'Fórmula Calmante 🌿',
      tag: 'Reorden Urgente'
    },
    {
      id: 'prod-4',
      name: 'Protector Solar Toque Seco SPF 50+ Invisible',
      category: 'Protección Solar',
      skinTypes: ['grasa', 'mixta', 'seca', 'sensible'],
      price: 130,
      rating: 4.9,
      reviews: 112,
      stock: 18,
      image: 'https://images.unsplash.com/photo-1567928815104-b6cb72648fb1?auto=format&fit=crop&w=600&q=80',
      description: 'Alta protección solar adaptada al clima de Sucre y la radiación UV en alturas de Bolivia.',
      aiBadge: 'Imprescindible Diario ☀️',
      tag: 'Toque Seco'
    },
    {
      id: 'prod-5',
      name: 'Tónico Exfoliante Suave con Niacinamida 5%',
      category: 'Tónico Facial',
      skinTypes: ['mixta', 'grasa'],
      price: 85,
      rating: 4.7,
      reviews: 38,
      stock: 3, // Stock bajo para punto de reorden
      image: 'https://images.unsplash.com/photo-1608248597359-009c9519c65a?auto=format&fit=crop&w=600&q=80',
      description: 'Minimiza la apariencia de poros y unifica el tono sin irritar ni resecar la piel.',
      aiBadge: 'Equilibrio Puro ✨',
      tag: 'Reorden Urgente'
    },
    {
      id: 'prod-6',
      name: 'Base de Maquillaje Glow Serum Ligera SPF 20',
      category: 'Maquillaje Híbrido',
      skinTypes: ['seca', 'mixta', 'sensible'],
      price: 160,
      rating: 4.8,
      reviews: 73,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      description: 'Cobertura construible con acabado satinado radiante que hidrata mientras perfecciona.',
      aiBadge: 'Efecto Segunda Piel 🌸',
      tag: 'Make-up Glow'
    }
  ],

  // Semilla de Envíos / Tracking Logístico
  SEED_ORDERS: [
    {
      guide: 'NG-SUC-8924',
      customer: 'Camila Rodriguez',
      phone: '+59170012345',
      city: 'Sucre (Chuquisaca)',
      destination: 'Zona San Roque / Av. Hernando Siles #340',
      currentStage: 3, // 1: Almacén, 2: Control Calidad, 3: En Camino (Delivery), 4: Entregado
      statusText: 'En camino con repartidor express local',
      courier: 'MotoGlow Express Sucre',
      eta: 'Hoy entre 16:30 y 17:15',
      lastUpdate: 'Hace 12 minutos (Salió del Hub Central Sucre)',
      items: ['Serum Glow Vitamina C', 'Protector Solar Toque Seco SPF 50+'],
      total: 275,
      date: '09/11/2026'
    },
    {
      guide: 'NG-LPZ-5011',
      customer: 'Valeria Mendoza',
      phone: '+59171298765',
      city: 'La Paz',
      destination: 'Zona Sur / Calacoto Calle 15',
      currentStage: 2,
      statusText: 'Empacado con protección térmica y listo para despacho nacional',
      courier: 'Transportes Bolivia Express Aéreo',
      eta: 'Mañana a mediodía',
      lastUpdate: 'Hace 45 minutos (Control de empaque completado)',
      items: ['Crema Hidratante Ceramide Barrier Relief'],
      total: 145,
      date: '09/11/2026'
    },
    {
      guide: 'NG-SCZ-3329',
      customer: 'Daniela Paz',
      phone: '+59173344556',
      city: 'Santa Cruz de la Sierra',
      destination: 'Equipetrol Norte / Condominio Las Palmas',
      currentStage: 4,
      statusText: 'Entregado a conformidad del cliente',
      courier: 'Nacional Courrier Bolivia',
      eta: 'Entregado con éxito',
      lastUpdate: 'Ayer 15:40',
      items: ['Base de Maquillaje Glow Serum', 'Gel Limpiador Purificante'],
      total: 255,
      date: '08/11/2026'
    }
  ],

  // Semilla de Cobros QR Simple
  SEED_TRANSACTIONS: [
    {
      id: 'TXN-901',
      reference: 'NBG-849201',
      customer: 'Camila Rodriguez',
      amount: 275.00,
      destination: 'Sucre (Express)',
      bank: 'Banco Nacional de Bolivia (BNB)',
      status: 'Confirmado',
      timestamp: '09/11/2026 14:22:15'
    },
    {
      id: 'TXN-902',
      reference: 'NBG-631045',
      customer: 'Valeria Mendoza',
      amount: 145.00,
      destination: 'La Paz (Nacional)',
      bank: 'Banco de Crédito (BCP)',
      status: 'Confirmado',
      timestamp: '09/11/2026 12:40:02'
    },
    {
      id: 'TXN-903',
      reference: 'NBG-228710',
      customer: 'Daniela Paz',
      amount: 255.00,
      destination: 'Santa Cruz',
      bank: 'Banco Mercantil Santa Cruz',
      status: 'Confirmado',
      timestamp: '08/11/2026 16:15:33'
    },
    {
      id: 'TXN-904',
      reference: 'NBG-910482',
      customer: 'Renata Salinas',
      amount: 95.00,
      destination: 'Cochabamba',
      bank: 'Banco Unión',
      status: 'Confirmado',
      timestamp: '08/11/2026 10:05:19'
    }
  ],

  // Semilla de Usuarios y Roles (RBAC)
  SEED_USERS: [
    { id: 1, name: 'Administradora Nuba', email: 'admin@nuba.bo', role: 'administrador', created: '01/09/2026' },
    { id: 2, name: 'Shirley Arancibia (Vendedora)', email: 'vendedor@nuba.bo', role: 'vendedor', created: '05/09/2026' },
    { id: 3, name: 'Naydelin Chambi (Almacén)', email: 'almacen@nuba.bo', role: 'almacen', created: '05/09/2026' },
    { id: 4, name: 'Lilian Ariel Cruz (Logística)', email: 'logistica@nuba.bo', role: 'logistica', created: '05/09/2026' },
    { id: 5, name: 'Cliente Frecuente Nuba', email: 'cliente@nuba.bo', role: 'cliente', created: '10/09/2026' }
  ],

  // Semilla de Auditoría
  SEED_AUDIT_LOGS: [
    { timestamp: '09/11/2026 14:22', user: 'Sistema QR Simple', event: 'Cobro verificado TXN-901 Bs. 275', module: 'Cobros QR', status: 'EXITOSO' },
    { timestamp: '09/11/2026 11:30', user: 'admin@nuba.bo', event: 'Apertura de sesión en Backroom', module: 'Seguridad', status: 'EXITOSO' },
    { timestamp: '09/11/2026 09:15', user: 'almacen@nuba.bo', event: 'Alerta de punto de reorden en Serum Ceramide', module: 'Almacén', status: 'ALERTA' }
  ],

  init() {
    if (!localStorage.getItem(this.KEYS.PRODUCTS)) {
      localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(this.SEED_PRODUCTS));
    }
    if (!localStorage.getItem(this.KEYS.ORDERS)) {
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(this.SEED_ORDERS));
    }
    if (!localStorage.getItem(this.KEYS.TRANSACTIONS)) {
      localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(this.SEED_TRANSACTIONS));
    }
    if (!localStorage.getItem(this.KEYS.USERS)) {
      localStorage.setItem(this.KEYS.USERS, JSON.stringify(this.SEED_USERS));
    }
    if (!localStorage.getItem(this.KEYS.AUDIT_LOGS)) {
      localStorage.setItem(this.KEYS.AUDIT_LOGS, JSON.stringify(this.SEED_AUDIT_LOGS));
    }
    if (!localStorage.getItem(this.KEYS.CART)) {
      localStorage.setItem(this.KEYS.CART, JSON.stringify([{ productId: 'prod-1', quantity: 1 }]));
    }
  },

  getProducts() {
    return JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS) || '[]');
  },

  saveProducts(products) {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
    CatalogModule.render();
    AdminModule.render();
  },

  getCart() {
    return JSON.parse(localStorage.getItem(this.KEYS.CART) || '[]');
  },

  saveCart(cart) {
    localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
  },

  getOrders() {
    return JSON.parse(localStorage.getItem(this.KEYS.ORDERS) || '[]');
  },

  saveOrders(orders) {
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
  },

  getTransactions() {
    return JSON.parse(localStorage.getItem(this.KEYS.TRANSACTIONS) || '[]');
  },

  saveTransactions(txns) {
    localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(txns));
  },

  getUsers() {
    return JSON.parse(localStorage.getItem(this.KEYS.USERS) || '[]');
  },

  saveUsers(users) {
    localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
  },

  getAuditLogs() {
    return JSON.parse(localStorage.getItem(this.KEYS.AUDIT_LOGS) || '[]');
  },

  logEvent(event, user = 'Sistema', module = 'General', status = 'INFO') {
    const logs = this.getAuditLogs();
    const now = new Date();
    const formatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    logs.unshift({ timestamp: formatted, user, event, module, status });
    localStorage.setItem(this.KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 50)));
    if (AdminModule.activeTab === 'seguridad') {
      AdminModule.renderAuditLogsTable();
    }
  }
};

/* ====================================================================================
   2. AUTENTICACIÓN & GESTIÓN DE ROLES (RBAC)
   ==================================================================================== */
const AuthModule = {
  currentUser: null,

  init() {
    const saved = localStorage.getItem(StoreDB.KEYS.SESSION);
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch (e) {
        this.currentUser = null;
      }
    }
    this.renderHeaderSlot();
    this.updateAdminAccess();
  },

  login(user) {
    this.currentUser = user;
    localStorage.setItem(StoreDB.KEYS.SESSION, JSON.stringify(user));
    StoreDB.logEvent(`Inicio de sesión exitoso (${user.role})`, user.email, 'Seguridad', 'EXITOSO');
    this.renderHeaderSlot();
    this.updateAdminAccess();
    UIModule.showToast(`¡Bienvenida/o, ${user.name}! Rol: ${this.getRoleLabel(user.role)}`, 'success');
    closeAuthModal();

    if (user.role === 'administrador') {
      showAdminBackroomView();
    } else {
      showPublicStoreView();
    }
  },

  logout() {
    if (this.currentUser) {
      StoreDB.logEvent('Cierre de sesión', this.currentUser.email, 'Seguridad', 'INFO');
    }
    this.currentUser = null;
    localStorage.removeItem(StoreDB.KEYS.SESSION);
    this.renderHeaderSlot();
    this.updateAdminAccess();
    showPublicStoreView();
    UIModule.showToast('Sesión cerrada correctamente.', 'info');
  },

  getRoleLabel(role) {
    const roles = {
      administrador: 'Administradora',
      vendedor: 'Vendedora (POS)',
      almacen: 'Gestora Almacén',
      logistica: 'Logística & Envíos',
      cliente: 'Cliente Nuba'
    };
    return roles[role] || 'Usuario';
  },

  renderHeaderSlot() {
    const slot = document.getElementById('auth-header-slot');
    if (!slot) return;

    if (this.currentUser) {
      slot.innerHTML = `
        <div class="flex items-center gap-2 bg-white/90 border border-[#D1A3D9] rounded-xl px-2.5 py-1.5 shadow-sm text-xs">
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9C2774] to-[#D1A3D9] text-white flex items-center justify-center font-bold text-[10px]">
            ${this.currentUser.name.charAt(0)}
          </div>
          <div class="hidden sm:block text-left">
            <span class="font-bold text-[#3A1033] block leading-tight truncate max-w-[120px]">${this.currentUser.name}</span>
            <span class="text-[10px] text-[#9C2774] font-semibold">${this.getRoleLabel(this.currentUser.role)}</span>
          </div>
          <button onclick="AuthModule.logout()" class="text-[#72526D] hover:text-red-600 font-bold ml-1 p-1" title="Cerrar sesión" aria-label="Cerrar sesión">
            ✕
          </button>
        </div>
      `;
    } else {
      slot.innerHTML = `
        <button onclick="openAuthModal()" class="text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-[#D1A3D9] text-[#9C2774] hover:bg-[#FDF4FA] transition-all flex items-center gap-1.5 shadow-sm" aria-label="Iniciar sesión o cambiar rol">
          <svg class="w-4 h-4 text-[#9C2774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="hidden md:inline">Iniciar Sesión</span>
        </button>
      `;
    }
  },

  updateAdminAccess() {
    const adminBtn = document.getElementById('admin-panel-btn');
    const mobileSwitchBtn = document.getElementById('mobile-admin-switch-btn');
    const isStaff = this.currentUser && ['administrador', 'vendedor', 'almacen', 'logistica'].includes(this.currentUser.role);

    if (adminBtn) {
      if (isStaff) {
        adminBtn.classList.remove('hidden');
        const label = document.getElementById('admin-panel-btn-label');
        if (label) {
          label.textContent = this.currentUser.role === 'administrador' ? 'Panel Admin' : 'Backroom';
        }
      } else {
        adminBtn.classList.add('hidden');
      }
    }

    if (mobileSwitchBtn) {
      if (isStaff) mobileSwitchBtn.classList.remove('hidden');
      else mobileSwitchBtn.classList.add('hidden');
    }
  }
};

window.openAuthModal = function() {
  const m = document.getElementById('auth-modal');
  if (m) m.classList.remove('hidden');
};

window.closeAuthModal = function() {
  const m = document.getElementById('auth-modal');
  if (m) m.classList.add('hidden');
};

window.quickLogin = function(role) {
  const users = StoreDB.getUsers();
  const found = users.find(u => u.role === role) || {
    id: Date.now(),
    name: role === 'administrador' ? 'Administradora Nuba' : 'Usuario ' + role,
    email: `${role}@nuba.bo`,
    role
  };
  AuthModule.login(found);
};

window.handleAuthLogin = function(e) {
  e.preventDefault();
  const email = document.getElementById('auth-input-email')?.value.trim();
  const users = StoreDB.getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    AuthModule.login(user);
  } else {
    // Si no existe, crear como cliente
    const newUser = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      role: 'cliente',
      created: 'Reciente'
    };
    users.push(newUser);
    StoreDB.saveUsers(users);
    AuthModule.login(newUser);
  }
};

window.logoutAdmin = function() {
  AuthModule.logout();
};

/* ====================================================================================
   3. NAVEGACIÓN ENTRE VISTAS (TIENDA PÚBLICA VS BACKROOM ADMIN)
   ==================================================================================== */
window.showPublicStoreView = function() {
  const store = document.getElementById('customer-store-view');
  const admin = document.getElementById('admin-backroom-view');
  const publicNav = document.getElementById('public-nav-links');

  if (store) store.classList.remove('hidden');
  if (admin) admin.classList.add('hidden');
  if (publicNav) publicNav.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showAdminBackroomView = function() {
  const isStaff = AuthModule.currentUser && ['administrador', 'vendedor', 'almacen', 'logistica'].includes(AuthModule.currentUser.role);
  if (!isStaff) {
    UIModule.showToast('Acceso restringido: requiere iniciar sesión como Administrador o Personal de Nuba.', 'warning');
    openAuthModal();
    return;
  }

  const store = document.getElementById('customer-store-view');
  const admin = document.getElementById('admin-backroom-view');
  const publicNav = document.getElementById('public-nav-links');

  if (store) store.classList.add('hidden');
  if (admin) admin.classList.remove('hidden');
  if (publicNav) publicNav.classList.add('hidden');

  AdminModule.render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleAdminBackroom = function() {
  const admin = document.getElementById('admin-backroom-view');
  if (admin && !admin.classList.contains('hidden')) {
    showPublicStoreView();
  } else {
    showAdminBackroomView();
  }
};

/* ====================================================================================
   4. CATÁLOGO INTERACTIVO (CLIENTE)
   ==================================================================================== */
const CatalogModule = {
  activeFilter: 'all',

  init() {
    this.setupEvents();
    this.render();
  },

  setupEvents() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter') || 'all';
        this.render();
      });
    });
  },

  render() {
    const container = document.getElementById('catalog-products-grid');
    const countEl = document.getElementById('filter-results-count');
    if (!container) return;

    const products = StoreDB.getProducts();
    const filtered = this.activeFilter === 'all'
      ? products
      : products.filter(p => p.skinTypes && p.skinTypes.includes(this.activeFilter));

    if (countEl) {
      countEl.textContent = `${filtered.length} cosmético${filtered.length !== 1 ? 's' : ''} disponible${filtered.length !== 1 ? 's' : ''} con stock validado en Sucre`;
    }

    container.innerHTML = '';
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'group bg-white rounded-3xl p-5 border border-[#D1A3D9]/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden';

      const skinLabels = { grasa: 'Grasa', seca: 'Seca', mixta: 'Mixta', sensible: 'Sensible' };
      const skinPills = (p.skinTypes || []).map(st => `
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F7EEF8] text-[#9C2774] border border-[#D1A3D9]/50">
          ${skinLabels[st] || st}
        </span>
      `).join(' ');

      card.innerHTML = `
        <div class="flex items-center justify-between mb-3 z-10">
          <span class="badge-fuchsia text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
            <span>✨</span> ${p.aiBadge || 'Recomendado por IA'}
          </span>
          <span class="text-[10px] bg-[#FDF4FA] text-[#72526D] font-black px-2 py-0.5 rounded-full border border-[#D1A3D9]">
            ${p.tag || p.category}
          </span>
        </div>

        <div class="relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-[#FDF4FA] flex items-center justify-center">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          
          <div class="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm text-[#3A1033]">
            <span class="w-2 h-2 rounded-full ${p.stock > 5 ? 'bg-emerald-500' : 'bg-amber-500'} pulse-dot"></span>
            <span>Stock: <strong class="${p.stock > 5 ? 'text-emerald-700' : 'text-amber-700'}">${p.stock} disponibles</strong></span>
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 mb-1.5 text-xs">
              <span class="text-amber-400 font-bold">${'★'.repeat(Math.floor(p.rating || 5))}</span>
              <span class="font-extrabold text-[#3A1033]">${p.rating || 4.9}</span>
              <span class="text-[#72526D]">(${p.reviews || 48} reseñas)</span>
            </div>

            <h3 class="text-base font-extrabold text-[#3A1033] group-hover:text-[#9C2774] transition-colors line-clamp-1 mb-1">
              ${p.name}
            </h3>
            <p class="text-xs text-[#72526D] line-clamp-2 mb-3">
              ${p.description}
            </p>
          </div>

          <div class="mb-4">
            <span class="text-[10px] text-[#72526D] uppercase font-bold block mb-1">Tipo de Piel:</span>
            <div class="flex flex-wrap gap-1">
              ${skinPills}
            </div>
          </div>

          <div class="pt-3 border-t border-[#F7EEF8] flex items-center justify-between mt-auto">
            <div>
              <span class="text-[10px] text-[#72526D] block font-bold uppercase">Precio oficial</span>
              <span class="text-xl font-black text-[#9C2774]">Bs. ${p.price}</span>
            </div>
            <button 
              onclick="CartModule.addToCart('${p.id}')"
              class="btn-primary-glow px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              aria-label="Añadir ${p.name} al carrito">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Añadir</span>
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }
};

/* ====================================================================================
   5. CARRITO DE COMPRAS CON PERSISTENCIA EN LOCALSTORAGE
   ==================================================================================== */
const CartModule = {
  cart: [],

  init() {
    this.cart = StoreDB.getCart();
    this.setupEvents();
    this.updateBadge();
    this.render();
  },

  setupEvents() {
    const openBtns = document.querySelectorAll('.open-cart-btn');
    openBtns.forEach(b => b.addEventListener('click', () => this.toggleDrawer(true)));

    const citySelect = document.getElementById('cart-shipping-city');
    if (citySelect) {
      const savedCity = localStorage.getItem(StoreDB.KEYS.SHIPPING_CITY) || 'sucre';
      citySelect.value = savedCity;
      citySelect.addEventListener('change', () => {
        localStorage.setItem(StoreDB.KEYS.SHIPPING_CITY, citySelect.value);
        this.render();
      });
    }

    const payBtn = document.getElementById('checkout-qr-btn');
    if (payBtn) {
      payBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          UIModule.showToast('Tu carrito está vacío. Añade cosméticos para continuar.', 'warning');
          return;
        }
        openQRModal();
      });
    }
  },

  addToCart(productId, qty = 1) {
    const products = StoreDB.getProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const existing = this.cart.find(item => item.productId === productId);
    if (existing) {
      if (existing.quantity + qty <= prod.stock) {
        existing.quantity += qty;
      } else {
        UIModule.showToast(`Límite de stock alcanzado (${prod.stock} unidades disponibles)`, 'warning');
        return;
      }
    } else {
      if (prod.stock < qty) {
        UIModule.showToast('Producto agotado temporalmente en almacén.', 'warning');
        return;
      }
      this.cart.push({ productId, quantity: qty });
    }

    StoreDB.saveCart(this.cart);
    this.updateBadge();
    this.render();
    UIModule.showToast(`¡"${prod.name}" añadido al carrito! ✨`, 'success');
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.productId !== productId);
    StoreDB.saveCart(this.cart);
    this.updateBadge();
    this.render();
  },

  changeQty(productId, delta) {
    const item = this.cart.find(i => i.productId === productId);
    const prod = StoreDB.getProducts().find(p => p.id === productId);
    if (!item || !prod) return;

    const next = item.quantity + delta;
    if (next <= 0) {
      this.removeFromCart(productId);
    } else if (next > prod.stock) {
      UIModule.showToast(`Stock máximo disponible alcanzado (${prod.stock} unidades)`, 'warning');
    } else {
      item.quantity = next;
      StoreDB.saveCart(this.cart);
      this.updateBadge();
      this.render();
    }
  },

  getSubtotal() {
    const products = StoreDB.getProducts();
    return this.cart.reduce((sum, item) => {
      const p = products.find(prod => prod.id === item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
  },

  getShippingCost(subtotal) {
    const citySelect = document.getElementById('cart-shipping-city');
    const city = citySelect ? citySelect.value : 'sucre';
    if (city === 'sucre') {
      return subtotal >= 150 ? 0 : 10;
    }
    return 25; // Tarifa plana nacional
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-count-badge');
    const totalQty = this.cart.reduce((s, i) => s + i.quantity, 0);
    badges.forEach(b => {
      b.textContent = totalQty;
      if (totalQty > 0) b.classList.remove('hidden');
      else b.classList.add('hidden');
    });
  },

  render() {
    const itemsContainer = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const totalEl = document.getElementById('cart-drawer-total');
    const shippingEl = document.getElementById('cart-shipping-cost');
    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-12 text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7EEF8] flex items-center justify-center text-[#9C2774]">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <p class="text-sm font-extrabold text-[#3A1033]">Tu carrito de belleza está vacío</p>
          <p class="text-xs text-[#72526D] mt-1 max-w-xs mx-auto">Explora nuestro catálogo con stock sincronizado o conversa con el Asistente IA para armar tu rutina.</p>
          <button onclick="CartModule.toggleDrawer(false); scrollToSection('catalogo');" class="mt-4 btn-primary-glow text-xs px-4 py-2 rounded-xl">
            Ver Catálogo NubaGlow
          </button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'Bs. 0';
      if (totalEl) totalEl.textContent = 'Bs. 0';
      if (shippingEl) shippingEl.textContent = 'Bs. 0';
      return;
    }

    const products = StoreDB.getProducts();
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost(subtotal);
    const total = subtotal + shipping;

    itemsContainer.innerHTML = '';
    this.cart.forEach(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (!p) return;

      const row = document.createElement('div');
      row.className = 'flex items-center gap-3 p-3 rounded-2xl bg-[#FDF4FA] border border-[#D1A3D9]/40 transition-all';
      row.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="w-14 h-14 rounded-xl object-cover border border-white">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-extrabold text-[#3A1033] truncate">${p.name}</h4>
          <span class="text-xs font-black text-[#9C2774] block mt-0.5">Bs. ${p.price}</span>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex items-center border border-[#D1A3D9] rounded-lg bg-white overflow-hidden text-xs">
              <button onclick="CartModule.changeQty('${p.id}', -1)" class="px-2 py-0.5 text-[#3A1033] hover:bg-[#F7EEF8] font-bold" aria-label="Disminuir cantidad">-</button>
              <span class="px-2 py-0.5 font-bold text-[#3A1033]">${item.quantity}</span>
              <button onclick="CartModule.changeQty('${p.id}', 1)" class="px-2 py-0.5 text-[#3A1033] hover:bg-[#F7EEF8] font-bold" aria-label="Aumentar cantidad">+</button>
            </div>
            <span class="text-[11px] text-[#72526D]">Subtotal: Bs. ${p.price * item.quantity}</span>
          </div>
        </div>
        <button onclick="CartModule.removeFromCart('${p.id}')" class="text-[#72526D] hover:text-red-500 p-1 transition-colors" title="Eliminar" aria-label="Eliminar producto del carrito">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      `;
      itemsContainer.appendChild(row);
    });

    if (subtotalEl) subtotalEl.textContent = `Bs. ${subtotal}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? '¡Gratis! (Sucre)' : `Bs. ${shipping}`;
    if (totalEl) totalEl.textContent = `Bs. ${total}`;
  },

  toggleDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (!drawer || !backdrop) return;

    if (open) {
      this.render();
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
};

window.toggleCartDrawer = function(open) {
  CartModule.toggleDrawer(open);
};

/* ====================================================================================
   6. ASISTENTE IA DE RUTINAS CON ESTADO DE CARGA INTERACTIVO (1.5S)
   ==================================================================================== */
const AIAssistantModule = {
  KNOWLEDGE_BASE: {
    mixta: {
      summary: 'Para piel mixta (zona T oleosa y mejillas normales/secas), tu rutina prioriza regular el sebo sin deshidratar.',
      steps: [
        { step: 'Paso 1 (AM & PM)', title: 'Limpieza Purificante', desc: 'Gel Limpiador con Ácido Salicílico para limpiar poros.' },
        { step: 'Paso 2 (Día)', title: 'Iluminación & Antioxidantes', desc: 'Serum Glow Vitamina C + Ácido Hialurónico en rostro y cuello.' },
        { step: 'Paso 3 (Día)', title: 'Fotoprotección Toque Seco', desc: 'Protector Solar SPF 50+ Invisible para clima de valles bolivianos.' },
        { step: 'Paso 4 (Noche)', title: 'Equilibrio de Textura', desc: 'Tónico Suave con Niacinamida 5% para afinar poros.' }
      ],
      productIds: ['prod-1', 'prod-2', 'prod-4']
    },
    grasa: {
      summary: 'Para piel grasa con tendencia a poros dilatados o brotes, recomendamos controlar el brillo mientras fortaleces la barrera cutánea.',
      steps: [
        { step: 'Paso 1 (Mañana & Noche)', title: 'Limpieza Anti-Sebo', desc: 'Gel Limpiador Purificante con Ácido Salicílico.' },
        { step: 'Paso 2 (Día & Noche)', title: 'Regulación de Poros', desc: 'Tónico con Niacinamida 5% para balancear oleosidad.' },
        { step: 'Paso 3 (Día)', title: 'Toque Seco Esencial', desc: 'Protector Solar Toque Seco SPF 50+ de textura ultra ligera.' }
      ],
      productIds: ['prod-2', 'prod-5', 'prod-4']
    },
    seca: {
      summary: 'Para piel seca o deshidratada por el clima seco de Sucre y los valles, necesitas lípidos reparadores y ácido hialurónico.',
      steps: [
        { step: 'Paso 1 (Mañana & Noche)', title: 'Bomba de Hidratación', desc: 'Serum Glow Vitamina C + Ácido Hialurónico sobre piel húmeda.' },
        { step: 'Paso 2 (Mañana & Noche)', title: 'Sellado de Barrera', desc: 'Crema Hidratante Ceramide Barrier Relief con 3 ceramidas.' },
        { step: 'Paso 3 (Día)', title: 'Protección Diaria', desc: 'Protector Solar Toque Seco SPF 50+ Invisible.' }
      ],
      productIds: ['prod-1', 'prod-3', 'prod-4']
    },
    sensible: {
      summary: 'Para piel reactiva o con rojeces, formulaciones 100% hipoalergénicas con ceramidas que calman inmediatamente.',
      steps: [
        { step: 'Paso 1 (Mañana & Noche)', title: 'Calmante Inmediato', desc: 'Crema Hidratante Ceramide Barrier Relief sin fragancias.' },
        { step: 'Paso 2 (Día)', title: 'Fotoprotección Suave', desc: 'Protector Solar Toque Seco SPF 50+ formulado para alta tolerancia.' }
      ],
      productIds: ['prod-3', 'prod-4']
    },
    maquillaje: {
      summary: 'Para un maquillaje radiante y saludable que cuide tus poros todo el día, fusionamos skincare con pigmentos minerales.',
      steps: [
        { step: 'Paso 1 (Preparación)', title: 'Glow Booster', desc: 'Serum Glow Vitamina C para hidratar y otorgar luminosidad.' },
        { step: 'Paso 2 (Acabado)', title: 'Base Híbrida Satinada', desc: 'Base de Maquillaje Glow Serum Ligera SPF 20 efecto segunda piel.' }
      ],
      productIds: ['prod-6', 'prod-1']
    }
  },

  init() {
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const chips = document.querySelectorAll('.ai-suggestion-chip');

    if (sendBtn) sendBtn.addEventListener('click', () => this.handleSend());
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    chips.forEach(c => {
      c.addEventListener('click', () => {
        const prompt = c.getAttribute('data-prompt') || c.textContent.trim();
        this.processQuery(prompt);
      });
    });
  },

  handleSend() {
    const input = document.getElementById('ai-chat-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = '';
    this.processQuery(text);
  },

  processQuery(text) {
    const messages = document.getElementById('ai-chat-messages');
    if (!messages) return;

    // 1. Mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'flex justify-end mb-4 animate-fade-in';
    userMsg.innerHTML = `
      <div class="bg-gradient-to-r from-[#9C2774] to-[#B8328A] text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
        ${text}
      </div>
    `;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    // 2. Estado de Carga Interactivo (1.5 segundos con animación y etapas de análisis)
    const loadingId = 'ai-loading-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.className = 'flex items-start gap-2.5 mb-4 animate-fade-in';
    loadingDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9C2774] to-[#D1A3D9] flex items-center justify-center text-white text-xs font-bold shrink-0">
        ✨
      </div>
      <div class="bg-white p-3.5 rounded-2xl border border-[#D1A3D9] shadow-sm max-w-[85%] w-full sm:w-80">
        <div class="flex items-center justify-between mb-2">
          <span id="${loadingId}-status" class="text-xs font-extrabold text-[#9C2774] animate-pulse">
            Analizando tipo de piel y biotipo...
          </span>
          <span class="text-[10px] font-bold text-[#72526D]">IA Nuba</span>
        </div>
        <!-- Barra de Progreso de 1.5s -->
        <div class="w-full bg-[#F7EEF8] h-1.5 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-[#9C2774] to-[#D1A3D9] h-full ai-progress-bar"></div>
        </div>
      </div>
    `;
    messages.appendChild(loadingDiv);
    messages.scrollTop = messages.scrollHeight;

    // Transición interactiva de estados
    setTimeout(() => {
      const statusText = document.getElementById(`${loadingId}-status`);
      if (statusText) statusText.textContent = 'Calculando compatibilidad de ingredientes...';
    }, 500);

    setTimeout(() => {
      const statusText = document.getElementById(`${loadingId}-status`);
      if (statusText) statusText.textContent = 'Seleccionando fórmulas en almacén central de Sucre...';
    }, 1000);

    // Finalización a los 1.5 segundos exactos
    setTimeout(() => {
      const loadEl = document.getElementById(loadingId);
      if (loadEl) loadEl.remove();

      const lower = text.toLowerCase();
      let key = 'mixta';
      if (lower.includes('grasa') || lower.includes('acné') || lower.includes('brillo')) key = 'grasa';
      else if (lower.includes('seca') || lower.includes('tirante') || lower.includes('deshidrat')) key = 'seca';
      else if (lower.includes('sensible') || lower.includes('rojez') || lower.includes('irrit')) key = 'sensible';
      else if (lower.includes('base') || lower.includes('maquillaje') || lower.includes('color')) key = 'maquillaje';

      const routine = this.KNOWLEDGE_BASE[key] || this.KNOWLEDGE_BASE.mixta;
      const products = StoreDB.getProducts();

      const stepsHtml = routine.steps.map(s => `
        <div class="p-2.5 rounded-xl bg-[#FDF4FA] border border-[#D1A3D9]/40 mb-2">
          <span class="text-[10px] font-bold text-[#9C2774] uppercase block">${s.step} • ${s.title}</span>
          <span class="text-xs text-[#3A1033] font-medium">${s.desc}</span>
        </div>
      `).join('');

      const productBadges = routine.productIds.map(pid => {
        const prod = products.find(p => p.id === pid);
        if (!prod) return '';
        return `
          <div class="flex items-center justify-between p-2 rounded-xl bg-white border border-[#D1A3D9]/60 text-xs">
            <span class="font-extrabold text-[#3A1033] truncate pr-2">${prod.name} (Bs. ${prod.price})</span>
            <button onclick="CartModule.addToCart('${prod.id}')" class="btn-primary-glow px-3 py-1 rounded-lg text-[11px] font-bold shrink-0">
              + Agregar
            </button>
          </div>
        `;
      }).join('');

      const aiMsg = document.createElement('div');
      aiMsg.className = 'flex items-start gap-2.5 mb-4 animate-fade-in';
      aiMsg.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9C2774] to-[#D1A3D9] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
          ✨
        </div>
        <div class="glass-panel text-[#3A1033] text-xs sm:text-sm p-4 rounded-2xl rounded-tl-none border border-[#D1A3D9]/50 shadow-sm leading-relaxed max-w-[92%] sm:max-w-[85%]">
          <p class="font-bold text-[#3A1033] mb-2">${routine.summary}</p>
          <div class="my-2">
            <h5 class="text-[11px] font-extrabold text-[#72526D] uppercase tracking-wider mb-2">Tu Rutina Paso a Paso:</h5>
            ${stepsHtml}
          </div>
          <div class="my-3">
            <h5 class="text-[11px] font-extrabold text-[#72526D] uppercase tracking-wider mb-2">Fórmulas en Stock Real:</h5>
            <div class="space-y-1.5">
              ${productBadges}
            </div>
          </div>
          <div class="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#D1A3D9]/40">
            <span class="text-[10px] text-[#72526D]">¿Deseas personalizar tu rutina? Escríbeme otro detalle.</span>
            <button onclick="AIAssistantModule.addFullRoutine('${key}')" class="btn-lilac-accent px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm">
              <span>✨</span> Añadir Todo el Set
            </button>
          </div>
        </div>
      `;
      messages.appendChild(aiMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 1500);
  },

  addFullRoutine(key) {
    const routine = this.KNOWLEDGE_BASE[key];
    if (!routine) return;
    routine.productIds.forEach(id => CartModule.addToCart(id, 1));
    UIModule.showToast(`¡Set completo de rutina "${key}" añadido al carrito!`, 'success');
    CartModule.toggleDrawer(true);
  }
};

/* ====================================================================================
   7. PAGOS QR SIMPLE & CHECKOUT INSTANTÁNEO (BOLIVIA)
   ==================================================================================== */
let qrTimerInterval = null;

window.openQRModal = function() {
  const modal = document.getElementById('qr-payment-modal');
  if (!modal) return;

  const subtotal = CartModule.getSubtotal();
  const shipping = CartModule.getShippingCost(subtotal);
  const total = subtotal + shipping;

  const amountEl = document.getElementById('qr-modal-amount');
  const refEl = document.getElementById('qr-modal-reference');
  const timerEl = document.getElementById('qr-modal-timer');

  const ref = 'NBG-' + Math.floor(100000 + Math.random() * 900000);
  if (amountEl) amountEl.textContent = `Bs. ${total}.00`;
  if (refEl) refEl.textContent = ref;

  modal.classList.remove('hidden');

  // Temporizador de 5 minutos
  let timeLeft = 300;
  if (qrTimerInterval) clearInterval(qrTimerInterval);

  qrTimerInterval = setInterval(() => {
    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    if (timerEl) timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (timeLeft <= 0) {
      clearInterval(qrTimerInterval);
      UIModule.showToast('El código QR ha expirado. Por favor genera uno nuevo.', 'warning');
      closeQRModal();
    }
  }, 1000);
};

window.closeQRModal = function() {
  const modal = document.getElementById('qr-payment-modal');
  if (modal) modal.classList.add('hidden');
  if (qrTimerInterval) clearInterval(qrTimerInterval);
};

window.simulatePaymentSuccess = function() {
  const btn = document.getElementById('confirm-qr-sim-btn');
  if (btn) {
    btn.innerHTML = `<span class="animate-spin inline-block mr-2">⏳</span> Conectando con Banca Móvil...`;
    btn.disabled = true;
  }

  setTimeout(() => {
    closeQRModal();
    CartModule.toggleDrawer(false);

    const subtotal = CartModule.getSubtotal();
    const shipping = CartModule.getShippingCost(subtotal);
    const total = subtotal + shipping;
    const citySelect = document.getElementById('cart-shipping-city');
    const city = citySelect ? citySelect.options[citySelect.selectedIndex].text : 'Sucre';

    // Generar Guía Oficial NubaGlow
    const guideCode = (city.includes('Sucre') ? 'NG-SUC-' : 'NG-BOL-') + Math.floor(1000 + Math.random() * 9000);

    // 1. Descontar Stock Físico en StoreDB
    const products = StoreDB.getProducts();
    const purchasedItems = [];
    CartModule.cart.forEach(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
        purchasedItems.push(`${p.name} (x${item.quantity})`);
      }
    });
    StoreDB.saveProducts(products);

    // 2. Registrar en Módulo de Cobros
    const txns = StoreDB.getTransactions();
    const newTxn = {
      id: 'TXN-' + (txns.length + 901),
      reference: document.getElementById('qr-modal-reference')?.textContent || 'NBG-998822',
      customer: AuthModule.currentUser ? AuthModule.currentUser.name : 'Cliente Web Nuba',
      amount: total,
      destination: city,
      bank: 'QR Simple Interbancario',
      status: 'Confirmado',
      timestamp: new Date().toLocaleString()
    };
    txns.unshift(newTxn);
    StoreDB.saveTransactions(txns);

    // 3. Registrar en Módulo de Logística
    const orders = StoreDB.getOrders();
    const newOrder = {
      guide: guideCode,
      customer: AuthModule.currentUser ? AuthModule.currentUser.name : 'Cliente Web Nuba',
      phone: '+59170000000',
      city: city,
      destination: city.includes('Sucre') ? 'Zona Centro / Hernando Siles' : 'Terminal / Envío Nacional',
      currentStage: 1, // En almacén
      statusText: 'Pedido confirmado, preparando empaque Eco-Glow en almacén Sucre',
      courier: city.includes('Sucre') ? 'MotoGlow Express Sucre' : 'Transportes Bolivia Express',
      eta: city.includes('Sucre') ? 'Hoy en transcurso de la tarde' : '48-72 horas hábiles',
      lastUpdate: 'Hace unos momentos (Pago confirmado)',
      items: purchasedItems,
      total: total,
      date: new Date().toLocaleDateString()
    };
    orders.unshift(newOrder);
    StoreDB.saveOrders(orders);

    // 4. Bitácora de Auditoría
    StoreDB.logEvent(`Cobro QR confirmado ${guideCode} por Bs. ${total}`, 'Banca Móvil QR', 'Cobros QR', 'EXITOSO');

    // 5. Vaciar carrito
    CartModule.cart = [];
    StoreDB.saveCart([]);
    CartModule.updateBadge();
    CartModule.render();

    // 6. Preparar WhatsApp y Modal de Confirmación
    const orderModal = document.getElementById('order-success-modal');
    const codeEl = document.getElementById('success-order-code');
    const waLink = document.getElementById('whatsapp-order-link');

    if (codeEl) codeEl.textContent = guideCode;
    if (waLink) {
      const waMsg = encodeURIComponent(`¡Hola Nuba Beauty! 🌸 Acabo de realizar mi compra por QR Simple en NubaGlow App.\n\nCódigo de Guía: ${guideCode}\nMonto Total: Bs. ${total}\nDestino: ${city}\n\nPor favor confirmen el despacho. ¡Gracias!`);
      waLink.href = `https://wa.me/59170000000?text=${waMsg}`;
    }

    if (orderModal) orderModal.classList.remove('hidden');

    if (btn) {
      btn.innerHTML = `Simular Pago Exitoso (Banca Móvil)`;
      btn.disabled = false;
    }

    // Actualizar módulos de Admin si están abiertos
    AdminModule.render();
  }, 1500);
};

window.closeSuccessModal = function() {
  const modal = document.getElementById('order-success-modal');
  if (modal) modal.classList.add('hidden');
};

/* ====================================================================================
   8. TRAZABILIDAD LOGÍSTICA & SEGUIMIENTO EN VIVO (CLIENTE)
   ==================================================================================== */
const TrackingModule = {
  init() {
    const btn = document.getElementById('tracking-search-btn');
    const input = document.getElementById('tracking-code-input');
    const pills = document.querySelectorAll('.tracking-demo-pill');

    if (btn) btn.addEventListener('click', () => this.search());
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.search();
        }
      });
    }

    pills.forEach(p => {
      p.addEventListener('click', () => {
        const code = p.getAttribute('data-code');
        if (input) input.value = code;
        this.renderTimeline(code);
      });
    });

    // Búsqueda inicial
    this.renderTimeline('NG-SUC-8924');
  },

  search() {
    const input = document.getElementById('tracking-code-input');
    if (!input || !input.value.trim()) return;
    this.renderTimeline(input.value.trim());
  },

  renderTimeline(code) {
    const card = document.getElementById('tracking-result-card');
    if (!card) return;

    const orders = StoreDB.getOrders();
    const clean = code.toUpperCase().trim();
    const data = orders.find(o => o.guide === clean) || {
      guide: clean || 'NG-SUC-8924',
      city: 'Sucre (Chuquisaca)',
      destination: 'Dirección confirmada del comprador',
      currentStage: 3,
      statusText: 'En tránsito con delivery express local',
      courier: 'MotoGlow Express Sucre',
      eta: 'Hoy entre 16:30 y 17:30',
      lastUpdate: 'Hace unos momentos (Salió de almacén central)',
      items: ['Rutina Skincare Personalizada NubaGlow'],
      total: 195
    };

    const stages = [
      { num: 1, title: 'Almacén Nuba Beauty', desc: 'Confirmación y preparación en Sucre' },
      { num: 2, title: 'Control de Calidad', desc: 'Verificación de lote y empaque Eco-Glow' },
      { num: 3, title: 'En Camino', desc: 'Courier express en ruta hacia tu ubicación' },
      { num: 4, title: 'Entrega en Mano', desc: 'Confirmación digital de entrega' }
    ];

    let stepsHtml = '';
    stages.forEach((st, idx) => {
      const isDone = st.num < data.currentStage;
      const isCurrent = st.num === data.currentStage;

      let iconBg = 'bg-neutral-100 text-neutral-400 border-neutral-200';
      if (isDone) iconBg = 'bg-emerald-500 text-white border-emerald-500';
      if (isCurrent) iconBg = 'bg-[#9C2774] text-white border-[#9C2774] ring-4 ring-[#D1A3D9]/40 animate-pulse';

      stepsHtml += `
        <div class="relative flex items-start gap-3.5 pb-6 last:pb-0">
          ${idx < stages.length - 1 ? `<div class="absolute left-4 top-8 -bottom-1 w-0.5 ${isDone ? 'bg-emerald-500' : 'bg-[#D1A3D9]/40'}"></div>` : ''}
          <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 shrink-0 ${iconBg}">
            ${isDone ? '✓' : st.num}
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-extrabold ${isCurrent ? 'text-[#9C2774]' : 'text-[#3A1033]'}">${st.title}</h4>
            <p class="text-[11px] sm:text-xs text-[#72526D]">${st.desc}</p>
            ${isCurrent ? `<span class="inline-block mt-1 text-[11px] bg-[#F7EEF8] text-[#9C2774] font-bold px-2 py-0.5 rounded-md border border-[#D1A3D9]">Etapa actual: ${data.statusText}</span>` : ''}
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="glass-panel p-6 sm:p-7 rounded-3xl border border-[#D1A3D9] shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F7EEF8] mb-6">
          <div>
            <span class="text-xs uppercase font-bold text-[#72526D] tracking-wider">Código de Rastreo</span>
            <h3 class="text-xl font-black text-[#3A1033] flex items-center gap-2">
              ${data.guide}
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${data.currentStage === 4 ? 'bg-emerald-100 text-emerald-800' : 'badge-fuchsia'}">
                ${data.currentStage === 4 ? 'Entregado' : 'En Tránsito'}
              </span>
            </h3>
          </div>
          <div class="text-right">
            <span class="text-xs uppercase font-bold text-[#72526D] tracking-wider">Destino</span>
            <p class="text-sm font-extrabold text-[#3A1033]">${data.city}</p>
            <p class="text-xs text-[#72526D]">${data.destination}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            ${stepsHtml}
          </div>

          <div class="bg-[#FDF4FA] p-5 rounded-2xl border border-[#D1A3D9]/50 flex flex-col justify-between">
            <div class="space-y-3">
              <div>
                <span class="text-[10px] text-[#72526D] font-bold uppercase block">Empresa de Despacho</span>
                <span class="text-xs font-extrabold text-[#3A1033]">${data.courier}</span>
              </div>
              <div>
                <span class="text-[10px] text-[#72526D] font-bold uppercase block">Hora Estimada de Llegada (ETA)</span>
                <span class="text-xs font-black text-[#9C2774]">${data.eta}</span>
              </div>
              <div>
                <span class="text-[10px] text-[#72526D] font-bold uppercase block">Última Actualización GPS</span>
                <span class="text-xs text-[#72526D]">${data.lastUpdate}</span>
              </div>
              <div>
                <span class="text-[10px] text-[#72526D] font-bold uppercase block">Artículos en este envío</span>
                <p class="text-xs font-medium text-[#3A1033]">${Array.isArray(data.items) ? data.items.join(', ') : data.items}</p>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-[#D1A3D9]/40 flex items-center justify-between text-xs">
              <span class="text-[#72526D]">¿Dudas con tu entrega?</span>
              <a href="https://wa.me/59170000000?text=Hola%20NubaGlow,%20consulto%20por%20mi%20guia%20${data.guide}" target="_blank" class="text-[#9C2774] font-bold hover:underline flex items-center gap-1">
                WhatsApp Sucre →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/* ====================================================================================
   9. PANEL DE ADMINISTRACIÓN (BACKROOM) CON 5 MÓDULOS CLAVE
   ==================================================================================== */
const AdminModule = {
  activeTab: 'ecommerce',

  init() {
    this.render();
  },

  switchTab(tab) {
    this.activeTab = tab;
    const tabs = ['ecommerce', 'cobros', 'logistica', 'almacen', 'seguridad'];
    
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const sec = document.getElementById(`module-${t}`);
      if (t === tab) {
        if (btn) {
          btn.className = 'admin-tab-btn badge-active-tab text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition';
          btn.setAttribute('aria-selected', 'true');
        }
        if (sec) sec.classList.remove('hidden');
      } else {
        if (btn) {
          btn.className = 'admin-tab-btn text-xs sm:text-sm font-semibold text-[#72526D] hover:bg-[#F7EEF8] hover:text-[#9C2774] px-4 py-2.5 rounded-xl flex items-center gap-2 transition';
          btn.setAttribute('aria-selected', 'false');
        }
        if (sec) sec.classList.add('hidden');
      }
    });

    this.render();
  },

  render() {
    this.renderProductsTable();
    this.renderTransactionsTable();
    this.renderOrdersTable();
    this.renderInventoryTable();
    this.renderUsersTable();
    this.renderAuditLogsTable();
  },

  // 1. Módulo E-commerce (Catálogo y Productos)
  renderProductsTable() {
    const tbody = document.getElementById('admin-products-table-body');
    if (!tbody) return;

    const products = StoreDB.getProducts();
    tbody.innerHTML = '';

    products.forEach(p => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-[#FDF4FA] transition';
      tr.innerHTML = `
        <td class="p-4">
          <div class="flex items-center gap-3">
            <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-xl object-cover border border-[#D1A3D9]">
            <div>
              <span class="font-extrabold text-[#3A1033] block">${p.name}</span>
              <span class="text-[11px] text-[#72526D]">${p.id}</span>
            </div>
          </div>
        </td>
        <td class="p-4 text-[#72526D]">${p.category}</td>
        <td class="p-4">
          <span class="badge-fuchsia text-[10px] px-2 py-0.5 rounded-full font-bold">
            ${(p.skinTypes || []).join(', ')}
          </span>
        </td>
        <td class="p-4 font-black text-[#9C2774]">Bs. ${p.price}</td>
        <td class="p-4">
          <span class="font-bold ${p.stock <= 5 ? 'text-amber-600 bg-amber-50' : 'text-emerald-700 bg-emerald-50'} px-2 py-0.5 rounded-lg text-xs">
            ${p.stock} unidades
          </span>
        </td>
        <td class="p-4 text-right">
          <button onclick="AdminModule.editProduct('${p.id}')" class="text-xs font-bold text-[#9C2774] hover:underline mr-3">
            Editar
          </button>
          <button onclick="AdminModule.deleteProduct('${p.id}')" class="text-xs font-bold text-red-600 hover:underline">
            Eliminar
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  editProduct(id) {
    const p = StoreDB.getProducts().find(prod => prod.id === id);
    if (!p) return;

    document.getElementById('product-modal-title').textContent = 'Editar Producto';
    document.getElementById('product-form-id').value = p.id;
    document.getElementById('product-form-name').value = p.name;
    document.getElementById('product-form-category').value = p.category;
    document.getElementById('product-form-price').value = p.price;
    document.getElementById('product-form-stock').value = p.stock;
    document.getElementById('product-form-badge').value = p.aiBadge || '';
    document.getElementById('product-form-image').value = p.image;
    document.getElementById('product-form-desc').value = p.description;

    const checkboxes = document.querySelectorAll('input[name="skinTypes"]');
    checkboxes.forEach(cb => {
      cb.checked = (p.skinTypes || []).includes(cb.value);
    });

    openProductModal();
  },

  deleteProduct(id) {
    if (!confirm('¿Estás seguro de eliminar este producto del catálogo?')) return;
    let products = StoreDB.getProducts();
    const target = products.find(p => p.id === id);
    products = products.filter(p => p.id !== id);
    StoreDB.saveProducts(products);
    StoreDB.logEvent(`Producto eliminado: ${target ? target.name : id}`, AuthModule.currentUser?.email, 'E-commerce', 'AVISO');
    UIModule.showToast('Producto eliminado del catálogo.', 'info');
  },

  // 2. Módulo Cobros (QR Simple & Facturación)
  renderTransactionsTable() {
    const tbody = document.getElementById('admin-transactions-table-body');
    const revenueEl = document.getElementById('stat-revenue-today');
    const countEl = document.getElementById('stat-transactions-count');
    if (!tbody) return;

    const txns = StoreDB.getTransactions();
    const totalRev = txns.reduce((s, t) => s + Number(t.amount || 0), 0);

    if (revenueEl) revenueEl.textContent = `Bs. ${totalRev.toFixed(2)}`;
    if (countEl) countEl.textContent = `${txns.length} operaciones`;

    tbody.innerHTML = '';
    txns.forEach(t => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-[#FDF4FA] transition';
      tr.innerHTML = `
        <td class="p-3.5 font-mono font-bold text-[#3A1033]">${t.reference}</td>
        <td class="p-3.5 font-extrabold text-[#3A1033]">${t.customer}</td>
        <td class="p-3.5 font-black text-[#9C2774]">Bs. ${Number(t.amount).toFixed(2)}</td>
        <td class="p-3.5 text-[#72526D]">${t.destination}</td>
        <td class="p-3.5 text-xs text-[#72526D]">${t.bank}</td>
        <td class="p-3.5">
          <span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✓ ${t.status}
          </span>
        </td>
        <td class="p-3.5 text-[11px] text-[#72526D]">${t.timestamp}</td>
        <td class="p-3.5 text-right">
          <button onclick="AdminModule.viewReceipt('${t.reference}')" class="btn-secondary-glow text-[11px] px-2.5 py-1 rounded-lg font-bold">
            Ver Recibo
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  viewReceipt(ref) {
    const txn = StoreDB.getTransactions().find(t => t.reference === ref);
    if (!txn) return;

    const content = document.getElementById('receipt-modal-content');
    if (content) {
      content.innerHTML = `
        <div class="flex justify-between border-b border-[#D1A3D9]/40 pb-2">
          <span class="text-[#72526D]">Ref. QR Simple:</span>
          <span class="font-mono font-bold text-[#3A1033]">${txn.reference}</span>
        </div>
        <div class="flex justify-between border-b border-[#D1A3D9]/40 pb-2">
          <span class="text-[#72526D]">Cliente:</span>
          <span class="font-bold text-[#3A1033]">${txn.customer}</span>
        </div>
        <div class="flex justify-between border-b border-[#D1A3D9]/40 pb-2">
          <span class="text-[#72526D]">Destino:</span>
          <span class="text-[#3A1033]">${txn.destination}</span>
        </div>
        <div class="flex justify-between border-b border-[#D1A3D9]/40 pb-2">
          <span class="text-[#72526D]">Medio de Pago:</span>
          <span class="text-[#3A1033]">${txn.bank}</span>
        </div>
        <div class="flex justify-between border-b border-[#D1A3D9]/40 pb-2">
          <span class="text-[#72526D]">Fecha / Hora:</span>
          <span class="text-[#3A1033]">${txn.timestamp}</span>
        </div>
        <div class="flex justify-between pt-1 text-sm font-black">
          <span class="text-[#3A1033]">Monto Pagado:</span>
          <span class="text-[#9C2774]">Bs. ${Number(txn.amount).toFixed(2)}</span>
        </div>
      `;
    }
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.remove('hidden');
  },

  // 3. Módulo Distribución / Logística
  renderOrdersTable() {
    const tbody = document.getElementById('admin-orders-table-body');
    if (!tbody) return;

    const orders = StoreDB.getOrders();
    tbody.innerHTML = '';

    orders.forEach(o => {
      const stages = ['Almacén', 'Control Calidad', 'En Camino', 'Entregado'];
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-[#FDF4FA] transition';

      tr.innerHTML = `
        <td class="p-3.5 font-mono font-bold text-[#9C2774]">${o.guide}</td>
        <td class="p-3.5">
          <span class="font-extrabold text-[#3A1033] block">${o.customer}</span>
          <span class="text-[10px] text-[#72526D]">${o.phone || '+591'}</span>
        </td>
        <td class="p-3.5">
          <span class="font-bold text-[#3A1033] block">${o.city}</span>
          <span class="text-[10px] text-[#72526D] truncate max-w-[150px] block">${o.destination}</span>
        </td>
        <td class="p-3.5 text-xs text-[#72526D]">${o.courier}</td>
        <td class="p-3.5">
          <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${o.currentStage === 4 ? 'bg-emerald-100 text-emerald-800' : 'badge-fuchsia'}">
            ${stages[o.currentStage - 1] || 'En Proceso'}
          </span>
        </td>
        <td class="p-3.5">
          <select onchange="AdminModule.updateOrderStatus('${o.guide}', this.value)" class="bg-[#FDF4FA] border border-[#D1A3D9] text-xs rounded-lg px-2 py-1 text-[#3A1033] focus:ring-1 focus:ring-[#9C2774]">
            <option value="1" ${o.currentStage === 1 ? 'selected' : ''}>1. Almacén</option>
            <option value="2" ${o.currentStage === 2 ? 'selected' : ''}>2. Control Calidad</option>
            <option value="3" ${o.currentStage === 3 ? 'selected' : ''}>3. En Camino</option>
            <option value="4" ${o.currentStage === 4 ? 'selected' : ''}>4. Entregado</option>
          </select>
        </td>
        <td class="p-3.5 text-right">
          <a href="https://wa.me/${(o.phone || '59170000000').replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(o.customer)},%20te%20escribimos%20de%20Nuba%20Beauty%20sobre%20tu%20guia%20${o.guide}" target="_blank" class="text-emerald-700 hover:underline font-bold text-xs inline-flex items-center gap-1">
            💬 WhatsApp
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  updateOrderStatus(guide, newStage) {
    const orders = StoreDB.getOrders();
    const ord = orders.find(o => o.guide === guide);
    if (!ord) return;

    ord.currentStage = parseInt(newStage, 10);
    const statusTexts = {
      1: 'Preparando paquete en almacén central Sucre',
      2: 'Verificación de lote dermatológico completada',
      3: 'En camino con delivery express hacia tu dirección',
      4: 'Entregado a conformidad del cliente'
    };
    ord.statusText = statusTexts[ord.currentStage] || 'En proceso';
    ord.lastUpdate = 'Actualizado por logística hace instantes';

    StoreDB.saveOrders(orders);
    StoreDB.logEvent(`Estado de guía ${guide} actualizado a etapa ${newStage}`, AuthModule.currentUser?.email, 'Logística', 'INFO');
    UIModule.showToast(`Guía ${guide} actualizada a etapa ${newStage}.`, 'success');

    // Sincronizar vista pública de tracking
    TrackingModule.renderTimeline(guide);
  },

  // 4. Módulo Almacén (Inventario Físico)
  renderInventoryTable() {
    const tbody = document.getElementById('admin-inventory-table-body');
    const alertBanner = document.getElementById('low-stock-alert-banner');
    const alertText = document.getElementById('low-stock-alert-text');
    if (!tbody) return;

    const products = StoreDB.getProducts();
    tbody.innerHTML = '';

    const lowStock = products.filter(p => p.stock <= 5);
    if (alertBanner) {
      if (lowStock.length > 0) {
        alertBanner.classList.remove('hidden');
        if (alertText) {
          alertText.textContent = `Atención: Hay ${lowStock.length} producto(s) en punto de reorden urgente (<= 5 unidades en Sucre): ${lowStock.map(p => p.name).join(', ')}.`;
        }
      } else {
        alertBanner.classList.add('hidden');
      }
    }

    products.forEach((p, idx) => {
      const isLow = p.stock <= 5;
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-[#FDF4FA] transition';
      tr.innerHTML = `
        <td class="p-3.5">
          <span class="font-extrabold text-[#3A1033] block">${p.name}</span>
          <span class="text-[11px] text-[#72526D]">${p.category}</span>
        </td>
        <td class="p-3.5 font-mono text-xs font-bold text-[#72526D]">SKU-NB-00${idx + 1}</td>
        <td class="p-3.5 text-xs text-[#72526D]">Almacén Central Sucre (Zona San Roque)</td>
        <td class="p-3.5">
          <span class="text-sm font-black ${isLow ? 'text-red-600' : 'text-emerald-700'}">
            ${p.stock} unidades
          </span>
        </td>
        <td class="p-3.5">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${isLow ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
            ${isLow ? '⚠️ Reorden Urgente' : '✓ Stock OK'}
          </span>
        </td>
        <td class="p-3.5 text-right">
          <button onclick="AdminModule.quickAddStock('${p.id}', 5)" class="btn-secondary-glow text-[11px] px-2.5 py-1 rounded-lg font-bold" title="Añadir 5 unidades de stock físico">
            +5 uds
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  quickAddStock(productId, delta) {
    const products = StoreDB.getProducts();
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    p.stock += delta;
    StoreDB.saveProducts(products);
    StoreDB.logEvent(`Ingreso rápido de +${delta} unidades en "${p.name}"`, AuthModule.currentUser?.email, 'Almacén', 'INFO');
    UIModule.showToast(`Se ingresaron +${delta} unidades a ${p.name}.`, 'success');
  },

  // 5. Módulo Seguridad & Roles
  renderUsersTable() {
    const tbody = document.getElementById('admin-users-table-body');
    if (!tbody) return;

    const users = StoreDB.getUsers();
    tbody.innerHTML = '';

    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-[#FDF4FA] transition';
      tr.innerHTML = `
        <td class="p-3.5 font-extrabold text-[#3A1033]">${u.name}</td>
        <td class="p-3.5 text-xs text-[#72526D]">${u.email}</td>
        <td class="p-3.5">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full badge-fuchsia">
            ${AuthModule.getRoleLabel(u.role)}
          </span>
        </td>
        <td class="p-3.5 text-xs text-[#72526D]">${u.created || '01/09/2026'}</td>
        <td class="p-3.5 text-right">
          <button onclick="AdminModule.editUser(${u.id})" class="text-xs font-bold text-[#9C2774] hover:underline mr-3">
            Editar Rol
          </button>
          ${u.role !== 'administrador' ? `
            <button onclick="AdminModule.deleteUser(${u.id})" class="text-xs font-bold text-red-600 hover:underline">
              Eliminar
            </button>
          ` : '<span class="text-[10px] text-neutral-400 font-bold">Principal</span>'}
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  editUser(id) {
    const user = StoreDB.getUsers().find(u => u.id === id);
    if (!user) return;

    document.getElementById('user-modal-title').textContent = 'Editar Usuario';
    document.getElementById('user-form-id').value = user.id;
    document.getElementById('user-form-name').value = user.name;
    document.getElementById('user-form-email').value = user.email;
    document.getElementById('user-form-role').value = user.role;

    openUserModal();
  },

  deleteUser(id) {
    if (!confirm('¿Eliminar este usuario de seguridad?')) return;
    let users = StoreDB.getUsers();
    const target = users.find(u => u.id === id);
    users = users.filter(u => u.id !== id);
    StoreDB.saveUsers(users);
    StoreDB.logEvent(`Usuario eliminado: ${target?.email}`, AuthModule.currentUser?.email, 'Seguridad', 'AVISO');
    this.renderUsersTable();
    UIModule.showToast('Usuario eliminado del sistema.', 'info');
  },

  renderAuditLogsTable() {
    const tbody = document.getElementById('admin-audit-logs-table-body');
    if (!tbody) return;

    const logs = StoreDB.getAuditLogs();
    tbody.innerHTML = '';

    logs.forEach(l => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="p-2.5 text-[#72526D]">${l.timestamp}</td>
        <td class="p-2.5 font-bold text-[#3A1033]">${l.user}</td>
        <td class="p-2.5 text-[#3A1033]">${l.event}</td>
        <td class="p-2.5 text-[#72526D]">${l.module}</td>
        <td class="p-2.5 text-right">
          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${l.status === 'EXITOSO' ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F7EEF8] text-[#9C2774]'}">
            ${l.status}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
};

window.switchAdminTab = function(tab) {
  AdminModule.switchTab(tab);
};

/* ====================================================================================
   10. GESTIÓN DE MODALES DE PRODUCTO, USUARIO & ALMACÉN
   ==================================================================================== */
window.openProductModal = function() {
  const m = document.getElementById('product-modal');
  if (m) m.classList.remove('hidden');
};

window.closeProductModal = function() {
  const m = document.getElementById('product-modal');
  if (m) {
    m.classList.add('hidden');
    document.getElementById('product-form').reset();
    document.getElementById('product-form-id').value = '';
    document.getElementById('product-modal-title').textContent = 'Crear Nuevo Producto';
  }
};

window.handleProductFormSubmit = function(e) {
  e.preventDefault();
  const idInput = document.getElementById('product-form-id').value;
  const name = document.getElementById('product-form-name').value.trim();
  const category = document.getElementById('product-form-category').value;
  const price = parseFloat(document.getElementById('product-form-price').value);
  const stock = parseInt(document.getElementById('product-form-stock').value, 10);
  const badge = document.getElementById('product-form-badge').value.trim();
  const image = document.getElementById('product-form-image').value.trim() || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';
  const desc = document.getElementById('product-form-desc').value.trim();

  const skinTypes = [];
  document.querySelectorAll('input[name="skinTypes"]:checked').forEach(cb => skinTypes.push(cb.value));

  let products = StoreDB.getProducts();

  if (idInput) {
    // Editar
    const p = products.find(prod => prod.id === idInput);
    if (p) {
      p.name = name;
      p.category = category;
      p.price = price;
      p.stock = stock;
      p.aiBadge = badge;
      p.image = image;
      p.description = desc;
      p.skinTypes = skinTypes.length ? skinTypes : ['mixta'];
      StoreDB.logEvent(`Producto modificado: ${name}`, AuthModule.currentUser?.email, 'E-commerce', 'INFO');
    }
  } else {
    // Crear
    const newId = 'prod-' + (products.length + 1);
    products.push({
      id: newId,
      name,
      category,
      price,
      stock,
      aiBadge: badge || 'Nuevo Lanzamiento ✨',
      tag: 'Novedad',
      rating: 5.0,
      reviews: 1,
      image,
      description: desc,
      skinTypes: skinTypes.length ? skinTypes : ['mixta']
    });
    StoreDB.logEvent(`Nuevo producto creado: ${name} (Stock: ${stock})`, AuthModule.currentUser?.email, 'E-commerce', 'INFO');
  }

  StoreDB.saveProducts(products);
  closeProductModal();
  UIModule.showToast('Producto guardado y sincronizado con éxito.', 'success');
};

window.openUserModal = function() {
  const m = document.getElementById('user-modal');
  if (m) m.classList.remove('hidden');
};

window.closeUserModal = function() {
  const m = document.getElementById('user-modal');
  if (m) {
    m.classList.add('hidden');
    document.getElementById('user-form').reset();
    document.getElementById('user-form-id').value = '';
    document.getElementById('user-modal-title').textContent = 'Crear Nuevo Usuario';
  }
};

window.handleUserFormSubmit = function(e) {
  e.preventDefault();
  const idInput = document.getElementById('user-form-id').value;
  const name = document.getElementById('user-form-name').value.trim();
  const email = document.getElementById('user-form-email').value.trim();
  const role = document.getElementById('user-form-role').value;

  let users = StoreDB.getUsers();

  if (idInput) {
    const user = users.find(u => u.id === parseInt(idInput, 10));
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      StoreDB.logEvent(`Usuario actualizado: ${email} -> ${role}`, AuthModule.currentUser?.email, 'Seguridad', 'INFO');
    }
  } else {
    users.push({
      id: Date.now(),
      name,
      email,
      role,
      created: new Date().toLocaleDateString()
    });
    StoreDB.logEvent(`Nuevo usuario registrado: ${email} (${role})`, AuthModule.currentUser?.email, 'Seguridad', 'INFO');
  }

  StoreDB.saveUsers(users);
  closeUserModal();
  AdminModule.renderUsersTable();
  UIModule.showToast('Usuario guardado en el sistema de seguridad.', 'success');
};

window.openRestockModal = function() {
  const select = document.getElementById('restock-product-select');
  if (select) {
    const products = StoreDB.getProducts();
    select.innerHTML = products.map(p => `
      <option value="${p.id}">${p.name} (Stock actual: ${p.stock} uds)</option>
    `).join('');
  }
  const m = document.getElementById('restock-modal');
  if (m) m.classList.remove('hidden');
};

window.closeRestockModal = function() {
  const m = document.getElementById('restock-modal');
  if (m) m.classList.add('hidden');
};

window.handleRestockSubmit = function(e) {
  e.preventDefault();
  const select = document.getElementById('restock-product-select');
  const qtyInput = document.getElementById('restock-qty-input');
  const batchInput = document.getElementById('restock-batch-input');

  const productId = select.value;
  const qty = parseInt(qtyInput.value, 10);
  const batch = batchInput.value.trim() || 'LOTE-SUC';

  const products = StoreDB.getProducts();
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  p.stock += qty;
  StoreDB.saveProducts(products);
  StoreDB.logEvent(`Recepción de mercadería: +${qty} uds de "${p.name}" (Lote: ${batch})`, AuthModule.currentUser?.email, 'Almacén', 'EXITOSO');

  closeRestockModal();
  UIModule.showToast(`Se recepcionaron +${qty} unidades de "${p.name}".`, 'success');
};

window.closeReceiptModal = function() {
  const m = document.getElementById('receipt-modal');
  if (m) m.classList.add('hidden');
};

window.exportTransactionsCSV = function() {
  const txns = StoreDB.getTransactions();
  let csv = 'Referencia,Cliente,Monto,Destino,Banco,Estado,Fecha\n';
  txns.forEach(t => {
    csv += `"${t.reference}","${t.customer}","${t.amount}","${t.destination}","${t.bank}","${t.status}","${t.timestamp}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NubaGlow_Reporte_Cobros_${Date.now()}.csv`;
  a.click();
  UIModule.showToast('Reporte de cobros exportado en formato CSV.', 'success');
};

/* ====================================================================================
   11. FORMULARIO DE CONTACTO & NOTIFICACIONES (TOAST)
   ==================================================================================== */
const ContactModule = {
  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const city = form.querySelector('[name="city"]')?.value || 'Bolivia';
      const msg = form.querySelector('[name="message"]')?.value || '';

      if (!name || !email || !msg) {
        UIModule.showToast('Por favor completa todos los campos del formulario.', 'warning');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Enviar Mensaje a NubaGlow</span>`;
        }
        UIModule.showToast(`¡Gracias ${name}! Tu consulta ha sido enviada al equipo de Nuba Beauty en ${city}. Te contactaremos pronto.`, 'success');
      }, 900);
    });
  }
};

const UIModule = {
  init() {
    this.setupMobileMenu();
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-[90%] sm:w-auto pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const styles = {
      success: 'bg-white border-[#D1A3D9] text-[#3A1033]',
      warning: 'bg-amber-50 border-amber-300 text-amber-900',
      info: 'bg-white border-[#D1A3D9]/60 text-[#3A1033]'
    };
    const icons = { success: '✨', warning: '⚠️', info: 'ℹ️' };

    toast.className = `pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 transition-all duration-300 transform translate-y-3 opacity-0 toast-glow ${styles[type] || styles.info}`;
    toast.innerHTML = `
      <span class="text-base">${icons[type] || '✨'}</span>
      <div class="flex-1 text-xs sm:text-sm font-semibold leading-snug">${message}</div>
      <button onclick="this.parentElement.remove()" class="text-[#72526D] hover:text-[#3A1033] font-bold text-xs p-0.5">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !mobileMenu) return;

    const toggle = (open) => {
      if (open) mobileMenu.classList.remove('hidden');
      else mobileMenu.classList.add('hidden');
    };

    toggleBtn.addEventListener('click', () => toggle(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
    links.forEach(l => l.addEventListener('click', () => toggle(false)));
  }
};

window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

