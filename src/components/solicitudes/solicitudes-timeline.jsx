import { useContext, useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-timeline.module.scss";

import icon from "./../../assets/images/cronologia.png";

const SolicitudesTimeLine = (props) => {
  const context = useContext(SolicitudContext);
  const renderTimelineItems = () => {
    return (
      <Timeline>
        {context.solicitud.movimientoSolicitud && context.solicitud.movimientoSolicitud.map((item) => (
          <Timeline.Item
            key={item.estado}
            color={getTimelineItemColor(item.estado)}
          >
            {item.accion}
          </Timeline.Item>
        ))}
      </Timeline>
    );
  };

  const getTimelineItemColor = (estado) => {
    switch (estado) {
      case 1:
        return "gold";
      case 2:
        return "green";
      case 3:
        return "red";
      case 4:
        return "orange";
      case 5:
        return "lime";
      case 6:
        return "volcano";
      case 7:
        return "lime";
      case 8:
        return "yellow";
      case 9:
        return "red";
      default:
        return "-";
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="emails" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>TimeLine</div>
          <div className={classes.description}>Consultá el TimeLine</div>
        </div>
      </div>
      <div className={classes.timeline}>{renderTimelineItems()}</div>
    </div>
  );
};

export default SolicitudesTimeLine;
