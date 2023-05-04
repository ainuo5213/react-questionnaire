import { PaginationWrapper } from '@/types/index'
import request from '@/utils/request'
import { QuestionnaireDetail, QuestionnaireListItem, QuestionnaireListSearchParameter } from './questionnaire.types'
export function getQuestionaires(params: Partial<QuestionnaireListSearchParameter>) {
  return request<PaginationWrapper<QuestionnaireListItem>>({
    method: 'get',
    url: '/api/questionnaires',
    params
  })
}

export function createQuestionaire() {
  return request<string>({
    method: 'post',
    url: '/api/questionnaire'
  })
}

export function getQuestionaireDetail(id: string) {
  return request<QuestionnaireDetail>({
    method: 'get',
    url: `/api/questionnaire/${id}`
  })
}

export function updateQuestionaire(id: string, data: Pick<Partial<QuestionnaireDetail>, 'isPublished' | 'isStar' | 'isDeleted'>) {
  return request<QuestionnaireDetail>({
    method: 'patch',
    url: `/api/questionnaire/${id}`,
    data
  })
}

export function copyQuestionaire(id: string) {
  return request<string>({
    method: 'patch',
    url: `/api/questionnaire/duplicate/${id}`
  })
}

export function batchDeleteQuestionaires(idList: string[]) {
  return request<null>({
    method: 'delete',
    url: `/api/questionnaire`,
    data: {
      ids: idList
    }
  })
}