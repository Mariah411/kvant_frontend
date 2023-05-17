import { Button, Drawer, Layout, Space } from "antd";
import React, { FC, useState } from "react";
import MySider from "./MenuDrawer";
import { Content } from "antd/es/layout/layout";
import { type } from "os";
import Sider from "antd/es/layout/Sider";
import MenuDrawer from "./MenuDrawer";
import "../App.css";

import { BarsOutlined } from "@ant-design/icons";

type Props = {
  children: any;
};

const ContainerWithSider: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="myLayoutSider">
        <Layout hasSider>
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
            <div className="logoContainer" />
            <MenuDrawer />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
                minHeight: "95vh",
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>{" "}
      </div>

      <div className="myLayoutMobile">
        <Space className="navContainer">
          <Button type="primary" onClick={showDrawer}>
            <BarsOutlined />
          </Button>
          <div className="logoContainer" />
        </Space>
        <Layout className="site-layout" style={{ maxWidth: "100vw" }}>
          <Drawer placement="left" onClose={onClose} open={open}>
            <MenuDrawer />
          </Drawer>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              minHeight: "95vh",
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default ContainerWithSider;
