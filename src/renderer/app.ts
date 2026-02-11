const loginSection = document.getElementById('login')!;
loginSection.innerHTML = `
  <h2>Inicio de sesión</h2>
  <input id="user" placeholder="Usuario" />
  <input id="pass" type="password" placeholder="Contraseña" />
  <button id="loginBtn">Ingresar</button>
`;
document.getElementById('loginBtn')!.addEventListener('click', async () => {
  const username = (document.getElementById('user') as HTMLInputElement).value;
  const password = (document.getElementById('pass') as HTMLInputElement).value;
  const result = await window.api.login(username, password);
  alert(result?.success ? 'Login exitoso' : 'Usuario o contraseña incorrectos');
});

const uploadSection = document.getElementById('upload')!;
uploadSection.innerHTML = `
  <h2>Cargar archivo normalizado</h2>
  <input id="filePath" placeholder="Ruta del archivo .csv/.xlsx" />
  <button id="uploadBtn">Cargar y procesar</button>
`;
document.getElementById('uploadBtn')!.addEventListener('click', async () => {
  const filePath = (document.getElementById('filePath') as HTMLInputElement).value;
  await window.api.uploadNormalizedFile(filePath);
  await window.api.validateBuffer();
  await window.api.transformData();
  await window.api.runBudgetCalculations();
  alert('Proceso completado');
});

const validationSection = document.getElementById('validation')!;
validationSection.innerHTML = `
  <h2>Resultados de validación</h2>
  <p>Se mostrarán aquí los errores y advertencias.</p>
`;

const reportsSection = document.getElementById('reports')!;
reportsSection.innerHTML = `
  <h2>Exportar reportes</h2>
  <select id="reportType">
    <option value="executionByCostCenter">Ejecución Presupuestal por CeCo</option>
    <option value="pnlComparative">Estado de Resultados Integral</option>
    <option value="consolidatedByAccount">Consolidado por Rubro</option>
    <option value="supportUnitsDistribution">Distribución Costos Unidades Apoyo</option>
  </select>
  <button id="exportBtn">Exportar Excel</button>
`;
document.getElementById('exportBtn')!.addEventListener('click', async () => {
  const type = (document.getElementById('reportType') as HTMLSelectElement).value;
  const filters = { period: '2026-01..2026-03' };
  const res = await window.api.exportReport(type, filters);
  alert(res.success ? `Reporte guardado en: ${res.filePath}` : 'Exportación cancelada');
});
