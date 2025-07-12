import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Select } from "antd";

import { required } from "../../services/forms";
import http from "../../services/http";
import { modalSuccess } from "../../services/notifications";
import { actions, hasPermission } from "../../services/security";

const ParametrosForm = (props) => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const { id } = props;

  const disabled = !hasPermission(actions.ParametrosEditar);

  const [loading, setLoading] = useState(false);

  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    async function getForm() {
      let response = await http.get("parametros/grupos");
      if (response) {
        const data = response.data;
        setGrupos(data.list);
      }

      if (id === "nuevo") {
        return;
      }

      response = await http.get(`parametros/${id}`);
      if (response) {
        const data = response.data;
        form.setFieldsValue(data);
      }
    }
    getForm();
  }, [id, form]);

  const onClickBack = () => {
    navigate("/parametros");
  };

  const onClickSave = async (values) => {
    setLoading(true);

    const response = await http.put(`parametros/${id}`, values);

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Parámetro guardado",
        "El parámetro fue modificado exitosamente"
      );
      navigate("/parametros");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onClickSave}>
      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item label="Nombre" name="nombre" rules={[required]}>
            <Input disabled />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Grupo" name="grupo">
            <Select showSearch optionFilterProp="children" disabled>
              {grupos?.map((option, index) => (
                <Select.Option key={index} value={option.id}>
                  {option.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Descripción" name="descripcion">
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Valor" name="valor" className="textarea">
            <Input.TextArea showCount maxLength={500} disabled={disabled} />
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

export default ParametrosForm;
