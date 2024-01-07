import React from 'react'
import { Menu } from 'antd';
import { NotificationOutlined, SettingOutlined, AlertOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SettingsMenu: React.FC = () => {
  const language: string = useSelector((state: { language: { currentLanguage: string } }) => state.language.currentLanguage);
  const [languagePack, setLanguagePack] = useState<any>("");

  useEffect(() => {
    const fetchLanguagePack = async () => {
      try {
        let pack = await import(`../assets/translations/${language}.json`);
        setLanguagePack(pack);
      } catch (error) {
        console.error(`Failed to load language pack for ${language}`, error);
      }
    };

    fetchLanguagePack();
  }, [language]);
  return (
    <div>
      <Menu style={{ position: "absolute", bottom: 0, width: "100%" }}
        theme="dark"
        mode="inline"
      >
        <Menu.Item icon={<SettingOutlined />}>{languagePack?.Settings?.Settings}</Menu.Item>
        <Menu.Item icon={<NotificationOutlined />}>{languagePack?.Settings?.MuteNotifications}</Menu.Item>
        <Menu.Item icon={<AlertOutlined />}>{languagePack?.Settings?.DarkMode}</Menu.Item>
        <Menu.Item disabled></Menu.Item>
      </Menu>
    </div>
  )
}

export default SettingsMenu