import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import styles from "./index.module.scss";
import { UserAddOutlined } from "@ant-design/icons";
import { routePathMap } from "@/router";
import { Link, useNavigate } from "react-router-dom";
import { LoginUserForm } from "@/api/system/user.types";
import { RememberMe, TokenKey } from "@/constants";
import useRemember from "./useRemember";
import { useRequest } from "ahooks";
import { login } from "@/api/user/user";
const { Title } = Typography;
export default function Login() {
  const [formRef] = Form.useForm();
  const navigate = useNavigate();
  const { runAsync: userLogin, loading: logining } = useRequest(login, {
    manual: true,
    onSuccess(token) {
      localStorage.setItem(TokenKey, token);
      message.success("登录成功");
      navigate({
        pathname: routePathMap.manageList,
      });
    },
  });
  const { formData, setFormData } = useRemember<LoginUserForm>(RememberMe, {
    onLoaded(value) {
      formRef.setFieldsValue(value);
    },
  });

  function handleFormFinish(form: LoginUserForm) {
    setFormData(form);
    userLogin({
      username: form.username,
      password: form.password,
    });
  }
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <Space>
            <Title level={2}>
              <UserAddOutlined></UserAddOutlined>
            </Title>
            <Title level={2}>登陆</Title>
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
            initialValues={formData}
            form={formRef}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 6 }}
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit" loading={logining}>
                  注册
                </Button>
                <span>
                  还没有账号？<Link to={routePathMap.register}>去注册</Link>
                </span>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
