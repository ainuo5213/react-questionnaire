export type QuestionTitlePropType = {
  text: string;
  level: 1 | 2 | 3;
  isCenter: boolean;
};

export const defaultTitleProp: QuestionTitlePropType = {
  text: "一行标题",
  level: 1,
  isCenter: false,
};
