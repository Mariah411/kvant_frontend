import { Layout, Tabs } from "antd";
import React, { FC } from "react";
import MySider from "../components/MenuDrawer";
import { Content } from "antd/es/layout/layout";
import Reports from "../components/ReportComponets/Reports";
import Attestation from "../components/ReportComponets/Attestation";
import ContainerWithSider from "../components/ContainerWithSider";

const ReportPage: FC = () => {
  const items = [
    {
      label: "Посещаемость",
      key: "0",
      children: <Reports type_report={0} />,
    },
    {
      label: "Достижения",
      key: "1",
      children: <Reports type_report={1} />,
    },
    {
      label: "Аттестация",
      key: "2",
      children: <Attestation />,
    },
  ];

  return (
    <>
      <ContainerWithSider>
        <Tabs items={items} />
      </ContainerWithSider>
    </>
  );
};

export default ReportPage;
