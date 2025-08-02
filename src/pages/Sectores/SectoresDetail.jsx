import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "./../../components/ui/card";
import SectoresForm from "./../../components/sectores/sectores-form";
import Header from "./../../components/ui/header";
import iconTeam from "./../../assets/images/team.png";

const SectoresDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.UsuariosEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Sector`;
  const icon = <img className="icon-img" alt="Icono" src={iconTeam} />;
  const breadcrumb = [
    { title: "Sectores", url: "/sectores" },
    { title: action, url: `/sectores/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <SectoresForm id={id} />
    </Card>
  );
};

export default SectoresDetailPage;