import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";

import Card from "./../../components/ui/card";
import UsuariosForm from "./../../components/usuarios/usuarios-form";
import Header from "./../../components/ui/header";
import iconTeam from "./../../assets/images/team.png";

const UsuariosDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.UsuariosEditar)
        ? "Editar"
        : "Ver";

  const title = `${action} Usuario`;
  const icon = <img className="icon-img" src={iconTeam}/>; 
  const breadcrumb = [
    { title: "Usuarios", url: "/usuarios" },
    { title: action, url: `/usuarios/${id}` },
  ];

  return (
    <Card>
      <Header title={title} icon={icon}  breadcrumb={breadcrumb}/>
      <UsuariosForm id={id} />
    </Card>
  );
};

export default UsuariosDetailPage;
