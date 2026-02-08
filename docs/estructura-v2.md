# Estructura V2 propuesta

Objetivos: consistencia numérica, filtros por periodo, acumuladores (Sede+CeCo), pivot mensual.

## Decisiones técnicas
- Electron + Node.js, React + Vite, decimal.js, SQLite.

## Carpetas
- domain, metrics, aggregation, pivot, services, database/views.

## Esquema base de datos
- facts_entries, dim_sede, dim_ceco, dim_rubro, map_puc_rubro, facts_results.

## Consistencia
- Cálculos con Decimal; redondeo solo en presentación.

## Pivot
- Filas por rubro; columnas por mes con PPTO, Vert%, REAL, VAR, AÑO ANT, etc.
