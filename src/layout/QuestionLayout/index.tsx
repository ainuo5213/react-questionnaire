import useNavigatePage from "@/hooks/useNavigatePage";
import useUserInfo from "@/hooks/useUserInfo";
import { Spin } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
export default function QuestionLayout() {
  const { loadingUser } = useUserInfo();
  useNavigatePage(loadingUser);
  return <div>{loadingUser ? <Spin></Spin> : <Outlet></Outlet>}</div>;
}
