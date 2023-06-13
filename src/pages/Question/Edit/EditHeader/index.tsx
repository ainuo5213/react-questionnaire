import React from "react";
import styles from "./index.module.scss";
import { Button, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuestionnaireDetail } from "../../hooks/useQuestionnaire";
import ToolBar from "./ToolBar";
const { Title } = Typography;
export default function EditHeader() {
  const nav = useNavigate();
  useQuestionnaireDetail();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined></LeftOutlined>}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar></ToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
