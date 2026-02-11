// Renderer process application logic

// State management
let currentUser: any = null;
let selectedFilePath: string | null = null;

// Get DOM elements
const loginSection = document.getElementById('login-section')!;
const mainApp = document.getElementById('main-app')!;
const userInfo = document.getElementById('user-info')!;
const usernameDisplay = document.getElementById('username')!;

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const usernameInput = document.getElementById('username-input') as HTMLInputElement;
const passwordInput = document.getElementById('password-input') as HTMLInputElement;
const loginMessage = document.getElementById('login-message')!;
const logoutBtn = document.getElementById('logout-btn')!;

const selectFileBtn = document.getElementById('select-file-btn')!;
const selectedFileDisplay = document.getElementById('selected-file')!;
const uploadBtn = document.getElementById('upload-btn') as HTMLButtonElement;
const uploadMessage = document.getElementById('upload-message')!;

const validateBtn = document.getElementById('validate-btn')!;
const transformBtn = document.getElementById('transform-btn')!;
const validationMessage = document.getElementById('validation-message')!;
const validationDetails = document.getElementById('validation-details')!;

const calculateBtn = document.getElementById('calculate-btn')!;
const calculationMessage = document.getElementById('calculation-message')!;
const calculationResults = document.getElementById('calculation-results')!;

const reportTypeSelect = document.getElementById('report-type') as HTMLSelectElement;
const exportReportBtn = document.getElementById('export-report-btn')!;
const reportMessage = document.getElementById('report-message')!;

// Utility functions
function showMessage(element: HTMLElement, message: string, type: 'success' | 'error' | 'info') {
  element.textContent = message;
  element.className = `message ${type}`;
  element.style.display = 'block';
}

function hideMessage(element: HTMLElement) {
  element.style.display = 'none';
  element.className = 'message';
}

// Authentication handlers
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideMessage(loginMessage);

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showMessage(loginMessage, 'Por favor ingrese usuario y contraseña', 'error');
    return;
  }

  try {
    const result = await window.api.login({ username, password });
    
    if (result.success && result.user) {
      currentUser = result.user;
      usernameDisplay.textContent = result.user.username;
      
      // Show main app, hide login
      loginSection.style.display = 'none';
      mainApp.style.display = 'block';
      userInfo.style.display = 'flex';
      
      showMessage(loginMessage, result.message, 'success');
    } else {
      showMessage(loginMessage, result.message || 'Error al iniciar sesión', 'error');
    }
  } catch (error) {
    showMessage(loginMessage, 'Error de conexión', 'error');
    console.error('Login error:', error);
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await window.api.logout();
    currentUser = null;
    selectedFilePath = null;
    
    // Reset UI
    loginSection.style.display = 'block';
    mainApp.style.display = 'none';
    userInfo.style.display = 'none';
    
    loginForm.reset();
    selectedFileDisplay.textContent = 'Ningún archivo seleccionado';
    uploadBtn.disabled = true;
    
    // Clear messages
    hideMessage(uploadMessage);
    hideMessage(validationMessage);
    hideMessage(calculationMessage);
    hideMessage(reportMessage);
    validationDetails.innerHTML = '';
    calculationResults.innerHTML = '';
  } catch (error) {
    console.error('Logout error:', error);
  }
});

// File upload handlers
selectFileBtn.addEventListener('click', async () => {
  try {
    const filePath = await window.api.selectFile();
    
    if (filePath) {
      selectedFilePath = filePath;
      selectedFileDisplay.textContent = filePath;
      uploadBtn.disabled = false;
      hideMessage(uploadMessage);
    }
  } catch (error) {
    showMessage(uploadMessage, 'Error al seleccionar archivo', 'error');
    console.error('File selection error:', error);
  }
});

