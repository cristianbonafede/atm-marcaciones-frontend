import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Checkbox, Button, Tooltip } from "antd";
import { FiInbox, FiPrinter, FiSearch } from "react-icons/fi";

import Card from "./../../components/ui/card";
import Header from "../../components/ui/header";
import Filters from "./../../components/ui/filters";
import Table from "../../components/ui/table";
import { TableContextProvider } from "./../../store/table-context";

import SolicitudesEstado from "../../components/solicitudes/solicitudes-estado";
import http from "./../../services/http";

import { modalError, modalSuccess } from "../../services/notifications";

const SolicitudesListPage = () => {
  const navigate = useNavigate();

  const title = "Solicitudes";
  const icon = <FiInbox />;
  const breadcrumb = [{ title: "Solicitudes", url: "/solicitudes" }];

  const [loadingExport, setLoadingExport] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [allRowKeys, setAllRowKeys] = useState([]);

  const [loadingReprocesar, setLoadingReprocesar] = useState(false);


  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const onSelectRow = (id) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id)
        ? prev.filter((key) => key !== id)
        : [...prev, id]
    );
  };

  const onDataLoaded = (data) => {
    setAllRowKeys(data.map((item) => {
      if (item.estado === 6) {
        return item.id
      }
    }));
  };

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
      type: "input",
      label: "Nombres",
      name: "nombres",
    },
    {
      type: "input",
      label: "Apellidos",
      name: "apellidos",
    },
    {
      type: "input",
      label: "Documento",
      name: "documento",
    },
    {
      type: "input",
      label: "Telefono",
      name: "telefono",
    },
    {
      type: "input",
      label: "Email",
      name: "email",
    },
    {
      type: "select",
      label: "Estado",
      name: "estado",
      values: [
        { value: "1", text: "Pendiente" },
        { value: "2", text: "Aprobada" },
        { value: "3", text: "Rechazada" },
        { value: "4", text: "Validación Manual" },
        { value: "5", text: "Pendiente Credenciales" },
        { value: "6", text: "Error en Alta" },
        { value: "7", text: "Aprobado a Revisar" },
        { value: "8", text: "Aprobado sin Notificar" },
        { value: "9", text: "Vencida" },
      ],
      onChange: (value, form) => {
        form.setFieldsValue({ motivoRechazo: '' });
        let nFilters = [...filters];
        nFilters[6].hidden = value !== "3";
        setFilters(nFilters);
      }
    },
    {
      type: "select",
      label: "Motivo de Rechazo",
      name: "motivoRechazo",
      hidden: true,
      values: [
        { value: "1", text: "Documento No Encontrado" },
        { value: "2", text: "Pdf No Encontrado" },
        { value: "3", text: "Intentos Excedidos" },
        { value: "4", text: "Persona No Encontrada" },
        { value: "5", text: "Persona Fallecida" },
        { value: "6", text: "Ejemplar No Valido" },
        { value: "7", text: "Prueba De Vida Intentos Excedidos" },
        { value: "8", text: "Rechazo Matriz De Riesgo" },
        { value: "9", text: "Solicitud Previa Aprobada" },
      ],
    },
    {
      type: "input",
      label: "Último Paso",
      name: "step",
    }
  ]);

  const columns = [
    {
      title: <Checkbox
        onChange={onSelectAll}
        checked={selectedRowKeys.length === allRowKeys.length && allRowKeys.length > 0}
        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < allRowKeys.length}
      />,
      property: "select",
      render: (item) => (
            <Checkbox
              onChange={() => onSelectRow(item.id)}
              checked={selectedRowKeys.includes(item.id)}
              disabled={item.estado !== 6}
            />
      ),
    },
    { title: "Fecha", property: "fecha", sortable: true },
    { title: "Hora", property: "hora", sortable: false },
    { title: "Nombres", property: "nombres", sortable: true },
    { title: "Apellidos", property: "apellidos", sortable: true },
    { title: "Documento", property: "documento", sortable: true },
    {
      title: "Estado",
      property: "estado",
      sortable: true,
      render: (item) => <SolicitudesEstado estado={item.estado} title={item.motivoRechazo} />,
    },
    { title: "Último Paso", property: "ultimoPaso", sortable: false },
  ];

  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `exportsolicitudes?orderBy=fecha&orderDirection=descending`;

    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }

    const response = await http.get(url);
    if (response.data === '') return;

    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "solicitudes.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const onChangedPage = async() => {
    setSelectedRowKeys([]);

  }

  const reprocesarSolicitudes = async () => {
    setLoadingReprocesar(true);
    try {
      const response = await http.patch("solicitudes/informe/masivo", {
        ids: selectedRowKeys,
      });
  
      if (response.status === 200) {
        await modalSuccess("Solicitudes reprocesadas con éxito");
      } else {
        console.error("Error al reprocesar las solicitudes");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (error.response?.data?.errores?.[0]?.detalle) {
        await modalError(
          "Error al reprocesar",
          error.response.data.errores[0].detalle
        );
      } else {
        await modalError(
          "Error al reprocesar",
          "Ocurrió un error inesperado"
        );
      }
    } finally {
      setLoadingReprocesar(false);
    }
  };
  

  const buttons = [
    {
      title: "Exportar a Excel",
      text: <FiPrinter />,
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: true,
    },
  ];

  const menu = (item) => (
    <Menu>
      <Menu.Item key="1" icon={<FiSearch />} onClick={() => navigate(`/solicitudes/${item.id}`)}>
        Ver
      </Menu.Item>
    </Menu>
  );

  return (
    <TableContextProvider>
      <Card>
        <Header
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 600, display: "flex", alignItems: "center" }}>
                <FiInbox style={{ marginRight: 8 }} />
                Solicitudes
              </span>
              <Tooltip
                title={selectedRowKeys.length === 0 ? "Seleccioná al menos una solicitud" : ""}
              >
                <Button
                  type={selectedRowKeys.length > 0 ? "primary" : "default"}
                  disabled={selectedRowKeys.length === 0}
                  loading={loadingReprocesar}
                  style={{
                    borderRadius: 4,
                    minWidth: 180,
                    height: 32,
                    padding: "0 16px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                  onClick={reprocesarSolicitudes}
                >
                  Reprocesar Solicitud
                </Button>
              </Tooltip>
            </div>
          }
          icon={icon}
          breadcrumb={breadcrumb}
          showFilters
          buttons={buttons}
          isFilter={isFilter}
        />
        <Filters fields={filters} />
        <Table
          id="table-solicitudes"
          columns={columns}
          menu={menu}
          simpleMenu={true}
          url="/solicitudes"
          orderBy="fecha"
          orderDirection="descending"
          setIsFilter={setIsFilter}
          onDataLoaded={onDataLoaded}
          onChangedPage={onChangedPage}
        />
      </Card>
    </TableContextProvider>
  );
};

export default SolicitudesListPage;
