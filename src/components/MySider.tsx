import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { FC, useEffect } from "react";

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
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { isAdmin, isEditor, isTeacher } from "../utils";
import { group } from "console";

const MySider: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
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
          key: "students-a",
        },
        {
          icon: React.createElement(TeamOutlined),
          label: "Группы",
          onClick: () => navigate(RouteNames.ALL_GROUPS),
          key: "groups-a",
        },

        {
          icon: React.createElement(UserOutlined),
          label: "Работники",
          onClick: () => navigate(RouteNames.WORKERS),
          key: "workers-a",
        },

        {
          icon: React.createElement(BarChartOutlined),
          label: "Отчеты",
          onClick: () => navigate(RouteNames.MAIN),
          key: "reports-a",
        },
        {
          icon: React.createElement(AppstoreAddOutlined),
          label: "Дополнительно",
          onClick: () => navigate(RouteNames.ADDITIONAL),
          key: "add-a",
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
          key: "students-e",
        },
        {
          icon: React.createElement(TeamOutlined),
          label: "Все группы",
          onClick: () => navigate(RouteNames.ALL_GROUPS),
          key: "groups-e",
        },

        {
          icon: React.createElement(BarChartOutlined),
          label: "Отчеты",
          onClick: () => navigate(RouteNames.MAIN),
          key: "reports-e",
        },

        {
          icon: React.createElement(FileDoneOutlined),
          label: "Все достижения",
          onClick: () => navigate(RouteNames.MAIN),
          key: "achivements-e",
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
          onClick: () => navigate(RouteNames.MAIN),
          key: "groups-t",
        },
        {
          icon: React.createElement(CrownOutlined),
          label: "Мои достижения",
          onClick: () => navigate(RouteNames.MAIN),
          key: "achivements-t",
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
    },
  ];

  let logout_item = [
    {
      icon: React.createElement(LogoutOutlined),
      label: "Выйти",
      danger: true,
      onClick: logout,
    },
  ];

  let items: MenuProps["items"] = [
    ...user_item,
    ...getArr(),
    ...logout_item,
  ].map((el, index) => ({ ...el, key: index + 1 }));

  useEffect(() => {
    // items = [
    //   {
    //     icon: React.createElement(UserOutlined),
    //     label: user.FIO,
    //     onClick: () => navigate(RouteNames.MAIN),
    //   }
    //   getArr(),
    //   {
    //     icon: React.createElement(LogoutOutlined),
    //     label: "Выйти",
    //     danger: true,
    //     onClick: logout,
    //   },
    // ].map((el, index) => ({ ...el, key: index + 1 }));
    // console.log(items);
    // console.log(getArr());
  }, []);

  return (
    <Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu theme="light" mode="inline" items={items} />
    </Sider>
  );
};

export default MySider;
