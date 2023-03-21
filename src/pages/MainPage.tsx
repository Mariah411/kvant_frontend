import React from "react";
import { FC } from "react";

import { Layout, Menu, theme } from "antd";
import MySider from "../components/MySider";

const { Header, Content, Footer, Sider } = Layout;

const MainPage: FC = () => {
  return (
    <Layout hasSider>
      <MySider />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            <p>Главная страница</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
  //return <div>MainPage</div>;
};

export default MainPage;
