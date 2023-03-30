import { useRequest } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getQuestionires } from '@/api/questionire'
import styles from './index.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { PaginationWrapper } from '@/types'
import { QuestionListItem } from '@/api/questionire.types'

const QuestionList = function () {
  const { loading, runAsync } = useRequest(getQuestionires, {
    manual: true
  })
  const [questions, setQuestions] = useState<PaginationWrapper<QuestionListItem>>({
    total: 0,
    result: []
  })
  useEffect(() => {
    runAsync().then(data => {
      setQuestions(data)
    })
  }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {loading
          ? 'loading'
          : questions.result.map(r => {
              return <QuestionCard key={r.id} data={r}></QuestionCard>
            })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  )
}

export default QuestionList
