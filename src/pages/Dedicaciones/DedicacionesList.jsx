import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaDotCircle, FaEdit, FaSearch } from "react-icons/fa";

import { TableContextProvider } from "../../store/table-context";
import { confirm, modalSuccess } from "../../services/notifications";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import Table from "../../components/ui/table";
import iconTeam from "../../assets/images/team.png";

const DedicacionesListPage = () => {
  let navigate = useNavigate();

  const title = "Dedicaciones";
  const icon = <img className="icon-img" src={iconTeam} />;

  const breadcrumb = [{ title: "Dedicaciones", url: "/config/dedicacion" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters, setFilters] = useState([
    { type: "input", label: "Nombre", name: "name" },
    {
      type: "select",
      label: "Estado",
      name: "status",
      values: [
        { value: "enabled", text: "Activo" },
        { value: "disabled", text: "Inactivo" },
      ],
    },
    {
      type: "select",
      label: "Por defecto",
      name: "default",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
    { type: "input", label: "Porcentaje", name: "percentage" },
  ]);

  const columns = [
    // { title: "Nombre", property: "name", sortable: true },
    { title: "Minutos", property: "minutes", sortable: true },
    { title: "Porcentaje", property: "percentage", sortable: true },
    { title: "Estado", property: "status", sortable: false ,
      render: (item) => <React.Fragment>{item.status === 'enabled' ? 'Activo': 'Inactivo'}</React.Fragment>,
    },
    { title: "Por defecto", property: "default", sortable: true ,
      render: (item) => <React.Fragment>{item.default ? 'Sí' : 'No'}</React.Fragment>,
    },
  ];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.DedicacionesEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.DedicacionesEditar) && (
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
    navigate("/config/dedicacion/nuevo");
  };

  const onClickEdit = (item) => {
    console.log(item);
    navigate(`/config/dedicacion/${item.dedicationId}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      "Eliminar dedicación",
      `¿Está seguro que desea eliminar la dedicación ${item.name}?`
    );
    if (!confirmed) return;
    const response = await http.delete(`dedications/${item.dedicationId}`);
    if (response) {
      await modalSuccess(
        "Dedicación eliminada",
        "La dedicación fue eliminada exitosamente"
      );
      navigate(0);
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `dedications/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === "") return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Dedicaciones.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Dedicación",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.DedicacionesCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.DedicacionesVer),
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
          id="table-dedicaciones"
          columns={columns}
          menu={menu}
          url="/dedications"
          orderBy="name"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default DedicacionesListPage;