import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import iconTeam from "./../../assets/images/team.png";
import OcupacionesForm from "../../components/ocupaciones/ocupaciones-form";

const OcupacionesDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.OcupacionesEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Ocupación`;
  const icon = <img className="icon-img" src={iconTeam} />;
  const breadcrumb = [
    { title: "Ocupaciones", url: "/ocupaciones" },
    { title: action, url: `/ocupaciones/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <OcupacionesForm id={id} />
    </Card>
  );
};

export default OcupacionesDetailPage;