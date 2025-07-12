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


const PacientesInternacion = (props) => {
  const { id } = props;
  const [loadingExport, setLoadingExport] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const filters = [
    { type: "date", label: "Fecha Ingreso Desde", name: "fechaIngresoDesde" },
    { type: "date", label: "Fecha Ingreso Hasta", name: "fechaIngresoHasta" },
    { type: "date", label: "Fecha Egreso Desde", name: "fechaEgresoDesde" },
    { type: "date", label: "Fecha Egreso Hasta", name: "fechaEgresoHasta" },
    { type: "input", label: "Razón Ingreso", name: "razonIngreso" },
    { type: "input", label: "Razón Egreso", name: "razonEgreso" },
    { type: "input", label: "Servicio", name: "servicio" },
  ];

  const columns = [
    { title: "Fecha de Ingreso", property: "fechaIngreso", sortable: true },
    { title: "Fecha de Egreso", property: "fechaEgreso", sortable: true },
    { title: "Días", property: "dias" },
    { title: "Servicio", property: "servicio" },
    { title: "Diagnóstico Ingreso", property: "diagnostico" },
    { title: "Razón de Ingreso", property: "razonIngreso" },
    { title: "Razón de Egreso", property: "razonEgreso" },
    { title: "Diagnóstico de Salida", property: "diagnosticoSalida" },
  ];


  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `internacion/paciente/export/${id}?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === '') return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Internaciones.xlsx";
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
          title=""
          icon={null}
          showFilters
          buttons={buttons}
          isFilter={isFilter}
        />
        <Filters fields={filters} />
        <Table
          id="table-internacion-pacientes"
          columns={columns}
          url={"/internacion/paciente/" + id}
          orderBy="fechaIngreso"
          orderDirection="descending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default PacientesInternacion;
