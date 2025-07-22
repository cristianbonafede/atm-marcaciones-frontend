import { Form, Input } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/workplace.png";

const DatosTrabajoCard = ({ form, disabled, subtitle }) => (
  <div>
    <div className={classes.header}>
      <div className={classes.icon}>
        <img src={icon} alt="workplace" />
      </div>
      <div className={classes.data}>
        <div className={classes.title}>Datos del trabajo</div>
        <div className={classes.description}>{subtitle}</div>
      </div>
    </div>
      <Form.Item label="Teléfono Trabajo" name="workplacePhone">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item label="Email Trabajo" name="workplaceEmail">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item label="Dirección Trabajo" name="workplaceAddress">
        <Input disabled={disabled} />
      </Form.Item>
  </div>
);

export default DatosTrabajoCard;