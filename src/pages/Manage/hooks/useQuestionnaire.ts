import { getQuestionires } from "@/api/questionnaire/questionnaire";
import { QuestionnaireListSearchParameter } from "@/api/questionnaire/questionnaire.types";
import { SearchKey, SearchPageNum, SearchPageSize } from "@/constants";
import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";

type Option = {
  isStar: boolean
  isDeleted: boolean
}

export function useQuestionList(option?: Partial<Option>) {
  const [urlSearchParameter] = useSearchParams()
  const { loading, data = {
    total: 0, 
    result: []
  } } = useRequest(async () => {
    const searchParameter = {
      [SearchPageNum]: +(urlSearchParameter.get(SearchPageNum) || 1),
      [SearchKey]: urlSearchParameter.get(SearchKey) || '',
      [SearchPageSize]: +(urlSearchParameter.get(SearchPageSize) || 10),
      ... (option || {})
    } as Partial<QuestionnaireListSearchParameter>
    return await getQuestionires(searchParameter)
  }, {
    refreshDeps: [urlSearchParameter],
  })
  
  return {
    loading,
    data
  }
}