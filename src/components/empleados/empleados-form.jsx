import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import { required } from "../../services/forms";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { actions, hasPermission } from "../../services/security";

const EmpleadosForm = ({ id }) => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState();

  const disabled =
    id === "nuevo"
      ? !hasPermission(actions.EmpleadosCrear)
      : !hasPermission(actions.EmpleadosEditar);

  const [empleado, setEmpleado] = useState(null);
  useEffect(() => {
    async function getForm() {
      if (id === "nuevo") {
        setEmpleado(null);
        return;
      }
      setLoading(true);
      const response = await http.get(`empleados/${id}`);
      if (response) {
        setEmpleado(response.data);
      }
      setLoading(false);
    }
    getForm();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (empleado) {
      // Mapear estado: solo 1 (Activo) o 0 (Inactivo)
      form.setFieldsValue(empleado);
    }
  }, [empleado, form]);

  const onClickBack = () => {
    navigate("/empleados");
  };

  const onClickSave = async (values) => {
    setSaving(true);
    let response;
    try {
      if (id === "nuevo") {
        response = await http.post("empleados", values);
      } else {
        response = await http.put(`empleados/${id}`, values);
      }
      if (response) {
        await modalSuccess("Empleado guardado", "Los datos se guardaron correctamente");
        navigate("/empleados");
      }
    } catch (error) {
      modalError("Error al guardar", error?.response?.data?.errores?.[0]?.detalle || "Error desconocido");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spin />;

  return (
    <Form layout="vertical" form={form} onFinish={onClickSave}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Nombre" name="nombre" rules={[required]}> 
            <Input disabled={disabled} /> 
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Apellido" name="apellido" rules={[required]}>
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Calificación" name="calificacion">
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Legajo" name="legajoNumero">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="N° Documento" name="numeroDocumento">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Ocupación" name="ocupacion">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Categoría" name="categoriaEmpleado">
            <Input disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Estado" name="estado">
            <Select disabled={disabled}>
              <Select.Option value={1}>Activo</Select.Option>
              <Select.Option value={0}>Inactivo</Select.Option>
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

export default EmpleadosForm;
