
import { useLocation, useParams } from "react-router-dom";
import { actions, hasPermission } from "../../services/security";
import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import EmpleadosForm from "../../components/empleados/empleados-form";
import iconTeam from "../../assets/images/team.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const EmpleadosDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isPersonalData, setIsPersonalData] = useState(false);
  const [idWorker, setIdWorker] = useState(null);



  useEffect(() => {
    if (location.pathname == '/mis-datos/personales') {
      const token = jwtDecode(sessionStorage.getItem("token"));
      setIsPersonalData(true);
      setIdWorker(token.workerId);
    }
    else {
      setIdWorker(id);
    }
  }, []);
  const action =
    id === "nuevo"
      ? "Crear"
      : hasPermission(actions.EmpleadosEditar)
        ? "Editar"
        : "Ver";

  const title = `${action} ${isPersonalData ? "mis datos personales" : "Empleado"}`;
  const icon = <img className="icon-img" src={iconTeam} />;
  const breadcrumb = isPersonalData ? [
    { title: "Mis datos", url: "/mis-datos/personales" },
    { title: action, url: `/mis-datos/personales` },
  ] : [
    { title: "Empleados", url: "/inicio/empleados" },
    { title: "Lista empleados", url: "/empleados" },
    { title: action, url: `/empleados/${id}` },
  ];

  return (
    <div>
      <Header title={title} icon={icon} breadcrumb={breadcrumb} />
      {idWorker && (
        <EmpleadosForm id={idWorker} />

      )}
    </div>
  );
};

export default EmpleadosDetailPage;
