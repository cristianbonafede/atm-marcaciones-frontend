import { useContext } from "react";
import SimpleBar from "simplebar-react";

import SolicitudContext from "../../store/solicitud-context";

import SolicitudesEstado from "./solicitudes-estado";

import classes from "./solicitudes-historial.module.scss";

import icon from "./../../assets/images/schedule.png";

const SolicitudesHistorial = (props) => {
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="emails" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Historial</div>
          <div className={classes.description}>
            Consultá los diferentes cambios de estado que ha recibido la
            solicitud
          </div>
        </div>
      </div>
      <SimpleBar style={{ height: "335px" }}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {context.solicitud.historial &&
              context.solicitud.historial.map((item, index) => (
                <tr key={index}>
                  <td>{item.fecha}</td>
                  <td>{item.hora}</td>
                  <td>
                    <SolicitudesEstado estado={item.estado} />
                  </td>
                  <td>{item.usuario ?? "-"}</td>
                  <td>{item.comentario ?? "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </SimpleBar>
    </div>
  );
};

export default SolicitudesHistorial;
