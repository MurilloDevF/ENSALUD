# ENSALUD Presupuestal

Aplicativo de Ejecución Presupuestal para ENSALUD GROUP SAS.

## Descripción

Sistema de automatización presupuestal que procesa archivos contables normalizados (Excel) y genera reportes ejecutivos exportables (CSV).

## Tecnologías

- **Frontend:** Electron
- **Backend:** Node.js
- **Base de Datos:** SQLite
- **Lectura Excel:** SheetJS (xlsx)
- **Exportación:** CSV con encoding UTF-8

## Estructura del Proyecto

```
ensalud-presupuestal/
├── assets/              # Recursos estáticos (íconos, plantillas)
├── config/              # Configuración centralizada
├── src/
│   ├── main/            # Proceso principal Electron
│   ├── renderer/        # UI (HTML, CSS, JS)
│   ├── core/            # Lógica de negocio
│   │   ├── importer/    # Importación Excel
│   │   ├── validator/   # Validación de datos
│   │   ├── calculator/  # Motor de cálculos
│   │   ├── exporter/    # Exportación CSV
│   │   └── auth/        # Autenticación
│   ├── database/        # Persistencia SQLite
│   ├── services/        # Orquestación
│   └── utils/           # Utilidades
├── data/                # Datos locales (BD, logs)
├── tests/               # Pruebas automatizadas
├── docs/                # Documentación
└── scripts/             # Scripts de utilidad
```

## Instalación

```bash
npm install
npm run migrate
npm run seed
npm start
```

## Scripts

- `npm start` - Inicia la aplicación
- `npm run dev` - Modo desarrollo con logs
- `npm run build` - Empaqueta para Windows
- `npm test` - Ejecuta pruebas

## Licencia

Privado - ENSALUD GROUP SAS © 2026
