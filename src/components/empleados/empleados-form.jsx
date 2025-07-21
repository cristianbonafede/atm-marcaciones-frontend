import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Select, Spin, Card } from "antd";
import { UserOutlined, MailOutlined, SolutionOutlined, FileTextOutlined, HomeOutlined } from "@ant-design/icons";
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
  const [ocupaciones, setOcupaciones] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const disabled =
    id === "nuevo"
      ? !hasPermission(actions.EmpleadosCrear)
      : !hasPermission(actions.EmpleadosEditar);

  const [empleado, setEmpleado] = useState(null);
  useEffect(() => {
    async function getForm() {
      let response = await http.get("occupations?Page=1&Size=10000");
      if (response) {
        const data = response.data;
        setOcupaciones(data.list);
      }
      response = await http.get("workercategories?Page=1&PageSize=10000");
      if (response) {
        const data = response.data;
        setCategorias(data.list);
      }

      if (id === "nuevo") {
        setEmpleado(null);
        return;
      }
      setLoading(true);
      response = await http.get(`workers/${id}`);
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
        response = await http.post("workers", values);
      } else {
        response = await http.put(`workers/${id}`, values);
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

  return (
    <Form layout="vertical" form={form} onFinish={onClickSave}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card
            title={
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                Datos Personales
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Legajo" name="number" rules={[required]}>
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Nombre" name="name" rules={[required]}>
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Apellido" name="lastname" rules={[required]}>
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="N° Documento" name="documentNumber" rules={[required]}>
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Tipo Documento" name="documentTypeId">
                  <Select disabled={disabled}>
                    <Select.Option value={1}>DNI</Select.Option>
                    <Select.Option value={2}>Pasaporte</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Sexo" name="sex">
                  <Select disabled={disabled}>
                    <Select.Option value="Femenino">Femenino</Select.Option>
                    <Select.Option value="Masculino">Masculino</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Fecha de Nacimiento" name="birthdate">
                  <Input type="date" disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <span>
                <MailOutlined style={{ marginRight: 8 }} />
                Datos de Contacto
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Teléfono" name="phone">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Teléfono 2" name="phone2">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Email" name="email">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Email 2" name="email2">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Calle" name="street">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Número Calle" name="streetNumber">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Barrio" name="neighborhood">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Piso" name="floor">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Departamento" name="flat">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Localidad" name="locationId">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Código Postal" name="zipCode">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card
            title={
              <span>
                <SolutionOutlined style={{ marginRight: 8 }} />
                Datos Laborales
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Ocupación" name="occupationId">
                  <Select showSearch optionFilterProp="children" disabled={disabled} >
                    {ocupaciones?.map((option, index) => (
                      <Select.Option key={index} value={option.occupationId}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Categoría" name="workerCategoryId">
                  <Select showSearch optionFilterProp="children" disabled={disabled} >
                    {categorias?.map((option, index) => (
                      <Select.Option key={index} value={option.workerCategoryId}>
                        {option.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={12} md={6}>
                <Form.Item label="Calificacion" name="calification" rules={[required]}>
                  <Input  type="number" disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item label="Estado" name="status">
                  <Select disabled={disabled}>
                    <Select.Option value={10}>Activo</Select.Option>
                    <Select.Option value={0}>Inactivo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Fecha Inicio" name="initDate">
                  <Input type="date" disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Fecha Efectiva" name="effectiveDate">
                  <Input type="date" disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Usuario ID" name="userId">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="PIN" name="pin">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Nivel Educativo" name="educationLevel">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Título Educativo" name="educationTitle">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Dedicación" name="dedicationId">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Horario de Trabajo" name="workingHourId">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="No Computable" name="noComputableTime">
                  <Input type="number" disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Web Signin" name="webSigninEnabled">
                  <Select disabled={disabled}>
                    <Select.Option value={true}>Sí</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Máquina Signin" name="machineSigninEnabled">
                  <Select disabled={disabled}>
                    <Select.Option value={true}>Sí</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Verificar Datos" name="verifyData">
                  <Select disabled={disabled}>
                    <Select.Option value={true}>Sí</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Verificado Por" name="verifiedBy">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <span>
                <FileTextOutlined style={{ marginRight: 8 }} />
                Observaciones
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Observaciones Personales" name="personalObservations">
                  <Input.TextArea disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Observaciones Laborales" name="workplaceObservations">
                  <Input.TextArea disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card
            title={
              <span>
                <HomeOutlined style={{ marginRight: 8 }} />
                Datos del Trabajo
              </span>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Teléfono Trabajo" name="workplacePhone">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Email Trabajo" name="workplaceEmail">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Dirección Trabajo" name="workplaceAddress">
                  <Input disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
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
