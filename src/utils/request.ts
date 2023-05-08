import axios, { AxiosRequestConfig } from "axios";
import { Response } from "@/types";
import { message } from "antd";
import { alertError } from "@/utils/log";
import { isMock } from "./is";
import { Codes, TokenKey } from "@/constants";
import { routePathMap } from "@/router";
import { clearCache } from "./system";

const instance = axios.create({
  baseURL: isMock()
    ? import.meta.env.VITE_MOCK_URL!
    : import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem(TokenKey) || "";
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    alertError(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const err = error as Response<null>;
    alertError(err.message);
    if (err.code === Codes.Expired) {
      clearCache();
    }

    return Promise.reject(error);
  }
);

export default async function <T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await instance(config);
    const data = response as unknown as Response<T>;

    if (data.code === 200) {
      return data.data;
    } else {
      message.error(data.message);
      return Promise.reject(data.message);
    }
  } catch (err) {
    alertError(err);
    return Promise.reject(err);
  }
}
