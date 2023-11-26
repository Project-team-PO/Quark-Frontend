import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import styles from "../styles/Pages/SignIn.module.css"

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const SignIn: React.FC = () => {
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
