import React from 'react'

type QuestionCardDataType = {
  id: string
  title: string
  isPublished: boolean
}

type QuestionCardPropType = {
  data: QuestionCardDataType
  delete: (id: string) => void
  publish: (id: string) => void
}

export default function QuestionCard(prop: QuestionCardPropType) {
  return (
    <div>
      <strong>{prop.data.title}</strong>
      <span>{prop.data.isPublished ? '已发布' : '未发布'}</span>
      <button onClick={() => prop.publish(prop.data.id)}>发布问卷</button>
      <button onClick={() => prop.delete(prop.data.id)}>删除问卷</button>
    </div>
  )
}
