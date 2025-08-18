import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FaEdit, FaSearch } from "react-icons/fa";

import { TableContextProvider } from "../../store/table-context";
import { confirm, modalSuccess } from "../../services/notifications";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import Table from "../../components/ui/table";
import iconAttendance from "../../assets/images/asistencias.svg"; // Asegúrate de tener un ícono

const AsistenciasListPage = () => {
  let navigate = useNavigate();
  const location = useLocation();

  // Obtener workerId de los query params
  const searchParams = new URLSearchParams(location.search);
  const workerIdParam = searchParams.get("workerId");
  const title = "Asistencias";
  const icon = <img className="icon-img" src={iconAttendance} />;

  const breadcrumb = [
    { title: "Empleados", url: "/inicio/empleados" },
    { title: "Asistencias", url: "/empleados/asistencias" },
  ];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters, setFilters] = useState([
    { type: "select", label: "Empleado", name: "workerId", values: [] },
    { type: "select", label: "Máquina", name: "machineId", values: [] },
    { type: "select", label: "Sector", name: "crewId", values: [] },
    { type: "date", label: "Fecha", name: "dateTime1" },
    { type: "select", label: "Estado", name: "status", values: [
      { value: 15, text: "Aprobado" },
      { value: 16, text: "Rechazado" },
      { value: 1, text: "Creado" },
      { value: 0, text: "Eliminado" },
    ]},
    // { type: "select", label: "Verificado", name: "verified", values: [
    //   { value: false, text: "No" },
    //   { value: true, text: "Sí" },

    // ]},
  ]);

  useEffect(() => {
    async function fetchFilters() {
      const empleadosRes = await http.get("workers?page=1&size=10000");
      const maquinasRes = await http.get("machines?page=1&size=10000");
      const crewsRes = await http.get("crews?page=1&size=10000");

      setFilters((prev) => prev.map((f) => {
        if (f.name === "workerId") {
          return {
            ...f,
            values: empleadosRes.data.list.map(e => ({
              value: e.workerId,
              text: e.name + " " + e.lastname
            }))
          };
        }
        if (f.name === "machineId") {
          return {
            ...f,
            values: maquinasRes.data.list.map(m => ({
              value: m.machineId,
              text: m.name
            }))
          };
        }
        if (f.name === "crewId") {
          return {
            ...f,
            values: crewsRes.data.list.map(c => ({
              value: c.crewId,
              text: c.name
            }))
          };
        }
        return f;
      }));
    }
    fetchFilters();
  }, [workerIdParam]);

  const columns = [
    { title: "ID", property: "attendanceId", sortable: true },
    { title: "Empleado", property: "worker", sortable: true },
    { title: "Máquina", property: "machine", sortable: true },
    { title: "Fecha y Hora", property: "dateTime", sortable: true },
    { title: "PIN", property: "pin", sortable: false },
    { title: "Estado", property: "statusDesc", sortable: true },
    { title: "Verificado", property: "verified", sortable: true, render: (item) => <>{item.verified ? "Sí" : "No"}</> },
  ];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.AsistenciasEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.AsistenciasEditar) && (
        <Menu.Item
          key="1"
          icon={<FaEdit />}
          onClick={() => onClickEdit(item)}
        >
          Editar
        </Menu.Item>
      )}
    </Menu>
  );

  const onClickAdd = () => {
    navigate("/empleados/registro-asistencias/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/empleados/registro-asistencias/${item.attendanceId}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      "Eliminar asistencia",
      `¿Está seguro que desea eliminar la asistencia ${item.attendanceId}?`
    );
    if (!confirmed) return;
    const response = await http.delete(`attendances/${item.attendanceId}`);
    if (response) {
      await modalSuccess(
        "Asistencia eliminada",
        "La asistencia fue eliminada exitosamente"
      );
      navigate(0);
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `attendances/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === "") return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Asistencias.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Asistencia",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.AsistenciasCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.AsistenciasVer),
    },
  ];

  return (
    <TableContextProvider>
      <Card>
        <Header
          title={title}
          icon={icon}
          breadcrumb={breadcrumb}
          showFilters
          buttons={buttons}
          isFilter={isFilter}
        />
        <Filters fields={filters} />
        <Table
          id="table-asistencias"
          columns={columns}
          menu={menu}
          url="/attendances"
          orderBy="dateTime"
          orderDirection="descending"
          defaultFilters={workerIdParam ? { workerId: Number(workerIdParam) } : undefined}
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default AsistenciasListPage;