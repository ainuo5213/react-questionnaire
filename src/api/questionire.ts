import { PaginationWrapper } from '@/types/index'
import request from '@/utils/request'
import { QuestionListItem } from './questionire.types'
export function getQuestionires() {
  return request<PaginationWrapper<QuestionListItem>>({
    url: '/api/questionires'
  })
}
