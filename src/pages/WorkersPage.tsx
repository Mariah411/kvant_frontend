import { getRoles } from "@testing-library/react";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Layout,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { RolesService } from "../api/RolesService";
import { WorkersService } from "../api/WorkersService";
import EditableTable from "../components/EditableTable";
import MySider from "../components/MySider";
import { UserForTable } from "../models/IUser";

const WorkersPage: FC = () => {
  const [dataSource, setDataSourse] = useState<UserForTable[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [rolesOptions, setRolesOptons] = useState<
    { value: string; label: string }[]
  >([]);

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

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onCreateReset = () => {
    form.resetFields();
  };

  const onCancelCreate = () => {
    //form.resetFields()
    setIsModalVisible(false);
  };

  const onCreate = async (values: any) => {
    console.log(values);
    await WorkersService.createWorker(values).then((isSuccess) => {
      if (isSuccess) {
        success();
        form.resetFields();
        setIsModalVisible(false);
        getData();
      } else error();
    });
  };

  const columns = [
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
      editable: true,
    },
    {
      title: "Эл. почта",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      editable: true,
    },
  ];

  const inputNodes = {
    FIO: <Input />,
    email: <Input />,
    roles: (
      <Select
        mode="multiple"
        placeholder="Выберите роли"
        options={rolesOptions}
      />
    ),
  };

  const getRoles = async () => {
    const response = await RolesService.getRoles();

    const options: { value: string; label: string }[] = response.data.map(
      (item) => ({
        value: item.value,
        label: item.description,
      })
    );

    setRolesOptons(options);
  };

  const getData = async () => {
    const response = await WorkersService.getWorkers();

    const arr = response.data;

    const new_data = arr.map((el) => {
      let new_el = {
        ...el,
        roles: el.roles?.map((r) => r.description).toString(),
        key: el.id,
      };
      return new_el;
    });
    setDataSourse(new_data);
  };

  const saveData = async (key: any, form: FormInstance) => {
    const row = await form.validateFields();
    try {
      return await WorkersService.updateWorker(key, row);
    } catch (e) {
      return 0;
    }
  };

  const setFields = (record: UserForTable) => {
    const user_roles = record.roles.split(",");

    const selectedRoles = user_roles.map(
      (r) => rolesOptions.find((o) => o.label === r)?.value || ""
    );
    console.log(selectedRoles);

    return { ...record, roles: selectedRoles };
  };

  useEffect(() => {
    getRoles();
    getData();
  }, []);

  return (
    <>
      {contextHolder}
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
            <Card
              title="Список групп"
              extra={
                <Button type="primary" onClick={showModal}>
                  Добавить работника
                </Button>
              }
            >
              <EditableTable
                cols={columns}
                tableData={dataSource}
                deleteData={WorkersService.deleteWorker}
                getData={getData}
                inputNodes={inputNodes}
                setFields={setFields}
                saveData={saveData}
              />
            </Card>

            <Modal
              title="Новый работник"
              open={isModalVisible}
              footer={null}
              onCancel={onCancelCreate}
            >
              <Form form={form} onFinish={onCreate}>
                <Form.Item
                  label="ФИО"
                  name="FIO"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Электронная почта"
                  name="email"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input type="mail" />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Роли"
                  name="roles"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Выберите роли"
                    options={rolesOptions}
                  />
                </Form.Item>
                <Space>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Добавить
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button danger onClick={onCreateReset}>
                      Очистить
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button onClick={onCancelCreate}>Отмена</Button>
                  </Form.Item>
                </Space>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default WorkersPage;
