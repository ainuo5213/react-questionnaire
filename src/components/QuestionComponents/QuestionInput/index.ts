import Component from "./Component";
import QuestionInputPropComponent from "./PropComponent";

export * from "./type";
import { defaultInputProp } from "./type";

export default {
  title: "输入框",
  type: "questionInput",
  Component,
  defaultProps: defaultInputProp,
  PropComponent: QuestionInputPropComponent,
};
