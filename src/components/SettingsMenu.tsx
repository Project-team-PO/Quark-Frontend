import React from 'react'
import { Menu } from 'antd';
import { NotificationOutlined, SettingOutlined, AlertOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Modal, Button, Select } from 'antd';
import { changeLanguage } from '../app/slices/language.slice';
const SettingsMenu: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chooseLanguage, setChooseLangugage] = useState("");
  const dispatch = useDispatch();
  const language: string = useSelector((state: { language: { currentLanguage: string } }) => state.language.currentLanguage);
  const [languagePack, setLanguagePack] = useState<any>("");
  const languages = useSelector((state: any) => state.language.Languages);

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
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(changeLanguage(chooseLanguage));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Menu style={{ position: "absolute", bottom: 0, width: "100%" }}
        theme="dark"
        mode="inline"
      >
        <Menu.Item icon={<SettingOutlined />} onClick={showModal}>{languagePack?.Settings?.Settings}</Menu.Item>
        <Menu.Item disabled></Menu.Item>
      </Menu>

      <Modal title={languagePack?.Settings?.Settings} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{languagePack?.Settings?.ChooseLanguage}:</p>
        <Select
          defaultValue={chooseLanguage || language}
          onChange={(value: string) => setChooseLangugage(value)}
          options={languages.map((language: string) => ({ label: language, value: language }))}
        />
        <p>{languagePack?.Settings?.GeneralOptions}:</p>

        <Button type="primary">
          {languagePack?.Settings?.MuteNotifications} <NotificationOutlined />
        </Button>
        <Button type="primary" style={{ marginLeft: '7px' }}>
          {languagePack?.Settings?.DarkMode}<AlertOutlined />
        </Button>
      </Modal>
    </div>
  )
}

export default SettingsMenu
