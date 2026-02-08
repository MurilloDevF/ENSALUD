import React from 'react';
import PivotTable from './components/PivotTable';
import Filters from './components/Filters';

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>ENSALUD Presupuestal</h1>
      <Filters />
      <PivotTable />
    </div>
  );
}
