import { getQuestionaires } from "@/api/questionnaire/questionnaire";
import { QuestionnaireListSearchParameter } from "@/api/questionnaire/questionnaire.types";
import { SearchKey, SearchPageNum, SearchPageSize } from "@/constants";
import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";

type Option = {
  isStar: boolean
  isDeleted: boolean
}

export function useQuestionList(option?: Partial<Option>) {
  const [urlSearchParameter, setUrlSearchParameter] = useSearchParams()
  const { loading, data = {
    total: 0, 
    result: []
  }, refreshAsync } = useRequest(async () => {
    const searchParameter = {
      [SearchPageNum]: +(urlSearchParameter.get(SearchPageNum) || 1),
      [SearchKey]: urlSearchParameter.get(SearchKey) || '',
      [SearchPageSize]: +(urlSearchParameter.get(SearchPageSize) || 10),
      ... (option || {})
    } as Partial<QuestionnaireListSearchParameter>
    return await getQuestionaires(searchParameter)
  }, {
    refreshDeps: [urlSearchParameter],
    debounceWait: 200
  })

  function refresh(plusPage?: number) {
    const currentPage = +(urlSearchParameter.get(SearchPageNum) || 1) + (plusPage || 0)
    if (currentPage >= 1) {
      urlSearchParameter.set(SearchPageNum, String(currentPage))
      setUrlSearchParameter(urlSearchParameter)
    } else {
      refreshAsync()
    }
  }
  
  return {
    loading,
    data,
    refresh: refresh
  }
}