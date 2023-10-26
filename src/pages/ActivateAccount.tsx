import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { MailOutlined, IdcardOutlined } from "@ant-design/icons";

import styles from "../styles/Pages/SignIn.module.css"

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const ActivateAccount: React.FC = () => {
  return (
    <section className={styles.form_section}>
      <Form
        name="activateAccount"
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-mail@" />
        </Form.Item>
        <Form.Item>
          <Select placeholder="Placeholder" suffixIcon={<IdcardOutlined />} disabled>
            <Select.Option value="Yes">Placeholder 1</Select.Option>
            <Select.Option value="No">Placholder 2</Select.Option>
          </Select>
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