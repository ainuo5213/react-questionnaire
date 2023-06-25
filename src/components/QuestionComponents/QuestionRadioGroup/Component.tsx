import React from "react";
import { Input, Radio, Space, Typography } from "antd";
import { QustionRadioGroupPropType, defaultRadioGroupProp } from "./type";

const { Paragraph } = Typography;
export default function QuestionRadio(
  props: Partial<QustionRadioGroupPropType>
) {
  const { title, options, isVertical, value } = {
    ...defaultRadioGroupProp,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((r, i) => {
            if (!r.text) {
              return null;
            }
            return (
              <Radio key={i} value={r.value}>
                {r.text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
}
