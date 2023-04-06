import { PaginationWrapper } from '@/types/index'
import request from '@/utils/request'
import { QuestionListItem, QuestionListSearchParameter } from './questionire.types'
export function getQuestionires(params: QuestionListSearchParameter) {
  return request<PaginationWrapper<QuestionListItem>>({
    method: 'get',
    url: '/api/questionires',
    params
  })
}