uploadBtn.addEventListener('click', async () => {
  if (!selectedFilePath) {
    showMessage(uploadMessage, 'Por favor seleccione un archivo primero', 'error');
    return;
  }

  hideMessage(uploadMessage);
  uploadBtn.disabled = true;

  try {
    const result = await window.api.uploadFile(selectedFilePath);
    
    if (result.success) {
      showMessage(uploadMessage, 
        `${result.message}. Registros: ${result.recordCount || 0}`, 
        'success');
    } else {
      showMessage(uploadMessage, 
        `Error: ${result.message}. ${result.errors?.join(', ') || ''}`, 
        'error');
    }
  } catch (error) {
    showMessage(uploadMessage, 'Error al cargar archivo', 'error');
    console.error('Upload error:', error);
  } finally {
    uploadBtn.disabled = false;
  }
});

// Validation handlers
validateBtn.addEventListener('click', async () => {
  hideMessage(validationMessage);
  validationDetails.innerHTML = '';

  try {
    const report = await window.api.validateData();
    
    if (report.valid) {
      showMessage(validationMessage, 
        `Validación exitosa. Total: ${report.totalRecords}, Válidos: ${report.validRecords}`, 
        'success');
    } else {
      showMessage(validationMessage, 
        `Validación completada con errores. Inválidos: ${report.invalidRecords}`, 
        'error');
    }

    // Show details
    if (report.details && report.details.length > 0) {
      validationDetails.innerHTML = '<strong>Detalles:</strong><br>' + 
        report.details.map(d => 
          `Fila ${d.row}, Col: ${d.column} - ${d.issue} (${d.severity})`
        ).join('<br>');
    } else {
      validationDetails.innerHTML = report.summary;
    }
  } catch (error) {
    showMessage(validationMessage, 'Error al validar datos', 'error');
    console.error('Validation error:', error);
  }
});

transformBtn.addEventListener('click', async () => {
  hideMessage(validationMessage);

  try {
    const result = await window.api.transformData();
    
    if (result.success) {
      showMessage(validationMessage, result.message, 'success');
    } else {
      showMessage(validationMessage, 
        `Error: ${result.message}. ${result.errors?.join(', ') || ''}`, 
        'error');
    }
  } catch (error) {
    showMessage(validationMessage, 'Error al transformar datos', 'error');
    console.error('Transform error:', error);
  }
});

// Calculation handlers
calculateBtn.addEventListener('click', async () => {
  hideMessage(calculationMessage);
  calculationResults.innerHTML = '';

  try {
    const summary = await window.api.runCalculations();
    
    showMessage(calculationMessage, 'Cálculos completados exitosamente', 'success');
    
    // Display results
    calculationResults.innerHTML = `
      <strong>Resumen de Cálculos:</strong><br>
      Presupuesto Total: S/. ${summary.totalBudget.toLocaleString('es-PE', { minimumFractionDigits: 2 })}<br>
      Presupuesto Asignado: S/. ${summary.allocatedBudget.toLocaleString('es-PE', { minimumFractionDigits: 2 })}<br>
      Presupuesto Restante: S/. ${summary.remainingBudget.toLocaleString('es-PE', { minimumFractionDigits: 2 })}<br>
      <br>
      <strong>Detalles:</strong><br>
      ${Object.entries(summary.calculations).map(([key, value]) => 
        `${key}: S/. ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`
      ).join('<br>')}<br>
      <br>
      <em>Fecha: ${new Date(summary.timestamp).toLocaleString('es-PE')}</em>
    `;
  } catch (error) {
    showMessage(calculationMessage, 'Error al ejecutar cálculos', 'error');
    console.error('Calculation error:', error);
  }
});

// Report export handlers
exportReportBtn.addEventListener('click', async () => {
  hideMessage(reportMessage);

  const reportType = reportTypeSelect.value;
  const filters = {}; // TODO: Add filter UI
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = `report_${timestamp}.${reportType === 'excel' ? 'xlsx' : reportType}`;

  try {
    const result = await window.api.exportReport(reportType, filters, filePath);
    
    if (result.success) {
      showMessage(reportMessage, 
        `${result.message}. Archivo: ${result.filePath}`, 
        'success');
    } else {
      showMessage(reportMessage, 
        `Error: ${result.message}. ${result.error || ''}`, 
        'error');
    }
  } catch (error) {
    showMessage(reportMessage, 'Error al exportar reporte', 'error');
    console.error('Export error:', error);
  }
});

// Initialize
console.log('ENSALUD Presupuestal - Application loaded');
