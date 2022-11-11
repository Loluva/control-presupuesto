import Gasto from './Gasto';
function ListadoGastos({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? 'Gastos'
              : 'No se ha registrado ningun gasto'}
          </h2>
          {gastosFiltrados.map(gasto => {
            return (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      ) : (
        <>
          <h2>
            {gastos.length ? 'Gastos' : 'No se ha registrado ningun gasto'}
          </h2>
          {gastos.map(gasto => {
            return (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default ListadoGastos;
