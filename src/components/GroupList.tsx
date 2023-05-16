import { Button, Card, Empty, Space } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { IGroup } from "../models/IGroup";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { GroupsService } from "../api/GroupsService";

const GroupList = () => {
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
    <>
      <Title level={5}>Мои группы</Title>
      <Space>
        {!groups.length && <Empty />}
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
    </>
  );
};

export default GroupList;
