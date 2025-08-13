import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";

import http from "../../services/http";

import classes from "./auditoria-form.module.scss";

const AuditoriaForm = (props) => {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const { id } = props;

  const [json, setJson] = useState({});

  useEffect(() => {
    async function getForm() {
      const response = await http.get(`auditorias/${id}`);
      if (response) {
        const data = response.data;
        form.setFieldsValue(data);
        setJson(JSON.parse(data.contenido));
      }
    }
    getForm();
  }, [id]);

  const onClickBack = () => {
    navigate("/auditorias");
  };

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item label="Fecha" name="fecha">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Hora" name="hora">
            <Input disabled />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item label="Usuario" name="usuario">
            <Input disabled />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item label="Acción" name="accion">
            <Input disabled />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Contenido">
            {/* <div className={classes.viewer}>
              <Viewer
                visible={true}
                onClose={() => {}}
                images={[{ src: "data:application/json;base64," + btoa(JSON.stringify(json, null, 2)), alt: "JSON" }]}
                noNavbar
                noToolbar
                noImgDetails
                noFooter
                attribute={false}
                zoomable={false}
                rotatable={false}
                scalable={false}
                changeable={false}
                showTotal={false}
                style={{ maxHeight: 400, overflow: 'auto', background: '#f8f8f8' }}
              />
            </div> */}
          </Form.Item>
        </Col>
      </Row>

      <div className="actions">
        <Button type="text" onClick={onClickBack}>
          Volver
        </Button>
      </div>
    </Form>
  );
};

export default AuditoriaForm;
