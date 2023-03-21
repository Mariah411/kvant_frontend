import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { StudentsForTable } from "../models/IStudent";
import { Type } from "typescript";

type Props = {
  cols: any;
  tableData: any;
  deleteData: any;
  getData: any;
};

const EditableTable = (props: Props) => {
  const { cols, tableData, deleteData, getData } = props;

  const [isLoading, setIsLoading] = useState(false);

  type Item = StudentsForTable;

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
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

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

  const [editingKey, setEditingKey] = useState(-1);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const deleteRow = async (key: number) => {
    const isDeleted = await deleteData(key).then(() => getData());
  };

  const save = async (key: React.Key) => {
    // try {
    //   const row = (await form.validateFields()) as Item;
    //   const newData = [...data];
    //   const index = newData.findIndex((item) => key === item.key);
    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //       ...item,
    //       ...row,
    //     });
    //     setData(newData);
    //     setEditingKey("");
    //   } else {
    //     newData.push(row);
    //     setData(newData);
    //     setEditingKey("");
    //   }
    // } catch (errInfo) {
    //   console.log("Validate Failed:", errInfo);
    // }
  };

  const columns = [
    ...cols,
    {
      title: "Действия",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
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
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default EditableTable;
