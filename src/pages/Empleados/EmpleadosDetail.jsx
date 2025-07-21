
import { useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";
import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import EmpleadosForm from "../../components/empleados/empleados-form";
import iconTeam from "../../assets/images/team.png";

const EmpleadosDetailPage = () => {
  const { id } = useParams();
  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.EmpleadosEditar)
        ? "Editar"
        : "Ver";

  const title = `${action} Empleado`;
  const icon = <img className="icon-img" src={iconTeam}/>;
  const breadcrumb = [
    { title: "Empleados", url: "/empleados" },
    { title: action, url: `/empleados/${id}` },
  ];

  return (
    <div>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      <EmpleadosForm id={id} />
    </div>
  );
};

export default EmpleadosDetailPage;
