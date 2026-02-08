import React, { useState } from 'react';

export default function Filters() {
  const [years, setYears] = useState<number[]>([2026]);
  const [month, setMonth] = useState<number>(1);
  const [mode, setMode] = useState<'acumulado' | 'ceco'>('acumulado');

  const apply = async () => {
    const res = await window.api?.queryPivot({ years, month, mode });
    console.log('Pivot result:', res);
  };

  return (
    <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(4, 1fr)' }}>
      <div>
        <label>Años</label>
        <input
          type="text"
          value={years.join(',')}
          onChange={(e) =>
            setYears(
              e.target.value
                .split(',')
                .map((x) => parseInt(x.trim(), 10))
                .filter(Number.isFinite)
            )
          }
        />
      </div>
      <div>
        <label>Mes</label>
        <input
          type="number"
          min={1}
          max={12}
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label>Modo</label>
        <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
          <option value="acumulado">Acumulado</option>
          <option value="ceco">Por CeCo</option>
        </select>
      </div>
      <div>
        <button onClick={apply}>Aplicar</button>
      </div>
    </div>
  );
}
