import { useEffect } from "react";
import { Col, Row } from "antd";

import { getToken } from "../../services/security";

import LoginForm from "../../components/auth/login-form";

import image from "./../../assets/images/login.svg";
import logo from "./../../assets/images/logo-black.svg";

import classes from "./Login.module.scss";

const LoginPage = () => {
  useEffect(() => {
    const token = getToken();

    if (token) {
      window.location.replace("/");
    }
  }, []);

  return (
    <Row>
      <Col xs={0} lg={16}>
        <div className={classes.image}>
          <img className={classes.background} src={image} alt="login" />
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className={classes.form}>
          <LoginForm />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
