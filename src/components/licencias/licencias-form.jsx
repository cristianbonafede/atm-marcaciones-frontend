import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Switch, Button, Row, Col, Spin, Select } from "antd";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const LicenciasForm = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [tipos, setTipos] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const empleadosRes = await http.get("workers?page=1&size=10000");
      const tiposRes = await http.get("licensetypes?page=1&size=10000");
      setEmpleados(empleadosRes.data.list);
      setTipos(tiposRes.data.list);

      if (id !== "nuevo") {
        const response = await http.get(`licenses/${id}`);
        if (response) {
          const data = response.data;
          form.setFieldsValue({
            ...data,
            startDate: data.startDate ? dayjs(data.startDate, 'YYYY-MM-DD', true) : null,
            endDate: data.endDate ? dayjs(data.endDate, 'YYYY-MM-DD', true) : null,
          });
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      startDate: values.startDate ? values.startDate.format("YYYY-MM-DD") : null,
      endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
    };
    const response =
      id === "nuevo"
        ? await http.post("licenses", payload).catch((error) => {
            if (error.response?.status === 422) {
              modalError("Error al crear la licencia", error.response.data.errores[0].detalle);
            }
          })
        : await http.put(`licenses/${id}`, payload).catch((error) => {
            if (error.response?.status === 422) {
              modalError("Error al modificar la licencia", error.response.data.errores[0].detalle);
            }
          });

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Licencia guardada",
        id === "nuevo"
          ? "La licencia fue creada exitosamente"
          : "La licencia fue modificada exitosamente"
      );
      navigate("/empleados/licencias");
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          workerId: "",
          licenseTypeId: "",
          startDate: null,
          endDate: null,
          authorized: false,
          observation: "",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Empleado"
              name="workerId"
              rules={[{ required: true, message: "Seleccione el empleado" }]}
            >
              <Select placeholder="Seleccione..." showSearch
              optionFilterProp="children">
                {empleados.map(e => (
                  <Option key={e.workerId} value={e.workerId}>
                    {e.name} {e.lastname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tipo Licencia"
              name="licenseTypeId"
              rules={[{ required: true, message: "Seleccione el tipo de licencia" }]}
            >
              <Select placeholder="Seleccione..." showSearch
              optionFilterProp="children"> {tipos.map(t => (
                  <Option key={t.licenseTypeId} value={t.licenseTypeId}>
                    {t.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Fecha Inicio"
              name="startDate"
              rules={[{ required: true, message: "Seleccione la fecha de inicio" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Fecha Fin"
              name="endDate"
              rules={[{ required: true, message: "Seleccione la fecha de fin" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Autorizada"
              name="authorized"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Observación"
              name="observation"
            >
              <Input.TextArea         autoSize={{ minRows: 2 }} />
            </Form.Item>
          </Col>
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

export default LicenciasForm;