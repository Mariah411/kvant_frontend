import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputRef,
  Layout,
  Popconfirm,
  Select,
  Space,
  Table,
  message,
} from "antd";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import MySider from "../components/MenuDrawer";
import { Content } from "antd/es/layout/layout";
import EditableTable from "../components/EditableTable";
import { GroupsService } from "../api/GroupsService";
import moment from "moment";
import { FormInstance, useForm } from "antd/es/form/Form";
import { IVisit } from "../models/IVisit";
import { StudentWithVisits } from "../models/IStudent";
import { VisitsService } from "../api/VisitsService";

import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ColumnsType } from "antd/es/table";
import { CloseOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import ContainerWithSider from "../components/ContainerWithSider";
dayjs.extend(customParseFormat);
require("dayjs/locale/ru");

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const defaultDatesValue: RangeValue = [dayjs().add(-1, "y"), dayjs()];

const VisitsPage: FC = () => {
  const location = useLocation();
  const group_id = location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);

  const [cols1, setCols1] = useState([] as any[]);
  const [rows1, setRows1] = useState([] as any[]);
  const [cols2, setCols2] = useState([] as any[]);
  const [rows2, setRows2] = useState([] as any[]);

  const [form1] = useForm();

  const [form2] = useForm();

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

  const [Interval1, setInterval1] = useState<RangeValue>(defaultDatesValue);

  const [Interval2, setInterval2] = useState<RangeValue>(defaultDatesValue);

  const getdate = (v: IVisit) => ({
    title: (
      <>
        {dayjs(v.visit_date).format("DD.MM.YYYY")}{" "}
        <Popconfirm
          title="Вы уверены?"
          onConfirm={async () =>
            await deleteVisitOrAttestation(v.visit_date, v.id_type)
          }
        >
          <Button type="text" size="small" danger icon={<CloseOutlined />} />
        </Popconfirm>
      </>
    ),
    dataIndex: v.visit_date.toLocaleString(),
    key: v.visit_date.toLocaleString(),
    width: 150,
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
    if (Interval1 === null) return;

    const { data } = await GroupsService.getGroupsVisits(
      group_id,
      Interval1[0]?.format("YYYY-MM-DD") || "2020-01-01",
      Interval1[1]?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD")
    );

    let cols1: ColumnsType = data[0].visits.map((v) => ({
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
      width: 200,
      fixed: "left",
      render: (text) => <span>{text}</span>,
    });

    setCols1(cols1);

    let rows1 = data.map((student) => getstudentVisits(student));

    setRows1(rows1);
  };

  const deleteVisitOrAttestation = async (
    visit_date: Date,
    id_type: number
  ) => {
    setIsLoading(true);
    console.log(visit_date);

    const deleteVisit = async () => {
      for (let student of rows1) {
        console.log(student.key);
        if (student.key) {
          let isDeleted = await VisitsService.deleteVisit(
            student.key,
            visit_date
          );
        }
      }
    };

    await deleteVisit()
      .then(() => {
        if (id_type === 1) getVisitsData();
        else getAttestationData();
      })
      .then(() => setIsLoading(false));
  };

  const updateVisits = async (
    id_student: number,
    id_type: number,
    is_visited: boolean,
    visit_date: Date,
    points?: number
  ) => {
    setIsLoading(true);
    // console.log(id_student, id_type, is_visited, visit_date, points);
    const response = await VisitsService.updateVisit({
      id_student,
      id_type,
      is_visited,
      visit_date,
      points,
    })
      .then((isSuccess) => {
        if (isSuccess) {
          success();
          id_type === 1 ? getVisitsData() : getAttestationData();
        } else error();
      })
      .then(() => setIsLoading(false));
  };

  const getAttestationData = async () => {
    if (Interval2 === null) return;
    const { data } = await GroupsService.getGroupsAttestation(
      group_id,
      Interval2[0]?.format("YYYY-MM-DD") || "2020-01-01",
      Interval2[1]?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD")
    );

    let cols2: ColumnsType = data[0].visits.map((v) => ({
      ...getdate(v),
      render: (text: any, record: any) => (
        <InputNumber
          style={{ width: 80 }}
          defaultValue={text}
          onBlur={async (e) =>
            await updateVisits(
              record.key,
              2,
              true,
              v.visit_date,
              +e.target.value
            )
          }
        />
      ),
    }));

    cols2.unshift({
      title: "",
      dataIndex: "FIO",
      key: "FIO",
      width: 150,
      fixed: "left",
      render: (text) => <span>{text}</span>,
    });
    setCols2(cols2);

    let rows2 = data.map((student) => getstudentVisits(student));
    setRows2(rows2);
  };

  const createVisitorAttestation = async (values: any) => {
    const { visit_date, type } = values;
    console.log(type);

    const create = async () => {
      setIsLoading(true);
      try {
        let isSuccess = true;
        for (let student of rows1) {
          if (student.key) {
            let data: IVisit = {
              id_student: student.key,
              id_type: type,
              visit_date: visit_date,
              is_visited: type === 2,
            };
            if (type === 2) data.points = 0;
            let isCreated = await VisitsService.createVisit(data);
            isSuccess = isSuccess && isCreated;
          }
        }

        if (isSuccess) success();
        else error();
      } catch {
        error();
      }
    };

    await create()
      .then(() => {
        if (type === 1) getVisitsData();
        else getAttestationData();
      })
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    getVisitsData().then(() => setIsLoading(false));
  }, [Interval1]);

  useEffect(() => {
    setIsLoading(true);
    getAttestationData().then(() => setIsLoading(false));
  }, [Interval2]);

  return (
    <>
      {contextHolder}

      <ContainerWithSider>
        <Card title="Посещаемость">
          <Space style={{ marginBottom: 10 }}>
            <RangePicker
              defaultValue={Interval1}
              value={Interval1}
              onChange={(value) => setInterval1(value)}
              format={"DD.MM.YYYY"}
            />
            <Button onClick={() => setInterval1(defaultDatesValue)}>
              Сбросить
            </Button>
          </Space>

          <Form
            form={form1}
            onFinish={createVisitorAttestation}
            initialValues={{ type: 1, visit_date: dayjs() }}
          >
            <Space>
              <Form.Item name="visit_date">
                <DatePicker format={"DD.MM.YYYY"} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Добавить занятие
                </Button>
              </Form.Item>
              <Form.Item name="type" />
            </Space>
          </Form>

          <Table
            scroll={{ x: 1500 }}
            loading={isLoading}
            dataSource={rows1}
            columns={cols1}
            pagination={false}
          />
        </Card>

        <Card title="Итоговая аттестация">
          <Space style={{ marginBottom: 10 }}>
            <RangePicker
              defaultValue={Interval2}
              value={Interval2}
              onChange={(value) => setInterval2(value)}
              format={"DD.MM.YYYY"}
            />
            <Button onClick={() => setInterval2(defaultDatesValue)}>
              Сбросить
            </Button>
          </Space>

          <Form
            form={form2}
            onFinish={createVisitorAttestation}
            initialValues={{ type: 2, visit_date: dayjs() }}
          >
            <Space>
              <Form.Item name="visit_date">
                <DatePicker format={"DD.MM.YYYY"} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Добавить результат
                </Button>
              </Form.Item>
              <Form.Item name="type" />
            </Space>
          </Form>
          <Table
            loading={isLoading}
            dataSource={rows2}
            columns={cols2}
            pagination={false}
          />
        </Card>
      </ContainerWithSider>
    </>
  );
};

export default VisitsPage;
