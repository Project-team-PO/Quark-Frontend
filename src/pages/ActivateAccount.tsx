import React from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { MailOutlined, LoadingOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser"

import PasswordGenerator from '../shared/passwordGenerator';

import styles from "../styles/Pages/SignIn.module.css"

import { MailInfo } from '../types/types';

const ActivateAccount: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false)

  const sendEmail = async (values: MailInfo) => {
    const generatedPassword = PasswordGenerator()
    try {
      setLoading(true)
      const emailData = {
        email: values.email,
        password: generatedPassword,
      }
      //Save email, password to db --> ToDo <---
      const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
      const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
      const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY)
        console.log(emailData)
        setLoading(false)
        setAlert(true)
      }
      catch (error) {
        console.error("Email.js error", error)
        setLoading(false)
      }
    }
    catch (error) {
      console.log("Error at sendEmail function", error)
      setLoading(false)
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
            {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18, color: "whitesmoke", padding: 1 }} spin />} /> : "Activate"}
          </Button>
        </Form.Item>
        {alert ? <Alert style={{ paddingTop: 10 }} message="Your account activation was a success, please check your e-mail account for more information" type="success" showIcon /> : ""}
      </Form>
    </section>
  );
}

export default ActivateAccount;