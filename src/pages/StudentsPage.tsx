import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
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
import MySider from "../components/MenuDrawer";
import EditableTable from "../components/EditableTable";
import {
  IStudent,
  StudentsForTable,
  StudentsWithGroups,
} from "../models/IStudent";
import { FormInstance } from "antd/lib/form";
import { IGroup } from "../models/IGroup";
import { GroupsService } from "../api/GroupsService";
import ContainerWithSider from "../components/ContainerWithSider";

const StudentsPage: FC = () => {
  const [dataSource, setDataSourse] = useState<StudentsForTable[]>([]);
  const [groupOptions, setGroupsOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const getGroups = async () => {
    const response = await GroupsService.getGroups();
    // console.log(response.data);

    const groupsOptions: { value: string; label: string }[] = response.data.map(
      (gr) => ({
        value: gr.id.toString(),
        label: gr.name,
      })
    );

    //console.log(groupsOptions);
    setGroupsOptions(groupsOptions);
  };

  useEffect(() => {
    getGroups();
  }, []);

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

  const inputNodes = {
    FIO: <Input />,
    num_doc: <Input />,
    b_date: <Input />,
    year_study: <InputNumber />,
    note: <Input />,
    group_name: (
      <Select
        showSearch
        placeholder="Выберите группу"
        options={groupOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    ),
  };

  const setFields = (record: StudentsForTable) => {
    //console.log(record.2015-03-04);
    const id = groupOptions.findIndex((el) => el.label === record.group_name);
    //console.log(id);
    if (id != -1) {
      return { ...record, group_name: groupOptions[id].value };
    } else {
      return { ...record, group_name: "" };
    }
  };

  const saveData = async (key: any, form: FormInstance) => {
    const row = await form.validateFields();
    const new_row: IStudent = { ...row, id_group: row.group_name };
    try {
      return await StudentService.updateStudent(key, new_row);
    } catch (e) {
      return 0;
    }
  };

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
      <ContainerWithSider>
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
            inputNodes={inputNodes}
            setFields={setFields}
            saveData={saveData}
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
      </ContainerWithSider>
    </>
  );
};

export default StudentsPage;
