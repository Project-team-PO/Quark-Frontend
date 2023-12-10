import React from 'react'
import { Menu, Badge, Avatar } from 'antd';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { User } from '../ts/interfaces';
import { NavLink } from 'react-router-dom';

const UserMenu: React.FC = () => {
  //@ts-ignore
  const users: User[] = useSelector(state => state.users.users);

  return (
    <div>
      <Menu theme="dark" mode="inline" >
        <Menu.Item key="-1" icon={<UserOutlined />}>
          <NavLink to="/home/">People</NavLink>
          <Badge count={users.length} style={{ marginLeft: '8px' }} />
        </Menu.Item>
        <Menu.Item key="0" icon={<ScheduleOutlined />}>
          <NavLink to="/home/Announcements">Announcements</NavLink>
        </Menu.Item>
        <span style={{ color: 'gray', marginLeft: '16px', fontSize: 10 }}>Channels</span>
        {users.map((user: User) => (
          <Menu.Item key={user.id}>
            <Avatar src={user.pictureUrl}/>
            <NavLink to={`/home/chat/${user.id}`} style={{paddingLeft: "15px"}}>{user.firstName} {user.lastName}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default UserMenu