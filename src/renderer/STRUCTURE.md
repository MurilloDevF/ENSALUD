# Frontend (Renderer) – Estructura sugerida

Ubicación: `src/renderer/`

## Subcarpetas recomendadas
- `pages/`              # Vistas de alto nivel (Dashboard, Reportes, Configuración)
- `components/`         # Componentes reutilizables (Tabla Pivot, Filtros, Selectores)
- `layouts/`            # Contenedores comunes (barra lateral, encabezado)
- `styles/`             # CSS/SCSS/Tailwind (estilos globales y de módulos)
- `state/`              # Estado (Zustand/Redux), slices y selectores
- `ipc/`                # Adaptadores a APIs del preload (contextBridge)
- `services/`           # Servicios de UI (formateo, mapping para la tabla pivot)
- `utils/`              # Helpers (formato números/porcentajes, memoización)
- `assets/`             # Recursos UI específicos (si no se usan los globales en `/assets`)
- `routes/`             # Configuración de navegación (si aplicamos router)
- `tests/`              # Pruebas UI (unit/e2e)

## Conexión con backend
- Usar `preload.js` en `src/main` para exponer APIs seguras via `contextBridge`.
- En `src/renderer/ipc/` consumir esas APIs (p.ej. `window.api.queryPivot(...)`).

## Flujo típico
1. El proceso `main` crea `BrowserWindow` y carga `index.html` generado por el bundler (Vite).
2. La UI en `pages/Reportes` compone filtros y dispara `query-service` vía IPC.
3. Recibe datos agregados/pivot y muestra el cuadro mensual (PPTO | Vert% | REAL | VAR | AÑO ANT ...).
4. Exporta CSV desde UI invocando `export-service` por IPC.
