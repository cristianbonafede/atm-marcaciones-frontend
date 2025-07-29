import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Row, Col, Spin, message } from "antd";
import {
  createSector,
  getBosses,
  getCrewCategories,
  getDedications,
  getParentSectors,
  getSectorById,
  getWorkingHours,
  getWorkplaces,
  updateSector,
} from "../../services/sectoresService";
const { Option } = Select;

const SectoresForm = ({ id }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [auxData, setAuxData] = useState({
    crewCategories: [],
    workplaces: [],
    workingHours: [],
    dedications: [],
    bosses: [],
    parentSectors: [],
  });

  // Cargar combos
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getCrewCategories(),
      getWorkplaces(),
      getWorkingHours(),
      getDedications(),
      getBosses(),
      getParentSectors(),
    ]).then(
      ( [
        crewCategories,
        workplaces,
        workingHours,
        dedications,
        bosses,
        parentSectors,
      ]) => {
        setAuxData({
          crewCategories: crewCategories.data?.list || [],
          workplaces: workplaces.data?.list || [],
          workingHours: workingHours.data?.list || [],
          dedications: dedications.data?.list || [],
          bosses: bosses.data || [],
          parentSectors: parentSectors.data?.list || [],
        });
        setLoading(false);
      }
    );
  }, []);

  // Cargar datos si es edición
  useEffect(() => {
    if (id && id !== "nuevo") {
      setLoading(true);
      getSectorById(id).then((data) => {
        form.setFieldsValue({
          name: data.name,
          crewCategoryId: data.crewCategoryId,
          workplaceId: data.workplaceId,
          workingHourId: data.workingHourId ?? undefined,
          dedicationId: data.dedicationId ?? undefined,
          bossId: data.bossId ?? undefined,
          parentId: data.parentId ?? undefined,
        });
        setLoading(false);
      });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (id && id !== "nuevo") {
        await updateSector(id, values);
        message.success("Sector actualizado correctamente");
      } else {
        await createSector(values);
        message.success("Sector creado correctamente");
      }
      window.history.back();
    } catch (e) {
      message.error("Ocurrió un error al guardar el sector");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          crewCategoryId: undefined,
          workplaceId: undefined,
          workingHourId: undefined,
          dedicationId: undefined,
          bossId: undefined,
          parentId: undefined,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Ingrese el nombre" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Categoría"
              name="crewCategoryId"
              rules={[{ required: true, message: "Seleccione una categoría" }]}
            >
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {auxData?.crewCategories?.map((cat) => (
                  <Option key={cat.crewCategoryId} value={cat.crewCategoryId}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Sucursal"
              name="workplaceId"
              rules={[{ required: true, message: "Seleccione una sucursal" }]}
            >
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {auxData?.workplaces?.map((wp) => (
                  <Option key={wp.workplaceId} value={wp.workplaceId}>
                    {wp.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Horario" name="workingHourId">
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {auxData?.workingHours?.map((wh) => (
                  <Option key={wh.workingHoursId} value={wh.workingHoursId}>
                    Entrada: {wh.entryTime} - {wh.flexible ? "Flexible" : "Inflexible"}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Dedicación" name="dedicationId">
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {auxData?.dedications?.map((d) => (
                  <Option key={d.dedicationId} value={d.dedicationId}>
                    {d.minutes ? `${d.minutes} minutos` : "Sin dedicación"}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Jefe" name="bossId">
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {auxData?.bosses?.map((b) => (
                  <Option key={b.id} value={b.id}>
                    {b.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Sector Padre" name="parentId">
              <Select placeholder="Seleccione..." showSearch optionFilterProp="children">
                {auxData?.parentSectors?.map((p) => (
                  <Option key={p.id} value={p.id}>
                    {p.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}></Col>
        </Row>
        <Row>
          <Col span={24}>
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
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default SectoresForm;