import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'
export default function ManageLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>MainLyout Left</p>
        <button>创建问卷</button>
        <br />
        <button>我的问卷</button>
        <br />
        <button>星标问卷</button>
        <br />
        <button>回收站问卷</button>
        <br />
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
