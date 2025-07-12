import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { getToken } from "../services/security";

import Navbar from "./../components/ui/navbar";
import Sidebar from "./../components/ui/sidebar";

import classes from "./Layout.module.scss";

const LayoutPage = () => {
  useEffect(() => {
    const token = getToken();

    if (!token) {
      window.location.replace("/auth/login");
    }
  }, []);

  return (
    <div className={classes.layout}>
      <Sidebar />
      <div className={classes.main}>
        <Navbar />
        <SimpleBar style={{ maxHeight: "100vh", width: "100%" }}>
          <div className={classes.outlet}>
            <Outlet />
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default LayoutPage;
