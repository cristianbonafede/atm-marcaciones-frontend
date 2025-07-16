import React from "react";
import { Tag } from "antd";

const EmpleadosEstado = ({ estado }) => {
  if (estado === true || estado === 1 || estado === "1") {
    return <Tag color="green">Activo</Tag>;
  }
  return <Tag color="red">Inactivo</Tag>;
};

export default EmpleadosEstado;
