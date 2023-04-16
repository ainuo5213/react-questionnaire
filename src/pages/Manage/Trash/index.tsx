import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import styles from '@/pages/Manage/styles/common.module.scss'
import trashStyles from './index.module.scss'
import { PaginationWrapper } from '@/types'
import { QuestionnaireListItem } from '@/api/questionnaire/questionnaire.types'
import { Typography, Table, Tag, Space, Button, Modal } from 'antd'
import { routeNameMap } from '@/router'
import { ColumnsType } from 'antd/es/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useQuestionList } from '../hooks/useQuestionnaire'
import ListSearch from '@/components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { SearchPageNum, SearchPageSize } from '@/constants'

type TableListProp = {
  questions: PaginationWrapper<QuestionnaireListItem>
  loading: boolean
}
const { Title } = Typography
const { confirm } = Modal

function TableList({ questions, loading }: TableListProp) {
  const [urlSearchParameter, setSearchParameter] = useSearchParams()
  const columns: ColumnsType<QuestionnaireListItem> = [
    {
      key: 'title',
      title: '标题',
      dataIndex: 'title'
    },
    {
      key: 'isPublished',
      title: '问卷状态',
      dataIndex: 'isPublished',
      render(isPublished: boolean) {
        return isPublished ? <Tag color="#87d068">已发布</Tag> : <Tag>未发布</Tag>
      }
    },
    {
      key: 'isStar',
      title: '收藏状态',
      dataIndex: 'isStar',
      render(isStar: boolean) {
        return isStar ? <span className={trashStyles.stared}>已收藏</span> : <span>未收藏</span>
      }
    },
    {
      key: 'answerCount',
      title: '答卷数量',
      dataIndex: 'answerCount'
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime'
    }
  ]
  const [selectedRows, setSelectedRows] = useState<QuestionnaireListItem[]>([])
  function handleTableCheckboxChange(
    selectedRowKeys: React.Key[],
    selectedRows: QuestionnaireListItem[]
  ) {
    setSelectedRows(selectedRows)
  }

  function handleBatchDelete() {
    confirm({
      title: '提示',
      content: '删除之后不可找回，确认是否彻底删除问卷？',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk() {
        console.log('已删除')
      }
    })
  }

  function handlePageChange(page: number, pageSize: number) {
    const oldPageSize = Number(urlSearchParameter.get(SearchPageSize))
    urlSearchParameter.set(SearchPageSize, String(pageSize || 10))
    if (pageSize !== oldPageSize) {
      urlSearchParameter.set(SearchPageNum, String(1))
    } else {
      urlSearchParameter.set(SearchPageNum, String(page))
    }
    
    setSearchParameter(urlSearchParameter)
  }

  return (
    <>
      <div className={trashStyles['table-header']}>
        <Space>
          <Button type="primary" disabled={selectedRows.length === 0}>
            恢复
          </Button>
          <Button onClick={handleBatchDelete} danger disabled={selectedRows.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        loading={loading}
        rowSelection={{
          type: 'checkbox',
          onChange: handleTableCheckboxChange
        }}
        pagination={{
          total: questions.total,
          showTotal: (total: number) => `共 ${total} 页`,
          defaultPageSize: 10,
          defaultCurrent: 1,
          pageSize: Number(urlSearchParameter.get(SearchPageSize) || 10),
          current: Number(urlSearchParameter.get(SearchPageNum) || 1),
          onChange: handlePageChange,
        }}
        columns={columns}
        dataSource={questions.result}
        rowKey={q => q.id}
      />
    </>
  )
}

const QuestionList = function () {
  const { loading, data: questions } = useQuestionList({
    isDeleted: true
  })

  useTitle(`${_siteTitle} - ${routeNameMap.manageTrash}`)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>{routeNameMap.manageTrash}</Title>
        </div>
        <div className={styles.right}>
        <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        <TableList questions={questions} loading={loading}></TableList>
      </div>
    </>
  )
}

export default QuestionList
