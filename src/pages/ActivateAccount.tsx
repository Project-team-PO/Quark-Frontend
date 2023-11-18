import React from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import PasswordGenerator from '../shared/passwordGenerator';

import styles from "../styles/Pages/SignIn.module.css"

type MailInfo = {
  email: string
  username: string
}

const sendEmail = async (values: MailInfo) => {
  const generatedPassowrd = PasswordGenerator()
  try {
    const emailData = {
      email: values.email,
      password: generatedPassowrd,
      username: values.username
    }
    //save email, username, password to db
    //send credentials to user's email
    console.log(emailData)
  }
  catch (error) {
    console.log(error)
  }
}

const ActivateAccount: React.FC = () => {
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
        <Form.Item
          name="username"
          rules={[
            {
              max: 20,
              message: "Too long"
            },
            {
              min: 5,
              message: "Too short"
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            Activate account
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default ActivateAccount;