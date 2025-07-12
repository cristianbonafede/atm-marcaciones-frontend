import { Link } from "react-router-dom";

import classes from "./inicio-card.module.scss";

const InicioCard = (props) => {
  const { item } = props;
  const hasIcon = !!item.icon;
  return (
    <Link to={item.url}>
      <div className={hasIcon ? classes.card : `${classes.card} ${classes.noIcon}`}>
        {hasIcon && (
          <div className={classes.icon}>{item.icon}</div>
        )}
        <div className={classes.title}>{item.title}</div>
      </div>
    </Link>
  );
};

export default InicioCard;
