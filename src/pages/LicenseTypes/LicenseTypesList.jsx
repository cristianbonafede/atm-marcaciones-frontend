import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import iconLicense from "../../assets/images/license.png";

const LicenseTypesListPage = () => {
  let navigate = useNavigate();

  const title = "Tipos de Licencias";
  const icon = <img className="icon-img" alt="icono" src={iconLicense} />;

  const breadcrumb = [{ title: "Tipos de Licencias", url: "/licensetypes" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters, setFilters] = useState([
    { type: "input", label: "Nombre", name: "name" },
    { type: "input", label: "Descripción", name: "description" },
    {
      type: "select",
      label: "Ordinaria",
      name: "ordinary",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
    {
      type: "select",
      label: "Requiere Justificación",
      name: "needsJustification",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
    {
      type: "select",
      label: "Requiere Autorización",
      name: "authRequired",
      values: [
        { value: true, text: "Sí" },
        { value: false, text: "No" },
      ],
    },
        {
      type: "select",
      label: "Tipo",
      name: "type",
      values: [
        { value: "variable", text: "Variable" },
        { value: "fixed", text: "Fijo" },
      ],
    },
  ]);

  const columns = [
    { title: "Nombre", property: "name", sortable: true },
    { title: "Descripción", property: "description", sortable: false },
    { title: "Ord.", property: "ordinary", sortable: true,
      render: (item) => <>{item.ordinary ? "Sí" : "No"}</>,
    },
    { title: "Req. Just.", property: "needsJustification", sortable: true,
      render: (item) => <>{item.needsJustification ? "Sí" : "No"}</>,
    },
    { title: "Req. Aut.", property: "authRequired", sortable: true,
      render: (item) => <>{item.authRequired ? "Sí" : "No"}</>,
    },
    { title: "Tipo", property: "type", sortable: true,
      render: (item) => <>{item.type === "variable" ? "Variable" : "Fijo"}</>,
    },

    { title: "Cant. de días", property: "daysQty", sortable: true },
    { title: "Máx. por año", property: "maximunRequestPerYear", sortable: true },
    { title: "Desc. días", property: "incentiveDeduct", sortable: true,
      render: (item) => <>{item.incentiveDeduct ? "Sí" : "No"}</>,
    },
    { title: "Días consec.", property: "hasConsecutiveDays", sortable: true,
      render: (item) => <>{item.hasConsecutiveDays ? "Sí" : "No"}</>,
    },
    { title: "Basado en año", property: "yearlyBased", sortable: true,
      render: (item) => <>{item.yearlyBased ? "Sí" : "No"}</>,
    },
  ];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.UsuariosEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.UsuariosEditar) && (
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
    navigate("/config/tipos-licencias/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/config/tipos-licencias/${item.licenseTypeId}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      "Eliminar tipo de licencia",
      `¿Está seguro que desea eliminar el tipo de licencia ${item.name}?`
    );
    if (!confirmed) return;
    const response = await http.delete(`licensetypes/${item.licenseTypeId}`);
    if (response) {
      await modalSuccess(
        "Tipo de licencia eliminado",
        "El tipo de licencia fue eliminado exitosamente"
      );
      navigate(0);
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `licensetypes/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === "") return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "TiposDeLicencias.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Tipo de Licencia",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.UsuariosEditar),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.UsuariosEditar),
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
          id="table-licensetypes"
          columns={columns}
          menu={menu}
          url="/licensetypes"
          orderBy="name"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default LicenseTypesListPage;