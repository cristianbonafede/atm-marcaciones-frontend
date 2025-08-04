import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Switch, Button, Row, Col, Spin, Select } from "antd";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const LicenseTypesForm = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    async function getForm() {
      if (id === "nuevo") {
        setLoading(false);
        return;
      }

      const response = await http.get(`licensetypes/${id}`);
      if (response) {
        const data = response.data;
        form.setFieldsValue(data);
      }
      setLoading(false);
    }
    getForm();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    const response =
      id === "nuevo"
        ? await http.post("licensetypes", values).catch((error) => {
            if (error.response?.status === 422) {
              modalError("Error al crear el tipo de licencia", error.response.data.errores[0].detalle);
            }
          })
        : await http.put(`licensetypes/${id}`, values).catch((error) => {
            if (error.response?.status === 422) {
              modalError("Error al modificar el tipo de licencia", error.response.data.errores[0].detalle);
            }
          });

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Tipo de licencia guardado",
        id === "nuevo"
          ? "El tipo de licencia fue creado exitosamente"
          : "El tipo de licencia fue modificado exitosamente"
      );
      navigate("/licensetypes");
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          description: "",
          ordinary: false,
          needsJustification: false,
          authRequired: false,
          type: "",
          daysQty: 0,
          maximunRequestPerYear: 0,
          incentiveDeduct: false,
          hasConsecutiveDays: false,
          yearlyBased: false,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Ingrese el nombre" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "Ingrese la descripción" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Ordinaria"
              name="ordinary"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Requiere Justificación"
              name="needsJustification"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Requiere Autorización"
              name="authRequired"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tipo"
              name="type"
              rules={[{ required: true, message: "Ingrese el tipo" }]}
            >
              <Select placeholder="Seleccione...">
                <Option value="variable">Variable</Option>
                <Option value="fixed">Fijo</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Cantidad de días"
              name="daysQty"
              rules={[{ required: true, message: "Ingrese la cantidad de días" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Máximo solicitudes por año"
              name="maximunRequestPerYear"
              rules={[{ required: true, message: "Ingrese el máximo de solicitudes por año" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Descuenta incentivo"
              name="incentiveDeduct"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tiene días consecutivos"
              name="hasConsecutiveDays"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Basado en año"
              name="yearlyBased"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}></Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <Button style={{ minWidth: 120 }} onClick={() => window.history.back()}>
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ minWidth: 120 }}
              >
                Guardar
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default LicenseTypesForm;