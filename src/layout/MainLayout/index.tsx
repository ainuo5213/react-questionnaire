import CopyRight from '@/components/CopyRight'
import Logo from '@/components/Logo'
import Profile from '@/components/Profile'
import { Layout } from 'antd'
import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'
export default function MainLayout() {
  const MemorizedCopyRight = useMemo(() => CopyRight, [])
  return (
    <Layout>
      <Layout.Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <Profile></Profile>
        </div>
      </Layout.Header>
      <Layout.Content className={styles.main}>
        <Outlet></Outlet>
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        <MemorizedCopyRight></MemorizedCopyRight>
      </Layout.Footer>
    </Layout>
  )
}
