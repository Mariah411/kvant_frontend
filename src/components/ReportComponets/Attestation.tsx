import { Button, Card, Layout, Table } from "antd";
import React, { FC, useEffect, useState } from "react";
import MySider from "../MySider";
import { Content } from "antd/es/layout/layout";
import { Group } from "antd/es/avatar";
import { group } from "console";
import { GroupForTable, IGroup } from "../../models/IGroup";
import { GroupsService } from "../../api/GroupsService";

const Attestation: FC = () => {
  const [data, setData] = useState([] as IGroup[]);
  const [group_id, set_group_id] = useState<string | number>("");
  const [ratingData, setRatingData] = useState([] as any);
  const [loading, setIsLoading] = useState(false);

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
    const startDate = new Date("2021-05-07");
    const endDate = new Date("2023-05-25");
    const { data } = await GroupsService.getGroupRating(
      group_id,
      startDate,
      endDate
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
  }, [group_id]);
  return (
    <Card>
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
