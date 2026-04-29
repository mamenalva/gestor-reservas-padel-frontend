import { api } from "./api";

export const getPistas = async () => {
  const response = await api("/pistas");
  return response.json();
};

export const getPista = async (id) => {
  const response = await api(`/pistas/${id}`);
  return response.json();
};

export const crearPista = async (pista) => {
  const response = await api("/pistas", "POST", pista);
  return response.json();
};

export const actualizarPista = async (id, pista) => {
  const response = await api(`/pistas/${id}`, "PUT", pista);
  return response.json();
};

export const eliminarPista = async (id) => {
  return await api(`/pistas/${id}`, "DELETE");
};
