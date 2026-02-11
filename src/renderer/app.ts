// Renderer process entry point
// This module sets up UI handlers that will interact with Electron preload APIs

// Type declaration for window.api (will be properly typed in later steps)
// Using any for window.api until global types are added in later steps
interface WindowWithApi extends Window {
  api?: any;
}

// DOM element references
let loginSection: HTMLElement;
let uploadSection: HTMLElement;
let validationSection: HTMLElement;
let reportsSection: HTMLElement;
let userInfo: HTMLElement;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('ENSALUD Presupuestal - Renderer initialized');
  
  // Get DOM element references
  loginSection = document.getElementById('login-section')!;
  uploadSection = document.getElementById('upload-section')!;
  validationSection = document.getElementById('validation-section')!;
  reportsSection = document.getElementById('reports-section')!;
  userInfo = document.getElementById('user-info')!;
  
  // Set up event listeners
  setupLoginHandlers();
  setupUploadHandlers();
  setupValidationHandlers();
  setupReportsHandlers();
});

// Login handlers
function setupLoginHandlers() {
  const loginBtn = document.getElementById('login-btn');
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const loginStatus = document.getElementById('login-status')!;

  loginBtn?.addEventListener('click', async () => {
    const username = usernameInput?.value;
    const password = passwordInput?.value;
    
    if (!username || !password) {
      showStatus(loginStatus, 'Por favor ingrese usuario y contraseña', 'error');
      return;
    }

    try {
      // Call window.api.login when preload/main IPC is implemented
      const win = window as WindowWithApi;
      if (win.api && win.api.login) {
        const result = await win.api.login({ username, password });
        if (result.success) {
          showStatus(loginStatus, 'Inicio de sesión exitoso', 'success');
          userInfo.textContent = `Usuario: ${username}`;
          showSection('upload');
        } else {
          showStatus(loginStatus, result.message || 'Error al iniciar sesión', 'error');
        }
      } else {
        // Mock response for development until IPC is implemented
        console.log('Login attempt:', { username });
        showStatus(loginStatus, 'API no disponible (modo desarrollo)', 'info');
        userInfo.textContent = `Usuario: ${username}`;
        showSection('upload');
      }
    } catch (error) {
      showStatus(loginStatus, `Error: ${error}`, 'error');
    }
  });
}

// Upload handlers
function setupUploadHandlers() {
  const uploadBtn = document.getElementById('upload-btn');
  const fileInput = document.getElementById('file-upload') as HTMLInputElement;
  const uploadStatus = document.getElementById('upload-status')!;

  uploadBtn?.addEventListener('click', async () => {
    const file = fileInput?.files?.[0];
    
    if (!file) {
      showStatus(uploadStatus, 'Por favor seleccione un archivo', 'error');
      return;
    }

    try {
      // Call window.api.uploadFile when preload/main IPC is implemented
      const win = window as WindowWithApi;
      if (win.api && win.api.uploadFile) {
        // Note: file.path is an Electron extension not in standard File API
        const result = await win.api.uploadFile({ filePath: (file as any).path || file.name });
        if (result.success) {
          showStatus(uploadStatus, 'Archivo cargado exitosamente', 'success');
          showSection('validation');
        } else {
          showStatus(uploadStatus, result.message || 'Error al cargar archivo', 'error');
        }
      } else {
        // Mock response for development
        console.log('Upload attempt:', file.name);
        showStatus(uploadStatus, `Archivo seleccionado: ${file.name} (API no disponible)`, 'info');
        showSection('validation');
      }
    } catch (error) {
      showStatus(uploadStatus, `Error: ${error}`, 'error');
    }
  });
}

// Validation handlers
function setupValidationHandlers() {
  const validateBtn = document.getElementById('validate-btn');
  const transformBtn = document.getElementById('transform-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const validationStatus = document.getElementById('validation-status')!;

  validateBtn?.addEventListener('click', async () => {
    try {
      const win = window as WindowWithApi;
      if (win.api && win.api.validateData) {
        const result = await win.api.validateData();
        showStatus(validationStatus, result.message || 'Validación completada', result.success ? 'success' : 'error');
      } else {
        console.log('Validate data');
        showStatus(validationStatus, 'Datos validados (modo desarrollo)', 'info');
      }
    } catch (error) {
      showStatus(validationStatus, `Error: ${error}`, 'error');
    }
  });

  transformBtn?.addEventListener('click', async () => {
    try {
      const win = window as WindowWithApi;
      if (win.api && win.api.transformData) {
        const result = await win.api.transformData();
        showStatus(validationStatus, result.message || 'Transformación completada', result.success ? 'success' : 'error');
      } else {
        console.log('Transform data');
        showStatus(validationStatus, 'Datos transformados (modo desarrollo)', 'info');
      }
    } catch (error) {
      showStatus(validationStatus, `Error: ${error}`, 'error');
    }
  });

  calculateBtn?.addEventListener('click', async () => {
    try {
      const win = window as WindowWithApi;
      if (win.api && win.api.calculateBudget) {
        const result = await win.api.calculateBudget();
        if (result.success) {
          showStatus(validationStatus, 'Cálculo completado', 'success');
          showSection('reports');
        } else {
          showStatus(validationStatus, result.message || 'Error en cálculo', 'error');
        }
      } else {
        console.log('Calculate budget');
        showStatus(validationStatus, 'Presupuesto calculado (modo desarrollo)', 'info');
        showSection('reports');
      }
    } catch (error) {
      showStatus(validationStatus, `Error: ${error}`, 'error');
    }
  });
}

// Reports handlers
function setupReportsHandlers() {
  const exportBtn = document.getElementById('export-btn');
  const reportsStatus = document.getElementById('reports-status')!;

  exportBtn?.addEventListener('click', async () => {
    try {
      const win = window as WindowWithApi;
      if (win.api && win.api.exportReport) {
        const result = await win.api.exportReport();
        showStatus(reportsStatus, result.message || 'Reporte exportado', result.success ? 'success' : 'error');
      } else {
        console.log('Export report');
        showStatus(reportsStatus, 'Reporte exportado (modo desarrollo)', 'info');
      }
    } catch (error) {
      showStatus(reportsStatus, `Error: ${error}`, 'error');
    }
  });
}

// Utility functions
function showSection(section: 'login' | 'upload' | 'validation' | 'reports') {
  // Hide all sections
  loginSection.classList.add('hidden');
  uploadSection.classList.add('hidden');
  validationSection.classList.add('hidden');
  reportsSection.classList.add('hidden');
  
  // Show requested section
  switch (section) {
    case 'login':
      loginSection.classList.remove('hidden');
      break;
    case 'upload':
      uploadSection.classList.remove('hidden');
      break;
    case 'validation':
      validationSection.classList.remove('hidden');
      break;
    case 'reports':
      reportsSection.classList.remove('hidden');
      break;
  }
}

function showStatus(element: HTMLElement, message: string, type: 'success' | 'error' | 'info') {
  element.textContent = message;
  element.className = `status-message ${type}`;
}
