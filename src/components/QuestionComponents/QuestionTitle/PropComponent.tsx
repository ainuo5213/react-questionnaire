import React, { useEffect } from "react";

import { QuestionTitlePropType } from "./type";
import { Checkbox, Form, Input, Select } from "antd";
import { QuestionPropEvent } from "../type";

export default function QuestionTitlePropComponent(
  props: QuestionTitlePropType & QuestionPropEvent
) {
  const { text, isCenter, level } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      text: props.text,
      isCenter: props.isCenter,
      level: props.level,
    });
  }, [props]);

  function handleValueChange() {
    const newProps = form.getFieldsValue();

    props.onChange && props.onChange(newProps);
  }

  return (
    <Form
      disabled={props.disabled}
      layout="vertical"
      initialValues={{ text, isCenter, level }}
      form={form}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
    </Form>
  );
}
