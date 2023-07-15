export type QuestionStatListParameter = {
  pageNum: number;
  pageSize: number;
};

export type QuestionStatListItem = {
  questionnaireId: string;
  answerId: string;
} & Record<string, unknown>;
