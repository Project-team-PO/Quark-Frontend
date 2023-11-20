import React from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser"

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
    //Save email, username, password to db --> ToDo <---
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
    try {
      emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY)
      console.log(emailData)
    }
    catch (error) {
      console.error("Email.js error", error)
    }
  }
  catch (error) {
    console.log("Error at sendEmail function", error)
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