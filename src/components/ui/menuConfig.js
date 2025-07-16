
import {
    FaHome, FaUser, FaBuilding,
    FaUsers, FaChartBar, FaUserShield,
    FaFileImport, FaCog, FaEnvelope,
    FaIdCard, FaClipboardList,
    FaRegListAlt, FaHospital,
    FaBriefcase, FaCheckCircle,
    FaClock, FaCalendarAlt,
    FaUserCheck,
    FaUserTimes, FaExclamationTriangle,
    FaRegCalendarCheck, FaRegCalendarTimes,
    FaRegCalendarMinus, FaRegCalendarPlus,
    FaRegCalendar, FaRegFileAlt,
    FaRegAddressCard, FaRegUser,
    FaRegFolderOpen, FaRegEdit,
    FaRegStar,
    FaRegBell, FaRegBuilding,
    FaRegUserCircle,
    FaRegFileExcel, FaFileCsv,
    FaRegFile, FaRegListAlt as FaListAlt2
} from "react-icons/fa";


const menuConfig = [
    {
        label: "Inicio",
        path: "/",
        icon: <FaHome />
    },
    {
        label: "Mis Datos",
        icon: <FaUser />,
        children: [
            { label: "Mis datos personales", path: "/mis-datos/personales", icon: <FaIdCard /> },
            { label: "Registro de asistencia", path: "/mis-datos/asistencia", icon: <FaClipboardList /> },
            { label: "Registro resumido", path: "/mis-datos/resumido", icon: <FaRegListAlt /> },
        ],
    },
    {
        label: "Sucursales",
        path: "/sucursales",
        icon: <FaBuilding />
    },
    {
        label: "Empleados",
        icon: <FaUsers />,
        children: [
            { label: "Lista de empleados", path: "/empleados", icon: <FaUsers /> },
            { label: "Accidentes", path: "/empleados/accidentes", icon: <FaHospital /> },
            { label: "Autorizaciones de horas extras", path: "/empleados/autorizaciones", icon: <FaCheckCircle /> },
            { label: "Licencias", path: "/empleados/licencias", icon: <FaRegCalendarCheck /> },
            { label: "Nuevo registro manual", path: "/empleados/nuevo-registro", icon: <FaRegEdit /> },
        ],
    },
    {
        label: "Reportes",
        icon: <FaChartBar />,
        children: [
            { label: "Resumen de horas", path: "/reportes/resumen-horas", icon: <FaRegListAlt /> },
            { label: "Todos los sectores", path: "/reportes/sectores", icon: <FaRegBuilding /> },
            { label: "Empleados", path: "/reportes/empleados", icon: <FaUsers /> },
            { label: "Empleados por categoria", path: "/reportes/empleados-categoria", icon: <FaRegUser /> },
            { label: "Trabajadores con datos verificados", path: "/reportes/verificados", icon: <FaUserCheck /> },
            { label: "Trabajadores sin datos verificados", path: "/reportes/no-verificados", icon: <FaUserTimes /> },
            { label: "Reporte de mayor dedicacion", path: "/reportes/mayor-dedicacion", icon: <FaRegStar /> },
            { label: "Histórico de reporte de mayor de dedicación", path: "/reportes/historico-mayor-dedicacion", icon: <FaRegCalendar /> },
            { label: "Reporte de tardanzas", path: "/reportes/tardanzas", icon: <FaClock /> },
            { label: "Reporte de jornadas incompletas", path: "/reportes/jornadas-incompletas", icon: <FaRegCalendarMinus /> },
            { label: "Reporte de inasistencias", path: "/reportes/inasistencias", icon: <FaRegCalendarTimes /> },
            { label: "Reporte de erroes de marcacion", path: "/reportes/errores-marcacion", icon: <FaExclamationTriangle /> },
            { label: "Reporte de errores de marcacion de relog", path: "/reportes/errores-relog", icon: <FaExclamationTriangle /> },
        ],
    },
    {
        label: "Usuarios",
        icon: <FaUserShield />,
        children: [
            { label: "Usuarios", path: "/usuarios", icon: <FaUser /> },
            { label: "Roles", path: "/usuarios/roles", icon: <FaUserShield /> },
            { label: "Permisos", path: "/usuarios/permisos", icon: <FaRegAddressCard /> },
            { label: "Registro de visitas", path: "/usuarios/visitas", icon: <FaRegListAlt /> },
            { label: "Usuarios activos", path: "/usuarios/activos", icon: <FaUserCheck /> },
        ],
    },
    {
        label: "Importar",
        path: "/importar",
        icon: <FaFileImport />
    },
    {
        label: "Config",
        icon: <FaCog />,
        children: [
            { label: "Logs", path: "/config/logs", icon: <FaRegFileAlt /> },
            { label: "Relojes", path: "/config/relojes", icon: <FaClock /> },
            { label: "Registro", path: "/config/registro", icon: <FaClipboardList /> },
            { label: "Registros eliminados", path: "/config/registros-eliminados", icon: <FaRegFileExcel /> },
            { label: "Licencias Eliminadas", path: "/config/licencias-eliminadas", icon: <FaRegCalendarTimes /> },
            { label: "Ocupaciones", path: "/config/ocupaciones", icon: <FaBriefcase /> },
            { label: "Categorias de sector", path: "/config/categorias-sector", icon: <FaRegFolderOpen /> },
            { label: "Categorias de empleados", path: "/config/categorias-empleados", icon: <FaRegUser /> },
            { label: "Todos los sectores", path: "/config/sectores", icon: <FaRegBuilding /> },
            { label: "Tipos de documento", path: "/config/tipos-documento", icon: <FaRegAddressCard /> },
            { label: "Plantillas de importacion", path: "/config/plantillas", icon: <FaFileCsv /> },
            { label: "Tipos de licencias", path: "/config/tipos-licencias", icon: <FaRegCalendarPlus /> },
            { label: "Calendario", path: "/config/calendario", icon: <FaCalendarAlt /> },
            { label: "Fechas especiales", path: "/config/fechas-especiales", icon: <FaRegCalendar /> },
            { label: "Dedicacion", path: "/config/dedicacion", icon: <FaRegStar /> },
            { label: "Horarios laborales", path: "/config/horarios", icon: <FaRegCalendar /> },
            { label: "Descuentos", path: "/config/descuentos", icon: <FaRegBell /> },
            { label: "Media", path: "/config/media", icon: <FaRegFile /> },
            { label: "Workers", path: "/config/workers", icon: <FaRegUserCircle /> },
            { label: "Crews", path: "/config/crews", icon: <FaUsers /> },
            { label: "Appearance", path: "/config/appearance", icon: <FaRegEdit /> },
            { label: "General", path: "/config/general", icon: <FaCog /> },
        ],
    },
    {
        label: "Mensajes",
        path: "/mensajes",
        icon: <FaEnvelope />
    },
];

export default menuConfig;
