import React from 'react'
import { Menu, Badge, Avatar } from 'antd';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { User } from '../ts/interfaces';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserMenu: React.FC = () => {
  //@ts-ignore
  const { favourites } = useSelector((state: any) => state.favourites);
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
      <Menu theme="dark" mode="inline" >
        <Menu.Item key="-1" icon={<UserOutlined />}>
          <NavLink to="/home/">{languagePack.people}</NavLink>
          <Badge count={favourites.length} style={{ marginLeft: '8px' }} />
        </Menu.Item>
        <Menu.Item key="0" icon={<ScheduleOutlined />}>
          <NavLink to="/home/Announcements">Announcements</NavLink>
        </Menu.Item>
        <span style={{ color: 'gray', marginLeft: '16px', fontSize: 10 }}>{languagePack.channels}</span>
        {favourites ? favourites.map((user: User) => (
          <Menu.Item key={user.id}>
            <Avatar src={user.pictureUrl} />
            <NavLink to={`/home/chat/${user.id}`} style={{ marginLeft: "15px" }}>{user.firstName} {user.lastName}</NavLink>
          </Menu.Item>
        )) : "Loading.."}
      </Menu>
    </div>
  )
}

export default UserMenu