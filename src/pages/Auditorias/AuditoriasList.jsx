import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaSearch } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";

import { TableContextProvider } from "./../../store/table-context";
import http from "./../../services/http";

import Card from "./../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "./../../components/ui/filters";
import Table from "../../components/ui/table";

const AuditoriasListPage = () => {
  let navigate = useNavigate();

  const title = "Auditorías";
  const icon = <FiMonitor />;
  const breadcrumb = [{ title: "Auditorías", url: "/auditorias" }];

  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState([
    {
      type: "date",
      label: "Fecha Desde",
      name: "desde",
      half: true,
    },
    {
      type: "date",
      label: "Fecha Hasta",
      name: "hasta",
      half: true,
    },
    {
      type: "select",
      label: "Acción",
      name: "accion",
      values: [],
    },
    {
      type: "input",
      label: "Usuario",
      name: "usuario",
    },
  ]);

  const columns = [
    { title: "Fecha", property: "fecha", sortable: false },
    { title: "Hora", property: "hora", sortable: false },
    { title: "Acción", property: "accion", sortable: false },
    { title: "Usuario", property: "usuario", sortable: false },
  ];

  const menu = (item) => (
    <Menu>
      <Menu.Item key="1" icon={<FaSearch />} onClick={() => onClickEdit(item)}>
        Ver
      </Menu.Item>
    </Menu>
  );

  const onClickEdit = (item) => {
    navigate(`/auditorias/${item.id}`);
  };

  useEffect(() => {
    async function getData() {
      const response = await http.get("acciones");

      if (response) {
        let data = response.data;
        data = data.map((item) => {
          return {
            value: item.id,
            text: item.nombre,
          };
        });

        let nFilters = [...filters];
        nFilters[2] = { ...nFilters[2], values: data };

        setFilters(nFilters);
      }
    }

    getData();
  }, []);

  return (
    <TableContextProvider>
      <Card breadcrumb={breadcrumb}>
        <Header title={title} icon={icon} showFilters isFilter={isFilter} />
        <Filters fields={filters} />
        <Table
          id="table-auditorias"
          columns={columns}
          menu={menu}
          url="/auditorias"
          orderBy="fecha"
          orderDirection="descending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default AuditoriasListPage;
