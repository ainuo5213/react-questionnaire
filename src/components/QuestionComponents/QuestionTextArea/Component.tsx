import React from "react";
import { Input, Typography } from "antd";
import { QustionTextAreaPropType, defaultTextAreaProp } from "./type";

const { Paragraph } = Typography;
export default function QuestionTextArea(
  props: Partial<QustionTextAreaPropType>
) {
  const { placeholder, title } = { ...defaultTextAreaProp, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder}></Input.TextArea>
      </div>
    </div>
  );
}
