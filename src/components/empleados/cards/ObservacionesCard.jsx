import { Form, Input } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/observaciones.png";

const ObservacionesCard = ({ form, disabled, subtitle }) => (
  <div>
    <div className={classes.header}>
      <div className={classes.icon}>
        <img src={icon} alt="observaciones" />
      </div>
      <div className={classes.data}>
        <div className={classes.title}>Observaciones</div>
        <div className={classes.description}>{subtitle}</div>
      </div>
    </div>
      <Form.Item label="Observaciones Personales" name="personalObservations">
        <Input.TextArea disabled={disabled} />
      </Form.Item>
      <Form.Item label="Observaciones Laborales" name="workplaceObservations">
        <Input.TextArea disabled={disabled} />
      </Form.Item>
  </div>
);

export default ObservacionesCard;