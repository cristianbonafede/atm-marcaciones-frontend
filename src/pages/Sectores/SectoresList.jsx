import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaDotCircle, FaEdit, FaSearch } from "react-icons/fa";

import { TableContextProvider } from "./../../store/table-context";
import { confirm, modalSuccess } from "../../services/notifications";
import http from "./../../services/http";
import { actions, hasPermission } from "../../services/security";

import Card from "./../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "./../../components/ui/filters";
import Table from "../../components/ui/table";
import iconTeam from "../../assets/images/team.png";

const SectoresListPage = () => {
  let navigate = useNavigate();

  const title = "Sectores";
  const icon = <img className="icon-img" src={iconTeam} />;

  const breadcrumb = [{ title: "Sectores", url: "/sectores" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [filters, setFilters] = useState([
    { type: "input", label: "Nombre", name: "name" },
    { type: "select", label: "Categoría", name: "crewCategoryId", values: [] },
    { type: "select", label: "Sucursal", name: "workplaceId", values: [] },
    // { type: "select", label: "Horario", name: "workingHourId", values: [] },
    // { type: "select", label: "Dedicación", name: "dedicationId", values: [] },
    { type: "select", label: "Jefe", name: "bossId", values: [] },
    // { type: "select", label: "Sector padre", name: "parentId", values: [] },
  ]);

  const columns = [
    { title: "Nombre", property: "name", sortable: true },
    { title: "Categoría", property: "crewCategory", sortable: true },
    { title: "Sucursal", property: "workplace", sortable: true },
    { title: "Horario", property: "workingHour", sortable: true },
    { title: "Dedicación", property: "dedication", sortable: true },
    { title: "Sector padre", property: "parent", sortable: true },
  ];
useEffect(() => {
  async function getData() {
    const [
      crewCategoriesRes,
      workplacesRes,
      bossesRes,
      dedicationsRes,
      crewsRes,
      workersRes,
    ] = await Promise.all([
      http.get("crewcategories?Page=1&PageSize=10000"),
      http.get("workplaces?Page=1&Size=10000"),
      http.get("crews/bosses"),
      // http.get("dedications?Page=1&PageSize=10000"),
      // http.get("crews?Page=1&PageSize=10000"),
      // http.get("workers?Page=1&PageSize=10000"),
    ]);
    const newFilters = [...filters];
    if (crewCategoriesRes) {
      newFilters[1] = {
        ...newFilters[1],
        values: crewCategoriesRes.data.list.map((item) => ({
          value: item.crewCategoryId,
          text: item.name,
        })),
      };
    }
    if (workplacesRes) {
      newFilters[2] = {
        ...newFilters[2],
        values: workplacesRes.data.list.map((item) => ({
          value: item.workplaceId,
          text: item.name,
        })),
      };
    }

    if (bossesRes) {
      newFilters[3] = {
        ...newFilters[3],
        values: bossesRes.data.map((item) => ({
          value: item.id,
          text: item.name,
        })),
      };
    }

    // if (dedicationsRes) {
    //   newFilters[4] = {
    //     ...newFilters[4],
    //     values: dedicationsRes.data.list.map((item) => ({
    //       value: item.dedicationId,
    //       text: item.name,
    //     })),
    //   };
    // }

    // if (workersRes) {
    //   newFilters[5] = {
    //     ...newFilters[5],
    //     values: workersRes.data.list.map((item) => ({
    //       value: item.id,
    //       text: item.nombre,
    //     })),
    //   };
    // }

    // if (crewsRes) {
    //   newFilters[6] = {
    //     ...newFilters[6],
    //     values: crewsRes.data.list.map((item) => ({
    //       value: item.Id,
    //       text: item.name,
    //     })),
    //   };
    // }

    setFilters(newFilters);
  }

  getData();
}, []);

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.SectoresEditar) && (
        <Menu.Item key="1" icon={<FaSearch />} onClick={() => onClickEdit(item)}>
          Ver
        </Menu.Item>
      )}
      {hasPermission(actions.SectoresEditar) && (
        <Menu.Item key="1" icon={<FaEdit />} onClick={() => onClickEdit(item)}>
          Editar
        </Menu.Item>
      )}
      {hasPermission(actions.SectoresEliminar) && (
        <Menu.Item key="2" icon={<FaDotCircle />} onClick={() => onClickDelete(item)}>
          {item.habilitado ? "Deshabilitar" : "Habilitar"}
        </Menu.Item>
      )}
    </Menu>
  );
  const onClickAdd = () => {
    navigate("/reportes/sectores/nuevo");
  };
  const onClickEdit = (item) => {
    console.log(item);
    navigate(`/reportes/sectores/${item.id}`);
  };
  const onClickDelete = async (item) => {
    const confirmed = await confirm(
      item.habilitado ? "Deshabilitar sector" : "Habilitar sector",
      item.habilitado ? `¿Esta seguro que desea deshabilitar el sector ${item.name}?` :
        `¿Esta seguro que desea habilitar el sector ${item.name}?`
    );
    if (!confirmed) return;
    const response = await http.delete(`crews/${item.Id}`);
    if (response) {
      await modalSuccess("Sector modificado", "El sector fue modificado exitosamente");
      navigate(0);
    }
  };
  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `crews/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === '') return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Sectores.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Agregar Sector",
      text: "Nuevo",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.SectoresCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: hasPermission(actions.SectoresVer),
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
          id="table-sectores"
          columns={columns}
          menu={menu}
          url="/crews"
          orderBy="name"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default SectoresListPage;
