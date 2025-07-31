import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import iconTeam from "../../assets/images/team-work.png";
import EmpleadoSectorForm from "../../components/empleadoSector/empleado-sector-form";

const EmpleadoSectorDetailPage = ({crewId, name, closeModal }) => {
  const { id } = useParams();
  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.EmpleadoSectorEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Empleado Sector`;
  const icon = <img className="icon-img" src={iconTeam} />;
  const breadcrumb = [
    { title: "Reportes", url: "/inicio/reportes" },
    { title: "Empleados por sector", url: "/reportes/empleados-sector" },
    { title: action, url: `/reportes/empleados-sector/${id}` },
  ];

  return (
    <Card>
      {!crewId && (
        <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      )}
      <EmpleadoSectorForm id={id} crewId={crewId} name={name} closeModal={closeModal} />
    </Card>
  );
};

export default EmpleadoSectorDetailPage;