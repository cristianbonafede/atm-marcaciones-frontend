import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import iconAttendance from "../../assets/images/asistencias.svg";
import AsistenciasForm from "../../components/asistencias/asistencias-form";

const AsistenciasDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.AsistenciasEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Asistencia`;
  const icon = <img className="icon-img" src={iconAttendance} />;
  const breadcrumb = [
    { title: "Empleados", url: "/inicio/empleados" },
    { title: "Asistencias", url: "/empleados/registro-asistencias" },
    { title: action, url: `/empleados/registro-asistencias/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <AsistenciasForm id={id} />
    </Card>
  );
};

export default AsistenciasDetailPage;