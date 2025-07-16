import { useContext } from "react";

import { Col, Form, Row } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-datoscomerciales.module.scss";

import icon from "./../../assets/images/comercio.png";

const SolicitudesDatosComerciales = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="databank" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Datos comerciales</div>
          <div className={classes.description}>
            Datos comerciales registrados durante el onboarding.
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={24}>
            <Form.Item className="readonly-label" label="Nombre de Fantasia">
              <div className="value">{context.solicitud.nombreFantasia ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Id del comercio">
              <div className="value">{context.solicitud.idComercio ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Código Sucursal">
              <div className="value">
                {context.solicitud.codigoSucursal ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Código de Caja">
              <div className="value">{context.solicitud.codigoCaja ?? "-"}</div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesDatosComerciales;
