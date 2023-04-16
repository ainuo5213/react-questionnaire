import React from 'react'
import { useTitle } from 'ahooks'
import styles from '@/pages/Manage/styles/common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { Typography, Empty, Spin } from 'antd'
import { routeNameMap } from '@/router'
import { useQuestionList } from '../hooks/useQuestionnaire'
import ListSearch from '@/components/ListSearch'

const { Title } = Typography

const QuestionList = function () {
  const { loading, data: questions } = useQuestionList({
    isStar: true
  })
  useTitle(`${_siteTitle} - ${routeNameMap.manageStar}`)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>{routeNameMap.manageStar}</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
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
      <div className={styles.footer}>pagination</div>
    </div>
  )
}

export default QuestionList
