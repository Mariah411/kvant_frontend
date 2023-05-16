import { Button, Card, Form, Input, Layout, message, Modal, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC } from "react";
import KvantumsCard from "../components/AdminPanel/KvantumsCard";
import RaitingCard from "../components/AdminPanel/RaitingCard";
import EditableTable from "../components/EditableTable";
import MySider from "../components/MenuDrawer";
import ContainerWithSider from "../components/ContainerWithSider";

const AdditionalAdminPage: FC = () => {
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
  return (
    <>
      {contextHolder}
      <ContainerWithSider>
        <KvantumsCard success={success} error={error} />
        <RaitingCard success={success} error={error} />
      </ContainerWithSider>
    </>
  );
};

export default AdditionalAdminPage;
