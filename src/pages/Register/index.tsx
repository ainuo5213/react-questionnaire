import { routeNameMap, routePathMap } from '@/router'
import React from 'react'
import { useTitle } from 'ahooks'
import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { RegisterUserForm } from '@/api/system/user.types'

const { Title } = Typography
export default function Register() {
  useTitle(`${_siteTitle} - ${routeNameMap.register}`)
  function handleFormFinish(value: RegisterUserForm) {
    console.log(value)
  }
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <Space>
            <Title level={2}>
              <UserAddOutlined></UserAddOutlined>
            </Title>
            <Title level={2}>注册新用户</Title>
          </Space>
        </div>
        <div className={styles.content}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={handleFormFinish}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                () => ({
                  validator(_, value: string) {
                    if (!value) {
                      return Promise.reject(new Error('请输入用户名'))
                    } else if (value.length < 4 || value.length > 20) {
                      return Promise.reject(new Error('用户名长度在4到20之间'))
                    } else if (!/^\w+$/i.test(value)) {
                      return Promise.reject(new Error('用户名需由字母、数字、下划线组成'))
                    } else {
                      return Promise.resolve()
                    }
                  }
                })
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: '请输入确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('密码和确认密码不同'))
                  }
                })
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              label="昵称"
              name="nickname"
              rules={[
                { required: true, message: '请输入昵称' },
                { type: 'string', min: 4, max: 20, message: '昵称长度在4到20之间' },
                { pattern: /^\w+$/i, message: '昵称需为字母、数字、下划线组成' }
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <span>
                  已有账号？<Link to={routePathMap.login}>去登录</Link>
                </span>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  )
}
