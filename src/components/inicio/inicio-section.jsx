import { Col, Row } from "antd";

import InicioCard from "./inicio-card";

import classes from "./inicio-section.module.scss";

const InicioSection = (props) => {
  const { item } = props;

  return (
    <div className={classes.section}>
      <div className={classes.title}>{item.title}</div>
      <Row gutter={[20, 20]}>
        {item.links.map(
          (item, index) =>
            item.visible && (
              <Col key={index} xs={24} md={12} lg={6} xxl={4}>
                <InicioCard item={item} />
              </Col>
            )
        )}
      </Row>
    </div>
  );
};

export default InicioSection;
