import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";

import PerfilContext from "../../store/perfil-context";
import { required } from "./../../services/forms";
import http from "./../../services/http";
import { modalSuccess } from "../../services/notifications";
import { actions, hasPermission } from "../../services/security";

import PerfilesModuloList from "./perfiles-modulo-list";

const PerfilesForm = (props) => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const context = useContext(PerfilContext);

  const { id } = props;

  const disabled =
    id === "nuevo"
      ? !hasPermission(actions.PerfilesCrear)
      : !hasPermission(actions.PerfilesEditar);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getForm() {
      let modulos = [];

      let response = await http.get("acciones/modulos");
      if (response) {
        const data = response.data;
        modulos = data;
      }

      if (id === "nuevo") {
        context.updateModulos(modulos, []);
        return;
      }

      response = await http.get(`perfiles/${id}`);
      if (response) {
        const data = response.data;
        form.setFieldsValue(data);
        context.updateModulos(modulos, data.permisos);
      }
    }
    getForm();
  }, [id]);

  const onClickBack = () => {
    navigate("/perfiles");
  };

  const onClickSave = async (values) => {
    setLoading(true);

    values.permisos = context.getSelected();

    const response =
      id === "nuevo"
        ? await http.post("perfiles", values)
        : await http.put(`perfiles/${id}`, values);

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Perfil guardado",
        id === "nuevo"
          ? "El perfil fue creado exitosamente"
          : "El perfil fue modificado exitosamente"
      );
      navigate("/perfiles");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onClickSave}>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Nombre" name="nombre" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Descripción"
            name="descripcion"
            className="textarea"
            rules={[required]}
          >
            <Input.TextArea showCount maxLength={500} disabled={disabled} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <label className="form-label" title="Permisos">
            Permisos
          </label>
          <PerfilesModuloList items={context.modulos} disabled={disabled} />
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

export default PerfilesForm;
