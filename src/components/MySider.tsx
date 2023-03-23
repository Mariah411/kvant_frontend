import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { FC } from "react";

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
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useActions, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";

const MySider: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { logout } = useActions();

  const items: MenuProps["items"] = [
    {
      key: 1,
      icon: React.createElement(UserOutlined),
      label: user.FIO,
      onClick: () => navigate(RouteNames.MAIN),
    },
    { key: 2, icon: React.createElement(TeamOutlined), label: "Мои группы" },
    {
      key: 3,
      icon: React.createElement(TeamOutlined),
      label: "Все ученики",
      onClick: () => navigate(RouteNames.STUDENTS),
    },

    {
      key: 4,
      icon: React.createElement(TeamOutlined),
      label: "Все группы",
      onClick: () => navigate(RouteNames.ALL_GROUPS),
    },

    { key: 5, icon: React.createElement(BarChartOutlined), label: "Отчеты" },
    {
      key: 6,
      icon: React.createElement(LogoutOutlined),
      label: "Выйти",
      danger: true,
      onClick: logout,
    },
  ];

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
