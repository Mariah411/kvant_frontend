import { Layout, Tabs } from "antd";
import React, { FC } from "react";
import MySider from "../components/MySider";
import { Content } from "antd/es/layout/layout";
import Reports from "../components/ReportComponets/Reports";
import Attestation from "../components/ReportComponets/Attestation";

const ReportPage: FC = () => {
  const items = [
    {
      label: "Посещаемость",
      key: "0",
      children: <Reports type_report={1} />,
    },
    {
      label: "Аттестация",
      key: "1",
      children: <Attestation />,
    },
  ];

  return (
    <>
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
            <Tabs items={items} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ReportPage;
