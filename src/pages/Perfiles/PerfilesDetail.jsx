import { useParams } from "react-router-dom";

import { PerfilContextProvider } from "./../../store/perfil-context";
import { actions, hasPermission } from "../../services/security";

import Card from "./../../components/ui/card";
import PerfilesForm from "../../components/perfiles/perfiles-form";
import Header from "./../../components/ui/header";
import iconSecurity from "./../../assets/images/cyber-security.png";

const PerfilesDetailPage = () => {
  const { id } = useParams();

  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.UsuariosEditar)
        ? "Editar"
        : "Ver";

  const title = `${action} Perfil`;
  const icon = <img className="icon-img" alt="Icono" src={iconSecurity}/>; 

  const breadcrumb = [
    { title: "Perfiles", url: "/perfiles" },
    { title: action, url: `/perfiles/${id}` },
  ];

  return (
    <PerfilContextProvider>
      <Card>
        <Header title={title} icon={icon} breadcrumb={breadcrumb} />
        <PerfilesForm id={id} />
      </Card>
    </PerfilContextProvider>
  );
};

export default PerfilesDetailPage;
