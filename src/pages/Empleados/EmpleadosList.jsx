import { useEffect, useState } from "react";
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
import EmpleadosEstado from "./../../components/empleados/empleados-estado";
import iconTeam from "./../../assets/images/team.png";

const EmpleadosListPage = () => {
  let navigate = useNavigate();

  const title = "Empleados";
  const icon = <img className="icon-img" src={iconTeam} />;

  const breadcrumb = [{ title: "Empleados", url: "/empleados" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters, setFilters] = useState([
    {
      type: "input",
      label: "Nombre",
      name: "name",
    },
    {
      type: "input",
      label: "Apellido",
      name: "lastname",
    },
    {
      type: "input",
      label: "N° Documento",
      name: "documentNumber",
    },
    {
      type: "select",
      label: "Ocupación",
      name: "occupationId",
      values: [],
    },
    {
      type: "select",
      label: "Categoría",
      name: "workerCategoryId",
      values: [],
    },
    {
      type: "number",
      label: "Legajo",
      name: "number",
    },
    {
      type: "select",
      label: "Sucursal",
      name: "workplaceId",
      values: [],
    },
    {
      type: "select",
      label: "Estado",
      name: "status",
      values: [
        { text: "Todos", value: "" },
        { text: "Activo", value: 10 },
        { text: "Inactivo", value: 5 },
      ],
    },
  ]);

  const columns = [
    { title: "Nombre", property: "name", sortable: true },
    { title: "Apellido", property: "lastname", sortable: true },
    { title: "Calificación", property: "calification", sortable: true },
    { title: "Legajo", property: "number", sortable: true },
    { title: "N° Documento", property: "documentNumber", sortable: true },
    { title: "Ocupación", property: "occupation", sortable: true },
    { title: "Categoría", property: "workerCategory", sortable: true },
    {
      title: "Estado",
      property: "status",
      sortable: true,
      render: (item) => <EmpleadosEstado estado={item.status} />,
    },
  ];
  useEffect(() => {
    async function getData() {

      const [
        occupationsRes,
        workercategoriesRes,
        workplacesRes,
      ] = await Promise.all([
        http.get("occupations?Page=1&Size=10000"),
        http.get("workercategories?Page=1&Size=10000"),
        http.get("workplaces?Page=1&Size=10000"),
      ]);
      const newFilters = [...filters];
      if (occupationsRes) {
        newFilters[3] = {
          ...newFilters[3],
          values: occupationsRes.data.list.map((item) => ({
            value: item.occupationId,
            text: item.name,
          })),
        };
      }
      if (workercategoriesRes) {
        newFilters[4] = {
          ...newFilters[4],
          values: workercategoriesRes.data.list.map((item) => ({
            value: item.workercategoryId,
            text: item.name,
          })),
        };
      }

      if (workplacesRes) {
        newFilters[6] = {
          ...newFilters[6],
          values: workplacesRes.data.list.map((item) => ({
            value: item.workplaceId,
            text: item.name,
          })),
        };
      }
      setFilters(newFilters);
    }
    getData();
  }, []);

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.EmpleadosEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}

      {hasPermission(actions.EmpleadosEditar) && (
        <Menu.Item key="3" icon={<FaEdit />} onClick={() => onClickEdit(item)}>
          Editar
        </Menu.Item>
      )}
      {hasPermission(actions.EmpleadosEliminar) && (
        <Menu.Item
          key="2"
          icon={<FaDotCircle />}
          onClick={() => onClickDelete(item)}
        >
          {item.habilitado ? "Deshabilitar" : "Habilitar"}
        </Menu.Item>
      )}
      {hasPermission(actions.LicenciasVer) && (
        <Menu.Item
          key="4"
          icon={<FaSearch />}
          onClick={() => onClickLicencia(item)}
        >
          Ver Licencias
        </Menu.Item>
      )}
    </Menu>
  );

  const onClickAdd = () => {
    navigate("/empleados/nuevo");
  };

  const onClickEdit = (item) => {
    navigate(`/empleados/${item.id}`);
  };
  const onClickLicencia = (item) => {
    navigate(`/empleados/licencias?workerId=${item.id}`);
  };

  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      item.habilitado ? "Deshabilitar empleado" : "Habilitar empleado",
      item.habilitado ? `¿Esta seguro que desea deshabilitar al empleado ${item.nombre}?` :
        `¿Esta seguro que desea habilitar al empleado ${item.nombre}?`
    );

    if (!confirmed) {
      return;
    }

    const response = await http.delete(
      `workers/${item.id}`
    );
    if (response) {
      await modalSuccess(
        "Empleado modificado",
        "El empleado fue modificado exitosamente"
      );
      navigate(0);
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `workers/export?`;

    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }

    const response = await http.get(url);
    if (response.data === '') return;

    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Empleados.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Empleado",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.EmpleadosCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.EmpleadosVer),
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
          id="table-empleados"
          columns={columns}
          menu={menu}
          url="/workers"
          orderBy="nombre"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default EmpleadosListPage;
