import React from 'react'
import { Button, Divider, Space, Tag, Popconfirm, notification, Modal } from 'antd'
import { QuestionListItem } from '@/api/questionire.types'
import styles from './index.module.scss'
import {
  EditOutlined,
  BarChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  StarFilled,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { routePathMap } from '@/router'
import { join } from 'path-browserify'
import classNames from 'classnames'
type QuestionCardProp = {
  data: QuestionListItem
}

const { confirm } = Modal
const QuestionCard = function ({ data }: QuestionCardProp) {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  function onCopyConfirm() {
    api.success({
      message: '复制问卷',
      description: '复制该问卷成功',
      duration: 2
    })
  }
  function handleDelete() {
    confirm({
      type: 'warning',
      title: '提示',
      content: '确定删除该问卷吗？',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk() {
        console.log('删除')
      }
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={
              data.isPublished
                ? join(routePathMap.questionStat, String(data.id))
                : join(routePathMap.questionEdit, String(data.id))
            }
          >
            <Space>
              {data.isStar ? <StarOutlined className={styles.stared}></StarOutlined> : null}
              {data.title}
            </Space>
          </Link>
        </div>
        <Space className={styles.right}>
          {data.isPublished ? <Tag color="#87d068">已发布</Tag> : <Tag>未发布</Tag>}
          <span>答卷：{data.answerCount}</span>
          <span>{data.createTime}</span>
        </Space>
      </div>
      <Divider></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              onClick={() =>
                navigate({
                  pathname: join(routePathMap.questionEdit, String(data.id))
                })
              }
              size="small"
              type="text"
              icon={<EditOutlined />}
            ></Button>
            <Button
              onClick={() =>
                navigate({
                  pathname: join(routePathMap.questionStat, String(data.id))
                })
              }
              size="small"
              type="text"
              icon={<BarChartOutlined />}
            ></Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              className={classNames({
                [styles.stared]: data.isStar
              })}
              icon={data.isStar ? <StarFilled></StarFilled> : <StarOutlined></StarOutlined>}
              size="small"
            ></Button>
            <Popconfirm
              title="提示"
              description="确定复制该问卷吗？"
              onConfirm={onCopyConfirm}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="text"
                icon={<CopyOutlined></CopyOutlined>}
                size="small"
                title="复制"
              ></Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined></DeleteOutlined>}
              size="small"
              title="删除"
              onClick={handleDelete}
            ></Button>
          </Space>
        </div>
      </div>
      {contextHolder}
    </div>
  )
}

export default QuestionCard
