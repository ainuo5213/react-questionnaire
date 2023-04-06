export type QuestionListItem = {
  id: number
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createTime: string
}

export type QuestionListSearchParameter = {
  page: number
  q: string
}
