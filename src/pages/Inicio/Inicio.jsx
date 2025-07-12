import iconPacientes from "./../../assets/images/crowd.png";
import iconParametros from "./../../assets/images/controls.png";
import iconSecurity from "./../../assets/images/cyber-security.png";
import iconTeam from "./../../assets/images/team.png";

import { actions, hasPermission } from "./../../services/security";

import InicioSection from "../../components/inicio/inicio-section";

const InicioPage = () => {
  const sections = [
    {
      title: "Inicio",
      links: [
        {
          title: "Pacientes",
          url: "/pacientes",
          icon: <img className="icon-img" src={iconPacientes} alt="Logo" />,
          visible: hasPermission(actions.PacientesListar),
        },
      ],
    },
    {
      title: "Configuración",
      links: [
        {
          title: "Parámetros",
          url: "/parametros",
          icon: <img className="icon-img" src={iconParametros} alt="Logo" />,
          visible: hasPermission(actions.ParametrosVer),
        },
      ],
    },
    {
      title: "Seguridad",
      links: [
        {
          title: "Perfiles",
          url: "/perfiles",
          icon: <img className="icon-img" src={iconSecurity} alt="Logo" />,
          visible: hasPermission(actions.PerfilesVer),
        },
        {
          title: "Usuarios",
          url: "/usuarios",
          icon: <img className="icon-img" src={iconTeam} alt="Logo" />,

          visible: hasPermission(actions.UsuariosVer),
        },
        // {
        //   title: "Auditoría",
        //   url: "/auditorias",
        //   icon: <FiMonitor />,
        //   visible: hasPermission(actions.AuditoriasVer),
        // },
      ],
    },
  ];

  return (
    <div>
      {sections.map(
        (section, index) =>
          section.links.filter((x) => x.visible).length > 0 && (
            <InicioSection key={index} item={section} />
          )
      )}
    </div>
  );
};

export default InicioPage;
