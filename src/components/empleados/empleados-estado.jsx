import React from "react";
import { Tag } from "antd";

const EmpleadosEstado = ({ estado }) => {
  if (estado === true || estado === 10 || estado === "10") {
    return <Tag color="green">Activo</Tag>;
  }
  return <Tag color="red">Inactivo</Tag>;
};

export default EmpleadosEstado;
