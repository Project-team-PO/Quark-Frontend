import React from 'react'
import { Menu, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { User } from '../types/types';
import { NavLink } from 'react-router-dom';

const UserMenu: React.FC = () => {
  //@ts-ignore
  const users: User[] = useSelector(state => state.users.users);

  return (
    <div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
        <Menu.Item key="0" icon={<UserOutlined />}>
          <NavLink to="/home/search/">People</NavLink>
          <Badge count={users.length} style={{ marginLeft: '8px' }} />
        </Menu.Item>
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