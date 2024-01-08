import React, { useState, useEffect } from 'react';
import { Button, Card, Tooltip, Modal, Input, List, Avatar, message } from 'antd';
import { SmileOutlined, SendOutlined, UsergroupAddOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import Connector from "../shared/signalr-conn"
import Message from './Message';
import styles from "../styles/Components/Chat.module.css"

import { IMessage } from '../ts/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../app/slices/user.slice';
import { useGetUsersEndpointMutation } from '../app/slices/auth.api.slice';

import { User } from '../ts/interfaces';

const getCurrTime = () => {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
}

const Chat: React.FC = () => {
	const params = useParams();
	const { userState } = useSelector((state: any) => state.auth)
	const [ModalVisible, setModalVisible] = useState(false);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([])
	const [messageInput, setMessageInput] = useState('');

	const { PushMessage, events } = Connector();

	useEffect(() => {
		events((message, username) => {
			const newMessage: IMessage = {
				text: message,
				timestamp: getCurrTime(),
				sender: username
			};
			console.log(`Message -> ${newMessage.text} sent by ${username}`);
			setMessages(prev => [...prev, newMessage]);
		});
	}, [events]);

	const handleEmojiClick = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmoji = (emojiObject: any) => {
		setMessageInput(messageInput + emojiObject.emoji);
	};

	const handleSend = () => {
		if (messageInput.trim() !== '') {
			PushMessage(messageInput, userState.user.username);
			setMessageInput('');
		}
	};

	const handleGroupChat = () => {
		setModalVisible(true);
	};

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

	const AddToChatRoom = (user: User) => {
		const userExists = favourites.find((favUser: User) => favUser.email === user.email);
		if (!userExists) {
			//dispatch(AddToChatRoom(user));
			message.success(`${user.firstName} added successfully!`);
		} else {
			message.warning('User already added!');
		}
	}
	return (
		<Card className={styles.chat_main}>
			<div style={{ background: '#fff', color: 'black', height: '85vh', overflowY: 'scroll' }}>
				{messages && messages.length === 0 ? <p>Type to start chatting</p> : ""}
				{messages.map((message, index) => (
					<Message message={message} index={index} />
				))}
			</div>
			<div
				className={styles.chat_input}
				style={{
					background: '#fff',
					height: '64px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '20px',

				}}
			>
				<Input
					type="text"
					placeholder={params.username == "global" ? `Type a message for everyone to see!` : `Type a message to ${params.username}`}
					style={{
						padding: '15px',
						borderRadius: '4px',
						border: 'solid 1px #d9d9d9',
						background: '#fff',
						color: '#fff',
						fontSize: '16px',
						position: 'absolute',
						bottom: '0',

					}}

					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					onPressEnter={handleSend}
					suffix={
						<>
							<Tooltip title="Group Chat" >
								<Button onClick={handleGroupChat}>
									<UsergroupAddOutlined />
								</Button>
							</Tooltip>
							<Tooltip title="Emoji" >
								<Button onClick={handleEmojiClick}>
									<SmileOutlined />
								</Button>
							</Tooltip>
							<Tooltip title="Send" >
								{showEmojiPicker ? (
									<div className="emoji-picker-upwards">
										<EmojiPicker onEmojiClick={handleEmoji} width='900' />
									</div>
								) : null}
								<Button onClick={handleSend}>
									<SendOutlined className="site-form-item-icon" />
								</Button>
							</Tooltip>
						</>
					}
				/>
			</div>
			<Modal
				title="Group Chat"
				open={ModalVisible}
				onCancel={() => { setModalVisible(false) }}
				onOk={() => { setModalVisible(false) }}

			>
				<Card style={{ background: '#FFFFFF', padding: '0 10px 10px 24px', minHeight: '360px', border: 'none' }}>
					<h2>Search for users</h2>
					<Input
						placeholder="Search for users"
						onChange={e => setSearchText(e.target.value)}
						style={{ margin: '10px 0 15px 0' }}
					/>

					<List
						itemLayout="horizontal"
						dataSource={filteredUsers}
						renderItem={(user: User) => (

							<List.Item className={styles.user_list_item}>
								<List.Item.Meta
									avatar={<Avatar src={user.pictureUrl} />}
									title={`${user.firstName} ${user.lastName}`}
								/>
								<Tooltip title="Delete from Chat Room" >
									<MinusOutlined />
								</Tooltip>
								<Tooltip title="Add to Chat Room" >
									<PlusOutlined style={{ marginLeft: '5px' }} onClick={() => AddToChatRoom(user)} />
								</Tooltip>

							</List.Item>

						)}
					/>
				</Card>
			</Modal>

		</Card>
	);
};

export default Chat;
