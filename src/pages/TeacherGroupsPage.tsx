import { Button, Card, Layout, Space, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import MySider from "../components/MySider";
import { Content } from "antd/es/layout/layout";
import { IGroup } from "../models/IGroup";
import { useActions, useAppSelector } from "../hooks/hooks";
import { GroupsService } from "../api/GroupsService";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const TeacherGroupsPage: FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await GroupsService.getWorkerGroups(user.id);
    setGroups(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
          <Title level={3}>Мои группы</Title>
          <Space>
            {groups.map((group) => (
              <Card title={group.name} style={{ width: 350 }} key={group.id}>
                <p>Возраст: {group.age} лет</p>
                <p>Расписание: {group.shedule} </p>
                <Space>
                  <Button onClick={() => navigate(`/group/${group.id}`)}>
                    Список учеников
                  </Button>
                  <Button onClick={() => navigate(`/group/${group.id}/visits`)}>
                    Эл. журнал
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherGroupsPage;
