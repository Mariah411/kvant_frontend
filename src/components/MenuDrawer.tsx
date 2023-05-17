import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { FC, useEffect, useState } from "react";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  CrownOutlined,
  EditOutlined,
  ExperimentOutlined,
  SolutionOutlined,
  BookOutlined,
  FileDoneOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useActions, useAppSelector } from "../hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { isAdmin, isEditor, isTeacher } from "../utils";
import { group } from "console";

type Props = {
  selectedKey?: string;
};

const MenuDrawer: FC<Props> = (props: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useActions();

  const adminItems = [
    {
      label: "Панель администратора",
      type: "group",
      children: [
        {
          icon: React.createElement(SolutionOutlined),
          label: "Ученики",
          onClick: () => navigate(RouteNames.STUDENTS),
          key: RouteNames.STUDENTS,
        },
        {
          icon: React.createElement(TeamOutlined),
          label: "Группы",
          onClick: () => navigate(RouteNames.ALL_GROUPS),
          key: RouteNames.ALL_GROUPS,
        },

        {
          icon: React.createElement(UserOutlined),
          label: "Работники",
          onClick: () => navigate(RouteNames.WORKERS),
          key: RouteNames.WORKERS,
        },

        {
          icon: React.createElement(BarChartOutlined),
          label: "Отчеты",
          onClick: () => navigate(RouteNames.REPORTS),
          key: RouteNames.REPORTS,
        },
        {
          icon: React.createElement(AppstoreAddOutlined),
          label: "Дополнительно",
          onClick: () => navigate(RouteNames.ADDITIONAL),
          key: RouteNames.ADDITIONAL,
        },
      ],
    },
  ];

  const editorItems = [
    {
      label: "Методист / редактор",
      type: "group",
      children: [
        {
          icon: React.createElement(SolutionOutlined),
          label: "Все ученики",
          onClick: () => navigate(RouteNames.STUDENTS),
          key: RouteNames.STUDENTS,
        },
        {
          icon: React.createElement(TeamOutlined),
          label: "Все группы",
          onClick: () => navigate(RouteNames.ALL_GROUPS),
          key: RouteNames.ALL_GROUPS,
        },

        {
          icon: React.createElement(BarChartOutlined),
          label: "Отчеты",
          onClick: () => navigate(RouteNames.REPORTS),
          key: RouteNames.REPORTS,
        },

        {
          icon: React.createElement(FileDoneOutlined),
          label: "Все достижения",
          onClick: () => navigate(RouteNames.ALL_ACHIEVEMENTS),
          key: RouteNames.ALL_ACHIEVEMENTS,
        },
      ],
      //onClick: () => navigate(RouteNames.MAIN),
    },
  ];

  const teacherItems = [
    {
      label: "Педагог",
      type: "group",
      children: [
        {
          icon: React.createElement(BookOutlined),
          label: "Мои группы",
          onClick: () => navigate(RouteNames.MY_GROUPS),
          key: RouteNames.MY_GROUPS,
        },
        {
          icon: React.createElement(CrownOutlined),
          label: "Мои достижения",
          onClick: () => navigate(RouteNames.MY_ACHIEVEMENTS + `#${user.id}`),
          key: RouteNames.MY_ACHIEVEMENTS,
        },
      ],
    },
  ];

  const getArr = () => {
    const arr = [];
    if (isAdmin(user)) arr.push(...adminItems);
    if (isEditor(user)) arr.push(...editorItems);
    if (isTeacher(user)) arr.push(...teacherItems);
    return arr;
  };

  let user_item = [
    {
      icon: React.createElement(UserOutlined),
      label: user.FIO,
      onClick: () => navigate(RouteNames.MAIN),
      key: RouteNames.MAIN,
    },
  ];

  let logout_item = [
    {
      icon: React.createElement(LogoutOutlined),
      label: "Выйти",
      danger: true,
      onClick: logout,
      key: "logout",
    },
  ];

  let items: MenuProps["items"] = [
    ...user_item,
    ...getArr(),
    ...logout_item,
  ].map((el, index) => {
    if (index === 0) return { ...el, key: RouteNames.MAIN };

    return { ...el, key: index + 1 };
  });

  useEffect(() => {}, []);

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        items={items}
        selectedKeys={[location.pathname]}
      />
    </>
  );
};

export default MenuDrawer;
