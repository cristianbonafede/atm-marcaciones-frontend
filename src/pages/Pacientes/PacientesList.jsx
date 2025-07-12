import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiInbox } from "react-icons/fi";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import Table from "../../components/ui/table";
import { TableContextProvider } from "../../store/table-context";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";
import iconPacientes from "./../../assets/images/crowd.png";


const PacientesListPage = () => {
  const navigate = useNavigate();

  const icon = <img className="icon-img" src={iconPacientes} alt="Logo" />;
  const breadcrumb = [{ title: "Pacientes", url: "/Pacientes" }];

  const [loadingExport, setLoadingExport] = useState(false);
  const [isFilter, setIsFilter] = useState(false);


  const filters =[
    {
      type: "number",
      label: "Código",
      name: "codigo",
    },
    {
      type: "input",
      label: "Nombre",
      name: "nombre",
    },
    {
      type: "input",
      label: "DNI",
      name: "dni",
    },
  ];

  const columns = [
    { title: "Código", property: "codigo", sortable: true },
    {
      title: "Documento", property: "dni", sortable: true,
      render: (item) => <React.Fragment>{item.tdoc}-{item.dni}</React.Fragment>,
    },
    {
      title: "Nombre", property: "nombre", sortable: true,
      render: (item) => <React.Fragment>{item.nombre} {item.apellidoP}</React.Fragment>,
    },
  ];

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `exportPacientes?orderBy=fecha&orderDirection=descending`;

    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }

    const response = await http.get(url);
    if (response.data === '') return;

    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Pacientes.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const onChangedPage = async () => {
  }

  const buttons = [
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: true,
    },
  ];

  const hasAnyPermission = () => {
    return hasPermission(actions.PacientesVerDatos) || hasPermission(actions.PacientesVerTurnos)
      || hasPermission(actions.PacientesVerInternaciones) || hasPermission(actions.PacientesVerMedicaciones)
      || hasPermission(actions.PacientesVerEvoluciones);
  }

  const onClickPacientes = (item) => {
    let url = `/pacientes/${item.codigo}?`;
    if (item.nombre && item.apellidoP) {
      url += `&n=${item.nombre} ${item.apellidoP}`;
    }
    navigate(`${url}`);
  }
  return (
    <TableContextProvider>
      <Card>
        <Header
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 600, display: "flex", alignItems: "center" }}>
                <FiInbox style={{ marginRight: 8 }} />
                Pacientes
              </span>
            </div>
          }
          icon={icon}
          breadcrumb={breadcrumb}
          showFilters
          buttons={buttons}
          isFilter={isFilter}
        />
        <Filters fields={filters} />
        <Table
          id="table-Pacientes"
          columns={columns}
          simpleMenu={true}
          url="/Pacientes"
          orderBy="dni"
          orderDirection="descending"
          setIsFilter={setIsFilter}
          onRowClick={hasAnyPermission() ? onClickPacientes : undefined}
          onChangedPage={onChangedPage}
        />
      </Card>
    </TableContextProvider>
  );
};

export default PacientesListPage;
