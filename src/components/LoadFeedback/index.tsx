import React from 'react'
import { Spin } from 'antd'
import styles from './index.module.scss'

type LoadFeedbackProp = {
  loading: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}
export default function LoadFeedback(prop: LoadFeedbackProp) {
  return (
    <>
      {prop.loading ? (
        <div className={styles.loading}>{prop.fallback || <Spin></Spin>}</div>
      ) : (
        prop.children
      )}
    </>
  )
}
