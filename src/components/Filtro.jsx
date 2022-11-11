import { useState, useEffect } from 'react';

function Filtro({ filtro, setFiltro }) {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtras Gastos</label>
          <select value={filtro} onChange={e => setFiltro(e.target.value)}>
            <option value="">-- Todo --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos varios">Gastos varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filtro;
