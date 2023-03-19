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
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const items1: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const items: MenuProps["items"] = [
  {
    key: 1,
    icon: React.createElement(UserOutlined),
    label: "Петров петр Петрович",
  },
  { key: 2, icon: React.createElement(TeamOutlined), label: "Мои группы" },
  { key: 3, icon: React.createElement(BarChartOutlined), label: "Отчеты" },
];

const MySider: FC = () => {
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
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Sider>
  );
};

export default MySider;
