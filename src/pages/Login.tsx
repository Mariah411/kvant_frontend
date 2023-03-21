import React, { FC, useState } from "react";
import { Button, Checkbox, Form, Input, Layout, Typography } from "antd";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useActions, useAppDispatch, useAppSelector } from "../hooks/hooks";
const { Text } = Typography;

const Login: FC = () => {
  const { login } = useActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const onFinish = (values: any) => {
    login(email, password);
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {error && <Text type="danger">{error}</Text>}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Login;
