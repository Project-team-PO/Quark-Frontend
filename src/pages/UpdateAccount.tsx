import React from "react"
import { Button, Form, Input, Select } from 'antd';
import { MailOutlined, UserOutlined, BankOutlined } from "@ant-design/icons";

import styles from "../styles/Pages/UpdateAccount.module.css"

import AvatarUpload from "../components/AvatarUpload";

const selectOptions = [
  {
    label: 'HR',
    options: [
      { label: 'Jack', value: 'jack' },
      { label: 'Lucy', value: 'lucy' },
    ],
  },
  {
    label: 'Administration',
    options: [{ label: 'yiminghe', value: 'Yiminghe' }],
  },
  {
    label: 'Maintenance',
    options: [{ label: 'yiminghe', value: 'Yiminghe' }],
  },
  {
    label: 'Software',
    options: [{ label: 'yiminghe', value: 'Yiminghe' }],
  },
]

const UpdateAccount: React.FC = () => {
  return (
    <section className={styles.form_section}>
      <Form
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
        >
          <Input prefix={<UserOutlined />} placeholder="Generated username" disabled />
        </Form.Item>
        <Form.Item
          name="email"
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Workplace e-mail"
            disabled
          />
        </Form.Item>
        <Form.Item name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="surname">
          <Input placeholder="Surname" />
        </Form.Item>
        <Form.Item name="department">
          <Select placeholder="Department that you work in" suffixIcon={<BankOutlined />} options={selectOptions} allowClear />
        </Form.Item>
        <Form.Item>
          <AvatarUpload />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.form_btn}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default UpdateAccount