import { useContext } from "react";

import { Col, Form, Row } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-contacto.module.scss";

import icon from "./../../assets/images/contact.png";

const SolicitudesContacto = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="emails" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Contacto</div>
          <div className={classes.description}>
            Datos de contacto registrados durante el onboarding.
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Correo Electrónico">
              <div className="value">{context.solicitud.email ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Teléfono">
              <div className="value">{context.solicitud.telefono ?? "-"}</div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesContacto;
