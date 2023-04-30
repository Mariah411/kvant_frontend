import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  InputRef,
  Layout,
  Select,
  Table,
  message,
} from "antd";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import MySider from "../components/MySider";
import { Content } from "antd/es/layout/layout";
import EditableTable from "../components/EditableTable";
import { GroupsService } from "../api/GroupsService";
import moment from "moment";
import { FormInstance, useForm } from "antd/es/form/Form";
import { IVisit } from "../models/IVisit";
import { StudentWithVisits } from "../models/IStudent";
import { VisitsService } from "../api/VisitsService";

const VisitsPage: FC = () => {
  const [cols1, setCols1] = useState([] as any[]);
  const [rows1, setRows1] = useState([] as any[]);
  const [cols2, setCols2] = useState([] as any[]);
  const [rows2, setRows2] = useState([] as any[]);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Успешно",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Произошла ошибка, проверьте введенные данные",
    });
  };

  // const [editing, setEditing] = useState(false);

  // const form = useForm();

  const getdate = (v: IVisit) => ({
    title: moment(v.visit_date).format("l"),
    dataIndex: v.visit_date.toLocaleString(),
    key: v.visit_date.toLocaleString(),
  });

  const getstudentVisits = (student: StudentWithVisits) => {
    let visits = {};
    student.visits.forEach((visit) => {
      let v;
      if (visit.id_type === 1) {
        v = visit.is_visited;
      } else v = visit.points || 0;

      visits = { ...visits, [visit.visit_date.toLocaleString()]: v };
    });
    return { key: student.id, FIO: student.FIO, ...visits };
  };

  const getVisitsData = async () => {
    const { data } = await GroupsService.getGroupsVisits(
      1,
      "2021-10-06",
      "2023-12-01"
    );
    //console.log(data);

    let cols1 = data[0].visits.map((v) => ({
      ...getdate(v),
      render: (text: any, record: any) => (
        <Select
          onChange={(value) => updateVisits(record.key, 1, value, v.visit_date)}
          defaultValue={text}
          options={[
            { value: true, label: "п" },
            { value: false, label: "н" },
          ]}
        ></Select>
      ),
    }));

    cols1.unshift({
      title: "",
      dataIndex: "FIO",
      key: "FIO",
      render: (text) => <span>{text}</span>,
    });

    setCols1(cols1);

    let rows1 = data.map((student) => getstudentVisits(student));

    setRows1(rows1);
  };

  const updateVisits = async (
    id_student: number,
    id_type: number,
    is_visited: boolean,
    visit_date: Date,
    points?: number
  ) => {
    // console.log(id_student, id_type, is_visited, visit_date, points);
    const response = await VisitsService.updateVisit({
      id_student,
      id_type,
      is_visited,
      visit_date,
      points,
    }).then((isSuccess) => {
      if (isSuccess) {
        success();
        id_type === 1 ? getVisitsData() : getAttestationData();
      } else error();
    });
  };

  const getAttestationData = async () => {
    const { data } = await GroupsService.getGroupsAttestation(
      1,
      "2021-10-06",
      "2023-12-01"
    );

    let cols2 = data[0].visits.map((v) => ({
      ...getdate(v),
      render: (text: any, record: any) => (
        <InputNumber
          style={{ width: 80 }}
          defaultValue={text}
          onBlur={(e) =>
            updateVisits(record.key, 2, true, v.visit_date, +e.target.value)
          }
        />
      ),
    }));

    cols2.unshift({
      title: "",
      dataIndex: "FIO",
      key: "FIO",
      render: (text) => <span>{text}</span>,
    });
    setCols2(cols2);

    let rows2 = data.map((student) => getstudentVisits(student));
    setRows2(rows2);
    //console.log(rows);
  };

  useEffect(() => {
    getVisitsData();
    getAttestationData();
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "FIO",
      key: "FIO",
      editable: false,
    },
    {
      title: "22.01.2023",
      dataIndex: "20230122",
      key: "20230122",
      editable: true,
    },
    {
      title: "2023-01-23",
      dataIndex: "20230123",
      key: "20230123",
      editable: true,
    },
    {
      title: "2023-01-24",
      dataIndex: "20230124",
      key: "20230124",
      editable: true,
    },
    {
      title: "2023-01-25",
      dataIndex: "20230125",
      key: "20230125",
      editable: true,
    },
  ];

  return (
    <>
      {contextHolder}

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
            <Card
              title="Посещаемость"
              extra={<Button type="primary">Добавить ученика</Button>}
            >
              <Table
                // loading={isLoading}
                dataSource={rows1}
                columns={cols1}
              />
            </Card>

            <Card title="Итоговая аттестация">
              <Table
                // loading={isLoading}
                dataSource={rows2}
                columns={cols2}
              />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default VisitsPage;
