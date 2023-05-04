import request from "@/utils/request";
import { UserInfo, UserLogin, UserRegister } from "./user.types";
import { TokenKey } from "@/constants";
import { routePathMap } from "@/router";
import { clearCache } from "@/utils/system";

export function login(userLogin: UserLogin) {
  return request<string>({
    url: "/api/user/login",
    method: "post",
    data: userLogin,
  });
}

export function register(userRegister: UserRegister) {
  userRegister.nickname = userRegister.nickname || userRegister.username;
  return request<null>({
    url: "/api/user/register",
    method: "post",
    data: userRegister,
  });
}

export function getUserInfo() {
  return request<UserInfo>({
    url: "/api/user/info",
    method: "get",
  });
}

export function logout() {
  return request<UserInfo>({
    url: "/api/user/logout",
    method: "get",
  }).then(() => {
    clearCache();
  });
}
