import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
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

  const getData = async () => {
    const { data }: any = await ReportService.getGroupsAttendance(
      "2022-05-07",
      "2023-05-07"
    );

    const labels = data.map((el: { name: any }) => el.name);
    setlabels(labels);

    const dataset = data.map((el: { attendance: any }) => el.attendance);
    setDataSet(dataset);
  };
  //const labels = ["January", "February", "March", "April", "May", "June"];

  useEffect(() => {
    getData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataSet,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

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
            <Bar options={options} data={data} />;
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReportPage;
