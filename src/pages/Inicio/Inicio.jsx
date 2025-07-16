import { useNavigate } from "react-router-dom";
import menuConfig from "../../components/ui/menuConfig";
import { Row, Col } from "antd";
import InicioCard from "../../components/inicio/inicio-card";
import classes from "../../components/inicio/inicio-section.module.scss";

const InicioPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.section}>
      <div className={classes.title}>Inicio</div>
      <Row gutter={[20, 20]}>
        {menuConfig.map((item) => (
          <Col key={item.label} xs={24} md={12} lg={6} xxl={4}>
            <InicioCard
              item={{
                ...item,
                url: item.children ? `/inicio/${encodeURIComponent(item.label)}` : item.path,
                title: item.label // Forzar que title esté presente para el componente
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InicioPage;
