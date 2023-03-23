import { Card, Layout, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AchievementService } from "../api/AchievementsService";
import { StudentService } from "../api/StudentService";
import MySider from "../components/MySider";
import { IAchievement, IAchievementForTable } from "../models/IAchievement";
import { IStudent } from "../models/IStudent";

const AchievementsStudentPage: FC = () => {
  const location = useLocation();

  const [student, setStudent] = useState<IStudent>({} as IStudent);
  const [achievements, setAchievements] = useState<IAchievementForTable[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInfo = async () => {
    console.log(location);
    const id = location.pathname.split("/")[3];
    setIsLoading(true);
    try {
      await AchievementService.getStudentAchievements(id).then((response) => {
        //setAchievements(response.data);
        const new_data = response.data.map((el) => {
          let new_el = {
            ...el,
            students: el.students?.map((s) => s.FIO).toString(),
            workers: el.workers?.map((w) => w.FIO).toString(),
            rating: el.rating?.description,
            key: el.id,
          };
          return new_el;
        });
        setAchievements(new_data);
        setIsLoading(false);
      });
      await StudentService.getStudentById(id).then((response) =>
        setStudent(response.data)
      );
    } catch {
      setIsLoading(false);
      console.log("Ошибка");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const columns = [
    {
      title: "Мероприятие",
      dataIndex: "name",
      key: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: "10%",
      editable: true,
    },
    {
      title: "Диплом",
      dataIndex: "diplom",
      key: "diplom",
      width: "10%",
      editable: true,
    },
    {
      title: "Место",
      dataIndex: "place",
      key: "place",
      width: "10%",
      editable: true,
    },
    {
      title: "Уровень",
      dataIndex: "rating",
      key: "rating",
      width: "10%",
      editable: true,
    },
    {
      title: "участники",
      dataIndex: "students",
      key: "students",
      width: "10%",
      editable: true,
    },
    {
      title: "Педагоги",
      dataIndex: "workers",
      key: "workers",
      width: "10%",
      editable: true,
    },
  ];

  return (
    <Layout hasSider>
      <MySider />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Card title={`${student.FIO}  /  Достижения`}>
            <Table
              dataSource={achievements}
              columns={columns}
              loading={isLoading}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AchievementsStudentPage;
