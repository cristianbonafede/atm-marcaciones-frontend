import classes from "./card.module.scss";
import { Link } from "react-router-dom";
import { FaChevronsRight, FaHome } from "react-icons/fa";
import React from "react";

const Card = (props) => {
  const { children, breadcrumb } = props;
  return <div>
    {breadcrumb && (
      <div className={classes.breadcrumb}>
        <Link className={classes.link} to="/">
          Inicio
        </Link>
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <div className={classes.separator}>
              /
            </div>
            {!item.url && <div className={classes.link}>{item.title}</div>}
            {item.url && (
              <Link className={classes.link} to={item.url}>
                {item.title}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    )}

    <div className={classes.card}>
      {children}</div>
  </div>
};

export default Card;
