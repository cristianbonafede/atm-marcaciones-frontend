import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import { FiInbox } from "react-icons/fi";

import { SolicitudContextProvider } from "./../../store/solicitud-context";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import SolicitudesForm from "./../../components/solicitudes/solicitudes-form";
import SolicitudesPersona from "../../components/solicitudes/solicitudes-persona";
import SolicitudesValidaciones from "../../components/solicitudes/solicitudes-validaciones";
import SolicitudesDocumento from "./../../components/solicitudes/solicitudes-documento";
import SolicitudesDomicilio from "./../../components/solicitudes/solicitudes-domicilio";
import SolicitudesContacto from "./../../components/solicitudes/solicitudes-contacto";
import SolicitudesHistorial from "./../../components/solicitudes/solicitudes-historial";
import SolicitudesTimeLine from "./../../components/solicitudes/solicitudes-timeline";
import SolicitudesArchivos from "./../../components/solicitudes/solicitudes-archivos";
import SolicitudesJson from "./../../components/solicitudes/solicitudes-json";
import SolicitudesDatosBancarios from "../../components/solicitudes/solicitudes-datosbancarios";
import SolicitudesDatosComerciales from "../../components/solicitudes/solicitudes-datoscomerciales";
import SolicitudesDomicilioComercio from "../../components/solicitudes/solicitudes-domicilio-comercio";

const SolicitudesDetailPage = () => {
  const { id } = useParams();

  const title = `Ver Solicitud`;
  const icon = <FiInbox />;
  const breadcrumb = [
    { title: "Solicitudes", url: "/solicitudes" },
    { title: "Ver", url: `/solicitudes/${id}` },
  ];

  return (
    <SolicitudContextProvider>
      <Row gutter={[20]}>
        <Col xs={24} lg={24}>
          <Card>
            <Header title={title} icon={icon} breadcrumb={breadcrumb} />
            <SolicitudesForm id={id} />
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card>
            <SolicitudesPersona />
          </Card>

          <Card>
            <SolicitudesDocumento />
          </Card>

          <Card>
            <SolicitudesDomicilio />
          </Card>

          <Card>
            <SolicitudesContacto />
          </Card>

          <Card>
            <SolicitudesDatosBancarios />
          </Card>

          <Card>
            <SolicitudesDatosComerciales />
          </Card>

          <Card>
            <SolicitudesDomicilioComercio />
          </Card>
          <Card>
            <SolicitudesHistorial />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card>
            <SolicitudesValidaciones />
          </Card>
          <Card>
            <SolicitudesArchivos />
          </Card>
          <Card>
            <SolicitudesTimeLine />
          </Card>
        </Col>

        <Col xs={24} lg={24}>
          <Card>
            <SolicitudesJson />
          </Card>
        </Col>
      </Row>
    </SolicitudContextProvider>
  );
};

export default SolicitudesDetailPage;
