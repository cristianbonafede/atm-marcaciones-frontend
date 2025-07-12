import { useParams, useLocation } from "react-router-dom";
import { Card, Tabs } from "antd";

import { PacienteContextProvider } from "../../store/paciente-context";

import Header from "../../components/ui/header";
import PacientesForm from "./../../components/pacientes/pacientes-form";
import PacientesTurnos from "../../components/pacientes/pacientes-turnos";
import PacientesMedicaciones from "../../components/pacientes/pacientes-medicaciones";
import PacientesInternacion from "../../components/pacientes/pacientes-internacion";
import PacientesEvoluciones from "../../components/pacientes/pacientes-evoluciones";
import { actions, hasPermission } from "../../services/security";
import iconPaciente from "./../../assets/images/patient.png";
import iconPersonales from "./../../assets/images/personales.svg";
import iconLicencias from "./../../assets/images/licencias.svg";
import iconMedicaciones from "./../../assets/images/medical-report.png";
import iconInternaciones from "./../../assets/images/hospital-bed.png";
import iconEvoluciones from "./../../assets/images/medical.png";

const PacientesDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nombreCompleto = searchParams.get('n');

  const title = `Paciente: ${(nombreCompleto && !nombreCompleto.includes('null')) ? nombreCompleto + " - " : ""} ${id}`;
  const icon = <img className="icon-img" src={iconPaciente} alt="Logo" />;
  const breadcrumb = [
    { title: "Pacientes", url: "/pacientes" },
    { title: "Ver", url: `/pacientes/${id}?n=${nombreCompleto}` },
  ];

  const cardTabStyle = {
    minWidth: 140,
    minHeight: 40,
    textAlign: 'center',
    background: 'linear-gradient(135deg, #fff 85%, #f3fcfa 100%)',
    color: 'linear-gradient(to right, #b5000b, #660006)',
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 rgba(0,159,137,0.07)',
    border: '1px solid #b2e5dd',
    fontWeight: 500,
    fontSize: 15,
    letterSpacing: 0.5,
    padding: '4px 0',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const tabItems = [];


  if (hasPermission(actions.PacientesVerDatos)) {
    tabItems.push({
      key: "datos",
      label: (
        <Card hoverable style={cardTabStyle}>
          <img className="icon-img" src={iconPersonales} style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} />Datos
        </Card>
      ),
      children: <PacientesForm id={id} />,
    });
  }
  if (hasPermission(actions.PacientesVerTurnos)) {
    tabItems.push(
      {
        key: "turnos",
        label: (
          <Card hoverable style={cardTabStyle}>
           <img className="icon-img" src={iconLicencias} style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} /> Turnos
          </Card>
        ),
        children: <PacientesTurnos id={id} />,
      }
    );
  }

  if (hasPermission(actions.PacientesVerMedicaciones)) {
    tabItems.push({
      key: "medicaciones",
      label: (
        <Card hoverable style={cardTabStyle}>
        <img className="icon-img" src={iconMedicaciones} style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} /> Medicaciones
        </Card>
      ),
      children: <PacientesMedicaciones id={id} />,
    });
  }


  if (hasPermission(actions.PacientesVerInternaciones)) {
    tabItems.push({
      key: "internaciones",
      label: (
        <Card hoverable style={cardTabStyle}>
          <img className="icon-img" src={iconInternaciones} style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} /> Internaciones
        </Card>
      ),
      children: <PacientesInternacion id={id} />,
    });
  }
  if (hasPermission(actions.PacientesVerEvoluciones)) {
    tabItems.push({
      key: "Evoluciones",
      label: (
        <Card hoverable style={cardTabStyle}>
          <img className="icon-img" src={iconEvoluciones} style={{ fontSize: 20, marginRight: 8, verticalAlign: 'middle' }} /> Evoluciones
        </Card>
      ),
      children: <PacientesEvoluciones id={id} />,
    });
  }


  return (
    <PacienteContextProvider>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <Tabs
        defaultActiveKey="datos"
        items={tabItems}
        tabBarGutter={16}
        tabBarStyle={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
      />

    </PacienteContextProvider>
  );
};

export default PacientesDetailPage;
