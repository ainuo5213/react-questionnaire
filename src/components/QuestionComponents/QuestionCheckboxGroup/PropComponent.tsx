import React, { useEffect } from "react";

import { QuestionCheckboxPropType, QustionCheckboxGroupPropType } from "./type";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { QuestionPropEvent } from "../type";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 } from "uuid";

export default function QuestionRadioPropComponent(
  props: QustionCheckboxGroupPropType & QuestionPropEvent
) {
  const { title, list = [], isVertical } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical });
  }, [props]);

  function handleValueChange() {
    const newProps = form.getFieldsValue();
    newProps.list.forEach((r: QuestionCheckboxPropType) => {
      if (r.value) {
        return;
      }
      r.value = v4();
    });

    props.onChange && props.onChange(newProps);
  }

  return (
    <Form
      disabled={props.disabled}
      layout="vertical"
      initialValues={{ title, list, isVertical }}
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
        <Form.List name="list">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ name, key, ...restFields }, i) => {
                  return (
                    <Space direction="horizontal" align="baseline" key={key}>
                      <Form.Item
                        name={[name, "checked"]}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                      <Form.Item
                        name={[name, "text"]}
                        {...restFields}
                        rules={[
                          {
                            required: true,
                            message: "请输入选项",
                          },
                          {
                            validator(rule, value, callback) {
                              const { options = [] } = form.getFieldsValue();
                              let num = 0;
                              list.forEach((r: QuestionCheckboxPropType) => {
                                if (r.text === value) {
                                  num++;
                                }
                              });
                              if (num > 1) {
                                return Promise.reject(
                                  new Error("存在相同的选项")
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          },
                        ]}
                      >
                        <Input placeholder="输入选项"></Input>
                      </Form.Item>
                      {i > 0 ? (
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
                        checked: false,
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
      <Form.Item valuePropName="checked" label="竖向排列" name="isVertical">
        <Checkbox></Checkbox>
      </Form.Item>
    </Form>
  );
}
