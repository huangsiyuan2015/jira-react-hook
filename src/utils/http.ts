import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// 统一封装 fetch 请求
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }

  return fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ msg: "请重新登录" });
    }

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// 向 fetch 请求中统一添加 token
export const useHttp = () => {
  const { user } = useAuth();

  // return (...[endpoint, config]: Parameters<typeof http>) =>
  //   http(endpoint, { ...config, token: user?.token });

  return useCallback(
    (endpoint: string, config: Config = {}) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
