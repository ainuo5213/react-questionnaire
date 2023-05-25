import CopyRight from "@/components/CopyRight";
import Logo from "@/components/Logo";
import Profile from "@/components/Profile";
import { Layout, Spin } from "antd";
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import useUserInfo from "@/hooks/useUserInfo";
import useNavigatePage from "@/hooks/useNavigatePage";
export default function MainLayout() {
  const MemorizedCopyRight = useMemo(() => CopyRight, []);
  const { loadingUser } = useUserInfo();
  useNavigatePage(loadingUser);
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
        {loadingUser ? (
          <div className={styles.spin}>
            <Spin></Spin>
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        <MemorizedCopyRight></MemorizedCopyRight>
      </Layout.Footer>
    </Layout>
  );
}
