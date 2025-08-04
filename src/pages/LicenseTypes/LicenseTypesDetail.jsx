import React from "react";
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import iconLicense from "./../../assets/images/license.png"; // Usa un ícono apropiado
import LicenseTypesForm from "../../components/licensetypes/license-types-form"; // Debes crear este formulario

const LicenseTypesDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.UsuariosEditar)
      ? "Editar"
      : "Ver";

  const title = `${action} Tipo de Licencia`;
  const icon = <img className="icon-img" alt="icono" src={iconLicense} />;
  const breadcrumb = [
    { title: "Tipos de Licencias", url: "/licensetypes" },
    { title: action, url: `/licensetypes/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <LicenseTypesForm id={id} />
    </Card>
  );
};

export default LicenseTypesDetailPage;