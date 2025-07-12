import { useContext } from "react";

import PerfilesModuloItem from "./perfiles-modulo-item";

import PerfilContext from "../../store/perfil-context";

import classes from "./perfiles-modulo-list.module.scss";

const PerfilesModuloList = (props) => {
  const { disabled } = props;

  const context = useContext(PerfilContext);

  return (
    <div className={classes.list}>
      {context.modulos.map((item, index) => (
        <PerfilesModuloItem key={index} item={item} disabled={disabled} />
      ))}
    </div>
  );
};

export default PerfilesModuloList;
