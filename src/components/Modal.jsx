import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';

import CerrarBtn from '../img/cerrar.svg';
function Modal({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    setNombre(gastoEditar.nombre);
    setCantidad(gastoEditar.cantidad);
    setCategoria(gastoEditar.categoria);
    setId(gastoEditar.id);
    setFecha(gastoEditar.fecha);
  }, []);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => setModal(false), 300);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }
    guardarGasto({
      nombre,
      cantidad,
      categoria,
      id,
      fecha,
    });
    setMensaje('');
    ocultarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar" onClick={ocultarModal} />
      </div>
      <form
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade nombre del Gasto"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto ej. 300"
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cateforia">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos varios">Gastos varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? 'GUARDAR CAMBIOS' : 'AÑADIR GASTO'}
        />
      </form>
    </div>
  );
}

export default Modal;
