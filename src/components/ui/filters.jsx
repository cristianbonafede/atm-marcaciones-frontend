import { useContext, useEffect } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";

import TableContext from "../../store/table-context";

const Filters = (props) => {
  const [form] = Form.useForm();
  const { fields } = props;
  const context = useContext(TableContext);

  const onClickSearch = (values) => {
    const processed = { ...values };

    for (const key in processed) {
      const field = fields.find(item => item.name === key);
      if (field?.type === 'date') {
        if (moment.isMoment(processed[key])) {
          processed[key] = processed[key].format("DD/MM/YYYY");
        } else {
          processed[key] = null;
        }
      }
    }
    context.updateFilters(processed);
  };

  const onClickClear = () => {
    form.resetFields();
  };

  const updateFiledFilters = () => {
    if (context.filtersVisible) {
      let filters = { ...context.filters };

      for (const key in filters) {
        const field = fields.find(item => item.name === key);
        if (field?.type === 'date') {
          const rawDate = filters[key];
          if (typeof rawDate === 'string' && rawDate.trim() !== '') {
            const parsedDate = moment(rawDate, 'DD/MM/YYYY', true); // modo estricto
            filters[key] = parsedDate.isValid() ? parsedDate : null;
          } else {
            filters[key] = null;
          }
        }
      }
      form.setFieldsValue(filters);
    }
  }
  useEffect(() => {
    const storedVisible = localStorage.getItem("filtersVisible");
    if (storedVisible !== null) {
      const visible = storedVisible === "true";
      if (visible !== context.filtersVisible && typeof context.setFiltersVisible === "function") {
        context.setFiltersVisible(visible);
      }
      updateFiledFilters()
    }
  }, []);

  useEffect(() => {
    updateFiledFilters();
  }, [context.filtersVisible, context.filters]);
  return (
    <div style={{ marginBottom: 24 }}>

      {context.filtersVisible && (
        <Form layout="vertical" form={form} onFinish={onClickSearch} style={{ marginTop: 8 }}>
          <Row gutter={20}>
            {fields.map((item, index) => (
              <Col span={8} key={index}>
                {item.type === "input" && !item.hidden && (
                  <Form.Item label={item.label} name={item.name}>
                    <Input />
                  </Form.Item>
                )}
                {item.type === "number" && !item.hidden && (
                  <Form.Item
                   label={item.label} name={item.name}>
                    <Input  type="number"  />
                  </Form.Item>
                )}
                {item.type === "date" && !item.hidden && (
                  <Form.Item label={item.label} name={item.name}>
                    <DatePicker format="DD/MM/YYYY" allowClear />
                  </Form.Item>
                )}
                {item.type === "select" && !item.hidden && (
                  <Form.Item label={item.label} name={item.name}>
                    <Select allowClear showSearch optionFilterProp="children" onChange={item.onChange ? (value) => item.onChange(value, form) : undefined}>
                      {item.values?.map((option, index) => (
                        <Select.Option key={index} value={option.value}>
                          {option.text}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </Col>
            ))}
          </Row>
          <div className="actions">
            <Button type="text" onClick={onClickClear}>
              Limpiar
            </Button>
            <Button type="primary" htmlType="submit">
              Buscar
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Filters;
