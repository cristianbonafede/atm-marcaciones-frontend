import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import jwt from "jwt-decode";

import { required } from "../../services/forms";
import http from "../../services/http";
import { modalError, modalSuccess, renderAlert } from "../../services/notifications";

const SolicitudesEstadosForm = (props) => {
  const [form] = Form.useForm();
  const { id, estado, onSave, onClose, onReloader } = props;

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  useEffect(() => {
    setAlert(undefined);
    form.resetFields();
    form.setFieldsValue({ estado: estado?.toString() });
  }, [estado]);

  const onSubmit = async (values) => {
    setLoading(true);

    const token = jwt(sessionStorage.getItem("token"));
    values.usuario = token.nombre;

    const response = await http
      .patch(`solicitudes/${id}/estado`, values)
      .catch((error) => {
        console.log(error);
        setLoading(false);
        onClose();
        onReloader();
        modalError(
          "Hubo un problema",
          "Hubo un problema al informar el cambio de estado.",
        );
      });

    setLoading(false);

    if (response) {
      onSave(values);

      if (values.estado === "2") {
        await modalSuccess(
          "Solicitud aprobada",
          "La solicitud fue aprobada correctamente"
        );
      }

      if (values.estado === "3") {
        await modalSuccess(
          "Solicitud rechazada",
          "La solicitud fue rechazada correctamente"
        );
      }
    }
  };

  return (
    <Modal
      centered
      visible={estado}
      title="Cambiar estado"
      footer={null}
      onCancel={onClose}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        {alert && renderAlert(alert.type, alert.message)}

        <Row gutter={20}>
          <Col xs={24}>
            <Form.Item label="Estado" name="estado" rules={[required]}>
              <Select>
                <Select.Option value="2">Aprobado</Select.Option>
                <Select.Option value="3">Rechazado</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              className="textarea"
              label="Comentario"
              name="comentario"
            >
              <Input.TextArea rows={6} showCount maxLength={500} />
            </Form.Item>
          </Col>
        </Row>

        <div className="actions">
          <Button type="text" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {!loading && "Actualizar"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SolicitudesEstadosForm;
