import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/personal-data.png";
import dayjs from "dayjs";
const DatosPersonalesCard = ({ disabled, required, subtitle }) => (
  <div>
    <div className={classes.header}>
      <div className={classes.icon}>
        <img src={icon} alt="user" />
      </div>
      <div className={classes.data}>
        <div className={classes.title}>Datos personales</div>
        <div className={classes.description}>{subtitle}</div>
      </div>
    </div>
    <Row gutter={16}>
      <Col xs={24} md={24}>
        <Form.Item label="Legajo" name="number" rules={[required]}>
          <Input disabled={disabled} />
        </Form.Item>
      </Col>

    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Nombre" name="name" rules={[required]}>
          <Input disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Apellido" name="lastname" rules={[required]}>
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
        <Form.Item label="N° Documento" name="documentNumber" rules={[required]}>
          <Input disabled={disabled} />
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
      <Col xs={24} md={12}>

        <Form.Item label="Fecha de Nacimiento" name="birthdate">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Estado civil" name="civilStatus">
          <Input disabled={disabled} />
        </Form.Item>
      </Col>

    </Row>
  </div>
);

export default DatosPersonalesCard;