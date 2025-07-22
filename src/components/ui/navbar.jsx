import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { FiLogOut } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

import { confirm } from "../../services/notifications";

import classes from "./navbar.module.scss";

import logout from "./../../assets/images/logout.png";

const Navbar = () => {
  let navigate = useNavigate();

  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const token = jwtDecode(sessionStorage.getItem("token"));
    console.log(token);
    setUsuario(token.nombre);
  }, []);

  const onClickLogout = async () => {
    const confirmed = await confirm(
      `Cerrar sesión`,
      `¿Esta seguro que desea cerrar la sesión?`
    );

    if (!confirmed) {
      return;
    }
    sessionStorage.removeItem("token");
    window.location.replace("/auth/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key={2} icon={<FiLogOut />} onClick={onClickLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className={classes.navbar}>
        <Dropdown overlay={menu} placement="bottomRight" trigger="click" arrow>
          <div className={classes.user}>
            <div className={classes.data}>
              <div className={classes.name}>{usuario}</div>

            </div>
              <img className="icon-img" src={logout} alt="Logo"  style={{width: '40px'}} />
          </div>
        </Dropdown>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
