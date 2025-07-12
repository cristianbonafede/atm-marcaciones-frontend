import { createContext, useState } from "react";

const TableContext = createContext({
  filtersVisible: localStorage.getItem("filtersVisible") === "true",
  filters: {},
  page: 1,

  updateFiltersVisible: (showFilters) => { },
  updateFilters: (filters) => { },
});

export function TableContextProvider(props) {
  // State
  const [filtersVisible, setFiltersVisible] = useState(localStorage.getItem("filtersVisible") === "true");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  // Methods
  const updateFiltersVisible = (visible) => {
    localStorage.setItem("filtersVisible", visible);
    setFiltersVisible(visible);
  };

  const updateFilters = (filters) => {
    setPage(1);
    setFilters(filters);
  };
  const updatePage = (page) => {
    setPage(page);
  };

  const context = {
    filtersVisible: filtersVisible,
    filters: filters,
    page: page,
    updatePage: updatePage,
    updateFiltersVisible: updateFiltersVisible,
    updateFilters: updateFilters,
  };

  return (
    <TableContext.Provider value={context}>
      {props.children}
    </TableContext.Provider>
  );
}

export default TableContext;
