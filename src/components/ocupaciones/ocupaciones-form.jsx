import React, { useEffect, useState } from "react";
import { Form, Input, Switch, InputNumber, Button, Select } from "antd";
import http from "../../services/http";
import { useNavigate } from "react-router-dom";
import { modalSuccess } from "../../services/notifications";

const { Option } = Select;

const OcupacionesForm = ({ id }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [ocupacion, setOcupacion] = useState(null);
    const isNew = id === "nuevo";
    let navigate = useNavigate();

    useEffect(() => {
        if (!isNew) {
            setLoading(true);
            http.get(`/occupations/${id}`).then((res) => {
                setOcupacion(res.data);
                form.setFieldsValue(res.data);
                setLoading(false);
            });
        }
    }, [id, isNew, form]);

    const onFinish = async (values) => {
        setLoading(true);
        let response;
        if (isNew) {
            response = await http.post("/occupations", values);
        } else {
            response = await http.put(`/occupations/${id}`, values);
        }
        setLoading(false);
        if (response) {
            await modalSuccess(
                "Ocupación guardada",
                id === "nuevo"
                    ? "La ocupación fue creada exitosamente"
                    : "La ocupación fue modificada exitosamente"
            );
            navigate("/config/ocupaciones");
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                automaticCheckout: false,
                requiredInWorkplace: false,
                frecuency: 0,
            }}
        >
            <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: "Ingrese el nombre" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Descripción"
                name="description"
                rules={[{ required: true, message: "Ingrese la descripción" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Checkout Automático"
                name="automaticCheckout"
                valuePropName="checked"
            >
                <Switch checkedChildren="Sí" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item
                label="Frecuencia"
                name="frecuency"
                rules={[{ required: true, message: "Ingrese la frecuencia" }]}
            >
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
                label="Requiere en Lugar de Trabajo"
                name="requiredInWorkplace"
                valuePropName="checked"
            >
                <Switch checkedChildren="Sí" unCheckedChildren="No" />
            </Form.Item>

            <Form.Item
                label="Estrategia de Tiempo"
                name="timeStrategy"
                rules={[{ required: true, message: "Seleccione una estrategia de tiempo" }]}
            >
                <Select placeholder="Seleccione...">
                    <Option value="WorkshiftStrategy">WorkshiftStrategy</Option>
                    <Option value="DailyStrategy">DailyStrategy</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <Button style={{ minWidth: 120 }} onClick={() => window.history.back()}>
                        Cancelar
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ minWidth: 120 }}
                    >
                        Guardar
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default OcupacionesForm;