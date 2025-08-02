import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Tag } from "antd";
import { FaDotCircle, FaEdit, FaSearch } from "react-icons/fa";

import { TableContextProvider } from "./../../store/table-context";
import { confirm, modalSuccess } from "../../services/notifications";
import http from "./../../services/http";
import { actions, hasPermission } from "../../services/security";

import Card from "./../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "./../../components/ui/filters";
import Table from "../../components/ui/table";
import UsuariosEstado from "./../../components/usuarios/usuarios-estado";
import iconTeam from "./../../assets/images/team.png";

const UsuariosListPage = () => {
  let navigate = useNavigate();

  const title = "Usuarios";
  const icon = <img className="icon-img" alt="Usuario" src={iconTeam}/>; 

  const breadcrumb = [{ title: "Usuarios", url: "/usuarios" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const filters = [
    {
      type: "input",
      label: "Id",
      name: "id",
    },
    {
      type: "input",
      label: "Username",
      name: "username",
    },
  ];

  const columns = [
    { title: "Id", property: "id", sortable: false },
    { title: "Username", property: "username", sortable: false },
    { title: "Email", property: "email", sortable: false },
    {
      title: "Perfiles",
      property: "perfiles",
      sortable: false,
      render: (item) => {
        return item.perfiles?.split(",").map(d =>
          <Tag color="lime">{d}</Tag>
        )
      }
    },
    {
      title: "Estado",
      property: "habilitado",
      sortable: false,
      render: (item) => <UsuariosEstado estado={item.habilitado} />,
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
        <Menu.Item key="1" icon={<FaEdit />} onClick={() => onClickEdit(item)}>
          Editar
        </Menu.Item>
      )}
      {hasPermission(actions.UsuariosEliminar) && (
        <Menu.Item
          key="2"
          icon={<FaDotCircle />}
          onClick={() => onClickDelete(item)}
        >
          {item.habilitado && (
            "Deshabilitar"
          )}
          {!item.habilitado && (
            "Habilitar"
          )}
        </Menu.Item>
      )}
    </Menu>
  );

  const onClickAdd = () => {
    navigate("/usuarios/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/usuarios/${item.id}`);
  };

  const onClickDelete = async (item) => {

    const confirmed = await confirm(
      item.habilitado ? "Deshabilitar usuario" : "Habilitar usuario",
      item.habilitado ? `¿Esta seguro que desea deshabilitar al usuario ${item.nombre}?` :
        `¿Esta seguro que desea habilitar al usuario ${item.nombre}?`
    );

    if (!confirmed) {
      return;
    }

    const response = await http.delete(
      `usuarios/${item.id}`
    );
    if (response) {
      await modalSuccess(
        "Usuario modificado",
        "El usuario fue modificado exitosamente"
      );
      navigate(0);
    }
  };
  
  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `usuarios/export?`;

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

  const buttons = [
    {
      title: "Agregar Usuario",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.UsuariosCrear),
    },
        {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.UsuariosVer),
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
          id="table-usuarios"
          columns={columns}
          menu={menu}
          url="/usuarios"
          orderBy="nombre"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default UsuariosListPage;
