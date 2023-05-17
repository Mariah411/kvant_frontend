import React, { FC, useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { IStudentFields, StudentsForTable } from "../models/IStudent";
import { Type } from "typescript";
import moment from "moment";
import { GroupForTable } from "../models/IGroup";
import { KvantumForTable } from "../models/IKvamtum";
import { RaitingForTable } from "../models/IRating";

import Search from "antd/es/input/Search";

type Props = {
  cols: any;
  tableData: any;
  deleteData: any;
  getData: any;
  inputNodes: any;
  setFields: any;
  saveData: any;
  isInfo?: boolean;
  infoClick?: any;
  location?: any;
};

const EditableTable = (props: Props) => {
  const {
    cols,
    tableData,
    deleteData,
    getData,
    inputNodes,
    setFields,
    saveData,
    isInfo,
    infoClick,
    location,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

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

  type Item =
    | StudentsForTable
    | GroupForTable
    | KvantumForTable
    | RaitingForTable;

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputNodes[dataIndex];

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    getData().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getData().then(() => setIsLoading(false));
  }, [location]);

  const [editingKey, setEditingKey] = useState(-1);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue(setFields(record));
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const deleteRow = async (key: number) => {
    const isDeleted = await deleteData(key).then(() => getData());
  };

  const save = async (key: React.Key) => {
    setIsLoading(true);

    const isSaved = await saveData(key, form).then((res: any) => {
      if (res) {
        success();
        getData().then(() => setIsLoading(false));
        setEditingKey(-1);
      } else {
        error();
        setIsLoading(false);
      }
    });
  };

  const columns = [
    ...cols,
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Сохранить
                </Typography.Link>
                <Popconfirm title="Вы уверены?" onConfirm={cancel}>
                  <a>Отмена</a>
                </Popconfirm>
              </span>
            ) : (
              <span>
                <Typography.Link
                  disabled={editingKey !== -1}
                  onClick={() => edit(record)}
                >
                  Изменить
                </Typography.Link>

                <Popconfirm
                  title="Вы уверены?"
                  onConfirm={() => deleteRow(record.key)}
                >
                  <Button type="link" danger>
                    Удалить
                  </Button>
                </Popconfirm>
              </span>
            )}{" "}
            {isInfo && (
              <Button onClick={() => infoClick(record.key)}>Подробнее</Button>
            )}
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onSearch = async (value: string) => {
    setIsLoading(true);
    await getData(value).then(() => setIsLoading(false));
  };

  return (
    <>
      {contextHolder}

      <Search
        placeholder="Введите текст для поиска"
        onSearch={onSearch}
        style={{ width: 500, marginBottom: 20 }}
        enterButton
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          loading={isLoading}
          bordered
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          scroll={{ x: 900 }}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default EditableTable;
