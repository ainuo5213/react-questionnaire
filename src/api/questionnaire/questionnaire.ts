import { PaginationWrapper } from '@/types/index'
import request from '@/utils/request'
import { QuestionnaireListItem, QuestionnaireListSearchParameter } from './questionnaire.types'
export function getQuestionires(params: QuestionnaireListSearchParameter) {
  return request<PaginationWrapper<QuestionnaireListItem>>({
    method: 'get',
    url: '/api/questionnaires',
    params
  })
}

export function createQuestionire() {
  return request<string>({
    method: 'get',
    url: '/api/questionnaire'
  })
}