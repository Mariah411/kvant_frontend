import { FormInstance, Modal } from "antd";
import form from "antd/lib/form";
import React, { Children, ReactElement } from "react";

type Props = {
  children: ReactElement;
  title: string;
  form: FormInstance;
  open: boolean;
  setVisible: (args: boolean) => void;
  onCreate: (args: any) => void;
};
const ModalWithForm = (props: Props) => {
  const { setVisible, title, form, open, onCreate } = props;

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={title}
      open={open}
      footer={null}
      //   onOk={handleOk}
      //   onCancel={handleCancel}
      //   okText="Добавить"
      //   cancelText="Отмена"
    >
      {props.children}
    </Modal>
  );
};

export default ModalWithForm;
