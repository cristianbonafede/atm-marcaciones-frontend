import { Col, Row } from "antd";

import ResetPasswordForm from "./../../components/auth/reset-password-form";

import image from "./../../assets/images/reset.svg";
import logo from "./../../assets/images/logo-black.svg";

import classes from "./ResetPassword.module.scss";

const ResetPasswordPage = () => {
  return (
    <Row>
      <Col xs={0} lg={16}>
        <div className={classes.image}>
          <img className={classes.background} src={image} alt="reset" />
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className={classes.form}>
          <ResetPasswordForm />
        </div>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
