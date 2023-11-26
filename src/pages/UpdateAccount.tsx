import React from "react"
import { Button, Form, Input, Select, Upload, message, Spin } from 'antd';
import { MailOutlined, BankOutlined, InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import styles from "../styles/Pages/UpdateAccount.module.css"

import { updateCredentials } from "../app/slices/auth.slice";
import { useUpdateProfileEndpointMutation } from "../app/slices/auth.api.slice";

const selectOptions = [
  { value: "hr", label: "HR" },
  { value: "marketing", label: "Marketing" },
  { value: "administration", label: "Administration" },
  { value: "engineering", label: "Engineering" },
]

const UpdateAccount: React.FC = () => {
  const [avatar, setAvatar] = React.useState<string | null>(null)

  const [UpdateProfileEndpoint, { isLoading }] = useUpdateProfileEndpointMutation();
  const { userState } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

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

  const onFinish = async (values: any) => {
    values.pictureUrl = avatar;
    console.log(values)
    try {
      const response = await UpdateProfileEndpoint(values).unwrap();
      dispatch(updateCredentials({ ...response }));
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className={styles.form_section}>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          initialValue={userState.user.email}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Workplace e-mail"
            disabled
          />
        </Form.Item>
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your Name!' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
          <Input placeholder="Surname" />
        </Form.Item>
        <Form.Item name="department" rules={[{ required: true, message: 'Please select your department!' }]}>
          <Select placeholder="Department that you work in" suffixIcon={<BankOutlined />} options={selectOptions} allowClear />
        </Form.Item>
        <Form.Item name="selfDescription">
          <Input.TextArea
            maxLength={30}
            placeholder="Something about yourself!"
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <Form.Item name="pictureUrl">
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
            {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18, color: "whitesmoke", padding: 1 }} spin />} /> : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default UpdateAccount