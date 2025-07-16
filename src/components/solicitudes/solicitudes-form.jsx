import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "antd";
import moment from "moment";

import SolicitudContext from "../../store/solicitud-context";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";

import SolicitudesEstado from "./solicitudes-estado";
import SolicitudesEstadosForm from "./solicitudes-estado-form";

import classes from "./solicitudes-form.module.scss";
import { modalError } from "../../services/notifications";

const SolicitudesForm = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  const { id } = props;
  const [estado, setEstado] = useState(-1);
  const [step, setStep] = useState('');
  const [estadoTemp, setEstadoTemp] = useState();
  const [loading, setLoading] = useState(false);

  const disabled = !hasPermission(actions.SolicitudesEditar);

  useEffect(() => {
    async function getForm() {
      if (id === "nuevo") {
        return;
      }

      const response = await http.get(`solicitudes/${id}`);
      if (response) {
        const data = response.data;
        context.updateSolicitud(data);
        setEstado(data.estado);
        setStep(data.step);
      }
    }
    getForm();
  }, [id, context.reload]);

  const onClickChangeEstado = (estado) => {
    setEstadoTemp(estado);
  };

  const onClickInform = async () => {
    setLoading(true);

    const response = await http.patch(`solicitudes/${id}/informe`, {})
      .catch(async (error) => {
        console.log("Response:", error.response);
        setLoading(false);
        await modalError(
          "Error al informar",
          error.response.data.errores[0].detalle,
        );
      });
    setLoading(false);

    if (response) {
      let nSolicitud = { ...context.solicitud, informado: true };
      context.updateSolicitud(nSolicitud);
      window.location.reload();
    }
  };

  const onChangeEstado = (values) => {
    let nSolicitud = { ...context.solicitud };
    nSolicitud.historial.unshift({
      comentario: values.comentario,
      estado: estadoTemp,
      estadoAnterior: estado,
      fecha: moment().format("DD/MM/YYYY"),
      hora: moment().format("HH:mm"),
      usuario: values.usuario,
    });
    context.updateSolicitud(nSolicitud);

    setEstado(estadoTemp);
    setEstadoTemp(undefined);
  };

  return (
    <Form layout="vertical" form={form}>
      <SolicitudesEstado className={`${classes.estado} glow`} estado={estado} step={step} />

      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Form.Item className="readonly-label" label="Identificador">
            <div className="value">{context.solicitud.id ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Fecha">
            <div className="value">{context.solicitud.fecha ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Hora">
            <div className="value">{context.solicitud.hora ?? "-"}</div>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item
            className="readonly-label"
            label="Trámite (Legajo Digital)"
          >
            <div className="value">
              {context.solicitud.legajoDigitalTramiteId ?? "-"}
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Informado">
            <div className="value">
              {context.solicitud.informado ? "Si" : "No"}
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Ip">
            <div className="value">{context.solicitud.ip ?? "-"}</div>
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item className="readonly-label" label="Dispositivo">
            <div className="value">{context.solicitud.dispositivo ?? "-"}</div>
          </Form.Item>
        </Col>

        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="Gestor">
            <div className="value">{context.solicitud.gestor ?? "-"}</div>
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item className="readonly-label" label="External Ref Id">
            <div className="value">{context.solicitud.externalRefId ?? "-"}</div>
          </Form.Item>
        </Col>
      </Row>

      <SolicitudesEstadosForm
        id={id}
        estado={estadoTemp}
        onSave={onChangeEstado}
        onClose={() => setEstadoTemp(undefined)}
        onReloader={() => context.reloader()}
      />

      <div className="actions">
        {!disabled && estado === 4 && context.solicitud.puntajeRiesgo !== null && (
          <React.Fragment>
            <Button type="danger" onClick={() => onClickChangeEstado(3)}>
              Rechazar
            </Button>
            <Button type="success" onClick={() => onClickChangeEstado(2)}>
              Validar
            </Button>
          </React.Fragment>
        )}
        {(estado === 6 || estado === 5 || estado == 7) && !context.solicitud.informado && context.solicitud.tipoSolicitud !== 'SurFinanzas' && context.solicitud.tipoSolicitud !== 'Blm' && (
          <Button type="primary" onClick={onClickInform}
            loading={loading}

          >
            Informar
          </Button>
        )}
        {(estado === 6) && (
          <React.Fragment>
            <Button type="danger" onClick={() => onClickChangeEstado(3)}>
              Rechazar
            </Button>
            <Button type="success" onClick={() => onClickChangeEstado(2)}>
              Aprobar
            </Button>
          </React.Fragment>
        )}
      </div>
    </Form>
  );
};

export default SolicitudesForm;
