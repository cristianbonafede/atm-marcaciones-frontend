import { useContext } from "react";
import { Col, Form, Row } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-domicilio-comercio.module.scss";

import icon from "./../../assets/images/house.png";

const SolicitudesDomicilioComercio = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="emails" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Domicilio</div>
          <div className={classes.description}>
            Domicilio del Comercio
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Calle">
              <div className="value">{context.solicitud.calleComercio ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Numeración">
              <div className="value">{context.solicitud.numeracionComercio ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Piso">
              <div className="value">{context.solicitud.pisoComercio ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Departamento">
              <div className="value">
                {context.solicitud.departamentoComercio ?? "-"}
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Código Postal">
              <div className="value">
                {context.solicitud.codigoPostalComercio ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Ciudad">
              <div className="value">{context.solicitud.ciudadComercio ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Municipalidad">
              <div className="value">
                {context.solicitud.municipalidadComercio ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Provincia">
              <div className="value">{context.solicitud.provinciaComercio ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="País">
              <div className="value">{context.solicitud.paisComercio ?? "-"}</div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesDomicilioComercio;
