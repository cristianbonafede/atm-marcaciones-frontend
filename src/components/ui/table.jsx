import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Pagination, Select } from "antd";
import { FaChevronUp, FaChevronDown, FaEllipsisV } from "react-icons/fa";
import { SpinnerCircular } from "spinners-react";
import { jwtDecode } from "jwt-decode";

import http from "./../../services/http";

import TableContext from "../../store/table-context";

import classes from "./table.module.scss";

import search from "./../../assets/images/search.png";

const Table = (props) => {
  const { columns, menu, filterUsuario, setIsFilter, prefilter } = props;
  const context = useContext(TableContext);

  const [first, setFirst] = useState(true);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const [orderDirection, setOrderDirection] = useState(props.orderDirection);
  const listFilter = []
  useEffect(() => {
    const serialized = localStorage.getItem(props.id);
    if (!serialized) {
      setFirst(false);
      return;
    }

    const settings = JSON.parse(serialized);
    context.updateFilters(settings.filters);
    context.updatePage(settings.page);
    setSize(settings.size);
    setOrderBy(settings.orderBy);
    setOrderDirection(settings.orderDirection);
    setFirst(false);
  }, []);

  useEffect(() => {
    async function getList() {
      if (first) {
        return;
      }

      setLoading(true);

      let url = `${props.url}?${prefilter ? prefilter + "&" : ""}page=${context.page}&size=${size}&orderBy=${orderBy}&orderDirection=${orderDirection}`;

      for (const property in context.filters) {

        url += `&${property}=${context.filters[property] ?? ""}`;
        if (context.filters[property] != null && context.filters[property] != '' && context.filters[property] != undefined) {
          listFilter.push(true)
        }
      }
      if (listFilter.includes(true)) {
        setIsFilter(true)
      }
      else (
        setIsFilter(false)
      )
      if (filterUsuario) {
        const token = jwtDecode(sessionStorage.getItem("token"));
        url += `&usuario=${token.id}`;
      }

      const response = await http.get(url);
      if (response) {
        const data = response.data;
        setList(data.list);
        setTotal(data.total);
      }

      var settings = {
        filters: context.filters,
        page: context.page,
        size: size,
        orderBy: orderBy,
        orderDirection: orderDirection,
      };
      localStorage.setItem(props.id, JSON.stringify(settings));

      setLoading(false);
    }
    getList();
  }, [first, context.filters, size, orderBy, orderDirection, props.url, context.page]);



  const onChangeOrder = (column) => {
    if (!column.sortable) {
      return;
    }

    setOrderBy(column.property);
    if (orderBy === column.property) {
      setOrderDirection(
        orderDirection === "ascending" ? "descending" : "ascending"
      );
    }
  };

  const onChangeSize = (value) => {
    setSize(parseInt(value));
    context.updatePage(1);
  };

  const onChangePage = (page) => {
    context.updatePage(page);
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
              <tr key={item.id} onClick={() => props.onRowClick && props.onRowClick(item)} className={ props.onRowClick ? classes.tableRow: ''}>
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

      {!loading && list.length > 0 && (
        <div className={classes.footer}>
          <div className={classes.results}>
            <div>Mostrando</div>
            <Select
              className={classes.select}
              value={size}
              onChange={onChangeSize}
            >
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="20">20</Select.Option>
              <Select.Option value="50">50</Select.Option>
              <Select.Option value="100">100</Select.Option>
            </Select>
            <div> de {total} resultados</div>
          </div>
          <Pagination
            current={context.page}
            total={total}
            pageSize={size}
            showSizeChanger={false}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
