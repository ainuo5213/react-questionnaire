import React from "react";
import { Typography } from "antd";
import { QuestionParagraphPropType, defaultParagraphProp } from "./type";
import xss from "xss";

const { Paragraph } = Typography;
export default function QuestionParagraph(
  props: Partial<QuestionParagraphPropType>
) {
  const { text, isCenter } = { ...defaultParagraphProp, ...props };
  return (
    <Paragraph
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: 0,
      }}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: xss(text).replaceAll("\n", "<br />"),
        }}
      ></span>
    </Paragraph>
  );
}
