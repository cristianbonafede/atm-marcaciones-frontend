import { useParams } from "react-router-dom";

import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import ParametrosForm from "../../components/parametros/parametros-form";
import Header from "../../components/ui/header";
import iconParametros from "./../../assets/images/controls.png";

const ParametrosDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.ParametrosEditar)
        ? "Editar"
        : "Ver";

  const title = `${action} Parámetro`;
  const icon = <img className="icon-img" alt="Icono" src={iconParametros} />;
  const breadcrumb = [
    { title: "Parámetros", url: "/parametros" },
    { title: action, url: `/parametros/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon}breadcrumb={breadcrumb} />
      <ParametrosForm id={id} />
    </Card>
  );
};

export default ParametrosDetailPage;
