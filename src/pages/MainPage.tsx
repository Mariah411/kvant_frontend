import React from "react";
import { FC } from "react";

import { Card, Descriptions, Layout, Menu, Tag, theme } from "antd";
import MySider from "../components/MenuDrawer";
import { useAppSelector } from "../hooks/hooks";
import { isTeacher } from "../utils";
import GroupList from "../components/GroupList";
import ContainerWithSider from "../components/ContainerWithSider";

const { Header, Content, Footer, Sider } = Layout;

const MainPage: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <ContainerWithSider>
      <Card>
        <Descriptions layout="vertical" title="Информация о пользователе">
          <Descriptions.Item label="ФИО">{user.FIO}</Descriptions.Item>
          <Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
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
    </ContainerWithSider>
  );
  //return <div>MainPage</div>;
};

export default MainPage;
