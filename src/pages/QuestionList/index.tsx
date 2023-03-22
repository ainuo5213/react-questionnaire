import { useRequest } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getQuestionires } from '@/api/questionire'
import styles from './index.module.scss'

const QuestionList = function () {
  const { loading, runAsync } = useRequest(getQuestionires, {
    manual: true
  })
  useEffect(() => {
    runAsync().then(data => {
      console.log(data)
    })
  }, [])

  return (
    <>
      <div>{loading ? 'loading' : 'list'}</div>
    </>
  )
}

export default QuestionList
