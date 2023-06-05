import React from "react";
import QuestionInputConfigure, { QustionInputPropType } from "./QuestionInput";
import QuestionTitleConfigure, { QuestionTitlePropType } from "./QuestionTitle";

export type ComponentPropType = QustionInputPropType & QuestionTitlePropType;

export type ComponentConfigureType = {
  title: string;
  type: string;
  Component: React.Component<ComponentPropType>;
  defaultProps: ComponentPropType;
};

const componentConfigureList = [QuestionInputConfigure, QuestionTitleConfigure];

export function getComponentConfigureByComponentType(type: string) {
  return componentConfigureList.find((r) => r.type === type);
}
