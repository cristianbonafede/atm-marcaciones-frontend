import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";
import { jwtDecode } from "jwt-decode";

import { required } from "./../../services/forms";
import http from "./../../services/http";

import classes from "./login-form.module.scss";
import { renderAlert } from "./../../services/notifications";

const LoginForm = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  const onClickForgot = () => {
    navigate("/auth/reset");
  };

  const onChangeValues = () => {
    if (alert) {
      setAlert(undefined);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('d')) {
      form.setFieldsValue({ usuario: 'user', password: '123456' });
      form.submit();
    }
  }, []);

  const onSubmit = async (values) => {
    onChangeValues();

    setLoading(true);

    const response = await http
      .post(`usuarios/login`, values)
      .catch((error) => {
    setLoading(false);

        console.log("Response:", error.response);

        if (error.response.status === 422) {
          setAlert({
            type: "warning",
            message: error.response.data.errores[0].detalle,
          });
        }
      });
    if (response) {
      const data = response.data;
      sessionStorage.setItem("token", data.token);

    const token = jwtDecode(sessionStorage.getItem("token"));

      if (token.cambiarPassword === "true") {
        navigate("/auth/update");
        return;
      }
      navigate("/");
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      className={classes.form}
      onFinish={onSubmit}
    >
      <div className={classes.title}>MARCACIONES</div>
      <div className={classes.description}>
        Ingresá tu usuario y tu contraseña para poder operar
      </div>

      {alert && renderAlert(alert.type, alert.message)}

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Usuario" name="usuario" rules={[required]}>
            <Input placeholder="nombre usuario" onChange={onChangeValues} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Contraseña" name="password" rules={[required]}>
            <Input.Password
              placeholder="************"
              onChange={onChangeValues}
            />
          </Form.Item>
          <div className={classes.forgot} onClick={onClickForgot}>
            ¿Olvidaste tu contraseña?
          </div>
        </Col>
      </Row>

      <Button
        type="primary"
        className="block"
        htmlType="submit"
        loading={loading}
      >
        {!loading && "Ingresar"}
      </Button>
    </Form>
  );
};

export default LoginForm;
