import { Button, Col, Divider, Row, Space } from 'antd'
import React, { useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { routePathMap } from '@/router'
import { createQuestionaire } from '@/api/questionnaire/questionnaire'
import { useRequest } from 'ahooks'
import { join } from 'path-browserify'

export default function ManageLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { loading, runAsync } = useRequest(createQuestionaire, {
    manual: true
  })
  const useType = useCallback(
    (currentPathname: string) => {
      return pathname.startsWith(currentPathname) ? 'default' : 'text'
    },
    [pathname]
  )

  async function handleCreateQuestion() {
    const id = await runAsync()
    if (id) {
      navigate({
        pathname: join(routePathMap.questionnaireEdit, id),
      })
    }
  }

  return (
    <Row className={styles.container}>
      <Col span={4} className={styles.left}>
        <Space direction="vertical">
          <Button loading={loading} onClick={handleCreateQuestion} type="primary" size="large" icon={<PlusOutlined></PlusOutlined>}>
            创建问卷
          </Button>
          <Divider></Divider>
          <Button
            onClick={() => navigate(routePathMap.manageList)}
            type={useType(routePathMap.manageList)}
            size="large"
            icon={<BarsOutlined></BarsOutlined>}
          >
            我的问卷
          </Button>
          <Button
            onClick={() => navigate(routePathMap.manageStar)}
            type={useType(routePathMap.manageStar)}
            size="large"
            icon={<StarOutlined></StarOutlined>}
          >
            星标问卷
          </Button>
          <Button
            onClick={() => navigate(routePathMap.manageTrash)}
            type={useType(routePathMap.manageTrash)}
            size="large"
            icon={<DeleteOutlined></DeleteOutlined>}
          >
            回收站问卷
          </Button>
        </Space>
      </Col>
      <Col span={20} className={styles.right}>
        <Outlet></Outlet>
      </Col>
    </Row>
  )
}
