import React from 'react';

export default function PivotTable() {
  // TODO: render columns per month: PPTO | Vert% | REAL | VAR | AÑO ANT | Vert% | VAR
  return (
    <div style={{ marginTop: 16 }}>
      <table>
        <thead>
          <tr>
            <th>RUBRO</th>
            <th>Enero PPTO</th>
            <th>Enero Vert%</th>
            <th>Enero REAL</th>
            <th>Enero VAR</th>
            <th>Enero AÑO ANT</th>
            <th>Enero Vert%</th>
            <th>Enero VAR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CARGA SALARIAL - SUELDOS</td>
            <td colSpan={7}>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
