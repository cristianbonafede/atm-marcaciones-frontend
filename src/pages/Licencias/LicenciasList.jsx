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
import iconTeam from "../../assets/images/licencias.svg";

const LicenciasListPage = () => {
  let navigate = useNavigate();
  const location = useLocation();

  // Obtener workerId de los query params
  const searchParams = new URLSearchParams(location.search);
  const workerIdParam = searchParams.get("workerId");
  const title = "Licencias";
  const icon = <img className="icon-img" src={iconTeam} />;

  const breadcrumb = [{ title: "Licencias", url: "/empleados/licencias" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters, setFilters] = useState([
    { type: "select", label: "Empleado", name: "workerId", values: [] },
    { type: "select", label: "Tipo Licencia", name: "licenseTypeId", values: [] },
    { type: "date", label: "Fecha Inicio", name: "startDate" },
    { type: "date", label: "Fecha Fin", name: "endDate" },
    {
      type: "select",
      label: "Autorizada",
      name: "authorized",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
  ]);

  useEffect(() => {
    async function fetchFilters() {
      const empleadosRes = await http.get("workers?page=1&size=10000");
      const tiposRes = await http.get("licensetypes?page=1&size=10000");

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
        if (f.name === "licenseTypeId") {
          return {
            ...f,
            values: tiposRes.data.list.map(t => ({
              value: t.licenseTypeId,
              text: t.name
            }))
          };
        }
        return f;
      }));
    }
    fetchFilters();
  }, [workerIdParam]);

  const columns = [
    { title: "Nro", property: "licenseId", sortable: true },
    { title: "Empleado ", property: "worker", sortable: true },
    { title: "Tipo Licencia", property: "licenseType", sortable: true },
    { title: "Fecha Inicio", property: "startDate", sortable: true },
    { title: "Fecha Fin", property: "endDate", sortable: true },
    {
      title: "Autorizada",
      property: "authorized",
      sortable: true,
      render: (item) => <>{item.authorized ? "Sí" : "No"}</>,
    },
    { title: "Observación", property: "observation", sortable: false },
  ];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.LicenciasEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.LicenciasEditar) && (
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
    navigate("/empleados/licencias/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/empleados/licencias/${item.licenseId}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      "Eliminar licencia",
      `¿Está seguro que desea eliminar la licencia ${item.licenseId}?`
    );
    if (!confirmed) return;
    const response = await http.delete(`licenses/${item.licenseId}`);
    if (response) {
      await modalSuccess(
        "Licencia eliminada",
        "La licencia fue eliminada exitosamente"
      );
      navigate(0);
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `licenses/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === "") return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Licencias.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Licencia",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.LicenciasCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.LicenciasVer),
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
          id="table-licencias"
          columns={columns}
          menu={menu}
          url="/licenses"
          orderBy="startDate"
          orderDirection="descending"
          defaultFilters={workerIdParam ? { workerId: Number(workerIdParam) } : undefined}
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default LicenciasListPage;