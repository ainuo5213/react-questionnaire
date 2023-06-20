import React, { useEffect } from "react";

import { QuestionParagraphPropType } from "./type";
import { Checkbox, Form, Input, Select } from "antd";
import { QuestionPropEvent } from "../type";

export default function QuestionParagraphPropComponent(
  props: QuestionParagraphPropType & QuestionPropEvent
) {
  const { text, isCenter } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      text: props.text,
      isCenter: props.isCenter,
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
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "请输入段落内容" }]}
      >
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>
    </Form>
  );
}
