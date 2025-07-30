import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";
import "moment/locale/es";

import LayoutPage from "./pages/Layout";
import LoginPage from "./pages/Auth/Login";
import ResetPasswordPage from "./pages/Auth/ResetPassword";
import UpdatePasswordPage from "./pages/Auth/UpdatePassword";
import InicioPage from "./pages/Inicio/Inicio";
import SubmenuPage from "./pages/Inicio/Submenu";
import ParametrosListPage from "./pages/Parametros/ParametrosList";
import ParametrosDetailPage from "./pages/Parametros/ParametrosDetail";
import PerfilesListPage from "./pages/Perfiles/PerfilesList";
import PerfilesDetailPage from "./pages/Perfiles/PerfilesDetail";
import UsuariosListPage from "./pages/Usuarios/UsuariosList";
import UsuariosDetailPage from "./pages/Usuarios/UsuariosDetail";
import AuditoriasListPage from "./pages/Auditorias/AuditoriasList";
import AuditoriasDetailPage from "./pages/Auditorias/AuditoriasDetail";

import "./app.scss";
import "./styles/alerts.scss";
import "./styles/buttons.scss";
import "./styles/datepickers.scss";
import "./styles/forms.scss";
import "./styles/sidebar.scss";
import "./styles/inputs.scss";
import "./styles/modals.scss";
import "./styles/notifications.scss";
import "./styles/pagination.scss";
import "./styles/selects.scss";
import "./styles/switches.scss";
import "./styles/tabs.scss";
import "./styles/tags.scss";
import PacientesDetailPage from "./pages/Pacientes/PacientesDetail";
import PacientesListPage from "./pages/Pacientes/PacientesList";
import SucursalesPage from "./pages/Sucursales/Sucursales";
import EmpleadosListPage from "./pages/Empleados/EmpleadosList";
import EmpleadosDetailPage from "./pages/Empleados/EmpleadosDetail";
import SectoresListPage from "./pages/Sectores/SectoresList";
import SectoresDetailPage from "./pages/Sectores/SectoresDetail";
import DedicacionesForm from "./components/dedicaciones/dedicaciones-form";
import DedicacionesList from "./pages/Dedicaciones/DedicacionesList";
import DedicacionesDetailPage from "./pages/Dedicaciones/DedicacionesDetail";

function App() {
  return (
    <ConfigProvider locale={esES} theme={{ hashed: false, token: {
          fontFamily: ' "Montserrat", sans-serif', // o cualquier otra fuente
        }, }}>
      <Router>
        <Routes>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/reset" element={<ResetPasswordPage />} />
          <Route path="auth/update" element={<UpdatePasswordPage />} />
          <Route path="/" element={<LayoutPage />}>
            <Route path="pacientes/:id" element={<PacientesDetailPage />} />
            <Route path="pacientes" element={<PacientesListPage />} />
            <Route path="parametros/:id" element={<ParametrosDetailPage />} />
            <Route path="parametros" element={<ParametrosListPage />} />
            <Route path="perfiles/:id" element={<PerfilesDetailPage />} />
            <Route path="perfiles" element={<PerfilesListPage />} />
            <Route path="usuarios/:id" element={<UsuariosDetailPage />} />
            <Route path="usuarios" element={<UsuariosListPage />} />
            <Route path="auditorias/:id" element={<AuditoriasDetailPage />} />
            <Route path="auditorias" element={<AuditoriasListPage />} />
            <Route path="empleados/:id" element={<EmpleadosDetailPage />} />
            <Route path="empleados" element={<EmpleadosListPage />} />
            <Route path="sucursales" element={<SucursalesPage />} />
            <Route path="reportes/sectores/:id" element={<SectoresDetailPage />} />
            <Route path="reportes/sectores" element={<SectoresListPage />} />
            <Route path="config/sectores/:id" element={<SectoresDetailPage />} />
            <Route path="config/sectores" element={<SectoresListPage />} /> 
            <Route path="config/dedicacion/:id" element={<DedicacionesDetailPage />} />
            <Route path="config/dedicacion" element={<DedicacionesList />} />
            <Route path="" exact element={<InicioPage />} />
            <Route path="inicio/:parent" element={<SubmenuPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
