import { useContext } from "react";

import { Col, Form, Row } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-datosbancarios.module.scss";

import icon from "./../../assets/images/databank2.png";

const SolicitudesDatosBancarios = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="databank" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Datos bancarios</div>
          <div className={classes.description}>
            Datos bancarios registrados durante el onboarding.
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="CBU">
              <div className="value">{context.solicitud.cbu ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Número de cuenta">
              <div className="value">
                {context.solicitud.numeroCuenta ?? "-"}
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesDatosBancarios;
