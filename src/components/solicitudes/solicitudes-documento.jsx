import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "antd";
import ImageViewer from "react-simple-image-viewer";

import SolicitudContext from "../../store/solicitud-context";
import http from "../../services/http";

import classes from "./solicitudes-documento.module.scss";

import icon from "./../../assets/images/id-card.png";

const SolicitudesDocumento = (props) => {
  const [form] = Form.useForm();
  const context = useContext(SolicitudContext);

  const [frente, setFrente] = useState();
  const [dorso, setDorso] = useState();
  const [preview, setPreview] = useState(-1);

  useEffect(() => {
    async function getImages() {
      if (context.solicitud.archivos && context.solicitud.archivos.length > 0) {
        const fileFrente = context.solicitud.archivos.find(
          (x) => x.tipo === "Documento - Frente"
        );
        const responseFrente = await http.get(`archivos/${fileFrente.id}`);
        if (responseFrente) {
          const data = responseFrente.data;
          setFrente("data:image/png;base64," + data.contenido);
        }

        const fileDorso = context.solicitud.archivos.find(
          (x) => x.tipo === "Documento - Dorso"
        );
        const responseDorso = await http.get(`archivos/${fileDorso.id}`);
        if (responseDorso) {
          const data = responseDorso.data;
          setDorso("data:image/png;base64," + data.contenido);
        }
      }
    }
    getImages();
  }, [context.solicitud]);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="emails" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Documento</div>
          <div className={classes.description}>
            Documento Nacional de Identidad del solicitante.
          </div>
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item className="readonly-label" label="Documento">
              <div className="value">{context.solicitud.documento ?? "-"}</div>
            </Form.Item>

            <Form.Item className="readonly-label" label="Ejemplar">
              <div className="value">
                {context.solicitud.documentoEjemplar ?? "-"}
              </div>
            </Form.Item>

            <Form.Item className="readonly-label" label="N° de Trámite">
              <div className="value">
                {context.solicitud.documentoTramite ?? "-"}
              </div>
            </Form.Item>

            <Form.Item className="readonly-label" label="Fecha de Emisión">
              <div className="value">
                {context.solicitud.documentoEmision ?? "-"}
              </div>
            </Form.Item>

            <Form.Item className="readonly-label" label="Fecha de Expiración">
              <div className="value">
                {context.solicitud.documentoExpiracion ?? "-"}
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <div className={classes.preview}>
              {frente && (
                <img src={frente} alt="frente" onClick={() => setPreview(0)} />
              )}
              {dorso && (
                <img src={dorso} alt="dorso" onClick={() => setPreview(1)} />
              )}
            </div>

            {preview > -1 && (
              <ImageViewer
                src={[frente, dorso]}
                currentIndex={preview}
                disableScroll={false}
                closeOnClickOutside={true}
                onClose={() => setPreview(undefined)}
              />
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SolicitudesDocumento;
