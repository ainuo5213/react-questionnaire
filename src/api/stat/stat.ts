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
