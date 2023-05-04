import { TokenKey } from "@/constants";
import { routePathMap } from "@/router";

export function clearCache() {
  localStorage.removeItem(TokenKey);
  location.href = routePathMap.login;
}
