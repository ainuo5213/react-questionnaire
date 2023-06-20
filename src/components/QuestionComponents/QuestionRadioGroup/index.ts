import Component from "./Component";
import QuestionRadioGroupPropComponent from "./PropComponent";

export * from "./type";
import { defaultRadioGroupProp } from "./type";

export default {
  title: "单选组",
  type: "questionRadioGroup",
  Component,
  defaultProps: defaultRadioGroupProp,
  PropComponent: QuestionRadioGroupPropComponent,
};
