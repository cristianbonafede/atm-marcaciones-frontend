import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Layout, Menu } from 'antd';
import classes from "./sidebar.module.scss";
import logo from "../../assets/images/logo.svg";
import logoMin from "../../assets/images/logo-min.svg";
import menuConfig from "./menuConfig";
// Ejemplo de íconos, puedes importar los que prefieras o usar imágenes
import { FaHome, FaUser, FaBuilding, FaUsers, FaChartBar, FaCog, FaEnvelope, FaFileImport } from "react-icons/fa";

const Sidebar = () => {
  const { Header, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const location = useLocation();

  // Mapeo de íconos por label (puedes personalizar esto según tus necesidades)
  const iconMap = {
    "Inicio": <FaHome />,
    "Mis Datos": <FaUser />,
    "Sucursales Activas": <FaBuilding />,
    "Empleados": <FaUsers />,
    "Reportes": <FaChartBar />,
    "Usuarios": <FaUser />,
    "Importar": <FaFileImport />,
    "Config": <FaCog />,
    "Mensajes": <FaEnvelope />,
  };

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
        <div className={classes.collapseButton} onClick={toggleCollapse}></div>
      </div>
      <div className={`${classes.version} ${collapsed ? classes.versionRes : ""}`}></div>
      <SimpleBar style={{ maxHeight: "calc(90vh - 115px)" }}>
        <Menu theme="dark" mode="inline">
          {menuConfig.map((item, idx) =>
            item.children ? (
              <Menu.SubMenu
                key={item.label}
                title={
                  <span className="parent">
                    {iconMap[item.label] && <span className="anticon">{iconMap[item.label]}</span>}
                    <span >{item.label}</span>
                  </span>
                }
              >
                {item.children.map((sub, subIdx) => (
                  <Menu.Item
                    key={`${item.label}-${sub.label}`}
                    className={location.pathname === sub.path ? `${classes.activeLink}` : ""}
                  >
                    <NavLink to={sub.path} className={classes.link}>
                      <span>{sub.label}</span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={item.label}
                className={location.pathname === item.path ? `${classes.activeLink}` : ""}
                icon={iconMap[item.label] ? iconMap[item.label] : null}
              >
                <NavLink to={item.path} className={classes.link}>
                  <span>{item.label}</span>
                </NavLink>
              </Menu.Item>
            )
          )}
        </Menu>
      </SimpleBar>
    </Sider>
  );
};

export default Sidebar;