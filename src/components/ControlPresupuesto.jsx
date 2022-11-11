import { useState, useEffect } from 'react';
import { formatearCantidad } from '../helpers';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ControlPresupuesto({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setisValidPresupuesto,
}) {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((ac, cv) => ac + Number(cv.cantidad), 0);
    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);
    const calcPorcentaje = ((totalGastado / presupuesto) * 100).toFixed(1);
    setPorcentaje(calcPorcentaje);
  }, [gastos]);

  const handleReset = () => {
    const confirmacion = confirm(
      'Esta seguro de resetear el presupuesto y los gastos'
    );
    if (!confirmacion) return;
    setPresupuesto('');
    setGastos([]);
    setisValidPresupuesto(false);
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        value={porcentaje}
        text={`${porcentaje}% Gastado`}
        styles={buildStyles({
          pathColor: disponible < 0 ? '#DC2626' : '#3B82F6',
          trailColor: '#F5F5F5',
          textColor: disponible < 0 ? '#DC2626' : '#3B82F6',
        })}
      ></CircularProgressbar>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button  " onClick={handleReset}>
          Resetear App
        </button>
        <p>
          <span>presupuesto:</span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible:</span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;
