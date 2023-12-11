// UserSearch.tsx
import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, message, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../app/slices/user.slice';
import { useGetUsersEndpointMutation } from '../app/slices/auth.api.slice';

import styles from "../styles/Pages/UserSearch.module.css"

import { User } from '../ts/interfaces';
import { addFavourites } from '../app/slices/favourites.slice';

const UserSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [GetUsersEndpoint] = useGetUsersEndpointMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsersEndpoint(undefined).unwrap();
        dispatch(setUsers(response));
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers();
  }, [])

  const { users } = useSelector((state: any) => state.users)
  const { favourites } = useSelector((state: any) => state.favourites)

  const filteredUsers: User[] = users
    ?.filter((user: User) => user?.firstName.toLowerCase().includes(searchText?.toLowerCase()))
    .slice(0, 15);

  const AddToFavourites = (user: User) => {
    const userExists = favourites.find((favUser: User) => favUser.email === user.email);
    if (!userExists) {
      dispatch(addFavourites(user));
      message.success(`${user.firstName} added successfully!`);
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
          <List.Item onClick={() => AddToFavourites(user)} className={styles.user_list_item}>
            <List.Item.Meta
              avatar={<Avatar src={user.pictureUrl} />}
              title={`${user.firstName} ${user.lastName}`}
            />
          </List.Item>
        )}
      />
    </Card>

  );
};

export default UserSearch;
