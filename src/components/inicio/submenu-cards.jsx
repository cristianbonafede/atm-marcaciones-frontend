import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col } from "antd";
import menuConfig from "../ui/menuConfig";
import { FaChevronRight } from "react-icons/fa";
import classes from "./submenu-cards.module.scss";

const SubmenuCards = ({ parentLabel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Busca el menú principal por label
  const parent = useMemo(() => menuConfig.find((m) => m.label === parentLabel), [parentLabel]);
  if (!parent || !parent.children) return null;

  return (
    <div className={classes.section}>
      <div className={classes.title}>{parent.label}</div>
      <Row gutter={[20, 20]}>
        {parent.children.map((item) => (
          <Col key={item.label} xs={24} md={12} lg={6} xxl={4}>
            <Card
              className={classes.card}
              hoverable
              onClick={() => navigate(item.path)}
            >
              {item.icon && (
                <div className={classes.icon}>{item.icon}</div>
              )}
              <div className={classes.title}>{item.label}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SubmenuCards;
