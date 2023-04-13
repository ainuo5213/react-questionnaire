import { getQuestionireDetail } from "@/api/questionnaire/questionnaire";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";

export function useQuestionnaireDetail() {
  const { id } =  useParams()
  
  return useRequest(getQuestionireDetail, {
    defaultParams: [id!]
  })
}