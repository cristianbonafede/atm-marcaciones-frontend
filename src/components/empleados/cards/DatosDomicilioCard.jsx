import { Col, Form, Input, Row, Select } from "antd";
import classes from "./empleados-card.module.scss";
import icon from "./../../../assets/images/home.png";
import { useEffect } from "react";

const DatosDomicilioCard = ({ form, disabled, required, subtitle, locations }) => {
    return (
        <div>
            <div className={classes.header}>
                <div className={classes.icon}>
                    <img src={icon} alt="domicilio" />
                </div>
                <div className={classes.data}>
                    <div className={classes.title}>Domicilio</div>
                    <div className={classes.description}>{subtitle}</div>
                </div>
            </div>
            <Row gutter={16}>
                <Col xs={24} md={16}>
                    <Form.Item label="Calle" name="street">
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Número Calle" name="streetNumber">
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Barrio" name="neighborhood">
                <Input disabled={disabled} />
            </Form.Item>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label="Piso" name="floor">
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label="Departamento" name="flat">
                        <Input disabled={disabled} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Localidad" name="locationId">
                <Select disabled={disabled} showSearch optionFilterProp="children">
                    {locations?.map((option, index) => (
                        <Select.Option key={index} value={option.locationId}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Código Postal" name="zipCode">
                <Input disabled={disabled} />
            </Form.Item>
            <Form.Item label="Manzana" name="block">
                <Input disabled={disabled} />
            </Form.Item>
            <Form.Item label="Departamento (edificio)" name="departament">
                <Input disabled={disabled} />
            </Form.Item>

        </div>
    );
};

export default DatosDomicilioCard;