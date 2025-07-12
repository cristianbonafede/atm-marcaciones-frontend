import { useContext } from "react";
import { Switch } from "antd";

import PerfilContext from "../../store/perfil-context";

import classes from "./perfiles-modulo-item.module.scss";

const PerfilesModuloItem = (props) => {
  const { item, disabled } = props;

  const context = useContext(PerfilContext);

  return (
    <div className={classes.modulo}>
      <div className={classes.header}>
        <div className={classes.title}>{item.nombre}</div>
        <Switch
          size="small"
          checked={item.seleccionado}
          disabled={disabled}
          onChange={(selected) => context.toggleModulo(item.id, selected)}
        />
      </div>
      <div className={classes.list}>
        {item.acciones.map((action, index) => (
          <div key={index} className={classes.action}>
            <div className={classes.title}>{action.nombre}</div>
            <Switch
              size="small"
              checked={action.seleccionada}
              disabled={disabled}
              onChange={(selected) => context.toggleAction(action.id, selected)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilesModuloItem;
