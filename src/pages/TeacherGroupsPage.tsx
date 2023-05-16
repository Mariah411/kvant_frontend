import { Button, Card, Layout, Space, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import MySider from "../components/MySider";
import { Content } from "antd/es/layout/layout";
import { IGroup } from "../models/IGroup";
import { useActions, useAppSelector } from "../hooks/hooks";
import { GroupsService } from "../api/GroupsService";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import GroupList from "../components/GroupList";
import ContainerWithSider from "../components/ContainerWithSider";

const TeacherGroupsPage: FC = () => {
  return (
    <ContainerWithSider>
      <GroupList />
    </ContainerWithSider>
  );
};

export default TeacherGroupsPage;
