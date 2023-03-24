import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Space,
} from "antd";
import React, { FC, useState } from "react";
import { RatingService } from "../../api/RatingService";

import { RaitingForTable } from "../../models/IRating";
import EditableTable from "../EditableTable";

type Props = {
  success: any;
  error: any;
};

const RaitingCard: FC<Props> = (props: Props) => {
  const { success, error } = props;
  const [dataSource, setDataSourse] = useState<RaitingForTable[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    await RatingService.createRating(values).then((isSuccess) => {
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
      title: "Описание",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Баллы",
      dataIndex: "points",
      key: "points",
      editable: true,
    },
  ];

  const getData = async () => {
    const response = await RatingService.getRatings();

    const arr = response.data;

    const new_data = arr.map((el) => {
      let new_el = {
        ...el,
        key: el.id,
      };
      return new_el;
    });
    setDataSourse(new_data);
  };

  const setFields = (record: RaitingForTable) => {
    return {
      ...record,
    };
  };

  const saveData = async (key: any, form: FormInstance) => {
    const row = await form.validateFields();
    try {
      return await RatingService.updateRating(key, row);
    } catch (e) {
      return 0;
    }
  };

  const inputNodes = {
    description: <Input />,
    points: <InputNumber />,
  };

  return (
    <>
      <Card
        title="Балльно-рейтинговая система"
        extra={
          <Button type="primary" onClick={showModal}>
            Добавить уровень
          </Button>
        }
      >
        <EditableTable
          cols={columns}
          tableData={dataSource}
          deleteData={RatingService.deleteRating}
          getData={getData}
          inputNodes={inputNodes}
          setFields={setFields}
          saveData={saveData}
        />
      </Card>
      <Modal
        title="Новый уровень"
        open={isModalVisible}
        footer={null}
        onCancel={onCancelCreate}
      >
        <Form form={form} onFinish={onCreate}>
          <Form.Item
            label="Описание"
            name="description"
            rules={[{ required: true, message: "Заполните поле" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Количество баллов"
            name="points"
            rules={[{ required: true, message: "Заполните поле" }]}
          >
            <InputNumber />
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
    </>
  );
};

export default RaitingCard;
