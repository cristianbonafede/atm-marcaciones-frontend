import { useContext } from "react";
import { Col, Form, Row } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-persona.module.scss";

import man from "./../../assets/images/man.png";
import woman from "./../../assets/images/woman.png";

const SolicitudesPersona = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          {context.solicitud.genero === "M" && <img src={man} alt="hombre" />}
          {context.solicitud.genero === "F" && <img src={woman} alt="mujer" />}
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Persona</div>
          <div className={classes.description}>
            Datos personales del solicitante
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Nombres">
              <div className="value">{context.solicitud.nombres ?? "-"}</div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Apellidos">
              <div className="value">{context.solicitud.apellidos ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Género">
              <div className="value">
                {context.solicitud.genero === "M"
                  ? "Masculino"
                  : context.solicitud.genero === "F"
                  ? "Femenino"
                  : "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Estado Civil">
              <div className="value">
                {context.solicitud.estadoCivil ?? "-"}
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Fecha de Nacimiento">
              <div className="value">
                {context.solicitud.fechaNacimiento ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="País de Nacimiento">
              <div className="value">
                {context.solicitud.paisNacimiento ?? "-"}
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Nacionalidad">
              <div className="value">
                {context.solicitud.nacionalidad ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Cuil">
              <div className="value">{context.solicitud.cuil ?? "-"}</div>
            </Form.Item>
          </Col>

          <Col xs={24} lg={8}>
            <Form.Item className="readonly-label" label="Condición Fiscal">
              <div className="value">
                {context.solicitud.condicionFiscal ?? "-"}
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesPersona;
