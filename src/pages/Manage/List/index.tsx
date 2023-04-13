import { useRequest, useTitle } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getQuestionires } from '@/api/questionnaire/questionnaire'
import styles from '@/pages/Manage/styles/common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { PaginationWrapper } from '@/types'
import { QuestionnaireListItem, QuestionnaireListSearchParameter } from '@/api/questionnaire/questionnaire.types'
import { Empty, Spin, Typography } from 'antd'
import { routeNameMap } from '@/router'
import ListSearch from '@/components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import LoadFeedback from '@/components/LoadFeedback'
import LoadScroll from '@/components/LoadScroll'

const { Title } = Typography

const QuestionList = function () {
  const [urlSearchParameter] = useSearchParams()
  const { loading, runAsync } = useRequest(getQuestionires, {
    manual: true
  })
  const [questions, setQuestions] = useState<PaginationWrapper<QuestionnaireListItem>>({
    total: 0,
    result: []
  })
  useEffect(() => {
    getQuestionList()
  }, [urlSearchParameter])
  function getQuestionList() {
    const searchParameter = {
      page: +(urlSearchParameter.get('page') || 1),
      q: urlSearchParameter.get('q') || ''
    } as QuestionnaireListSearchParameter
    runAsync(searchParameter).then(data => {
      setQuestions(data)
    })
  }
  useTitle(`${_siteTitle} - ${routeNameMap.manageList}`)
  function handleSearch(value: string) {
    if (value === (urlSearchParameter.get('q') || '')) {
      getQuestionList()
    }
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
        <LoadFeedback loading={loading}>
          {questions.total === 0 ? (
            <Empty></Empty>
          ) : (
              questions.result.map(r => {
                return <QuestionCard key={r.id} data={r}></QuestionCard>
              })
          )}
        </LoadFeedback>
      </div>
    </>
  )
}

export default QuestionList
