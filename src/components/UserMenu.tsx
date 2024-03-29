import React from 'react'
import { Menu, Badge, Spin, Avatar } from 'antd';
import { UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { IConversation } from '../ts/interfaces';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Tour from 'antd/lib/tour';
import type { TourProps } from 'antd';
import { setOpenModalUserMenu } from '../app/slices/tour.slice';
import { useSelector, useDispatch } from 'react-redux';
import { useGetConversationsEndpointMutation } from '../app/slices/auth.api.slice';
import { setConversations } from '../app/slices/conversations.slice';
import { filterConversation } from '../shared/functions';

const UserMenu: React.FC = () => {
  //@ts-ignore
  const language: string = useSelector((state: { language: { currentLanguage: string } }) => state.language.currentLanguage);
  const [languagePack, setLanguagePack] = useState<any>("");
  const dispatch = useDispatch();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const [GetConversationsEndpoint, { isLoading }] = useGetConversationsEndpointMutation();

  const { userState } = useSelector((state: any) => state.auth);
  const userId = userState.user.id;

  const open = useSelector((state: any) => state.tour.openModalUserMenu)
  const steps: TourProps['steps'] = [
    {
      title: 'People',
      description: 'here you can Search Quark members and add them to chat.',
      target: () => ref1.current,
    },
    {
      title: 'Announcements',
      description: 'There you will find Quark Announcements meetings and other informations.',
      target: () => ref2.current,
    },
    {
      title: 'Global Chat',
      description: 'Here you can with all quark members.',
      target: () => ref3.current,
    },
    {
      title: 'Chats',
      description: 'Here you can open chats to added people.',
      target: () => ref4.current,
    },
  ];

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
    const fetchConversations = async () => {
      try {
        const response = await GetConversationsEndpoint(userId).unwrap();
        dispatch(setConversations(response.conversations));
      } catch (error) {
        console.error(error)
      }
    }
    fetchConversations();
  }, [userId])

  const { conversations } = useSelector((state: any) => state.conversations);

  const conversationsMapped = conversations.map((conversation: IConversation) => {
    const newConversation = {
      ...conversation,
      users: filterConversation(conversation.users, userId)
    }
    return newConversation
  })

  return (
    <div>
      <Menu theme="dark" mode="inline" >
        <Menu.Item key="-1" icon={<UserOutlined />}>
          <NavLink ref={ref1} to="/home/search">{languagePack.people}</NavLink>
          {isLoading ? <Spin style={{ paddingLeft: '5px' }}/> : <Badge count={conversations.length} style={{ marginLeft: '8px' }} />}
        </Menu.Item>
        <Menu.Item key="-0" icon={<ScheduleOutlined />}>
          <NavLink ref={ref2} to="/home/Announcements">{languagePack.announcements}</NavLink>
        </Menu.Item>

        <span style={{ color: 'gray', marginLeft: '16px', fontSize: 10 }}>{languagePack.channels}</span>
        {conversationsMapped ? conversationsMapped.map((conversation: IConversation) => (
          <Menu.Item key={conversation.id}>
            <div ref={ref4}>
              <Avatar src={conversation.users[0].pictureUrl} />
              <NavLink to={`/home/chat/${conversation.name}`} style={{ marginLeft: "15px" }}>
                {conversation.users[0].firstName} {conversation.users[0].lastName}
              </NavLink>
            </div>
          </Menu.Item>
        )) : "Loading.."}

      </Menu>
      <Tour open={open} onClose={() => dispatch(setOpenModalUserMenu())} steps={steps} />
    </div>
  )
}

export default UserMenu