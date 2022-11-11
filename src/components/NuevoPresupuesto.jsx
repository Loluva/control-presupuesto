import { useState } from 'react';
import Mensaje from './Mensaje';
function NuevoPresupuesto({
  presupuesto,
  setPresupuesto,
  setisValidPresupuesto,
}) {
  const [mensaje, setMensaje] = useState();
  const handleSubmit = e => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 1) {
      setMensaje('No es un presupuesto valido');
      return;
    }
    setMensaje('');
    setisValidPresupuesto(true);
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="AÑADIR" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
}

export default NuevoPresupuesto;
