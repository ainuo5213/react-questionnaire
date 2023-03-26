import { QuestionListItem } from '@/api/questionire.types'
import React from 'react'
import styles from './index.module.scss'

type QuestionCardProp = {
  data: QuestionListItem
}

const QuestionCard = function ({ data }: QuestionCardProp) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href="#">{data.title}</a>
        </div>
        <div className={styles.right}>
          {data.isPublished ? (
            <span className={styles.published}>已发布</span>
          ) : (
            <span className={styles.unpublish}>未发布</span>
          )}
          &nbsp;
          <span>答卷：{data.answerCount}</span>&nbsp;
          <span>{data.createTime}</span>
        </div>
      </div>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <button>编辑问卷</button>
          <button>数据统计</button>
        </div>
        <div className={styles.right}>
          <button>标星</button>
          <button>复制</button>
          <button>删除</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
