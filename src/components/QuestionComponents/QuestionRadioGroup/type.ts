export type QuestionRadioPropType = {
  value: string;
  text: string;
};

export type QustionRadioGroupPropType = {
  title?: string;
  isVertical?: boolean;
  options: QuestionRadioPropType[];
  value?: string;
};

export const defaultRadioGroupProp: QustionRadioGroupPropType = {
  title: "单选标题",
  isVertical: false,
  options: [
    { value: "item1", text: "选项一" },
    { value: "item2", text: "选项二" },
  ],
  value: "",
};
