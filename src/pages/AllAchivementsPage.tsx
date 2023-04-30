import {
  Button,
  Card,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Select,
  Space,
  Upload,
  Image,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { AchievementService } from "../api/AchievementsService";
import { GroupsService } from "../api/GroupsService";
import { RatingService } from "../api/RatingService";
import { StudentService } from "../api/StudentService";
import { WorkersService } from "../api/WorkersService";
import EditableTable from "../components/EditableTable";
import MySider from "../components/MySider";
import { IAchievementForTable } from "../models/IAchievement";

const AllAchivementsPage: FC = () => {
  const [dataSource, setDataSourse] = useState<IAchievementForTable[]>([]);

  const [teacherOptions, setTeacherOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [studentsOptions, setStudentsOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [ratingOptions, setRatingOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [image, setImage] = useState({});

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

    const formData: any = new FormData();
    formData.append("name", values.name);
    formData.append("date", values.date);
    formData.append("place", values.place);
    formData.append("id_rating", values.id_rating);
    formData.append("workers", values.workers);
    formData.append("students", values.students);
    formData.append("image", image);

    const data = { ...values, image: image };
    //values = { ...values, image: values.image.file };
    console.log(data);
    await AchievementService.createAchivement(formData, values).then(
      (isSuccess) => {
        if (isSuccess) {
          success();
          form.resetFields();
          setIsModalVisible(false);
          getData();
        } else error();
      }
    );
  };

  const getData = async () => {
    await AchievementService.getAllAchivements().then((response) => {
      //setAchievements(response.data);
      const new_data = response.data.map((el) => {
        let new_el = {
          ...el,
          students: el.students?.map((s) => s.FIO).toString(),
          workers: el.workers?.map((w) => w.FIO).toString(),
          id_rating: el.rating?.description,
          key: el.id,
        };
        return new_el;
      });
      setDataSourse(new_data);
    });
  };

  const getTeachers = async () => {
    const response = await WorkersService.getWorkers();
    const teacherOptions: { value: string; label: string }[] =
      response.data.map((item) => ({
        value: item.id.toString(),
        label: item.FIO,
      }));
    setTeacherOptions(teacherOptions);
  };

  const getStudents = async () => {
    const response = await StudentService.getStutentsWithGroup();
    // console.log(response.data);

    const options: { value: string; label: string }[] = response.data.map(
      (item) => ({
        value: item.id.toString(),
        label: ` ${item.FIO} (${item.group?.name || ""})`,
      })
    );
    setStudentsOptions(options);
  };

  const getRatings = async () => {
    const response = await RatingService.getRatings();
    const options: { value: string; label: string }[] = response.data.map(
      (item) => ({
        value: item.id.toString(),
        label: item.description,
      })
    );

    setRatingOptions(options);
  };

  useEffect(() => {
    getTeachers();
    getStudents();
    getRatings();
  }, []);

  const columns = [
    {
      title: "Мероприятие",
      dataIndex: "name",
      key: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: "10%",
      editable: true,
    },
    {
      title: "Диплом",
      dataIndex: "diplom",
      key: "diplom",
      width: "10%",
      editable: false,
      render: (_: any, record: IAchievementForTable) => {
        return <Image width={50} src={`/${record.diplom}`} />;
      },
    },
    {
      title: "Место",
      dataIndex: "place",
      key: "place",
      width: "10%",
      editable: true,
    },
    {
      title: "Уровень",
      dataIndex: "id_rating",
      key: "id_rating",
      width: "10%",
      editable: true,
    },
    {
      title: "Участники",
      dataIndex: "students",
      key: "students",
      width: "10%",
      editable: true,
    },
    {
      title: "Педагоги",
      dataIndex: "workers",
      key: "workers",
      width: "10%",
      editable: true,
    },
  ];

  const inputNodes = {
    name: <Input />,
    date: <Input />,
    diplom: <input type="file" />,
    place: <Input />,
    id_rating: (
      <Select placeholder="Выберите уровень" options={ratingOptions} />
    ),
    workers: (
      <Select
        showSearch
        mode="multiple"
        placeholder="Выберите педагогов"
        options={teacherOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    ),
    students: (
      <Select
        mode="multiple"
        showSearch
        placeholder="Выберите учеников"
        options={studentsOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
    ),
  };

  const setFields = (record: IAchievementForTable) => {
    const workers = record.workers.split(",");
    const students = record.students.split(",");

    const selectedWorkers = workers.map(
      (w) => teacherOptions.find((o) => o.label === w)?.value || ""
    );

    const selectedStudents = students.map(
      (s) => studentsOptions.find((o) => o.label.includes(s))?.value || ""
    );

    const id_rating =
      ratingOptions.find((o) => o.label === record.id_rating)?.value || "";

    return {
      ...record,
      diplom: `/${record.diplom}`,
      workers: selectedWorkers,
      students: selectedStudents,
      id_rating: id_rating,
    };
  };

  const saveData = async (key: any, form: FormInstance) => {
    const row = await form.validateFields();
    try {
      return await AchievementService.updateAchievement(key, row);
    } catch (e) {
      return 0;
    }
  };

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
              title="Список достижений"
              extra={
                <Button type="primary" onClick={showModal}>
                  Добавить достижение
                </Button>
              }
            >
              <EditableTable
                cols={columns}
                tableData={dataSource}
                deleteData={AchievementService.deleteAchievement}
                getData={getData}
                inputNodes={inputNodes}
                setFields={setFields}
                saveData={saveData}
              />
            </Card>

            <Modal
              title="Новое достижение"
              open={isModalVisible}
              footer={null}
              onCancel={onCancelCreate}
            >
              <Form form={form} onFinish={onCreate}>
                <Form.Item
                  label="Название мероприятия"
                  name="name"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Дата"
                  name="date"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <DatePicker />
                </Form.Item>

                {/* <Form.Item
                  label="Диплом"
                  name="diplom"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <Input />
                </Form.Item> */}

                <Form.Item
                  name="imageFile"
                  label="Диплом"
                  rules={[{ required: true, message: "Заполните поле" }]}
                  // valuePropName="fileList"
                  // getValueFromEvent={normFile}
                >
                  {/* <Upload name="image" action="/upload.do" listType="picture"> */}
                  {/* <Button> Нажмите для загрузки</Button> */}
                  <input
                    type="file"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setImage(e.target.files[0]);
                    }}
                  ></input>

                  {/* <input type="file" name="image" /> */}
                </Form.Item>

                <Form.Item
                  label="Место"
                  name="place"
                  rules={[{ required: true, message: "Заполните поле" }]}
                >
                  <InputNumber />
                </Form.Item>

                <Form.Item label="Уровень" name="id_rating">
                  <Select
                    placeholder="Выберите уровень"
                    options={ratingOptions}
                  />
                </Form.Item>

                <Form.Item label="Педагоги" name="workers">
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Выберите педагогов"
                    options={teacherOptions}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>

                <Form.Item label="Участники" name="students">
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Выберите учеников"
                    options={studentsOptions}
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

export default AllAchivementsPage;
