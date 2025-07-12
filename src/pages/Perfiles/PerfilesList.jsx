import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";

import http from "./../../services/http";
import { confirm, modalSuccess } from "../../services/notifications";
import { actions, hasPermission } from "../../services/security";
import { TableContextProvider } from "./../../store/table-context";

import Card from "./../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "./../../components/ui/filters";
import Table from "../../components/ui/table";
import iconSecurity from "./../../assets/images/cyber-security.png";


const PerfilesListPage = () => {
  let navigate = useNavigate();

  const title = "Perfiles";
  const icon = <img className="icon-img" src={iconSecurity}/>; 

  const breadcrumb = [{ title: "Perfiles", url: "/perfiles" }];

  const [isFilter, setIsFilter] = useState(false);
  const filters = [
    {
      type: "input",
      label: "Nombre",
      name: "nombre",
    },
  ];

  const columns = [{ title: "Nombre", property: "nombre", sortable: true }];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.PerfilesEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.PerfilesEditar) && (
        <Menu.Item key="1" icon={<FaEdit />} onClick={() => onClickEdit(item)}>
          Editar
        </Menu.Item>
      )}
      {hasPermission(actions.PerfilesEliminar) && (
        <Menu.Item
          key="2"
          icon={<FaTrash />}
          onClick={() => onClickDelete(item)}
        >
          Eliminar
        </Menu.Item>
      )}
    </Menu>
  );

  const onClickAdd = () => {
    navigate("/perfiles/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/perfiles/${item.id}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      "Eliminar perfil",
      `¿Esta seguro que desea eliminar el perfil ${item.nombre}?`
    );

    if (!confirmed) {
      return;
    }

    const response = await http.delete(`perfiles/${item.id}`);
    if (response) {
      await modalSuccess(
        "Perfil eliminado",
        "El perfil fue eliminado exitosamente"
      );
      navigate(0);
    }
  };

  const buttons = [
    {
      title: "Agregar Perfil",
      text: "Nueva",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.PerfilesCrear),
    },
  ];

  return (
    <TableContextProvider>
      <Card>
        <Header
          title={title}
          breadcrumb={breadcrumb}
          icon={icon}
          showFilters
          buttons={buttons}
          isFilter={isFilter}
        />
        <Filters fields={filters} />
        <Table
          id="table-perfiles"
          columns={columns}
          menu={menu}
          url="/perfiles"
          orderBy="nombre"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
        </Card>
    </TableContextProvider>
  );
};

export default PerfilesListPage;
