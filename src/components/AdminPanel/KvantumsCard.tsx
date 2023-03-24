import { Button, Card, Form, FormInstance, Input, Modal, Space } from "antd";
import React, { FC, useState } from "react";
import { KvantumsService } from "../../api/KvantumService";
import { Ikvantum, KvantumForTable } from "../../models/IKvamtum";
import EditableTable from "../EditableTable";

type Props = {
  success: any;
  error: any;
};

const KvantumsCard: FC<Props> = (props: Props) => {
  const { success, error } = props;
  const [dataSource, setDataSourse] = useState<KvantumForTable[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    await KvantumsService.createKvantum(values).then((isSuccess) => {
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
  ];

  const inputNodes = {
    name: <Input />,
  };

  const getData = async () => {
    const response = await KvantumsService.getKvantums();

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

  const setFields = (record: KvantumForTable) => {
    //console.log(record.2015-03-04);
    return {
      ...record,
    };
  };

  const saveData = async (key: any, form: FormInstance) => {
    const row = await form.validateFields();
    try {
      return await KvantumsService.updateKvantum(key, row);
    } catch (e) {
      return 0;
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      {" "}
      <Card
        title="Квантумы"
        extra={
          <Button type="primary" onClick={showModal}>
            Добавить квантум
          </Button>
        }
      >
        <EditableTable
          cols={columns}
          tableData={dataSource}
          deleteData={KvantumsService.deleteKvantum}
          getData={getData}
          inputNodes={inputNodes}
          setFields={setFields}
          saveData={saveData}
        />
      </Card>
      <Modal
        title="Новый квантум"
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

export default KvantumsCard;
