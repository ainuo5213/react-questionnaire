import { produce } from 'immer'
import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'

export default function QuestionList() {
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true }
  ])
  function onQuestionDelete(id: string) {
    setQuestionList(
      produce(draft => {
        draft.splice(
          draft.findIndex(r => r.id === id),
          1
        )
      })
    )
  }

  function onQuestionPublish(id: string) {
    setQuestionList(
      produce(draft => {
        const question = draft.find(r => r.id === id)
        if (question) {
          question.isPublished = true
        }
      })
    )
  }

  function onQuestionCreate() {
    setQuestionList(
      produce(draft => {
        draft.push({
          id: 'q' + (draft.length + 1),
          isPublished: false,
          title: '问卷' + (draft.length + 1)
        })
      })
    )
  }

  return (
    <div>
      {questionList.map(r => {
        return (
          <QuestionCard
            key={r.id}
            data={r}
            delete={onQuestionDelete}
            publish={onQuestionPublish}
          ></QuestionCard>
        )
      })}
      <button onClick={onQuestionCreate}>新增问卷</button>
    </div>
  )
}
