
import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Divider, Pagination, Select } from "antd";
import { TableContextProvider } from "../../store/table-context";
import http from "../../services/http";
import Card from "../ui/card";
import Header from "../ui/header";
import Filters from "../ui/filters";
import classes from "./pacientes-evoluciones.module.scss";
import search from "./../../assets/images/search.png";

import TableContext from "../../store/table-context";
const { Text } = Typography;

const PacientesEvoluciones = ({ id }) => {
      const [loadingExport, setLoadingExport] = useState(false);
    
    // Filtros igual que en medicaciones, pero adaptando a evoluciones
    const filters = [
        { type: "date", label: "Fecha Desde", name: "fechaDesde" },
        { type: "date", label: "Fecha Hasta", name: "fechaHasta" },
        { type: "input", label: "Profesional", name: "profesional" },
        { type: "input", label: "Comentario", name: "comentario" },
    ];
  const onClickExportarExcel = async (e) => {
    setLoadingExport(true);
    let url = `evolucion/paciente/export/${id}?`;
    for (const property in e.filters) {
      url += `&${property}=${e.filters[property] ?? ""}`;
    }
    const response = await http.get(url);
    if (response.data === '') return;
    const base = atob(response.data.file);
    const element = document.createElement("a");
    const file = new Blob([Uint8Array.from(base, (c) => c.charCodeAt(0))]);
    element.href = URL.createObjectURL(file);
    element.download = "Evoluciones.xlsx";
    document.body.appendChild(element);
    element.click();
    setLoadingExport(false);
  };

  const buttons = [
    {
      title: "Exportar Excel",
      text: "Exportar",
      type: "primary",
      onClick: onClickExportarExcel,
      loading: loadingExport,
      visible: true,
    },
  ];

    // Renderizado principal
    return (
        <TableContextProvider>
            <Card>
                <Header
                    title=""
                    icon={null}
                    showFilters
                    buttons={buttons}
                    isFilter={false}
                />
                <Filters fields={filters} />
                <EvolucionesList id={id} />
            </Card>
        </TableContextProvider>
    );
};

// Componente para mostrar la lista de evoluciones con paginación y cards
const EvolucionesList = ({ id }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
      const [first, setFirst] = useState(true);
    const idTable = "table-evolucion";
    const context = React.useContext(TableContext);
      useEffect(() => {
        const serialized = localStorage.getItem(idTable);
        if (!serialized) {
          setFirst(false);
          return;
        }
    
        const settings = JSON.parse(serialized);
        context.updateFilters(settings.filters);
        setPage(settings.page);
        setSize(settings.size);
        setFirst(false);
      }, []);
    
    const onChangeSize = (value) => {
        setSize(parseInt(value));
        setPage(1);
    };

    const fetchEvoluciones = async () => {
        setLoading(true);
        let url = '';
        for (const property in context.filters) {
            url += `&${property}=${context.filters[property] ?? ""}`;
        }
        const params = {
            page,
            size
        };
        const query = new URLSearchParams(params).toString();
        const response = await http.get(`/evolucion/paciente/${id}?${query}${url}`);
        setList(response.data?.list || []);
        setTotal(response.data?.total || 0);
        setLoading(false);
        
      const settings = {
        filters: context.filters,
        page: page,
        size: size,
      };
        localStorage.setItem(idTable, JSON.stringify(settings));
    };


    useEffect(() => {
        if (!id) return;
        if(first) return;
        fetchEvoluciones();
    }, [id, page, size, context.filters]);

    if (loading) return <div>Cargando evoluciones...</div>;
    if (!list.length)
         return (
                <div className={classes.empty}>
                  <img src={search} alt="Empty" />
                  <div className={classes.title}>Sin resultados</div>
                  <div className={classes.description}>
                    No se encontró ningún resultado
                  </div>
                </div>
            );

    return (
        <>
            <Row gutter={[16, 16]}>
                {list.map((ev, idx) => (
                    <div style={{ width: "100%", marginLeft: "20px", marginRight: "20px" }} key={idx}>
                        <Col xs={24} key={idx}>
                            <div>
                                <div style={{}}>
                                    <Text strong>
                                        {ev.fecha}
                                        {ev.nombreProfesional && ` | ${ev.nombreProfesional}`}
                                        {ev.especialidad && ` | ${ev.especialidad}`}{" "}
                                    </Text>
                                    {ev.especialidad && `escribió:`}
                                </div>
                                <div style={{}}>
                                    <div dangerouslySetInnerHTML={{ __html: ev.comentario }} style={{ background: '#f8f8f8', borderRadius: 8, padding: 8 }} />
                                </div>
                                {ev.diagnosticos && ev.diagnosticos.length > 0 && (
                                    <div>
                                        <Text strong>Diagnósticos:</Text>
                                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                                            {ev.diagnosticos.map((diag, i) => (
                                                <Text strong>  <li key={i}>{diag}</li></Text>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Col>
                        <hr style={{ border: "none", borderTop: "1px solid #ccc", opacity: 0.8 }} />
                    </div>
                ))}
            </Row>
            {total > 0 && (

                <div className={classes.pagination}>
                    <div className={classes.results}>
                        <span>Mostrando</span>
                        <Select
                            className={classes.select}
                            onChange={onChangeSize}
                            value={size}
                        >
                            <Select.Option value="10">10</Select.Option>
                            <Select.Option value="20">20</Select.Option>
                            <Select.Option value="50">50</Select.Option>
                            <Select.Option value="100">100</Select.Option>
                        </Select>
                        <span>de {total} resultados</span>
                    </div>
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={size}
                        showSizeChanger={false}
                        onChange={setPage}
                    />
                </div>
            )}
        </>
    );
};

export default PacientesEvoluciones;
