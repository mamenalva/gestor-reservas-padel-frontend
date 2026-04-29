import { api } from "./api";

export const register = async (usuario) => {
    const response = await api("/auth/register", "POST", usuario);
    return response.json();
};

export const login = async (email, password) => {
    const response = await api("/auth/login", "POST", { email, password });
    return response.json();
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const getUsuario = () => {
    const usuarioJSON = localStorage.getItem("usuario");
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
};

export const getAllUsuarios = async () => {
    const response = await api("/usuarios");
    return response.json();
};

export const getUsuarioPorId = async (id) => {
    const response = await api(`/usuarios/${id}`);
    return response.json();
};

export const createUsuario = async (usuario) => {
    const response = await api("/usuarios", "POST", usuario);
    return response.json();
};

export const updateUsuario = async (id, usuario) => {
    const response = await api(`/usuarios/${id}`, "PUT", usuario);
    return response.json();
};

export const deleteUsuario = async (id) => {
    return await api(`/usuarios/${id}`, "DELETE");
};
