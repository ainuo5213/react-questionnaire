import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";
import { routePathMap } from "@/router";
import styles from "./index.module.scss";
const { Title, Paragraph } = Typography;
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <Button
          type="primary"
          onClick={() => navigate(routePathMap.manageList)}
        >
          开始使用
        </Button>
      </div>
    </div>
  );
}
