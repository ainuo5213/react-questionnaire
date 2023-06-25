import React from "react";
import QuestionInputConfigure, { QustionInputPropType } from "./QuestionInput";
import QuestionTextAreaConfigure, {
  QustionTextAreaPropType,
} from "./QuestionTextArea";
import QuestionTitleConfigure, { QuestionTitlePropType } from "./QuestionTitle";
import QuestionRadioGroupConfigure, {
  QustionRadioGroupPropType,
} from "./QuestionRadioGroup";
import QuestionParagraphConfigue, {
  QuestionParagraphPropType,
} from "./QuestionParagraph";
import QuestionCheckboxGroupConfigure, {
  QustionCheckboxGroupPropType,
} from "./QuestionCheckboxGroup";

export type ComponentPropType = QustionInputPropType &
  QuestionTitlePropType &
  QustionTextAreaPropType &
  QustionRadioGroupPropType &
  QuestionParagraphPropType &
  QustionCheckboxGroupPropType;

export type ComponentConfigureType = {
  title: string;
  type: string;
  Component: React.Component<ComponentPropType>;
  defaultProps: ComponentPropType;
};

const componentConfigureList = [
  QuestionInputConfigure,
  QuestionTitleConfigure,
  QuestionParagraphConfigue,
  QuestionTextAreaConfigure,
  QuestionRadioGroupConfigure,
  QuestionCheckboxGroupConfigure,
];

export function getComponentConfigureByComponentType(type: string) {
  return componentConfigureList.find((r) => r.type === type);
}

export const componentConfigureGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionTitleConfigure, QuestionParagraphConfigue],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConfigure, QuestionTextAreaConfigure],
  },
  {
    groupId: "select",
    groupName: "用户选择",
    components: [QuestionRadioGroupConfigure, QuestionCheckboxGroupConfigure],
  },
];
