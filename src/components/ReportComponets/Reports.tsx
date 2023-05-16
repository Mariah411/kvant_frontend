import { Button, Card, DatePicker, Layout, Space, Table, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { Children, FC, useEffect, useState } from "react";
import MySider from "../MySider";

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
import { ReportService } from "../../api/ReportService";
import { Ikvantum } from "../../models/IKvamtum";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const columns = [
  {
    title: "Группа",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ФИО педагога",
    dataIndex: "FIO",
    key: "FIO",
  },
  {
    title: "Квантум",
    dataIndex: "name",
    key: "name",
  },
];

type Props = {
  type_report: number;
};

const defaultDatesValue: RangeValue = [dayjs().add(-1, "y"), dayjs()];
const Reports: FC<Props> = (props: Props) => {
  const [Interval, setInterval] = useState<RangeValue>(defaultDatesValue);

  const { type_report } = props;
  const [labels, setlabels] = useState([] as string[]);
  const [dataSet, setDataSet] = useState([] as any[]);

  const [tableData, setData] = useState([] as any[]);

  const [selectedTab, setSelectedTab] = useState("0");
  const templatesCol = [
    {
      title: "Процент посещаемости, %",
      dataIndex: "attendance",
      key: "attendance",
    },
    {
      title: "Сумма баллов за все достижения",
      dataIndex: "achievements",
      key: "achievements",
    },
  ];

  const graphicSettings = [
    {
      title: "Посещаемость",
      label: "%",
      getdata: function (data: any) {
        return data.map((el: { attendance: any }) => el.attendance);
      },
    },
    {
      title: "Сумма баллов",
      label: "Баллы",
      getdata: function (data: any) {
        return data.map((el: { achievements: any }) => el.achievements);
      },
    },
  ];

  const cols = columns.map((col) => [
    { ...col },
    {
      ...templatesCol[type_report],
    },
  ]);

  const getDataForTabs = async (key: string) => {
    if (!Interval) return;
    const start_date = (Interval[0] || dayjs().add(-1, "y")).format(
      "YYYY-MM-DD"
    );

    const end_date = (Interval[1] || dayjs()).format("YYYY-MM-DD");

    switch (type_report) {
      case 0: {
        switch (key) {
          case "0":
            return await ReportService.getGroupsAttendance(
              start_date,
              end_date
            );

          case "1":
            return await ReportService.getTeachersAttendance(
              start_date,
              end_date
            );
          case "2":
            return await ReportService.getKvantumsAttendance(
              start_date,
              end_date
            );
          default:
            return;
        }
      }

      case 1: {
        switch (key) {
          case "0":
            return await ReportService.getGroupsAchievements(
              start_date,
              end_date
            );

          case "1":
            return await ReportService.getTeachersAchievements(
              start_date,
              end_date
            );
          case "2":
            return await ReportService.getKvantumsAchievements(
              start_date,
              end_date
            );
          default:
            return;
        }
      }
    }
  };

  const getData = async () => {
    const { data }: any = await getDataForTabs(selectedTab);

    const labels = data.map((el: any) =>
      selectedTab === "1" ? el.FIO : el.name
    );
    setlabels(labels);

    setData(data.map((el: { id: any }) => ({ ...el, key: el.id })));

    let dataset: any = [];

    dataset = graphicSettings[type_report].getdata(data);

    ///const dataset = data.map((el: { attendance: any }) => el.attendance);
    setDataSet(dataset);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedTab, Interval]);

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
        text: graphicSettings[type_report].title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: graphicSettings[type_report].label,
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
    <Card title="Посещаемость">
      <Space style={{ marginBottom: 10 }}>
        <RangePicker
          defaultValue={Interval}
          value={Interval}
          onChange={(value) => setInterval(value)}
          format={"DD.MM.YYYY"}
        />
        <Button onClick={() => setInterval(defaultDatesValue)}>Сбросить</Button>
      </Space>
      <Tabs
        defaultActiveKey={selectedTab}
        items={items}
        onChange={onTabChange}
      />
    </Card>
  );
};

export default Reports;
