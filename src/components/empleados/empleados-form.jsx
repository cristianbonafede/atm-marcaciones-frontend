import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import DatosPersonalesCard from "./cards/DatosPersonalesCard";
import DatosContactoCard from "./cards/DatosContactoCard";
import DatosDomicilioCard from "./cards/DatosDomicilioCard";
import DatosLaboralesCard from "./cards/DatosLaboralesCard";
import ObservacionesCard from "./cards/ObservacionesCard";
import DatosTrabajoCard from "./cards/DatosTrabajoCard";
import { required } from "../../services/forms";
import http from "../../services/http";
import { modalError, modalSuccess } from "../../services/notifications";
import { actions, hasPermission } from "../../services/security";
import Card from "../ui/card";
import dayjs from "dayjs";
import { locations } from "../../services/localidades";

const EmpleadosForm = ({ id }) => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ocupaciones, setOcupaciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [dedications, setDedications] = useState([]);

  const disabled =
    id === "nuevo"
      ? !hasPermission(actions.EmpleadosCrear)
      : !hasPermission(actions.EmpleadosEditar);

  const [empleado, setEmpleado] = useState(null);
  useEffect(() => {
    async function getForm() {
      let response = await http.get("occupations?Page=1&Size=10000");
      if (response) {
        setOcupaciones(response.data.list);
      }
      response = await http.get("workercategories?Page=1&Size=10000");
      if (response) {
        setCategorias(response.data.list);
      }
      response = await http.get("dedications?Page=1&Size=10000&Status=enabled");
      if (response) {
        setDedications(response.data.list);
      }
      response = await locations();
      if (response) {
        setLocalidades(response);
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
      empleado.birthdate = empleado.birthdate ? dayjs(empleado.birthdate, 'YYYY-MM-DD', true) : null;
      empleado.initDate = empleado.initDate ? dayjs(empleado.initDate * 1000) : null;
      empleado.effectiveDate = empleado.effectiveDate ? dayjs(empleado.effectiveDate * 1000) : null;
      empleado.lastWorkingHourIdChange = empleado.lastWorkingHourIdChange ? dayjs(empleado.lastWorkingHourIdChange * 1000) : null;
      form.setFieldsValue(empleado);
    }
  }, [empleado, form]);

  const onClickBack = () => {
    navigate("/empleados");
  };

  const onClickSave = async (values) => {
    setSaving(true);
    let response;
    if (values.birthdate) {
      values.birthdate = values.birthdate.format("YYYY-MM-DD");
    }
    if (values.initDate) {
      const timestampMs = values.initDate.valueOf();
      const timestampSeconds = Math.floor(timestampMs / 1000);
      values.initDate = timestampSeconds;
    }

    if (values.effectiveDate) {
      const timestampMs = values.effectiveDate.valueOf();
      const timestampSeconds = Math.floor(timestampMs / 1000);
      values.effectiveDate = timestampSeconds;
    }
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
    <>
      {form && (
        <Form
          layout="vertical"
          form={form}
          onFinish={onClickSave}
          className="solicitudes-detail-form"
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Card>
                <DatosPersonalesCard
                  form={form}
                  disabled={disabled}
                  required={required}
                  subtitle="Información básica del empleado"
                  idWorker={id}
verifiedBy={empleado?.verifiedBy || ""}
                  verifyData={empleado?.verifyData || false}
                />
              </Card>
              <Card>
                <DatosLaboralesCard
                  
                  disabled={disabled}
                  required={required}
                  ocupaciones={ocupaciones}
                  dedications={dedications}
                  categorias={categorias}

                  subtitle="Información laboral y administrativa"
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <DatosContactoCard
                  form={form}
                  disabled={disabled}
                  required={required}
                  subtitle="Datos de contacto"
                />
              </Card>
              <Card>
                <DatosDomicilioCard
                  form={form}
                  disabled={disabled}
                  locations={localidades}
                  required={required}
                  subtitle="Domicilio"
                />
              </Card>

              <Card>
                <DatosTrabajoCard
                  form={form}
                  disabled={disabled}
                  subtitle="Datos del lugar de trabajo"
                />
              </Card>
            </Col>

             <Col xs={24} md={24}>
             <Card>
                <ObservacionesCard
                  form={form}
                  disabled={disabled}
                  subtitle="Observaciones generales"
                />
              </Card>
            </Col>
          </Row>
          <div className="actions">
            <Button type="text" onClick={onClickBack}>
              Volver
            </Button>
            {!disabled && (
              <Button type="primary" htmlType="submit" loading={loading || saving}>
                {!loading && !saving && "Guardar"}
              </Button>
            )}
          </div>
        </Form>
      )}
    </>
  );
};

export default EmpleadosForm;
