import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Switch, Button, Row, Col, Spin, Select, TimePicker } from "antd";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const AsistenciasForm = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [crews, setCrews] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const empleadosRes = await http.get("workers?page=1&size=10000");
      const maquinasRes = await http.get("machines?page=1&size=10000");
      const crewsRes = await http.get("crews?page=1&size=10000");
      setEmpleados(empleadosRes.data.list);
      setMaquinas(maquinasRes.data.list);
      setCrews(crewsRes.data.list);

      if (id !== "nuevo") {
        const response = await http.get(`attendances/${id}`);
        if (response) {
          const data = response.data;
          form.setFieldsValue({
            ...data,
            dateTime: data.dateTime ? dayjs(data.dateTime) : null,
            entryTime: data.entryTime ? dayjs(data.entryTime, "HH:mm") : null,
            departureTime: data.departureTime ? dayjs(data.departureTime, "HH:mm") : null,
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
      dateTime: values.dateTime ? values.dateTime.toISOString() : null,
      entryTime: values.entryTime ? values.entryTime.format("HH:mm") : null,
      departureTime: values.departureTime ? values.departureTime.format("HH:mm") : null,
    };
    const response =
      id === "nuevo"
        ? await http.post("attendances", payload).catch((error) => {
            if (error.response?.status === 422) {
              modalError("Error al crear la asistencia", error.response.data.errores[0].detalle);
            }
          })
        : await http.put(`attendances/${id}`, payload).catch((error) => {
            if (error.response?.status === 422) {
              modalError("Error al modificar la asistencia", error.response.data.errores[0].detalle);
            }
          });

    setLoading(false);

    if (response) {
      await modalSuccess(
        "Asistencia guardada",
        id === "nuevo"
          ? "La asistencia fue creada exitosamente"
          : "La asistencia fue modificada exitosamente"
      );
      navigate("/empleados/registro-asistencias");
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
          machineId: "",
          dateTime: null,
          pin: "",
          status: 0,
          verified: 0,
          workCode: "",
          entryTime: null,
          departureTime: null,
          web: false,
          isMachineError: false,
          ip: "",
          observation: "",
          hasSignout: false,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Empleado"
              name="workerId"
              rules={[{ required: true, message: "Seleccione el empleado" }]}
            >
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {empleados.map(e => (
                  <Option key={e.workerId} value={e.workerId}>
                    {e.name} {e.lastname}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Máquina"
              name="machineId"
              rules={[{ required: true, message: "Seleccione la máquina" }]}
            >
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {maquinas.map(m => (
                  <Option key={m.machineId} value={m.machineId}>
                    {m.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
                    <Col xs={24} md={8}>
            <Form.Item
              label="Sector"
              name="crewId"
              rules={[{ required: true, message: "Seleccione el sector" }]}
            >
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {crews.map(c => (
                  <Option key={c.crewId} value={c.crewId}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Fecha y Hora"
              name="dateTime"
              rules={[{ required: true, message: "Seleccione la fecha y hora" }]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="PIN" name="pin">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Estado" name="status">
              <Select>
                <Option value={15}>Aprobado</Option>
                <Option value={16}>Rechazado</Option>
                <Option value={1}>Creado</Option>
                <Option value={0}>Eliminado</Option>
              </Select>
            </Form.Item>
          </Col>
          {/* <Col xs={24} md={12}>
            <Form.Item label="Verificado" name="verified">
              <Select>
                <Option value={false}>No</Option>
                <Option value={true}>Sí</Option>
              </Select>
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Código de Trabajo" name="workCode">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="IP" name="ip">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Hora Entrada" name="entryTime">
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Hora Salida" name="departureTime">
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Web" name="web" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Error de Máquina" name="isMachineError" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Tiene Salida" name="hasSignout" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item label="Observación" name="observation">
              <Input.TextArea autoSize={{ minRows: 2 }} />
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

export default AsistenciasForm;