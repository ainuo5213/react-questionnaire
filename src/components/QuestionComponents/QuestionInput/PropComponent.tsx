import React, { useEffect } from "react";

import { QustionInputPropType } from "./type";
import { Form, Input } from "antd";
import { QuestionPropEvent } from "../type";

export default function QuestionInputPropComponent(
  props: QustionInputPropType & QuestionPropEvent
) {
  const { title, placeholder } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title: props.title, placeholder: props.placeholder });
  }, [props]);

  function handleValueChange() {
    const newProps = form.getFieldsValue();

    props.onChange && props.onChange(newProps);
  }

  return (
    <Form
      disabled={props.disabled}
      layout="vertical"
      initialValues={{ title, placeholder }}
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
      <Form.Item label="Placeholder" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  );
}
