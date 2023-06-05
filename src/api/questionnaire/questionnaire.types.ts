import { ComponentType } from "@/store/reducer/question/component";

export type QuestionnaireListItem = {
  id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
  isDeleted: boolean;
};

export type QuestionnaireListSearchParameter = {
  pageNum: number;
  keyWord: string;
  isStar: boolean;
  isDeleted: boolean;
  pageSize: number;
};

export type QuestionnaireDetail = {
  id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
  isDeleted: boolean;
  componentList: ComponentType[];
};
