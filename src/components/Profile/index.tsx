import React from "react";
import { routePathMap } from "@/router";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { UserInfoState, clearUserInfo } from "@/store/reducer/userInfo";
import { TokenKey } from "@/constants";

export default function Profile() {
  const { userInfo } = useSelector<RootState>((r) => r.user) as UserInfoState;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  function handleLogout() {
    localStorage.removeItem(TokenKey);
    message.success("退出登录成功");
    navigate({
      pathname: routePathMap.login,
    });
    dispatch(clearUserInfo());
  }
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "退出登录",
      onClick: handleLogout,
    },
  ];
  if (userInfo) {
    return (
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <span style={{ color: "#e8e8e8", cursor: "pointer" }}>
          <UserOutlined></UserOutlined>
          {userInfo.nickname}
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
