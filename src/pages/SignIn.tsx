import React from 'react';
import { Alert, Button, Form, Input, Spin } from 'antd';
import { LockOutlined, MailOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"

import { useSignInEndpointMutation } from '../app/slices/auth.api.slice';
import { setCredentials } from '../app/slices/auth.slice';

import styles from "../styles/Pages/SignIn.module.css"

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [SignInEndpoint, { isLoading, isError }] = useSignInEndpointMutation();

  const onFinish = async (values: { email: string, password: string }) => {
    try {
      const response = await SignInEndpoint(values).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/update_account");
    } catch (error) {
      console.error(error)
    }
  }
  const validateEmail = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback('Please input your E-mail!');
    } else if (value.length > 0 && !value.includes('@gmail.com')) {
      callback('Please enter a valid email address!');
    } else if (!value.match(/^([A-Z]?|[a-z])[a-z]{0,19}\.[A-Za-z]{0,19}@gmail\.com/)) {
      callback('Please add a dot before @ like "example.example@gmail.com"!');
    } else if (!value.match(/^([A-Z]?|[a-z])[a-z]{3,19}\.[A-Za-z]{3,19}@gmail\.com/)) {
      callback('make sure you use 3 characters for the domain and 3 characters for the extension of the first part of the email!');
    } else if (!value || value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      callback();
    } else {
      callback('Please enter your E-mail!');
    }
    rule("required");
  };
  return (
    <section className={styles.form_section}>
      <Form
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              validator: validateEmail
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18, color: "whitesmoke", padding: 1 }} spin />} /> : "Sign In"}
          </Button>
        </Form.Item>
        {isError ? <Alert style={{ paddingTop: 10 }} message="Wrong e-mail or password." type="error" showIcon /> : ""}
      </Form>
    </section>
  );
}

export default SignIn;
