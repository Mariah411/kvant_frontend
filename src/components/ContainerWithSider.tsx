import { Layout } from "antd";
import React, { FC } from "react";
import MySider from "./MySider";
import { Content } from "antd/es/layout/layout";
import { type } from "os";

type Props = {
  children: any;
};

const ContainerWithSider: FC<Props> = (props: Props) => {
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
            {props.children}
          </Content>
        </Layout>
      </Layout>{" "}
    </>
  );
};

export default ContainerWithSider;
