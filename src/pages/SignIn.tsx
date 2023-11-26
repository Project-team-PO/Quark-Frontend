import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

import { useSignInMutation } from '../app/slices/auth.api.slice';
import { setCredentials } from '../app/slices/auth.slice';

import styles from "../styles/Pages/SignIn.module.css"

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [SingIn, { isLoading, error }] = useSignInMutation();
  
  const { userState } = useSelector((state: any) => state.auth);

  const onFinish = (values: {email: string, password: string}) => {
    console.log(values)
  }

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
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
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
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default SignIn;
