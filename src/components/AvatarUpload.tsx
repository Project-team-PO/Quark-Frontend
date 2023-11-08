import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import axios from 'axios';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: false,
  accept: ".png, .jpg",
  maxCount: 1,
  async customRequest(info) {
    const { file, onError, onSuccess } = info;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "quarkUpload");
    let data = "";
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/ddrf0klbu/image/upload", formData)
      data = response.data["secure_url"]
      console.log(data)
      if (onSuccess) {
        onSuccess("Ok")
      }
      return data;
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

const AvatarUpload: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Drag to upload</p>
    <p className="ant-upload-hint">
      Single bulk upload only
    </p>
  </Dragger>
);

export default AvatarUpload;