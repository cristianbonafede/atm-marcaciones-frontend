import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import SectoresForm from "../../components/sectores/sectores-form";
import Header from "../../components/ui/header";
import iconTeam from "./../../assets/images/team.png";
import DedicacionesForm from "../../components/dedicaciones/dedicaciones-form";

const DedicacionesDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.UsuariosEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Dedidcación`;
  const icon = <img className="icon-img" src={iconTeam} />;
  const breadcrumb = [
    { title: "Dedicaciones", url: "/dedicaciones" },
    { title: action, url: `/dedicaciones/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <DedicacionesForm id={id} />
    </Card>
  );
};

export default DedicacionesDetailPage;