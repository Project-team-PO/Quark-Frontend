import React from "react"
import { Button, Form, Input, Select } from 'antd';
import { MailOutlined, UserOutlined, BankOutlined } from "@ant-design/icons";

import styles from "../styles/Pages/UpdateAccount.module.css"

import AvatarUpload from "../components/AvatarUpload";

const selectOptions = [
  { value: "hr", label: "HR" },
  { value: "marketing", label: "Marketing" }, 
  { value: "administration", label: "Administration" }, 
  { value: "engineering", label: "Engineering" },
]

const UpdateAccount: React.FC = () => {
  return (
    <section className={styles.form_section}>
      <Form
        initialValues={{ remember: true }}
        onFinish={(values) => {
          console.log(values)
        }}
      >
        <Form.Item
          name="username"
          initialValue={"Username"}
        >
          <Input prefix={<UserOutlined />} placeholder="Generated username" disabled />
        </Form.Item>
        <Form.Item
          name="email"
          initialValue={"Email"}
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
        <Form.Item name="avatar">
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