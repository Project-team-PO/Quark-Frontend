import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "../styles/Pages/SignIn.module.css"

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const SignIn: React.FC = () => {
  return (
    <section className={styles.form_section}>
      <Form
        name="normal_login"
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
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
