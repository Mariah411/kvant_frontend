import { Button, Card, DatePicker, Layout, Space, Table } from "antd";
import React, { FC, useEffect, useState } from "react";
import MySider from "../MySider";
import { Content } from "antd/es/layout/layout";
import { Group } from "antd/es/avatar";
import { group } from "console";
import { GroupForTable, IGroup } from "../../models/IGroup";
import { GroupsService } from "../../api/GroupsService";

import dayjs from "dayjs";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const defaultDatesValue: RangeValue = [dayjs().add(-1, "y"), dayjs()];

const Attestation: FC = () => {
  const [data, setData] = useState([] as IGroup[]);
  const [group_id, set_group_id] = useState<string | number>("");
  const [ratingData, setRatingData] = useState([] as any);
  const [loading, setIsLoading] = useState(false);

  const [Interval, setInterval] = useState<RangeValue>([
    dayjs().add(-1, "y"),
    dayjs(),
  ]);
  const infoClick = (key: any) => {
    set_group_id(key);
  };

  const ratingColumns = [
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
    },
    {
      title: "Посещаемость, %",
      dataIndex: "attendance",
      key: "attendance",
    },
    {
      title: "Достижения, баллы",
      dataIndex: "achievements",
      key: "achievements",
    },
    {
      title: "Аттестация",
      dataIndex: "attestation",
      key: "attestation",
    },
    {
      title: "Итого",
      dataIndex: "total_points",
      key: "total_points",
    },
  ];

  const columns = [
    {
      title: "Группа",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "info",
      key: "info",
      render: (_: any, record: any) => {
        return (
          <>
            <Button onClick={() => infoClick(record.key)}>Результаты</Button>
          </>
        );
      },
    },
  ];

  const getGroups = async () => {
    const { data } = await GroupsService.getGroups();
    const new_data = data.map((el) => ({ ...el, key: el.id }));
    setData(new_data);
  };

  const getRating = async () => {
    if (!Interval) return;
    const start_date = (Interval[0] || dayjs().add(-1, "y")).format(
      "YYYY-MM-DD"
    );

    const end_date = (Interval[1] || dayjs()).format("YYYY-MM-DD");

    const { data } = await GroupsService.getGroupRating(
      group_id,
      start_date,
      end_date
    );
    const new_data = data.map((el) => ({ ...el, key: el.id }));
    setRatingData(new_data);
  };

  useEffect(() => {
    setIsLoading(true);
    getGroups().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRating().then(() => setIsLoading(false));
  }, [group_id, Interval]);
  return (
    <Card>
      <Space style={{ marginBottom: 10 }}>
        <RangePicker
          defaultValue={Interval}
          value={Interval}
          onChange={(value) => setInterval(value)}
          format={"DD.MM.YYYY"}
        />
        <Button onClick={() => setInterval(defaultDatesValue)}>Сбросить</Button>
      </Space>

      <Table loading={loading} dataSource={data} columns={columns} />
      {group_id && (
        <>
          <h3> {data.find((el) => el.id === group_id)?.name || ""}</h3>
          <Table
            loading={loading}
            dataSource={ratingData}
            columns={ratingColumns}
          />
        </>
      )}
    </Card>
  );
};

export default Attestation;
