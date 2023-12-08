import React, {useState,useEffect} from 'react';
import { Menu, Badge } from 'antd';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { User } from '../ts/interfaces';

const UserMenu: React.FC = () => {
  const users: User[] = useSelector((state:{users: {users:User[]}}) => state.users.users);
  const language: string = useSelector((state:{language:{currentLanguage:string }}) => state.language.currentLanguage); 
  const [languagePack, setLanguagePack] = useState("");

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
      <Menu theme="dark" mode="inline">
        <Menu.Item key="-1" icon={<UserOutlined />}>
          <NavLink to="/home/" >{languagePack.people}</NavLink>
          <Badge count={users.length} style={{ marginLeft: '8px' }} />
        </Menu.Item>
        <Menu.Item key="0" icon={<ScheduleOutlined />}>
          <NavLink to="/home/Announcements">{languagePack.announcements}</NavLink>
        </Menu.Item>
        <span style={{ color: 'gray', marginLeft: '16px', fontSize: 10 }}>
          {languagePack.channels}
        </span>
        {users.map((person) => (
          <Menu.Item key={person.id} icon={<UserOutlined />}>
            <NavLink to={`/home/chat/${person.name}`}>{person.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default UserMenu;
