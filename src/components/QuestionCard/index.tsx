import React, { useState } from 'react'
import { Button, Divider, Space, Tag, Popconfirm, notification, Modal, message } from 'antd'
import { QuestionnaireListItem } from '@/api/questionnaire/questionnaire.types'
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
import { useRequest } from 'ahooks'
import { copyQuestionaire, updateQuestionaire } from '@/api/questionnaire/questionnaire'
type questionnaireCardProp = {
  data: QuestionnaireListItem
}

const { confirm } = Modal
const questionnaireCard = function ({ data }: questionnaireCardProp) {
  const navigate = useNavigate()
  const [isStarState, setIsStarState] = useState(data.isStar)
  const { runAsync: updateQuestionaireAsync, loading: updatingQuestionaire } = useRequest(updateQuestionaire, {
    manual: true,
    onSuccess() {
      setIsStarState(!isStarState)
      message.success({
        content: `${!isStarState ? '收藏' : '取消收藏'}问卷成功`
      })
    }
  })
  const { runAsync: copyQuestionaireAsync, loading: copyingQuestionaire } = useRequest(copyQuestionaire, {
    manual: true,
    onSuccess(id) {
      message.success({
        content: '复制问卷成功'
      })
      navigate({
        pathname: join(routePathMap.questionnaireEdit, id)
      })
    }
  })
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { runAsync: deleteQuestionaireAsync, loading: deletingQuestionaire } = useRequest(updateQuestionaire, {
    manual: true,
    onSuccess() {
      setIsDeletedState(true)
      message.success({
        content: '删除问卷成功'
      })
    }
  })
  function onCopyConfirm() {
    copyQuestionaireAsync(data.id)
    
  }
  function handleUpdateStart() {
    updateQuestionaireAsync(data.id, {
      isStar: !isStarState
    })
  }
  function handleDelete() {
    confirm({
      type: 'warning',
      title: '提示',
      content: '确定删除该问卷吗？',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk() {
        deleteQuestionaireAsync(data.id, {
          isDeleted: true
        })
      }
    })
  }
  if (isDeletedState) {
    return null
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={
              data.isPublished
                ? join(routePathMap.questionnaireStat, data.id)
                : join(routePathMap.questionnaireEdit, data.id)
            }
          >
            <Space>
              {isStarState ? <StarOutlined className={styles.stared}></StarOutlined> : null}
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
                  pathname: join(routePathMap.questionnaireEdit, data.id)
                })
              }
              size="small"
              type="text"
              icon={<EditOutlined />}
            ></Button>
            <Button
              onClick={() =>
                navigate({
                  pathname: join(routePathMap.questionnaireStat, String(data.id))
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
                [styles.stared]: isStarState
              })}
              icon={isStarState ? <StarFilled></StarFilled> : <StarOutlined></StarOutlined>}
              size="small"
              onClick={handleUpdateStart}
              loading={updatingQuestionaire}
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
                loading={copyingQuestionaire}
              ></Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined></DeleteOutlined>}
              size="small"
              title="删除"
              onClick={handleDelete}
              loading={deletingQuestionaire}
            ></Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default questionnaireCard
