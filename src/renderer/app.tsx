import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Type definition for window.api
declare global {
  interface Window {
    api: {
      ping: () => Promise<string>;
      getAppVersion: () => Promise<string>;
      importFile: (filePath: string) => Promise<{ success: boolean; message: string }>;
      validateData: (data: unknown) => Promise<{ valid: boolean; errors: string[] }>;
      calculate: (data: unknown) => Promise<{ success: boolean; result: unknown }>;
      generateReport: (params: unknown) => Promise<{ success: boolean; reportPath: string | null }>;
    };
  }
}

const App: React.FC = () => {
  const [version, setVersion] = useState<string>('');
  const [pingResult, setPingResult] = useState<string>('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    // Load app version on mount
    window.api.getAppVersion().then(v => setVersion(v));
  }, []);

  const handlePing = async () => {
    try {
      const result = await window.api.ping();
      setPingResult(result);
      setStatus({ type: 'success', message: `IPC Test: ${result}` });
    } catch (error) {
      setStatus({ type: 'error', message: `Error: ${error}` });
    }
  };

  const handleImport = async () => {
    try {
      const result = await window.api.importFile('/path/to/file.xlsx');
      setStatus({ type: 'info', message: result.message });
    } catch (error) {
      setStatus({ type: 'error', message: `Import error: ${error}` });
    }
  };

  const handleValidate = async () => {
    try {
      const result = await window.api.validateData({ test: 'data' });
      setStatus({ 
        type: result.valid ? 'success' : 'error', 
        message: result.valid ? 'Validation passed' : 'Validation failed' 
      });
    } catch (error) {
      setStatus({ type: 'error', message: `Validation error: ${error}` });
    }
  };

  const handleCalculate = async () => {
    try {
      const result = await window.api.calculate({ test: 'data' });
      setStatus({ 
        type: result.success ? 'success' : 'error', 
        message: result.success ? 'Calculation completed' : 'Calculation failed' 
      });
    } catch (error) {
      setStatus({ type: 'error', message: `Calculation error: ${error}` });
    }
  };

  const handleReport = async () => {
    try {
      const result = await window.api.generateReport({ test: 'params' });
      setStatus({ 
        type: result.success ? 'success' : 'error', 
        message: result.success ? 'Report generated' : 'Report generation failed' 
      });
    } catch (error) {
      setStatus({ type: 'error', message: `Report error: ${error}` });
    }
  };

  return (
    <div>
      <div className="header">
        <h1>ENSALUD Presupuestal</h1>
        <p>Sistema de Automatización Presupuestal</p>
        {version && <p style={{ fontSize: '0.9em', marginTop: '10px' }}>Versión: {version}</p>}
      </div>
      
      <div className="container">
        <div className="card">
          <h2>Prueba de Comunicación IPC</h2>
          <p>Verifica que la comunicación entre el proceso principal y el renderer funciona correctamente.</p>
          <button className="button" onClick={handlePing}>Probar IPC (Ping)</button>
          {pingResult && <p style={{ marginTop: '10px' }}>Resultado: {pingResult}</p>}
        </div>

        <div className="card">
          <h2>Funcionalidades del Sistema</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
            <button className="button" onClick={handleImport}>Importar Archivo</button>
            <button className="button" onClick={handleValidate}>Validar Datos</button>
            <button className="button" onClick={handleCalculate}>Calcular</button>
            <button className="button" onClick={handleReport}>Generar Reporte</button>
          </div>
        </div>

        {status && (
          <div className={`status ${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
