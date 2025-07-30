import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Switch, Button, Row, Col, Spin, message, Select } from "antd";
import {
  createDedicacion,
  getDedicacionById,
  updateDedicacion,
} from "../../services/dedicacionesService";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const DedicacionesForm = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Cargar datos si es edición
  useEffect(() => {
    setLoading(true);

    async function getForm() {
      if (id === "nuevo") {
        return;
      }

      const response = await http.get(`dedications/${id}`);
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
        ? await http.post("dedications", values)
          .catch((error) => {
            if (error.response.status === 422) {
              modalError("Error al crear la dedicación", error.response.data.errores[0].detalle);
            }
          })
        : await http.put(`dedications/${id}`, values).catch((error) => {
          console.log("Response:", error.response);

          if (error.response.status === 422) {
              modalError("Error al crear la dedicación", error.response.data.errores[0].detalle);
          }
        });

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Dedicación guardada",
        id === "nuevo"
          ? "La dedicación fue creada exitosamente"
          : "La dedicación fue modificada exitosamente"
      );
      navigate("/config/dedicacion");
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
          minutes: 0,
          status: "enabled",
          default: false,
          percentage: 0,
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
              label="Estado"
              name="status"
              rules={[{ required: true, message: "Seleccione un estado" }]}
            >
              <Select placeholder="Seleccione...">
                <Option value="enabled">Activo</Option>
                <Option value="disabled">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Minutos"
              name="minutes"
              rules={[{ required: true, message: "Ingrese los minutos" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Ingrese los minutos"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Porcentaje"
              name="percentage"
              rules={[{ required: true, message: "Ingrese el porcentaje" }]}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: "100%" }}
                placeholder="Ingrese el porcentaje"
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Por defecto"
              name="default"
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

export default DedicacionesForm;