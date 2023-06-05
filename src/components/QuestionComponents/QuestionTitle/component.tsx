import React from "react";
import { Typography } from "antd";
import { QuestionTitlePropType, defaultTitleProp } from "./type";

const { Title } = Typography;
const fontSizeMap = new Map<number, string>([
  [1, "24px"],
  [2, "20px"],
  [3, "16px"],
]);
export default function QuestionTitle(props: Partial<QuestionTitlePropType>) {
  const { text, isCenter, level } = { ...defaultTitleProp, ...props };
  function genFontSize(level: number) {
    return fontSizeMap.get(level) || fontSizeMap.get(3);
  }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: 0,
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
}
