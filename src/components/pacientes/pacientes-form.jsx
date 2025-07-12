import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "antd";
import moment from "moment";

import PacienteContext from "../../store/paciente-context";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";

import classes from "./pacientes-form.module.scss";
import { modalError } from "../../services/notifications";
import Card from "../ui/card";

const PacientesForm = (props) => {
  const [form] = Form.useForm();
  const context = useContext(PacienteContext);

  const { id } = props;
  const [estado, setEstado] = useState("");
  const [pacienteDatos, setPacienteDatos] = useState(null);

  const disabled = !hasPermission(actions.PacientesEditar);

  useEffect(() => {
    async function getForm() {
      if (id === "nuevo") {
        return;
      }

      const response = await http.get(`pacientes/${id}`);
      if (response) {
        const data = response.data;
        setPacienteDatos(data);
        console.log("Datos del paciente:", data);
        setEstado(data.Estado);
      }
    }
    getForm();
  }, [id, context.reload]);

  const s = pacienteDatos;

  if (!s) {
    return <div>Cargando datos del paciente...</div>;
  }

  return (
    <Card>
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Código">
            <div className="value">{s.codigo ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Temporal">
            <div className="value">{s.temporal ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Tipo Doc">
            <div className="value">{s.tdoc ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="DNI">
            <div className="value">{s.dni ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Apellido Paterno">
            <div className="value">{s.apellidoP ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Apellido Materno">
            <div className="value">{s.apellidoM ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Nombre M">
            <div className="value">{s.nombrem ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Nombre">
            <div className="value">{s.nombre ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Estado">
            <div className="value">{s.estado ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Fecha Nacimiento">
            <div className="value">
              {s.fechaNacimiento
                ? moment(s.fechaNacimiento).format("DD/MM/YYYY")
                : "-"}
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item className="readonly-label" label="Dirección">
            <div className="value">{s.direccion ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Nacionalidad">
            <div className="value">{s.nacionalidad ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Departamento">
            <div className="value">{s.departamento ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Provincia">
            <div className="value">{s.provincia ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="País">
            <div className="value">{s.pais ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Distrito">
            <div className="value">{s.distrito ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Sexo">
            <div className="value">{s.sexo ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Estado Civil">
            <div className="value">{s.estadoCivil ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Teléfono">
            <div className="value">{s.telefono ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Celular">
            <div className="value">{s.celular ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Obra Social">
            <div className="value">{s.obraSocial ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="N° Afiliado">
            <div className="value">{s.numeroAfiliado ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="N° Afiliado OSEP">
            <div className="value">{s.numeroAfiliadoOSEP ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Código Afiliado">
            <div className="value">{s.codigoAfiliado ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Parentesco">
            <div className="value">{s.parentesco ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Tnombre">
            <div className="value">{s.tnombre ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Tnombre Cuit">
            <div className="value">{s.tnombreCuit ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Tdir">
            <div className="value">{s.tdir ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Monotributista">
            <div className="value">{s.monotributista ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Cuit Monotributista">
            <div className="value">{s.cuitMonotributista ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Fecha Ingreso">
            <div className="value">
              {s.fechaIngreso
                ? moment(s.fechaIngreso).format("DD/MM/YYYY")
                : "-"}
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Fecha Última Atención">
            <div className="value">
              {s.fechaUltimaAtencion
                ? moment(s.fechaUltimaAtencion).format("DD/MM/YYYY")
                : "-"}
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Profesional">
            <div className="value">{s.profesional ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Responsable">
            <div className="value">{s.responsable ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Internación">
            <div className="value">{s.internacion ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Foto">
            <div className="value">
              {s.foto ? (
                <img
                  src={s.foto}
                  alt="Foto"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              ) : (
                "-"
              )}
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Nombre Jurídico">
            <div className="value">{s.nombreJuridico ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Responsable Extra">
            <div className="value">{s.responsableExtra ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Estudios">
            <div className="value">{s.estudios ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Infanto">
            <div className="value">{s.infanto ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Situación Laboral">
            <div className="value">{s.situacionLaboral ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Nivel Instrucción">
            <div className="value">{s.nivelInstruccion ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Borrado">
            <div className="value">{s.borrado ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Género">
            <div className="value">{s.genero ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Lab Cloz">
            <div className="value">{s.labCloz ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Cloz">
            <div className="value">{s.cloz ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </Card>
  );
};

export default PacientesForm;
