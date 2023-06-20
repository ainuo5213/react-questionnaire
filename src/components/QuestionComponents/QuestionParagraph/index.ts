import Component from "./Component";
import QuestionParagraphPropComponent from "./PropComponent";

export * from "./type";
import { defaultParagraphProp } from "./type";

export default {
  title: "段落",
  type: "questionParagraph",
  Component,
  defaultProps: defaultParagraphProp,
  PropComponent: QuestionParagraphPropComponent,
};
