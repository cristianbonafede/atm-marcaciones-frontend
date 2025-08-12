import { Menu, Modal, Spin } from "antd";
import Table from "../../components/ui/table";
import Card from "../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "../../components/ui/filters";
import { TableContextProvider } from "../../store/table-context";
import iconTeam from "../../assets/images/team-work.png";
import { useEffect, useState } from "react";
import http from "../../services/http";
import { actions, hasPermission } from "../../services/security";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";
import { confirm, modalSuccess } from "../../services/notifications";
import EmpleadoSectorDetailPage from "./EmpleadoSectorDetail";

const EmpleadoSectorListPage = ({ crewId, name }) => {
  const icon = <img className="icon-img" src={iconTeam} />;
  let navigate = useNavigate();

  const breadcrumb = [
    { title: "Reportes", url: "/inicio/Reportes" },
    { title: "Empleados Por Sector", url: "/empleados-sector" }];

  const [isFilter, setIsFilter] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState(crewId ? [] : [
    { type: "select", label: "Sector", name: "crewId", values: [] },
  ]);
  const columns = [
    { title: "Empleado", property: "worker", sortable: true },
    { title: "Fecha Inicio", property: "datetime", sortable: false },
    { title: "Fecha Fin", property: "finishDatetime", sortable: false },
  ];

  useEffect(() => {
    async function getData() {
      if (!crewId) {
        const response = await http.get(`/crews?Page=1&Size=10000`);
        if (response) {
          setFilters((prevFilters) => {
            const newFilters = [...prevFilters];
            newFilters[0].values = response.data.list.map((item) => ({
              value: item.crewId,
              text: item.name,
            }));
            return newFilters;
          });
        }
      }
    }

    getData();
  }, []);

  const onClickAdd = () => {
    if (crewId) {
      setShowAddModal(true);
    } else {
      navigate("/reportes/empleados-sector/nuevo");
    }
  };

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `crewhasworkers/export?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === "") return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "EmpleadosSector.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };
  const menu = (item) => (
    <Menu>
      {hasPermission(actions.EmpleadosSectorEliminar) && (
        <Menu.Item
          key="2"
          icon={item.finishDatetime ? <FaUndo /> : <FaTrash />}
          onClick={() => onClickDelete(item)}
        >
          {item.finishDatetime ? "Restaurar" : "Eliminar"}
        </Menu.Item>
      )}
    </Menu>
  );

  const buttons = [
    {
      title: "Agregar Empleado",
      text: "Agregar",
      type: "primary",
      onClick: onClickAdd,
      visible: hasPermission(actions.EmpleadosSectorCrear),
    },
    {
      title: "Exportar a Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: !crewId &&hasPermission(actions.EmpleadosSectorVer),
    },
  ];

  const onClickDelete = async (item) => {
    console.log(item);
    const confirmed = await confirm(
      item.finishDatetime ? "Restaurar empleado" : "Eliminar empleado",
      item.finishDatetime ? `¿Esta seguro que desea restaurar al empleado ${item.worker} del sector ${item.crew}?` :
        `¿Esta seguro que desea eliminar al empleado ${item.worker} del sector ${item.crew}?`
    );
    if (!confirmed) {
      return;
    }
    const response = await http.delete(
      `crewhasworker/${item.crewHasWorkerId}`
    );
    if (response) {
      await modalSuccess(
        "Empleado modificado",
        "El empleado fue modificado exitosamente"
      );
      navigate(0);
    }
  };
  return (
    <>
      <TableContextProvider>
        <Card>
          <Header
            title={name ? 'Empleados sector ' + name : 'Empleados por sector'}
            icon={icon}
            breadcrumb={crewId ? null : breadcrumb}
            showFilters={crewId ? false : true}
            buttons={buttons}
          />
          {!crewId && (
            <Filters fields={filters} />
          )}
          <Table
            id="table-sectores-empleados"
            columns={columns}
            url="/crewhasworker"
            orderBy="name"
            menu={menu}
            prefilter={crewId ? "crewId=" + crewId : ""}
            orderDirection="ascending"
            setIsFilter={setIsFilter}
          />
        </Card>
      </TableContextProvider>
      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        title="Agregar Empleado"
        footer={null}
        width="80%"
      >
        <EmpleadoSectorDetailPage
          crewId={crewId}
          name={name}
          closeModal={() => setShowAddModal(false)}
        />
      </Modal>
    </>);
};

export default EmpleadoSectorListPage;