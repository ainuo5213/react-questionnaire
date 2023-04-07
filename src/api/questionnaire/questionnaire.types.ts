export type QuestionnaireListItem = {
  id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createTime: string
}

export type QuestionnaireListSearchParameter = {
  page: number
  q: string
}
