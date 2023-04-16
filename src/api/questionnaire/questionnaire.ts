import { PaginationWrapper } from '@/types/index'
import request from '@/utils/request'
import { QuestionnaireDetail, QuestionnaireListItem, QuestionnaireListSearchParameter } from './questionnaire.types'
export function getQuestionires(params: Partial<QuestionnaireListSearchParameter>) {
  return request<PaginationWrapper<QuestionnaireListItem>>({
    method: 'get',
    url: '/api/questionnaires',
    params
  })
}

export function createQuestionire() {
  return request<string>({
    method: 'post',
    url: '/api/questionnaire'
  })
}

export function getQuestionireDetail(id: string) {
  return request<QuestionnaireDetail>({
    method: 'get',
    url: `/api/questionnaire/${id}`
  })
}