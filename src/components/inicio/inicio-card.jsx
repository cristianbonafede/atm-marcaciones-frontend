import { Link } from "react-router-dom";

import classes from "./inicio-card.module.scss";

const InicioCard = (props) => {
  const { item } = props;

  return (
    <Link to={item.url}>
      <div className={classes.card}>
        <div className={classes.icon}>{item.icon}</div>
        <div className={classes.title}>{item.title}</div>
      </div>
    </Link>
  );
};

export default InicioCard;
