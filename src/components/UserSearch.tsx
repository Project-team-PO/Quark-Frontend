// UserSearch.tsx
import React, { useState } from 'react';
import { Input, List, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/users/usersSlice';
import '../styles/pages/UserSearch.module.css';

interface User {
  name: string;
  id: number;
}

interface UserSearchProps {
  users: User[];
}



const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const people = useSelector((state: { users: { users: User[] } }) => state.users.users);

  const filteredUsers: User[] = users
    .filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, 15);

  function AddUser(user: User) {
    if (people.find(({ name }) => name === user.name) === undefined) {
      dispatch(addUser(user));
      message.success(`${user.name} added successfully!`);
    } else {
      message.warning('User already added!');
    }
  }

  return (
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
  );
};

export default UserSearch;
