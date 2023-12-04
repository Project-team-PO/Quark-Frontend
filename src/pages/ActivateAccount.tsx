import React from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { MailOutlined, LoadingOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser"
import { useActivateAccountEndpointMutation } from '../app/slices/auth.api.slice';

import styles from "../styles/Pages/SignIn.module.css"

import { MailInfo } from '../ts/types';
import GeneratePassword from '../shared/passwordGenerator';

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const ActivateAccount: React.FC = () => {
  const [ActivateAccountEndpoint, { isLoading, isSuccess, isError }] = useActivateAccountEndpointMutation();
  const [form] = Form.useForm();

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

  const validateEmail = (_rule: any, value: string, callback: any) => {
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
  };

  return (
    <section className={styles.form_section}>
      <Form
        className={styles.login_form}
        form={form}
        initialValues={{ remember: true }}
        onFinish={sendEmail}
      >
        <Form.Item
          name="email"
          rules={[
            {
              validator: validateEmail
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
        {isSuccess ? <Alert style={{ paddingTop: 10 }} message="Your account activation was a success, credentials can be found on your e-mail account." type="success" showIcon /> : ""}
        {isError ? <Alert style={{ paddingTop: 10 }} message="E-mail is already taken." type="error" showIcon /> : ""}
      </Form>
    </section>
  );
}

export default ActivateAccount;