import { api } from "./api";

export const getReservas = async () => {
  const response = await api("/reservas");
  return response.json();
};

export const crearReserva = async (reserva) => {
  const response = await api("/reservas", "POST", reserva);
  return response.json();
};

export const eliminarReserva = async (id) => {
  return await api(`/reservas/${id}`, "DELETE");
};
