import { Form, Input } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/contact.png";

const DatosContactoCard = ({ form, disabled, required, subtitle }) => (
  <div>
    <div className={classes.header}>
      <div className={classes.icon}>
        <img src={icon} alt="contact" />
      </div>
      <div className={classes.data}>
        <div className={classes.title}>Datos de contacto</div>
        <div className={classes.description}>{subtitle}</div>
      </div>
    </div>
      <Form.Item label="Teléfono" name="phone">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item label="Teléfono 2" name="phone2">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item label="Email 2" name="email2">
        <Input disabled={disabled} />
      </Form.Item>
  </div>
);

export default DatosContactoCard;