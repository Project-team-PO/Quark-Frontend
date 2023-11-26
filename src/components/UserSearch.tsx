// UserSearch.tsx
import React, { useState } from 'react';
import { Input, List, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../app/slices/usersSlice';
import { people } from '../shared/MenuItems';

import '../styles/pages/UserSearch.module.css';

interface User {
  name: string;
  id: number;
}

const UserSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const users = people;
  const userList = useSelector((state: { users: { users: User[] } }) => state.users.users);

  const filteredUsers: User[] = users
    .filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, 15);

  function AddUser(user: User) {
    if (userList.find(({ name }) => name === user.name) === undefined) {
      dispatch(addUser(user));
      message.success(`${user.name} added successfully!`);
    } else {
      message.warning('User already added!');
    }
  }

  return (
    <div style={{ background: '#F9F6EE', padding: '24px', minHeight: '360px' }}>
      <div className="user-search-container">
        <Input
          placeholder="Search for users"
          onChange={e => setSearchText(e.target.value)}

        />
        <List
          itemLayout="horizontal"
          dataSource={filteredUsers}
          renderItem={(user: User) => (
            <List.Item onClick={() => AddUser(user)} className="user-list-item">
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={user.name}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default UserSearch;
