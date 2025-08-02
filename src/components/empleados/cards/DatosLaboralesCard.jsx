import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/laboral.png";

const DatosLaboralesCard = ({
  form,
  disabled,
  required,
  ocupaciones,
  categorias,
  dedications,
  subtitle,
}) => (
  <div>
    <div className={classes.header}>
      <div className={classes.icon}>
        <img src={icon} alt="laboral" />
      </div>
      <div className={classes.data}>
        <div className={classes.title}>Datos laborales</div>
        <div className={classes.description}>{subtitle}</div>
      </div>
    </div>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Ocupación" name="occupationId" rules={[required]}>
          <Select showSearch optionFilterProp="children" disabled={disabled}>
            {ocupaciones?.map((option, index) => (
              <Select.Option key={index} value={option.occupationId}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Categoría" name="workerCategoryId" rules={[required]}>
          <Select showSearch optionFilterProp="children" disabled={disabled}>
            {categorias?.map((option, index) => (
              <Select.Option key={index} value={option.workerCategoryId}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Calificacion" name="calification">
          <Input type="number" disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Estado" name="status">
          <Select disabled={disabled}>
            <Select.Option value={10}>Activo</Select.Option>
            <Select.Option value={5}>Inactivo</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Fecha Inicio" name="initDate">
          <DatePicker format="DD/MM/YYYY" allowClear disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Fecha Efectiva" name="effectiveDate">
          <DatePicker format="DD/MM/YYYY" allowClear disabled={disabled} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Usuario ID" name="userId">
          <Input disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="PIN" name="pin">
          <Input disabled={disabled} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Nivel Educativo" name="educationLevel">
          <Input disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Título Educativo" name="educationTitle">
          <Input disabled={disabled} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Dedicación" name="dedicationId">
          <Select showSearch optionFilterProp="children" disabled={disabled}>
            {dedications?.map((option, index) => (
              <Select.Option key={index} value={option.dedicationId}>
                {option.minutes} minutos, {option.percentage}%
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Horario de Trabajo" name="workingHourId">
          <Input disabled={disabled} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="No Computable" name="noComputableTime">
          <Input type="number" disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Web Signin" name="webSigninEnabled">
          <Select disabled={disabled}>
            <Select.Option value={true}>Sí</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Máquina Signin" name="machineSigninEnabled">
          <Select disabled={disabled}>
            <Select.Option value={true}>Sí</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item label="Antigüedad laboral" name="laborOld">
          <Input type="number" disabled={disabled} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Último cambio de horario" name="lastWorkingHourIdChange">
          <DatePicker format="DD/MM/YYYY" disabled />
        </Form.Item>
      </Col>
    </Row>

  </div >
);

export default DatosLaboralesCard;