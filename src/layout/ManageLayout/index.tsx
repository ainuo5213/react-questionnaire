import { Button, Col, Divider, Row, Space } from 'antd'
import React, { useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { routePathMap } from '@/router'
import { createQuestionire } from '@/api/questionnaire/questionnaire'

export default function ManageLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const useType = useCallback(
    (currentPathname: string) => {
      return pathname.startsWith(currentPathname) ? 'default' : 'text'
    },
    [pathname]
  )

  async function handleCreateQuestion() {
    const id = await createQuestionire()
    if (id) {
      navigate({
        pathname: routePathMap.questionnaireEdit
      })
    }
  }

  return (
    <Row className={styles.container}>
      <Col span={4}>
        <Space direction="vertical">
          <Button onClick={handleCreateQuestion} type="primary" size="large" icon={<PlusOutlined></PlusOutlined>}>
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
      <Col span={20}>
        <Outlet></Outlet>
      </Col>
    </Row>
  )
}
