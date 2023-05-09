import { Card, Layout, Table, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { Children, FC, useEffect, useState } from "react";
import MySider from "../components/MySider";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ReportService } from "../api/ReportService";
import { Ikvantum } from "../models/IKvamtum";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportPage: FC = () => {
  const [labels, setlabels] = useState([] as string[]);
  const [dataSet, setDataSet] = useState([] as any[]);

  const [tableData, setData] = useState([] as any[]);

  const [selectedTab, setSelectedTab] = useState("0");

  const cols = [
    [
      {
        title: "Группа",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Процент посещаемости, %",
        dataIndex: "attendance",
        key: "attendance",
      },
    ],
    [
      {
        title: "ФИО педагога",
        dataIndex: "FIO",
        key: "FIO",
      },
      {
        title: "Процент посещаемости, %",
        dataIndex: "attendance",
        key: "attendance",
      },
    ],
    [
      {
        title: "Квантум",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Процент посещаемости, %",
        dataIndex: "attendance",
        key: "attendance",
      },
    ],
  ];

  const getDataForTabs = async (key: string) => {
    switch (key) {
      case "0":
        return await ReportService.getGroupsAttendance(
          "2022-05-07",
          "2023-05-07"
        );

      case "1":
        return await ReportService.getTeachersAttendance(
          "2022-05-07",
          "2023-05-07"
        );
      case "2":
        return await ReportService.getKvantumsAttendance(
          "2022-05-07",
          "2023-05-07"
        );
    }
  };

  const getData = async () => {
    const { data }: any = await getDataForTabs(selectedTab);

    const labels = data.map((el: any) =>
      selectedTab === "1" ? el.FIO : el.name
    );
    setlabels(labels);

    setData(data.map((el: { id: any }) => ({ ...el, key: el.id })));

    const dataset = data.map((el: { attendance: any }) => el.attendance);
    setDataSet(dataset);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedTab]);

  const onTabChange = (key: string) => {
    setSelectedTab(key);
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Посещаемость",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "%",
        data: dataSet,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const items = [
    {
      label: "Группы",
      key: "0",
    },
    {
      label: "Педагоги",
      key: "1",
    },
    {
      label: "Квантумы",
      key: "2",
    },
  ].map((el) => ({
    ...el,
    children: (
      <>
        <Bar options={options} data={data} />
        <Table dataSource={tableData} columns={cols[+el.key]} />
      </>
    ),
  }));

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
          <Card title="Посещаемость">
            <Tabs
              defaultActiveKey={selectedTab}
              items={items}
              onChange={onTabChange}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReportPage;
