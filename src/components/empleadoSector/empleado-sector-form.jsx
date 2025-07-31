import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Spin, message } from "antd";
import http from "../../services/http";
import dayjs from "dayjs";
import { actions, hasPermission } from "../../services/security";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const EmpleadoSectorForm = ({ id, crewId, closeModal }) => {
        let navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(!!id && id !== "nuevo");
  const [editing, setEditing] = useState(hasPermission(actions.EmpleadoSectorEdita));
  const [crews, setCrews] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function getData() {
      // Obtener crews
      if (!crewId) {
        const crewsRes = await http.get("/crews?Page=1&Size=1000");
        if (crewsRes) setCrews(crewsRes.data.list);
      }
      // Obtener workers
      const workersRes = await http.get("/workers?Page=1&Size=1000");
      if (workersRes) setWorkers(workersRes.data.list);

      // Si es edición o vista, obtener datos del registro
      if (id && id !== "nuevo") {
        const res = await http.get(`/crewhasworker/${id}`);
        if (res) {
          form.setFieldsValue({
            ...res.data,
            datetime: res.data.datetime ? dayjs(res.data.datetime, 'YYYY-MM-DDTHH:mm:ss', true) : null,
            finishDatetime: res.data.finishDatetime ? dayjs(res.data.finishDatetime, 'YYYY-MM-DDTHH:mm:ss', true) : null,
          });
        }
        setLoading(false);
      }
    }
    getData();
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (crewId) {
        values.crewId = crewId;
      }
      if (id === "nuevo" || crewId) {
        await http.post("/crewhasworker", values);
        message.success("Empleado sector creado correctamente");
      } else {
        await http.put(`/crewhasworker/${id}`, values);
        message.success("Empleado sector actualizado correctamente");
      }
    } catch (e) {
      message.error("Error al guardar");
    }
    setLoading(false);
    if(crewId){
      closeModal();
    }
    else {
        navigate("/reportes/empleados-sector");
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          workerId: undefined,
          crewId: undefined,
          datetime: null,
          finishDatetime: null,
        }}
        disabled={!editing && id !== "nuevo"}
      >
        {!crewId && (
          <Form.Item
            label="Sector"
            name="crewId"
            rules={[{ required: true, message: "Seleccione un sector" }]}
          >
            <Select placeholder="Seleccione un sector" allowClear showSearch optionFilterProp="children">
              {crews.map((c) => (
                <Option key={c.crewId} value={c.crewId}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          label="Seleccione un empleado"
          name="workerId"
          rules={[{ required: true, message: "Seleccione un empleado" }]}
        >
          <Select placeholder="Seleccione un empleado" allowClear showSearch optionFilterProp="children">
            {workers.map((w) => (
              <Option key={w.workerId} value={w.workerId}>
                {w.name} {w.lastname}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {(editing || id === "nuevo") && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        )}
      </Form>
    </Spin>
  );
};

export default EmpleadoSectorForm;