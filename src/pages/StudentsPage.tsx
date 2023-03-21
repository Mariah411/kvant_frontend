import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import Card from "antd/es/card/Card";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import React, { FC, useEffect, useState } from "react";
import { StudentService } from "../api/StudentService";
import ModalWithForm from "../components/ModalWihtForm";
import MySider from "../components/MySider";
import EditableTable from "../components/EditableTable";
import { StudentsForTable, StudentsWithGroups } from "../models/IStudent";

const StudentsPage: FC = () => {
  const [dataSource, setDataSourse] = useState<StudentsForTable[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = async (values: any) => {
    await StudentService.createSudent(values).then((isSuccess) => {
      if (isSuccess) {
        success();
        form.resetFields();
        setIsModalVisible(false);
        getData();
      } else error();
    });
  };

  const onCreateReset = () => {
    form.resetFields();
  };

  const onCancelCreate = () => {
    //form.resetFields()
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const columns = [
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
      editable: true,
    },
    {
      title: "Документ",
      dataIndex: "num_doc",
      key: "num_doc",
      editable: true,
    },
    {
      title: "Дата рождения",
      dataIndex: "b_date",
      key: "b_date",
      editable: true,
    },
    {
      title: "Год обучения",
      dataIndex: "year_study",
      key: "year_study",
      editable: true,
    },

    {
      title: "Группа",
      dataIndex: "group_name",
      key: "group_name",
      editable: true,
    },
    {
      title: "Примечания",
      dataIndex: "note",
      key: "note",
      editable: true,
    },
  ];

  const groupOptions = [
    {
      value: "1",
      label: "ИТ01",
    },
    {
      value: "2",
      label: "ИТ02",
    },
    {
      value: "3",
      label: "БИО3",
    },
  ];

  const getData = async () => {
    const response = await StudentService.getStutentsWithGroup();

    const arr = response.data;

    const new_data = arr.map((el) => {
      let new_el = { ...el, group_name: el.group?.name || "", key: el.id };
      delete new_el.group;
      return new_el;
    });
    setDataSourse(new_data);
  };

  return (
    <>
      {contextHolder}
      <Layout hasSider>
        <MySider />
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Card
              title="Список учеников"
              extra={
                <Button type="primary" onClick={showModal}>
                  Добавить ученика
                </Button>
              }
            >
              <EditableTable
                cols={columns}
                tableData={dataSource}
                deleteData={StudentService.deleteStudent}
                getData={getData}
              />
              {/* <Table
                loading={isLoading}
                dataSource={dataSource}
                columns={columns}
              /> */}
            </Card>
            <Modal
              title="Новый ученик"
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
                  label="Дата рождения"
                  name="b_date"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Номер документа"
                  name="num_doc"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Год обучения"
                  name="year_study"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item label="Примечание" name="note">
                  <Input />
                </Form.Item>

                <Form.Item label="Группа" name="id_group">
                  <Select
                    showSearch
                    placeholder="Выберите группу"
                    options={groupOptions}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
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

export default StudentsPage;
