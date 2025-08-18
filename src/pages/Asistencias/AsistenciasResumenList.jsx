import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TableContextProvider } from "../../store/table-context";
import http from "../../services/http";
import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import Table from "../../components/ui/table";
import iconAttendance from "../../assets/images/asistencias.svg";
import TableNoPagination from "../../components/ui/tableNoPagination";

const AsistenciasResumenListPage = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const title = "Resumen de Asistencias";
  const icon = <img className="icon-img" src={iconAttendance} />;

  const breadcrumb = [
    { title: "Reportes", url: "/inicio/reportes" },
    { title: "Resumen Asistencias", url: "/reportes/resumen-asistencias" },
  ];
  const [isFilter, setIsFilter] = useState(false);

  const [filters, setFilters] = useState([
    { type: "date", label: "Desde", name: "from", half: true },
    { type: "date", label: "Hasta", name: "to", half: true },
    { type: "select", label: "Empleado", name: "workerId", values: [] },
    { type: "select", label: "Sector", name: "crewId", values: [] },
  ]);

  useEffect(() => {
    async function fetchFilters() {
      const empleadosRes = await http.get("workers?page=1&size=10000");
      const crewsRes = await http.get("crews?page=1&size=10000");

      setFilters((prev) =>
        prev.map((f) => {
          if (f.name === "workerId") {
            return {
              ...f,
              values: empleadosRes.data.list.map((e) => ({
                value: e.workerId,
                text: e.name + " " + e.lastname,
              })),
            };
          }
          if (f.name === "crewId") {
            return {
              ...f,
              values: crewsRes.data.list.map((c) => ({
                value: c.crewId,
                text: c.name,
              })),
            };
          }
          return f;
        })
      );
    }
    fetchFilters();
  }, []);

  const columns = [
    { title: "Empleado", property: "workerName", sortable: true },
    { title: "Total Horas Trabajadas", property: "totalHoursWorked", sortable: true },
    { title: "Total Asistencias", property: "totalAttendances", sortable: true },
  ];

  return (
    <TableContextProvider>
      <Card>
        <Header
          title={title}
          icon={icon}
          breadcrumb={breadcrumb}
          showFilters
        />
        <Filters fields={filters} />
        <TableNoPagination
          id="table-asistencias-resumen"
          columns={columns}
          url="/attendances/summary"
          orderBy="workerName"
          orderDirection="ascending"
          setIsFilter={setIsFilter}

        />
      </Card>
    </TableContextProvider>
  );
};

export default AsistenciasResumenListPage;