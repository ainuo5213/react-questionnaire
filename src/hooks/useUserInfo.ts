import { getUserInfo } from "@/api/user/user";
import { TokenKey } from "@/constants";
import { routePathMap } from "@/router";
import { AppDispatch, RootState } from "@/store";
import {
  UserInfoState,
  clearUserInfo,
  setUserInfo,
} from "@/store/reducer/userInfo";
import { useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useUserInfo() {
  const navigate = useNavigate();
  const { userInfo } = useSelector<RootState>((r) => r.user) as UserInfoState;
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { runAsync } = useRequest(getUserInfo, {
    manual: true,
    onSuccess(result) {
      dispatch(setUserInfo(result));
    },
    onFinally() {
      setLoadingUser(false);
    },
  });
  useEffect(() => {
    if (userInfo.userId) {
      setLoadingUser(false);
    } else {
      runAsync();
    }
  }, []);
  return {
    loadingUser,
    userInfo,
  };
}
