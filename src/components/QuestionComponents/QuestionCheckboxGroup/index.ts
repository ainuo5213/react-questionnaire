import Component from "./Component";
import QuestionCheckboxGroupPropComponent from "./PropComponent";

export * from "./type";
import { defaultCheckboxGroupProp } from "./type";

export default {
  title: "多选组",
  type: "questionCheckboxGroup",
  Component,
  defaultProps: defaultCheckboxGroupProp,
  PropComponent: QuestionCheckboxGroupPropComponent,
};
