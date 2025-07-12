import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaDigitalTachograph,
  FaShieldAlt,
  FaUser,
  FaPeopleArrows
} from "react-icons/fa";
import SimpleBar from "simplebar-react";
import { actions, hasPermission } from "./../../services/security";
import { Layout, Menu } from 'antd';

import classes from "./sidebar.module.scss";
import logo from "../../assets/images/logo.svg";
import logoMin from "../../assets/images/logo-min.svg";
import iconPacientes from "./../../assets/images/crowd.png";
import iconParametros from "./../../assets/images/controls.png";
import iconSecurity from "./../../assets/images/cyber-security.png";
import iconTeam from "./../../assets/images/team.png";
import iconHome from "./../../assets/images/home.png";

const Sidebar = () => {
  const { Header, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const sections =[
    {
      title: "",
      links: [
        {
          title: "Inicio",
          url: "/",
          icon:  <img className="icon-img" src={iconHome} />,
          visible: true,
        },
        {
          title: "Pacientes",
          url: "/pacientes",
          icon:  <img className="icon-img" src={iconPacientes} />,
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
          icon:  <img className="icon-img" src={iconParametros} />,
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
          icon:  <img className="icon-img" src={iconSecurity} />,

          visible: hasPermission(actions.PerfilesVer),
        },
        {
          title: "Usuarios",
          url: "/usuarios",
          icon:  <img className="icon-img" src={iconTeam} />,
          visible: hasPermission(actions.UsuariosVer),
        },
      ],
    },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const location = useLocation();

  return (
    <Sider
      width={250}
      collapsible
      theme="dark"
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      className={classes.sidebar}
    >
      <Header
        style={{
          padding: 0,
          background: "none",
        }}
      >
        <img
          className={`${classes.logo} ${collapsed ? classes.collapsedLogo : ""}`}
          src={collapsed ? logoMin : logo}
          alt="logo"
        />
      </Header>
      <div className={classes.brand}>

        <div className={classes.collapseButton} onClick={toggleCollapse}>
        </div>
      </div>
      <div className={`${classes.version} ${collapsed ? classes.versionRes : ""}`}></div>
      <SimpleBar style={{ maxHeight: "calc(90vh - 115px)" }}>
        <Menu theme="dark" mode="inline">
          {sections.map((section, sectionIndex) => (
            section.links.some((link) => link.visible) && (
              <Menu.ItemGroup
                key={`section-${sectionIndex}`}
                title={section.title}
                icon={section.icon}
              >
                {section.links.map((link, linkIndex) => (
                  link.visible && (
                    <Menu.Item
                      key={`link-${sectionIndex}-${linkIndex}`}
                      className={location.pathname === link.url ? `${classes.activeLink}` : ""}
                    >
                      <NavLink to={link.url} className={classes.link}>
                        {link.icon && <span className="anticon">{link.icon}</span>}
                        <span>{link.title}</span>
                      </NavLink>
                    </Menu.Item>
                  )
                ))}
              </Menu.ItemGroup>
            )
          ))}
        </Menu>
      </SimpleBar>
    </Sider>
  );
};

export default Sidebar;