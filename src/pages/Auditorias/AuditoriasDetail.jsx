import { useParams } from "react-router-dom";
import { FiMonitor } from "react-icons/fi";

import Card from "./../../components/ui/card";
import AuditoriaForm from "./../../components/auditoria/auditoria-form";
import Header from "./../../components/ui/header";

const AuditoriasDetailPage = () => {
  const { id } = useParams();

  const action = "Ver";
  const title = `${action} Auditoría`;
  const icon = <FiMonitor />;
  const breadcrumb = [
    { title: "Auditorías", url: "/auditorias" },
    { title: action, url: `/auditorias/${id}` },
  ];

  return (
    <Card breadcrumb={breadcrumb}>
      <Header title={title} icon={icon} />
      <AuditoriaForm id={id} />
    </Card>
  );
};

export default AuditoriasDetailPage;
