import { Button, Card, Layout, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupsService } from "../api/GroupsService";
import MySider from "../components/MySider";
import { GroupsAllInfo } from "../models/IGroup";
import { IStudent, StudentsForTable } from "../models/IStudent";

const GroupInfoPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [group, setGroup] = useState<GroupsAllInfo>({} as GroupsAllInfo);
  const [dataSource, setDataSourse] = useState<StudentsForTable[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInfo = async () => {
    console.log(location);
    const id = location.pathname.split("/")[2];
    setIsLoading(true);
    try {
      await GroupsService.getGroupInfo(id).then((response) => {
        setGroup(response.data);
        const new_data = response.data.students.map((el) => {
          let new_el = { ...el, key: el.id };
          return new_el;
        });
        setDataSourse(new_data);
        setIsLoading(false);
      });
    } catch {
      setIsLoading(false);
      console.log("Ошибка");
    }
  };

  const infoClick = (id: number | string) => {
    console.log(id);
    navigate(`/ahievements/student/${id}`);
  };

  const columns = [
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
      editable: true,
    },
    {
      title: "Документ",
      dataIndex: "num_doc",
      key: "num_doc",
      editable: true,
    },
    {
      title: "Дата рождения",
      dataIndex: "b_date",
      key: "b_date",
      editable: true,
    },
    {
      title: "Год обучения",
      dataIndex: "year_study",
      key: "year_study",
      editable: true,
    },
    {
      title: "Примечания",
      dataIndex: "note",
      key: "note",
      editable: true,
    },
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: any, record: StudentsForTable) => {
        return (
          <Button onClick={() => infoClick(record.key)}>Достижения</Button>
        );
      },
    },
  ];

  useEffect(() => {
    getInfo();
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
          <Card title={`${group.name} / Список учеников`}>
            <Table
              dataSource={dataSource}
              columns={columns}
              loading={isLoading}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default GroupInfoPage;
