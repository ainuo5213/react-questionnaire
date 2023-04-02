import { useRequest, useTitle } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getQuestionires } from '@/api/questionire'
import styles from '@/pages/Manage/styles/common.module.scss'
import trashStyles from './index.module.scss'
import { PaginationWrapper } from '@/types'
import { QuestionListItem } from '@/api/questionire.types'
import { Typography, Table, Tag, Space, Button, Modal } from 'antd'
import { routeNameMap } from '@/router'
import { ColumnsType } from 'antd/es/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'

type TableListProp = {
  questions: PaginationWrapper<QuestionListItem>
  loading: boolean
}
const { Title } = Typography
const { confirm } = Modal

function TableList({ questions, loading }: TableListProp) {
  const columns: ColumnsType<QuestionListItem> = [
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
  const [selectedRows, setSelectedRows] = useState<QuestionListItem[]>([])
  function handleTableCheckboxChange(
    selectedRowKeys: React.Key[],
    selectedRows: QuestionListItem[]
  ) {
    setSelectedRows(selectedRows)
    console.log(selectedRows)
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
          defaultCurrent: 1
        }}
        columns={columns}
        dataSource={questions.result}
        rowKey={q => q.id}
      />
    </>
  )
}

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
  useTitle(`${_siteTitle} - ${routeNameMap.manageTrash}`)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>{routeNameMap.manageTrash}</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        <TableList questions={questions} loading={loading}></TableList>
      </div>
    </>
  )
}

export default QuestionList
