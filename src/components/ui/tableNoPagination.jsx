import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "antd";
import { FaChevronUp, FaChevronDown, FaEllipsisV } from "react-icons/fa";
import { SpinnerCircular } from "spinners-react";
import { jwtDecode } from "jwt-decode";

import http from "./../../services/http";
import TableContext from "../../store/table-context";
import classes from "./table.module.scss";
import search from "./../../assets/images/search.png";

const TableNoPagination = (props) => {
  const { columns, menu, filterUsuario, setIsFilter, prefilter, defaultFilters } = props;
  const context = useContext(TableContext);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const [orderDirection, setOrderDirection] = useState(props.orderDirection);
  const [first, setFirst] = useState(true);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);


    useEffect(() => {
      const serialized = localStorage.getItem(props.id);
      if (!serialized) {
        setFirst(false);
        return;
      }
      const settings = JSON.parse(serialized);
  
      if (defaultFilters && typeof defaultFilters === "object") {
        settings.filters = settings.filters || {};
  
        for (const key in defaultFilters) {
          if (key in settings.filters) {
            delete settings.filters[key];
          }
        }
        settings.filters = { ...defaultFilters, ...settings.filters };
  
      }
  
      console.log("settings", settings);
      context.updateFilters(settings.filters);
      context.updatePage(settings.page);
      setSize(settings.size);
      setOrderBy(settings.orderBy);
      setOrderDirection(settings.orderDirection);
      setFirst(false);
    }, []);


  useEffect(() => {
    async function getList() {
      setLoading(true);
      let url = `${props.url}?${prefilter ? prefilter + "&" : ""}`;
      for (const property in context.filters) {
        url += `&${property}=${context.filters[property] ?? ""}`;
      }
      if (filterUsuario) {
        const token = jwtDecode(sessionStorage.getItem("token"));
        url += `&usuario=${token.id}`;
      }

      const response = await http.get(url);
      if (response) {
        let data = response.data || [];
        // Ordenar si corresponde
        if (orderBy) {
          data = [...data].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return orderDirection === "ascending" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return orderDirection === "ascending" ? 1 : -1;
            return 0;
          });
        }
        setList(data);
      var settings = {
        filters: context.filters,
        orderBy: orderBy,
        orderDirection: orderDirection,
      };
      localStorage.setItem(props.id, JSON.stringify(settings));
      }
      setLoading(false);
    }
    getList();
    // eslint-disable-next-line
  }, [context.filters, orderBy, orderDirection, props.url]);

  const onChangeOrder = (column) => {
    if (!column.sortable) return;
    setOrderBy(column.property);
    if (orderBy === column.property) {
      setOrderDirection(orderDirection === "ascending" ? "descending" : "ascending");
    }
  };

  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            {menu && <th className={classes.actions}></th>}
            {columns.map((item, index) => (
              <th
                key={index}
                onClick={() => onChangeOrder(item)}
                className={`${item.sortable ? classes.sortable : ""}`}
              >
                {item.title}
                {item.sortable && (
                  <div className={classes.sort}>
                    {orderBy === item.property &&
                      orderDirection === "ascending" && <FaChevronDown />}
                    {orderBy === item.property &&
                      orderDirection === "descending" && <FaChevronUp />}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className={classes.loading}>
                  <SpinnerCircular
                    size="60px"
                    thickness={150}
                    color="linear-gradient(to right, #b5000b, #660006) "
                    secondaryColor="#eeedfd"
                  />
                  <div className={classes.title}>Buscando...</div>
                </div>
              </td>
            </tr>
          )}

          {!loading && list.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className={classes.empty}>
                  <img src={search} alt="Empty" />
                  <div className={classes.title}>Sin resultados</div>
                  <div className={classes.description}>
                    No se encontró ningún resultado
                  </div>
                </div>
              </td>
            </tr>
          )}

          {!loading &&
            list.map((item) => (
              <tr key={item.id} onClick={() => props.onRowClick && props.onRowClick(item)} className={props.onRowClick ? classes.tableRow : ''}>
                {menu &&
                  <td className={classes.actions}>
                    <Dropdown
                      overlay={() => menu(item)}
                      placement="bottomLeft"
                      arrow
                      trigger="click"
                    >
                      <div>
                        <FaEllipsisV />
                      </div>
                    </Dropdown>
                  </td>}
                {columns.map((column, index) => (
                  <td key={index}>
                    {column.render && column.render(item)}
                    {!column.render && item[column.property]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {/* Sin paginación ni select de tamaño */}
    </div>
  );
};

export default TableNoPagination;