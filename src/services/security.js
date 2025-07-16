import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return sessionStorage.getItem("token") ?? "";
};

export const actions = {
  ParametrosVer: 4000,
  ParametrosEditar: 4002,
  GestoresVer: 12000,
  GestoresCrear: 12001,
  GestoresEditar: 12002,
  GestoresEliminar: 12003,
  PerfilesVer: 5000,
  PerfilesCrear: 5001,
  PerfilesEditar: 5002,
  PerfilesEliminar: 5003,
  UsuariosVer: 6000,
  UsuariosCrear: 6001,
  UsuariosEditar: 6002,
  UsuariosEliminar: 6003,
  PacientesListar: 8000,
  PacientesVerDatos: 8004,
  PacientesVerTurnos: 8005,
  PacientesVerInternaciones: 8006,
  PacientesVerMedicaciones: 8007,
  PacientesVerEvoluciones: 8008,
};

export const hasPermission = (action) => {
  return true;
  const token = sessionStorage.getItem("token");
  if (!token)
    window.location.replace("/auth/login");
  const jwtToken = jwtDecode(token);

  return jwtToken.permisos.indexOf(action) > -1;
};
