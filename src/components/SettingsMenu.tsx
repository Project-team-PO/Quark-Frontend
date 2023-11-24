import React from 'react'
import { Menu } from 'antd';
import { NotificationOutlined, SettingOutlined, AlertOutlined } from '@ant-design/icons'

const SettingsMenu: React.FC = () => {
  return (
    <div>
      <Menu style={{ position: "absolute", bottom: 0, width: "100%"}}
        theme="dark"
        mode="inline"
      >
        <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Item icon={<NotificationOutlined />}>Mute Notifications</Menu.Item>
        <Menu.Item icon={<AlertOutlined />}>Dark theme</Menu.Item>
        <Menu.Item disabled></Menu.Item>
      </Menu>
    </div>
  )
}

export default SettingsMenu