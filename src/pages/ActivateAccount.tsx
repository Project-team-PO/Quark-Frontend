import React from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { MailOutlined, LoadingOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser"
import { useActivateAccountEndpointMutation } from '../app/slices/auth.api.slice';

import styles from "../styles/Pages/SignIn.module.css"

import { MailInfo } from '../types/types';
import GeneratePassword from '../shared/passwordGenerator';

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const ActivateAccount: React.FC = () => {
  const [ActivateAccountEndpoint, { isLoading, isSuccess }] = useActivateAccountEndpointMutation();

  const sendEmail = async (values: MailInfo) => {
    const password = GeneratePassword();
    const data = {
      email: values.email,
      password
    }
    try {
      await ActivateAccountEndpoint(data).unwrap();
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className={styles.form_section}>
      <Form
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={sendEmail}
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
          <Input prefix={<MailOutlined />} placeholder="Your work e-mail" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18, color: "whitesmoke", padding: 1 }} spin />} /> : "Activate"}
          </Button>
        </Form.Item>
        {isSuccess ? <Alert style={{ paddingTop: 10 }} message="Your account activation was a success, credentiasl" type="success" showIcon /> : ""}
      </Form>
    </section>
  );
}

export default ActivateAccount;