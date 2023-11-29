// UserSearch.tsx
import React, { useState } from 'react';
import { Input, List, Avatar, message, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../app/slices/usersSlice';
import { people } from '../shared/MenuItems';

import styles from "../styles/Pages/UserSearch.module.css"

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
    <Card className={styles.user_search_container} style={{ background: '#FFFFFF', padding: '24px', minHeight: '360px' }}>
      <h1>Search for users</h1>
      <Input
        placeholder="Search for users"
        onChange={e => setSearchText(e.target.value)}
        style={{ marginBottom: '24px' }}
      />

      <List
        itemLayout="horizontal"
        dataSource={filteredUsers}
        renderItem={(user: User) => (
          <List.Item onClick={() => AddUser(user)} className={styles.user_list_item}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={user.name}
            />
          </List.Item>
        )}
      />
    </Card>

  );
};

export default UserSearch;
