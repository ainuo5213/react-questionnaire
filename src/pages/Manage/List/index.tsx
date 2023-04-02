import { useRequest, useTitle } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getQuestionires } from '@/api/questionire'
import styles from '@/pages/Manage/styles/common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { PaginationWrapper } from '@/types'
import { QuestionListItem } from '@/api/questionire.types'
import { Empty, Spin, Typography } from 'antd'
import { routeNameMap } from '@/router'

const { Title } = Typography

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
  useTitle(`${_siteTitle} - ${routeNameMap.manageList}`)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>{routeNameMap.manageList}</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questions.total === 0 ? (
          loading ? (
            <Spin className={styles.spin}></Spin>
          ) : (
            <Empty />
          )
        ) : (
          questions.result.map(r => {
            return <QuestionCard key={r.id} data={r}></QuestionCard>
          })
        )}
      </div>
      <div className={styles.footer}>load more</div>
    </>
  )
}

export default QuestionList
