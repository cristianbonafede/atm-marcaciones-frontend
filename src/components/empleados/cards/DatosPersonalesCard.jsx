import { Form, Input, Select, Row, Col, DatePicker, message, Button } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/personal-data.png";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import http from "../../../services/http";
const DatosPersonalesCard = ({ disabled, required, subtitle, verifyData, idWorker }) => {

    // Usar el estado local para reflejar cambios tras verificar
  const [verified, setVerified] = useState(!!verifyData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVerified(!!verifyData);
  }, [verifyData]);

  const handleVerifyData = async () => {
    setLoading(true);
    try {
      await http.put(`/workers/verify/${idWorker}`);
      setVerified(true);
      message.success("Datos verificados correctamente");
    } catch (error) {
      message.error("Error al verificar los datos");
    } finally {
      setLoading(false);
    }
  };
  
  return(
  <div>
    <div className={classes.header}>
      <div className={classes.icon}>
        <img src={icon} alt="user" />
      </div>
              {/* Esquina superior derecha: botón o estado verificado */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2,
            padding: 12,
          }}
        >
          {idWorker !== "nuevo" && !verified ? (
            <Button
              type="primary"
              onClick={handleVerifyData}
              disabled={disabled}
              size="small"
              loading={loading}
            >
              Verificar datos
            </Button>
          ) : (
            idWorker !== "nuevo" && verified && (
              <span
                style={{
                  border: "2px solid #52c41a",
                  borderRadius: 6,
                  padding: "4px 12px",
                  color: "#52c41a",
                  fontWeight: 600,
                  background: "#f6ffed",
                  fontSize: 13,
                }}
              >
                Datos verificados
              </span>
            )
          )}
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
);};

export default DatosPersonalesCard;