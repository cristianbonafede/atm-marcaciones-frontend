import { useContext } from "react";
import { Tabs } from "antd";
import ReactJson from "react-json-view";

import SolicitudContext from "../../store/solicitud-context";

import classes from "./solicitudes-json.module.scss";

import icon from "./../../assets/images/code-review.png";

const SolicitudesJson = () => {
  const context = useContext(SolicitudContext);

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.icon}>
          <img src={icon} alt="json" />
        </div>
        <div className={classes.data}>
          <div className={classes.title}>Respuestas Servicios</div>
          <div className={classes.description}>
            Consultá las respuestas de los diferentes servicios consultados.
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="0" tabBarStyle={{ padding: "0 30px" }}>
        {context.solicitud.json.map(
          (json, index) =>
            json.contenido && (
              <Tabs.TabPane tab={json.tipo} key={index}>
                <div className={classes.viewer}>
                  <ReactJson
                    src={JSON.parse(json.contenido)}
                    name={false}
                    collapsed
                    enableClipboard={false}
                    displayDataTypes={false}
                  />
                </div>
              </Tabs.TabPane>
            )
        )}
      </Tabs>
    </div>
  );
};

export default SolicitudesJson;
