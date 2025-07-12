import React from "react";
import { Button, Tooltip } from "antd";
import { FaFileExcel } from "react-icons/fa";
import classes from "../ui/header.module.scss";

const ExportExcelButton = ({ onClick, loading = false, tooltip = "Descargar a Excel", size = "small" }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
    <Tooltip title={tooltip}>
      <Button
        type="primary"
        size={size}
        onClick={onClick}
        loading={loading}
        icon={<FaFileExcel />}
      />
    </Tooltip>
  </div>
);

export default ExportExcelButton;
