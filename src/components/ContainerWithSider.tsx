import { Layout } from "antd";
import React, { FC } from "react";
import MySider from "./MenuDrawer";
import { Content } from "antd/es/layout/layout";
import { type } from "os";
import Sider from "antd/es/layout/Sider";
import MenuDrawer from "./MenuDrawer";

type Props = {
  children: any;
};

const ContainerWithSider: FC<Props> = (props: Props) => {
  return (
    <>
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
    </>
  );
};

export default ContainerWithSider;
