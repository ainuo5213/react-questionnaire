import React from "react";
import { Input, Checkbox, Space, Typography } from "antd";
import { QustionCheckboxGroupPropType, defaultCheckboxGroupProp } from "./type";

const { Paragraph } = Typography;
export default function QuestionCheckbox(
  props: Partial<QustionCheckboxGroupPropType>
) {
  const { title, list, isVertical } = {
    ...defaultCheckboxGroupProp,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((r, i) => {
          if (!r.text) {
            return null;
          }
          return (
            <Checkbox checked={r.checked} key={i} value={r.value}>
              {r.text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
}
