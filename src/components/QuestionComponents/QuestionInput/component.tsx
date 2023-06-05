import React from "react";
import { Input, Typography } from "antd";
import { QustionInputPropType, defaultInputProp } from "./type";

const { Paragraph } = Typography;
export default function QuestionInput(props: Partial<QustionInputPropType>) {
  const { placeholder, title } = { ...defaultInputProp, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
}
