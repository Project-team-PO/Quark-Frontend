import React from 'react'
import { Menu, Badge } from 'antd';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { User } from '../ts/interfaces';
import { NavLink } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const users: User[] = useSelector((state: any) => state.users.users);
  const announcements = useSelector((state: any) => state.announcement.announcements);
  return (
    <div>
      <Menu theme="dark" mode="inline" >
        <Menu.Item key="-1" icon={<UserOutlined />}>
          <NavLink to="/home/">People</NavLink>
          <Badge count={users.length} style={{ marginLeft: '8px' }} />
        </Menu.Item>
        <Menu.Item key="0" icon={<ScheduleOutlined />}>
          <NavLink to="/home/Announcements">Announcements</NavLink>
          <Badge count={announcements.length} style={{ marginLeft: '8px' }} />
        </Menu.Item>
        <span style={{ color: 'gray', marginLeft: '16px', fontSize: 10 }}>Channels</span>
        {users.map(person => (
          <Menu.Item key={person.id} icon={<UserOutlined />}>
            <NavLink to={`/home/chat/${person.name}`}>{person.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default UserMenu