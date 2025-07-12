import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { FaChevronsRight, FaHome, FaSearch } from "react-icons/fa";

import TableContext from "../../store/table-context";

import classes from "./header.module.scss";
import { FiChevronsRight, FiHome } from "react-icons/fi";

const Header = (props) => {
  const { title, icon, breadcrumb, showFilters, buttons, isFilter } = props;
  const context = useContext(TableContext);

  const onClickFilters = () => {
    context.updateFiltersVisible(context.filtersVisible ? false : true);
  };
// ###314e8sb
  return (
    <div className={classes.header}>
      <div className={classes.data}>
        {icon && (
          <div className={classes.icon}>{icon}</div>
        )}
        <div className={classes.info}>
          {breadcrumb && (
            <div className={classes.breadcrumb}>
              <Link className={classes.link} to="/">
                <FiHome />
              </Link>
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={classes.separator}>
                    <FiChevronsRight />
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

          <div className={classes.title}>{title}</div>
        </div>
      </div>
      <div className={classes.buttons}>
        {showFilters && (
          <Tooltip title="Filtros">
            <Button
              type="text"
              size="large"
              onClick={onClickFilters}
            // className={isFilter ? classes.buttonsFilter : ''}
            >
              {context.filtersVisible && ("Ocultar filtros")}
              {!context.filtersVisible && ("Ver filtros")}
            </Button>
          </Tooltip>
        )}

        {buttons &&
          buttons.map(
            (item, index) =>
              item.visible && (
                <Tooltip key={index} title={item.title}>
                  <Button
                    type={item.type}
                    size="large"
                    loading={item.loading}
                    onClick={() => item.onClick({ filters: context.filters })}
                  >
                    {item.loading ? "" : item.text}
                  </Button>
                </Tooltip>
              )
          )}
      </div>
    </div>
  );
};

export default Header;
