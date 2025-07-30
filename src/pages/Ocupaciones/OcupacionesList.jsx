import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";

import { TableContextProvider } from "../../store/table-context";
import { confirm, modalSuccess } from "../../services/notifications";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import Table from "../../components/ui/table";
import iconTeam from "../../assets/images/team.png";

const OcupacionesListPage = () => {
  let navigate = useNavigate();

  const title = "Ocupaciones";
  const icon = <img className="icon-img" src={iconTeam} />;

  const breadcrumb = [{ title: "Ocupaciones", url: "/config/ocupacion" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters] = useState([
    { type: "input", label: "Nombre", name: "name" },
    { type: "input", label: "Descripción", name: "description" },
    {
      type: "select",
      label: "Checkout Automático",
      name: "automaticCheckout",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
    { type: "input", label: "Frecuencia", name: "frecuency" },
    {
      type: "select",
      label: "Requiere en Lugar de Trabajo",
      name: "requiredInWorkplace",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
    { type: "input", label: "Estrategia de Tiempo", name: "timeStrategy" },
  ]);

  const columns = [
    { title: "Nombre", property: "name", sortable: true },
    { title: "Descripción", property: "description", sortable: true },
    {
      title: "Checkout Automático",
      property: "automaticCheckout",
      sortable: true,
      render: (item) => <>{item.automaticCheckout ? "Sí" : "No"}</>,
    },
    { title: "Frecuencia", property: "frecuency", sortable: true },
    {
      title: "Requiere en Lugar de Trabajo",
      property: "requiredInWorkplace",
      sortable: true,
      render: (item) => <>{item.requiredInWorkplace ? "Sí" : "No"}</>,
    },
    { title: "Estrategia de Tiempo", property: "timeStrategy", sortable: true },
  ];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.OcupacionesEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.OcupacionesEditar) && (
        <Menu.Item
          key="1"
          icon={<FaEdit />}
          onClick={() => onClickEdit(item)}
        >
          Editar
        </Menu.Item>
      )}
      {/* {hasPermission(actions.OcupacionesEliminar) && (
        <Menu.Item
          key="2"
          icon={<FaTrash />}
          onClick={() => onClickDelete(item)}
        >
          Eliminar
        </Menu.Item>
      )} */}
    </Menu>
  );

  const onClickAdd = () => {
    navigate("/config/ocupaciones/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/config/ocupaciones/${item.occupationId}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      "Eliminar ocupación",
      `¿Está seguro que desea eliminar la ocupación ${item.name}?`
    );
    if (!confirmed) return;
    const response = await http.delete(`occupations/${item.occupationId}`);
    if (response) {
      await modalSuccess(
        "Ocupación eliminada",
        "La ocupación fue eliminada exitosamente"
      );
      navigate(0);
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `ocupations/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === "") return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Ocupaciones.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Ocupación",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.OcupacionesCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.OcupacionesVer),
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
          id="table-ocupaciones"
          columns={columns}
          menu={menu}
          url="/occupations"
          orderBy="name"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default OcupacionesListPage;