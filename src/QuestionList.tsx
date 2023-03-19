import { produce } from 'immer'
import React, { useEffect, useRef, useState } from 'react'
import QuestionCard from './components/QuestionCard'

export default function QuestionList() {
  const [questionList, setQuestionList] = useState<
    Array<{
      id: string
      title: string
      isPublished: boolean
    }>
  >([])
  useEffect(() => {
    console.log('问卷卡片加载了')
    setTimeout(() => {
      setQuestionList(
        produce(draft => {
          return [
            { id: 'q1', title: '问卷1', isPublished: false },
            { id: 'q2', title: '问卷2', isPublished: true },
            { id: 'q3', title: '问卷3', isPublished: false },
            { id: 'q4', title: '问卷4', isPublished: true }
          ]
        })
      )
    })
    return () => {
      console.log('问卷卡片卸载了')
    }
  }, [])
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

  useEffect(() => {
    console.log('正在执行ajax请求')
  }, [])

  useEffect(() => {
    console.log('问卷列表变化了')
  }, [questionList])

  const userRef = useRef('孙一个')
  function onChangeName() {
    userRef.current = '孙永刚'
    console.log(userRef.current)
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
      <div>
        <span>{userRef.current}</span>
        <button onClick={onChangeName}>change name</button>
      </div>
    </div>
  )
}
