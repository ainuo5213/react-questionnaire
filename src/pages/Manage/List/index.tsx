import { useRequest, useTitle } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getQuestionires } from '@/api/questionire'
import styles from '@/pages/Manage/styles/common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { PaginationWrapper } from '@/types'
import { QuestionListItem, QuestionListSearchParameter } from '@/api/questionire.types'
import { Empty, Spin, Typography } from 'antd'
import { routeNameMap } from '@/router'
import ListSearch from '@/components/ListSearch'
import { useSearchParams } from 'react-router-dom'

const { Title } = Typography

const QuestionList = function () {
  const [urlSearchParameter] = useSearchParams()
  const { loading, runAsync } = useRequest(getQuestionires, {
    manual: true
  })
  const [questions, setQuestions] = useState<PaginationWrapper<QuestionListItem>>({
    total: 0,
    result: []
  })
  useEffect(() => {
    const searchParameter = {
      page: +(urlSearchParameter.get('page') || 1),
      q: urlSearchParameter.get('q') || ''
    } as QuestionListSearchParameter
    runAsync(searchParameter).then(data => {
      setQuestions(data)
    })
  }, [urlSearchParameter])
  useTitle(`${_siteTitle} - ${routeNameMap.manageList}`)
  function handleSearch(value: string) {
    console.log('searching data....', value)
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>{routeNameMap.manageList}</Title>
        </div>
        <div className={styles.right}>
          <ListSearch onSearch={handleSearch}></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading ? (
          <Spin className={styles.spin}></Spin>
        ) : questions.total === 0 ? (
          <Empty></Empty>
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
