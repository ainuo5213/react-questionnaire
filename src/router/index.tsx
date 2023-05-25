import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import ManageLayout from "@/layout/ManageLayout";
import QuestionLayout from "@/layout/QuestionLayout";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Trash from "@/pages/Manage/Trash";
import QuestionList from "@/pages/Manage/List";
import Star from "@/pages/Manage/Star";
import Edit from "@/pages/Question/Edit";
import Stat from "@/pages/Question/Stat";
import { join } from "path-browserify";

const pathes = [
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        name: "home",
        title: "首页",
        element: <Home></Home>,
      },
      {
        path: "login",
        name: "login",
        title: "登录",
        element: <Login></Login>,
      },
      {
        path: "register",
        name: "register",
        title: "注册",
        element: <Register></Register>,
      },
      {
        path: "manage",
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: "list",
            name: "manageList",
            title: "我的问卷",
            element: <QuestionList></QuestionList>,
          },
          {
            path: "star",
            name: "manageStar",
            title: "星标问卷",
            element: <Star></Star>,
          },
          {
            path: "trash",
            name: "manageTrash",
            title: "回收站问卷",
            element: <Trash></Trash>,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "/questionnaire",
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: "edit/:id",
        name: "questionnaireEdit",
        title: "问卷编辑",
        element: <Edit></Edit>,
      },
      {
        path: "stat/:id",
        name: "questionnaireStat",
        title: "问卷统计",
        element: <Stat></Stat>,
      },
    ],
  },
];

type RoutePathType = {
  name?: string;
  title?: string;
} & RouteObject;

export const router = createBrowserRouter(pathes);

function getPathnames(pathes: RoutePathType[], rootPath = "") {
  const currentPathObject = pathes.reduce(
    (res: Record<string, string>, cur: RoutePathType) => {
      if (!cur.path) {
        return res;
      }
      const _path = cur.path.replaceAll(/:.+/g, "");
      if (cur.children) {
        res = Object.assign(
          res,
          getPathnames(cur.children, join(rootPath, _path))
        );
      } else if (cur.name) {
        res[cur.name] = join(rootPath, _path);
      }
      return res;
    },
    {}
  );

  return currentPathObject as RoutePath<string>;
}

type PathNames =
  | "home"
  | "register"
  | "login"
  | "questionnaireEdit"
  | "questionnaireStat"
  | "manageStar"
  | "manageTrash"
  | "manageList";
type RoutePath<T> = {
  [K in PathNames]: T;
};
function getPathTitles(pathes: RoutePathType[]) {
  const currentPathObject = pathes.reduce(
    (res: Record<string, string>, cur: RoutePathType) => {
      if (cur.children) {
        res = Object.assign(res, getPathTitles(cur.children));
      } else if (cur.name && cur.title) {
        res[cur.name] = cur.title;
      }

      return res;
    },
    {}
  );

  return currentPathObject as RoutePath<string>;
}

export const routePathMap = getPathnames(pathes);
export const routeNameMap = getPathTitles(pathes);
export function isLoginPage(pathname: string) {
  return pathname === routePathMap.login;
}
export function needLogin(pathname: string) {
  return ![
    routePathMap.login,
    routePathMap.home,
    routePathMap.register,
  ].includes(pathname);
}
