import React from "react"
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { MailOutlined, BankOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import axios from 'axios';

import styles from "../styles/Pages/UpdateAccount.module.css"

const selectOptions = [
  { value: "hr", label: "HR" },
  { value: "marketing", label: "Marketing" },
  { value: "administration", label: "Administration" },
  { value: "engineering", label: "Engineering" },
]

const UpdateAccount: React.FC = () => {
  const [avatar, setAvatar] = React.useState<string | null>(null)

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: ".png, .jpg",
    maxCount: 1,
    async customRequest(info) {
      const { file, onError, onSuccess } = info;
      const UPLOAD_PRESET: string = import.meta.env.VITE_UPLOAD_PRESET
      const API_URL: string = import.meta.env.VITE_API_BASE_URl
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      let data = "";
      try {
        const response = await axios.post(API_URL, formData)
        data = response.data["secure_url"]
        if (onSuccess) {
          onSuccess("Ok")
        }
        setAvatar(data)
      } catch (err: any) {
        if (onError) {
          onError(err);
        }
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <section className={styles.form_section}>
      <Form
        initialValues={{ remember: true }}
        onFinish={(values) => {
          values.avatar = avatar;
          console.log(values)
        }}
      >
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
        <Form.Item name="first_name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="last_name">
          <Input placeholder="Surname" />
        </Form.Item>
        <Form.Item name="department">
          <Select placeholder="Department that you work in" suffixIcon={<BankOutlined />} options={selectOptions} allowClear />
        </Form.Item>
        <Form.Item name="self_description">
          <Input.TextArea
            maxLength={30}
            placeholder="Something about yourself!"
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <Form.Item name="avatar">
          <Upload.Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drag to upload</p>
            <p className="ant-upload-hint">
              Single bulk upload only
            </p>
          </Upload.Dragger>
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