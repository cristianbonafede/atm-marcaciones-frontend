import React, { useState } from "react";
import { Menu } from "antd";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { TableContextProvider } from "../../store/table-context";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";
import ExportExcelButton from "../ui/export-excel-button";
import Card from "../ui/card";
import Header from "../ui/header";
import Filters from "../ui/filters";
import Table from "../ui/table";

const PacientesMedicaciones = (props) => {
  const { id } = props;
  const [loadingExport, setLoadingExport] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const filters = [
    { type: "date", label: "Fecha Desde", name: "fechaDesde" },
    { type: "date", label: "Fecha Hasta", name: "fechaHasta" },
    { type: "input", label: "Profesional", name: "profesional" },
    { type: "input", label: "Medicamento", name: "medicamento" },
  ];

  const columns = [
    { title: "Fecha", property: "fecha", sortable: true },
    { title: "Medicamento", property: "medicacion", sortable: false },
    { title: "Nombre Profesional", property: "nombreProfesional", sortable: true },
  ];


  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `medicacion/paciente/export/${id}?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === '') return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Medicaciones.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Exportar Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: true,
    },
  ];

  return (
    <TableContextProvider>
      <Card>
        <Header
          title="Medicaciones"
          icon={null}
          showFilters
          buttons={buttons}
          isFilter={isFilter}
        />
        <Filters fields={filters} />
        <Table
          id="table-medicaciones-pacientes"
          columns={columns}
          url={"/medicacion/paciente/" + id}
          orderBy="fecha"
          orderDirection="descending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default PacientesMedicaciones;
