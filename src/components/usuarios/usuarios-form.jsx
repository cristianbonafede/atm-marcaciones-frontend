import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Select } from "antd";

import { required } from "../../services/forms";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { actions, hasPermission } from "../../services/security";

const UsuariosForm = (props) => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState();

  const [form] = Form.useForm();

  const { id } = props;

  const disabled =
    id === "nuevo"
      ? !hasPermission(actions.UsuariosCrear)
      : !hasPermission(actions.UsuariosEditar);

  const [loading, setLoading] = useState(false);
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    async function getForm() {
      let response = await http.get("perfiles");
      if (response) {
        const data = response.data;
        setPerfiles(data.list);
      }

      if (id === "nuevo") {
        return;
      }

      response = await http.get(`usuarios/${id}`);
      if (response) {
        const data = response.data;
        form.setFieldsValue(data);
      }
    }
    getForm();
  }, [id]);

  const onClickBack = () => {
    navigate("/usuarios");
  };

  const onClickSave = async (values) => {
    setLoading(true);
    const response =
      id === "nuevo"
        ? await http.post("usuarios", values)
          .catch((error) => {
            if (error.response.status === 422) {
              modalError("Error al crear el usuario", error.response.data.errores[0].detalle);
            }
          })
        : await http.put(`usuarios/${id}`, values).catch((error) => {
          console.log("Response:", error.response);

          if (error.response.status === 422) {
              modalError("Error al crear el usuario", error.response.data.errores[0].detalle);
          }
        });

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Usuario guardado",
        id === "nuevo"
          ? "El usuario fue creado exitosamente"
          : "El usuario fue modificado exitosamente"
      );
      navigate("/usuarios");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onClickSave}>
      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item label="Nombre" name="nombre" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Apellido" name="apellido" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Dni" name="dni" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Especialidad" name="especialidad" >
            <Input disabled={disabled} />
          </Form.Item>
        </Col>


        <Col xs={12}>
          <Form.Item label="Nombre de Usuario" name="nombreUsuario" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Contraseña" name="contrasena" rules={[required]}>
            <Input.Password disabled={disabled} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Email" name="emailPersonal" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Perfiles" name="perfiles" rules={[required]}>
            <Select
              mode="multiple"
              allowClear
              showSearch
              optionFilterProp="children"
              maxTagCount="responsive"
              disabled={disabled}
            >
              {perfiles.map((option, index) => (
                <Select.Option key={index} value={option.id}>
                  {option.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <div className="actions">
        <Button type="text" onClick={onClickBack}>
          Volver
        </Button>
        {!disabled && (
          <Button type="primary" htmlType="submit" loading={loading}>
            {!loading && "Guardar"}
          </Button>
        )}
      </div>
    </Form>
  );
};

export default UsuariosForm;
