export type QuestionCheckboxPropType = {
  value: string;
  text: string;
  checked: boolean;
};

export type QustionCheckboxGroupPropType = {
  title?: string;
  isVertical?: boolean;
  list: QuestionCheckboxPropType[];
};

export const defaultCheckboxGroupProp: QustionCheckboxGroupPropType = {
  title: "单选标题",
  isVertical: false,
  list: [
    { value: "item1", text: "选项一", checked: false },
    { value: "item2", text: "选项二", checked: false },
  ],
};
