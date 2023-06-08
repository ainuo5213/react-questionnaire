import Component from "./Component";
import QuestionTitlePropComponent from "./PropComponent";

export * from "./type";
import { defaultTitleProp } from "./type";

export default {
  title: "标题",
  type: "questionTitle",
  Component,
  defaultProps: defaultTitleProp,
  PropComponent: QuestionTitlePropComponent,
};
