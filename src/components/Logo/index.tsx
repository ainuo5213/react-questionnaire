import React from 'react'
import { Space, Typography } from 'antd'
import styles from './index.module.scss'
import logoImag from './img/logo.png'
import { Link } from 'react-router-dom'
import { routePathMap } from '@/router'

const { Title } = Typography
export default function Logo() {
  return (
    <div className={styles.container}>
      <Link to={routePathMap.home} className={styles.link}>
        <Space>
          <Title>
            <img src={logoImag} alt="logo"></img>
          </Title>
          <Title>ainuo5213的问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
