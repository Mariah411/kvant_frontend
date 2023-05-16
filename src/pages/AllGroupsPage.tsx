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
import { useNavigate } from "react-router-dom";
import { GroupsService } from "../api/GroupsService";
import { KvantumsService } from "../api/KvantumService";
import { WorkersService } from "../api/WorkersService";
import EditableTable from "../components/EditableTable";
import MySider from "../components/MenuDrawer";
import { GroupForTable } from "../models/IGroup";
import { RouteNames } from "../router";
import { IStudent } from "../models/IStudent";
import { StudentService } from "../api/StudentService";
import ContainerWithSider from "../components/ContainerWithSider";

const AllGroupsPage: FC = () => {
  const [dataSource, setDataSourse] = useState<GroupForTable[]>([]);
  const [student, setStudent] = useState<IStudent>({} as IStudent);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teacherOptions, setTeacherOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [kvantumOptions, setKvantumsOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

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
    await GroupsService.createGroup(values).then((isSuccess) => {
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
      title: "Название",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Возраст",
      dataIndex: "age",
      key: "age",
      editable: true,
    },
    {
      title: "Расписание",
      dataIndex: "shedule",
      key: "shedule",
      editable: true,
    },

    {
      title: "Педагог",
      dataIndex: "id_teacher",
      key: "id_teacher",
      editable: true,
    },
    {
      title: "Квантум",
      dataIndex: "id_kvantum",
      key: "id_kvantum",
      editable: true,
    },
  ];

  const inputNodes = {
    name: <Input />,
    age: <Input />,
    shedule: <Input />,
    id_teacher: (
      <Select
        showSearch
        placeholder="Выберите педагога"
        options={teacherOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    ),
    id_kvantum: (
      <Select
        showSearch
        placeholder="Выберите квантум"
        options={kvantumOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    ),
  };

  const getData = async () => {
    const response = await GroupsService.getGroupsWithKvantumsAndTeachers();

    const arr = response.data;

    const new_data = arr.map((el) => {
      let new_el = {
        ...el,
        id_teacher: el.teacher.FIO || "",
        id_kvantum: el.kvantum.name,
        key: el.id,
      };
      return new_el;
    });
    setDataSourse(new_data);
  };

  const setFields = (record: GroupForTable) => {
    //console.log(record.2015-03-04);
    const id_teacher = teacherOptions.findIndex(
      (el) => el.label === record.id_teacher
    );
    const id_kvantum = kvantumOptions.findIndex(
      (el) => el.label === record.id_kvantum
    );
    try {
      return {
        ...record,
        id_kvantum: kvantumOptions[id_kvantum].value,
        id_teacher: teacherOptions[id_teacher].value,
      };
    } catch (e) {
      return {
        ...record,
        id_kvantum: "",
        id_teacher: "",
      };
    }
  };

  const saveData = async (key: any, form: FormInstance) => {
    const row = await form.validateFields();
    try {
      return await GroupsService.updateGroup(key, row);
    } catch (e) {
      return 0;
    }
  };

  const getTeachers = async () => {
    const response = await WorkersService.getTeachers();
    // console.log(response.data);

    const teacherOptions: { value: string; label: string }[] =
      response.data.map((item) => ({
        value: item.id.toString(),
        label: item.FIO,
      }));
    setTeacherOptions(teacherOptions);
  };

  const getKvantums = async () => {
    const response = await KvantumsService.getKvantums();
    // console.log(response.data);

    const options: { value: string; label: string }[] = response.data.map(
      (item) => ({
        value: item.id.toString(),
        label: item.name,
      })
    );
    setKvantumsOptions(options);
  };

  useEffect(() => {
    getTeachers();
    getKvantums();
  }, []);

  const infoClick = (id: number | string) => {
    console.log(id);
    navigate(`/group/${id}`);
  };

  return (
    <>
      {contextHolder}
      <ContainerWithSider>
        <Card
          title="Список групп"
          extra={
            <Button type="primary" onClick={showModal}>
              Добавить группу
            </Button>
          }
        >
          <EditableTable
            cols={columns}
            tableData={dataSource}
            deleteData={GroupsService.deleteGroup}
            getData={getData}
            inputNodes={inputNodes}
            setFields={setFields}
            saveData={saveData}
            isInfo={true}
            infoClick={infoClick}
          />
        </Card>

        <Modal
          title="Новая группа"
          open={isModalVisible}
          footer={null}
          onCancel={onCancelCreate}
        >
          <Form form={form} onFinish={onCreate}>
            <Form.Item
              label="Название"
              name="name"
              rules={[{ required: true, message: "Заполните поле" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Возраст"
              name="age"
              rules={[{ required: true, message: "Заполните поле" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Расписание"
              name="shedule"
              rules={[{ required: true, message: "Заполните поле" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Квантум"
              name="id_kvantum"
              rules={[{ required: true, message: "Заполните поле" }]}
            >
              <Select
                showSearch
                placeholder="Выберите квантум"
                options={kvantumOptions}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item label="Педагог" name="id_teacher">
              <Select
                showSearch
                placeholder="Выберите педагога"
                options={teacherOptions}
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

export default AllGroupsPage;
