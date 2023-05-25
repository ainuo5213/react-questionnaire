import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoginPage, needLogin, routePathMap } from "@/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserInfoState } from "@/store/reducer/userInfo";

export default function useNavigatePage(loadingUser: boolean) {
  const { userInfo } = useSelector<RootState>((r) => r.user) as UserInfoState;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingUser) {
      return;
    }
    if (userInfo.userId && isLoginPage(location.pathname)) {
      navigate(routePathMap.manageList);
    } else if (!userInfo.userId && needLogin(location.pathname)) {
      navigate(routePathMap.login);
    }
  }, [userInfo.userId, location.pathname, loadingUser]);
}
