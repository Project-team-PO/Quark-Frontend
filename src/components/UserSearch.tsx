// UserSearch.tsx
import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../app/slices/user.slice';
import { useGetUsersEndpointMutation } from '../app/slices/auth.api.slice';

import styles from "../styles/Pages/UserSearch.module.css"

import { IConversation, User } from '../ts/interfaces';
import Connector from '../shared/signalr-conn';
import { addConversation } from '../app/slices/conversations.slice';

const UserSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [GetUsersEndpoint] = useGetUsersEndpointMutation();
  const language: string = useSelector((state: { language: { currentLanguage: string } }) => state.language.currentLanguage);
  const [languagePack, setLanguagePack] = useState<any>("");

  const connector = Connector.getInstance("people");
  const { InitiatePrivateConversation, conversationEvents } = connector;

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsersEndpoint(undefined).unwrap();
        console.log(response)
        dispatch(setUsers(response));
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    const handleInitiateConversation = (conversation: IConversation) => {
      dispatch(addConversation(conversation))
    }

    conversationEvents(handleInitiateConversation)
  }, [conversationEvents])

  const { users } = useSelector((state: any) => state.users)
  const { userState } = useSelector((state: any) => state.auth)

  const mappedUsers: User[] = users.filter((user: User) => user.id !== userState.user.id);

  const filteredUsers: User[] = mappedUsers
    ?.filter((user: User) => user?.firstName.toLowerCase().includes(searchText?.toLowerCase()))
    .slice(0, 15);

  const initiateConversation = (username: string, loggedUsername: string) => {
    InitiatePrivateConversation(username, loggedUsername);
  }

  return (
    <Card className={styles.user_search_container} style={{ background: '#FFFFFF', padding: '24px', minHeight: '360px' }}>
      <h1 style={{ marginBottom: "12px" }}>{languagePack?.UserSearch?.title}</h1>
      <Input
        placeholder={languagePack?.UserSearch?.title}
        onChange={e => setSearchText(e.target.value)}
        style={{ marginBottom: '24px' }}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredUsers}
        renderItem={(user: User) => (
          <List.Item className={styles.user_list_item} key={user.id}
            onClick={() => initiateConversation(user.username, userState.user.username)}>
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
