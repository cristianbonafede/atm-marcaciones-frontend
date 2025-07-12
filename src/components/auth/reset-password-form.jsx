import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";

import { required } from "./../../services/forms";
import http from "./../../services/http";

import classes from "./reset-password-form.module.scss";
import { modalSuccess } from "../../services/notifications";

const ResetPasswordForm = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onClickBack = () => {
    navigate("/auth/login");
  };

  const onSubmit = async (values) => {
    setLoading(true);

    const response = await http
      .post(`usuarios/password/reset`, values)
      .catch((error) => {
        console.log("Response:", error.response);
      });

    setLoading(false);

    if (response) {
      modalSuccess(
        "Contraseña restablecida",
        "Si tu email esta registrado como usuario, vas a recibir un correo con tus nuevas credenciales. Seguí las instrucciones para poder ingresar."
      );
      navigate("/auth/login");
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      className={classes.form}
      onFinish={onSubmit}
    >
      <div className={classes.title}>¿Olvidaste tu contraseña?</div>
      <div className={classes.description}>
        Ingresá tu email y te enviaremos instrucciones con tu nuevas
        credenciales.
      </div>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Email" name="email" rules={[required]}>
            <Input placeholder="nombre@email.com" />
          </Form.Item>
        </Col>
      </Row>

      <Button
        type="primary"
        className="block"
        htmlType="submit"
        loading={loading}
      >
        {!loading && "Restablecer"}
      </Button>
      <Button type="text" className="block" onClick={onClickBack}>
        Volver
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
