import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import iconTeam from "../../assets/images/licencias.svg";
import LicenciasForm from "../../components/licencias/licencias-form";

const LicenciasDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.UsuariosEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Licencia`;
  const icon = <img className="icon-img" src={iconTeam} />;
  const breadcrumb = [
    { title: "Licencias", url: "/licencias" },
    { title: action, url: `/licencias/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <LicenciasForm id={id} />
    </Card>
  );
};

export default LicenciasDetailPage;