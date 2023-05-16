import React from "react";
import { FC } from "react";

import { Card, Descriptions, Layout, Menu, Tag, theme } from "antd";
import MySider from "../components/MySider";
import { useAppSelector } from "../hooks/hooks";
import { isTeacher } from "../utils";
import GroupList from "../components/GroupList";

const { Header, Content, Footer, Sider } = Layout;

const MainPage: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Layout hasSider>
      <MySider />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: "95vh",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            <Card>
              <Descriptions layout="vertical" title="Информация о пользователе">
                <Descriptions.Item label="ФИО">{user.FIO}</Descriptions.Item>
                <Descriptions.Item label="E-mail">
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Роли">
                  {user.roles.map((role) => (
                    <Tag color="purple" key={role.id}>
                      {role.description}
                    </Tag>
                  ))}
                </Descriptions.Item>
              </Descriptions>

              {isTeacher(user) && <GroupList />}
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
  //return <div>MainPage</div>;
};

export default MainPage;
