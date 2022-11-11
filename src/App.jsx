import { useState, useEffect } from 'react';
import Encabezado from './components/Encabezado';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtro from './components/Filtro';
import { generarId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg';
function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) || 0
  );
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem('gastos')) || []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  useEffect(() => {
    Number(localStorage.getItem('presupuesto')) && setisValidPresupuesto(true);
    JSON.parse(localStorage.getItem('gastos')) &&
      setGastos(JSON.parse(localStorage.getItem('gastos')));
  }, []);
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => setAnimarModal(true), 300);
    }
  }, [gastoEditar]);

  useEffect(() => {
    if (!filtro) return;
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
    setGastosFiltrados(gastosFiltrados);
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => setAnimarModal(true), 300);
  };
  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosEditados = gastos.map(gastoState =>
        gasto.id === gastoState.id ? gasto : gastoState
      );
      setGastos(gastosEditados);
    } else {
      (gasto.id = generarId()),
        (gasto.fecha = Date.now()),
        setGastos([...gastos, gasto]);
    }
  };
  const eliminarGasto = gasto => {
    const gastosEditados = gastos.filter(
      gastoState => gastoState.id !== gasto.id
    );
    setGastos(gastosEditados);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Encabezado
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt=" crear nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
