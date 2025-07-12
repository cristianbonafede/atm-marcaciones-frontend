import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";
import { jwtDecode } from "jwt-decode";

import { required } from "./../../services/forms";
import http from "./../../services/http";
import { renderAlert } from "./../../services/notifications";

import classes from "./update-password-form.module.scss";

const UpdatePasswordForm = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  const onChangeValues = () => {
    if (alert) {
      setAlert(undefined);
    }
  };

  const onSubmit = async (values) => {
    onChangeValues();

    setLoading(true);

    const token = jwtDecode(sessionStorage.getItem("token"));
    values.id = token.id;

    const response = await http
      .post(`usuarios/password/update`, values)
      .catch((error) => {
        console.log("Response:", error.response);

        if (error.response.status === 422) {
          setAlert({
            type: "warning",
            message: error.response.data.errores[0].detalle,
          });
        }
      });

    setLoading(false);

    if (response) {
      const data = response.data;
      sessionStorage.setItem("token", data.token);
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
      <div className={classes.title}>Actualizar Contraseña</div>
      <div className={classes.description}>
        Tu nueva contraseña debe ser diferente a las utilizadas anteriormente.
      </div>

      {alert && renderAlert(alert.type, alert.message)}

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Nueva Contraseña"
            name="password"
            rules={[required]}
          >
            <Input.Password
              placeholder="************"
              onChange={onChangeValues}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="ConfirmarContraseña"
            name="confirm"
            rules={[required]}
          >
            <Input.Password
              placeholder="************"
              onChange={onChangeValues}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button
        type="primary"
        className="block"
        htmlType="submit"
        loading={loading}
      >
        {!loading && "Actualizar"}
      </Button>
    </Form>
  );
};

export default UpdatePasswordForm;
