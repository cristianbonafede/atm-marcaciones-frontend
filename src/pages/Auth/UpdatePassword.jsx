import { Col, Row } from "antd";

import UpdatePasswordForm from "../../components/auth/update-password-form";

import logo from "./../../assets/images/logo-black.svg";
import image from "./../../assets/images/update.svg";

import classes from "./UpdatePassword.module.scss";

const UpdatePasswordPage = () => {
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
          <UpdatePasswordForm />
        </div>
      </Col>
    </Row>
  );
};

export default UpdatePasswordPage;
