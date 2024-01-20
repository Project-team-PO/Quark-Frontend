// UserSearch.tsx
import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Card, message } from 'antd';
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

  const connector = Connector.getInstance("");
  const { InitiatePrivateConversation, conversationEvents } = connector;

  const fetchLanguagePack = async () => {
    try {
      let pack = await import(`../assets/translations/${language}.json`);
      setLanguagePack(pack);
    } catch (error) {
      console.error(`Failed to load language pack for ${language}`, error);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await GetUsersEndpoint(undefined).unwrap();
      console.log(response)
      dispatch(setUsers(response));
    } catch (error) {
      console.error(error)
    }
  }

  const handleInitiateConversation = (conversation: IConversation) => {
    dispatch(addConversation(conversation))
  }

  useEffect(() => {
    fetchLanguagePack();
    fetchUsers();
    conversationEvents(handleInitiateConversation)
  }, [])

  const { users } = useSelector((state: any) => state.users)
  const { conversations } = useSelector((state: any) => state.conversations)
  const { userState } = useSelector((state: any) => state.auth)

  const mappedUsers: User[] = users.filter((user: User) => user.id !== userState.user.id);

  const filteredUsers: User[] = mappedUsers
    ?.filter((user: User) => user?.firstName.toLowerCase().includes(searchText?.toLowerCase()))
    .slice(0, 15);

  const initiateConversation = (username: string, loggedUsername: string) => {
    const toCheck = [username, loggedUsername];
    const conversationExist: boolean = conversations.some((conversation: IConversation) =>
      toCheck.every(username => conversation.users.some(user => user.username === username))
    ); // Check if any conversation already has the given usernames

    if (conversationExist) {
      message.error(`You're already in conversation with ${username}`)
    } else {
      InitiatePrivateConversation(username, loggedUsername);
      message.success(`You initiated conversation with ${username}`)
    }
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
