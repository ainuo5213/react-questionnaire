import Component from "./Component";
import QuestionTextAreaPropComponent from "./PropComponent";

export * from "./type";
import { defaultTextAreaProp } from "./type";

export default {
  title: "多行文本",
  type: "questionTextArea",
  Component,
  defaultProps: defaultTextAreaProp,
  PropComponent: QuestionTextAreaPropComponent,
};
