import request from "@/utils/request";
import { QuestionStatListItem, QuestionStatListParameter } from "./stat.types";
import { PaginationWrapper } from "@/types";

export function getQustionStatList(
  questionId: string,
  params: QuestionStatListParameter
) {
  return request<PaginationWrapper<QuestionStatListItem>>({
    url: `/api/stat/${questionId}`,
    method: "GET",
    params,
  });
}

export function getQuestionComponentStat(
  questionId: string,
  componentId: string
) {
  return request<Array<{ name: string; count: number }>>({
    url: `/api/stat/${questionId}/${componentId}`,
    method: "GET",
  });
}
