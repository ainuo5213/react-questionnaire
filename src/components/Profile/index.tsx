import { getUserInfo } from "@/api/user/user";
import { TokenKey } from "@/constants";
import { routePathMap } from "@/router";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Dropdown, MenuProps, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { data } = useRequest(getUserInfo, {
    onSuccess(data) {
      // TODO: 存储用户信息
      console.log(data);
    },
  });
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem(TokenKey);
    message.success("退出登录成功");
    navigate({
      pathname: routePathMap.login,
    });
  }
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "退出登录",
      onClick: handleLogout,
    },
  ];
  if (data) {
    return (
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <span style={{ color: "#e8e8e8" }}>
          <UserOutlined></UserOutlined>
          {data.nickname}
        </span>
      </Dropdown>
    );
  }
  return (
    <div>
      <Link to={routePathMap.login}>登录</Link>
    </div>
  );
}
