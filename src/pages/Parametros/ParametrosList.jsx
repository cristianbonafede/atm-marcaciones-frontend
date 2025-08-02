import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { FaEdit, FaSearch } from "react-icons/fa";

import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import Table from "../../components/ui/table";

import http from "./../../services/http";
import { actions, hasPermission } from "../../services/security";
import { TableContextProvider } from "../../store/table-context";
import iconParametros from "./../../assets/images/controls.png";

const ParametrosListPage = () => {
  let navigate = useNavigate();

  const title = "Parámetros";
  const icon = <img className="icon-img" alt="Icono" src={iconParametros} />;
  const breadcrumb = [{ title: "Parámetros", url: "/parametros" }];

  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState([
    {
      type: "input",
      label: "Nombre",
      name: "nombre",
    },
    {
      type: "select",
      label: "Grupo",
      name: "grupo",
      values: [],
    },
  ]);

  const columns = [
    { title: "Nombre", property: "nombre", sortable: true },
    { title: "Grupo", property: "grupo", sortable: true },
  ];

  const menu = (item) => (
    <Menu>
      {!hasPermission(actions.ParametrosEditar) && (
        <Menu.Item
          key="1"
          icon={<FaSearch />}
          onClick={() => onClickEdit(item)}
        >
          Ver
        </Menu.Item>
      )}

      {hasPermission(actions.ParametrosEditar) && (
        <Menu.Item key="1" icon={<FaEdit />} onClick={() => onClickEdit(item)}>
          Editar
        </Menu.Item>
      )}
    </Menu>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function getData() {
      const response = await http.get("parametros/grupos");

      if (response) {
        let data = response.data;
        data = data.map((item) => {
          return {
            value: item.id,
            text: item.nombre,
          };
        });

        let nFilters = [...filters];
        nFilters[1] = { ...nFilters[1], values: data };

        setFilters(nFilters);
      }
    }

    getData();
  }, []);

  const onClickEdit = (item) => {
    navigate(`/parametros/${item.id}`);
  };

  return (
    <TableContextProvider>
      <Card>
        <Header title={title} icon={icon} showFilters isFilter={isFilter} breadcrumb={breadcrumb} />
        <Filters fields={filters} />
        <Table
          id="table-parametros"
          columns={columns}
          menu={menu}
          url="/parametros"
          orderBy="nombre"
          orderDirection="ascending"
          setIsFilter={setIsFilter}
        />
      </Card>
    </TableContextProvider>
  );
};

export default ParametrosListPage;
