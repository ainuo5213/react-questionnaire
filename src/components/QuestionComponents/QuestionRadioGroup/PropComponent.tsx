import React, { useEffect } from "react";

import { QustionRadioGroupPropType } from "./type";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { QuestionPropEvent } from "../type";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function QuestionRadioPropComponent(
  props: QustionRadioGroupPropType & QuestionPropEvent
) {
  const { title, options = [], isVertical, value } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, options, isVertical, value });
  }, [props]);

  function handleValueChange() {
    const newProps = form.getFieldsValue();

    props.onChange && props.onChange(newProps);
  }

  return (
    <Form
      disabled={props.disabled}
      layout="vertical"
      initialValues={{ title, options, isVertical, value }}
      form={form}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ name, key, ...restFields }, i) => {
                  return (
                    <Space direction="horizontal" align="baseline" key={key}>
                      <Form.Item
                        name={[name, "text"]}
                        {...restFields}
                        rules={[
                          {
                            required: true,
                            message: "请输入选项",
                          },
                        ]}
                      >
                        <Input placeholder="输入选项"></Input>
                      </Form.Item>
                      {i > 1 ? (
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                        ></MinusCircleOutlined>
                      ) : null}
                    </Space>
                  );
                })}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() =>
                      add({
                        value: "",
                        text: "",
                      })
                    }
                    icon={<PlusOutlined></PlusOutlined>}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          options={options
            .filter((r) => r.text)
            .map((r) => ({
              label: r.text,
              value: r.value,
            }))}
          placeholder="请选择按钮组默认选中"
        ></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" label="竖向排列" name="isVertical">
        <Checkbox></Checkbox>
      </Form.Item>
    </Form>
  );
}
