export const generarId = () => {
  const date = Date.now();
  const random = (Math.random() * 100).toString(36).slice(3);
  return random + date;
};

export const formatearCantidad = cantidad => {
  const opciones = {
    style: 'currency',
    currency: 'COP',
  };
  return cantidad.toLocaleString('en-US', opciones);
};

export const formatearFecha = fecha => {
  const nuevaFecha = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
