import React, { useEffect, useState } from "react";
import OrgChart from "@dabeng/react-orgchart";
// import "react-orgchart/index.css";
import classes from "./sectorTree.module.scss";
import { buildCrewTree } from "../../services/sectores";
import http from "../../services/http";

const CustomNode = ({ nodeData }) => (
  <div className={classes.customNode}>
    <div>{nodeData.name}</div>
    <div className={`${classes.boss} ${nodeData.boss ? classes.hasBoss : ""}`}>
      {nodeData.boss ? `Jefe: ${nodeData.boss}` : "Sin jefe"}
    </div>
  </div>
);

const SectorTree = ({ crews }) => {
  const [search, setSearch] = useState("");
  const [foundId, setFoundId] = useState(null);

  // Enriquecer cada nodo con el nombre del jefe
  const getBossName = (crew, crewsList) => {
    if (!crew.bossId) return null;
    const boss = crewsList.find(c => c.id === crew.bossId);
    return boss ? boss.name : null;
  };

  // OrgChart espera un solo objeto raíz, no un array
  const [fullRoot] = buildCrewTree(crews, null);
  const [root, setRoot] = useState(fullRoot); // Estado que cambia al buscar
  console.log("Root:", fullRoot);
  // Buscar sector por nombre
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value || value.length < 3) {
      setRoot(fullRoot); // Restaurar árbol original
      return;
    }

    const searchLower = value.toLowerCase();

    const filterTree = (node) => {
      if (!node) return null;

      const nameMatches = node.name.toLowerCase().includes(searchLower);

      if (nameMatches) {
        // Si coincide, incluimos el nodo completo con todos sus hijos sin filtrar
        return { ...node };
      }

      // Si no coincide, no lo incluimos (ni buscamos en los hijos)
      return null;
    };

    // Hay que recorrer todo el árbol, porque los nodos pueden estar en cualquier parte
    const searchMatchingNodes = (node) => {
      if (!node) return [];

      const match = filterTree(node);
      if (match) return [match];

      // Buscar en hijos
      if (!node.children) return [];

      return node.children.flatMap(searchMatchingNodes);
    };

    const filteredNodes = searchMatchingNodes(fullRoot);

    // Mostrar como raíz un nuevo nodo "Resultados de búsqueda", con todos los que coincidieron
    const filteredRoot = {
      name: `Resultados de "${value}"`,
      children: filteredNodes
    };

    setRoot(filteredRoot);
  };


  if (!root)
    return <div>No hay sectores para mostrar.</div>;

  const handlePrint = () => {
    const orgChartElement = document.querySelector(".org-print"); // Clase usada en SectorTree
    if (!orgChartElement) {
      console.warn("No se encontró el organigrama para imprimir");
      return;
    }

    const printWindow = window.open("", "Organigrama", "width=1000,height=800");
    if (!printWindow) return;

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return styleSheet.href
            ? `<link rel="stylesheet" href="${styleSheet.href}">`
            : "";
        } catch {
          return "";
        }
      })
      .join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Imprimir Organigrama</title>
        ${styles}
        <style>
          body {
            margin: 0;
            padding: 16px;
          }
        </style>
      </head>
      <body>
        ${orgChartElement.outerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };


  return (
    <div>
      <div className={classes.menu}>
        <div className={classes.searchWrapper}>
          <span className={classes.searchIcon}>
            {/* Ícono de lupa SVG */}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar sector..."
            value={search}
            onChange={handleSearch}
            className={classes.searchInput}
          />
        </div>
        <button onClick={handlePrint} className={classes.printButton}>
          Imprimir
        </button>
      </div>
      <div className={`org-print ${classes.orgContainer}`} printable>
        <OrgChart
          datasource={root}
          NodeTemplate={CustomNode}
          pan={true}
          zoom={true}
        />
      </div>
    </div>
  );
};

export default SectorTree;

