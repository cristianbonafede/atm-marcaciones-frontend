import { useContext } from "react";
import { Col, Form, Row } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-domicilio.module.scss";

import icon from "./../../assets/images/house.png";

const SolicitudesDomicilio = (props) => {
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
            Último domicilio registrado en el Registro Nacional de las Personas.
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Calle">
              <div className="value">{context.solicitud.calle ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Numeración">
              <div className="value">{context.solicitud.numeracion ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Piso">
              <div className="value">{context.solicitud.piso ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Departamento">
              <div className="value">
                {context.solicitud.departamento ?? "-"}
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Código Postal">
              <div className="value">
                {context.solicitud.codigoPostal ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Ciudad">
              <div className="value">{context.solicitud.ciudad ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Municipalidad">
              <div className="value">
                {context.solicitud.municipalidad ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Provincia">
              <div className="value">{context.solicitud.provincia ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="País">
              <div className="value">{context.solicitud.pais ?? "-"}</div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesDomicilio;
