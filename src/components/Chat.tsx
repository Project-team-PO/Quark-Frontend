import React, { useState, useEffect } from 'react';
import { Button, Card, Tooltip, Input, message } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import Connector from "../shared/signalr-conn"
import Message from './Message';
import styles from "../styles/Components/Chat.module.css"

import { IMessageGroup, ISendMessage } from '../ts/interfaces';
import { useSelector } from 'react-redux';

const getCurrTime = () => {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
}

const Chat: React.FC = () => {
	const params = useParams();
	const { userState } = useSelector((state: any) => state.auth)
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [messages, setMessages] = useState<IMessageGroup[]>([])
	const [messageInput, setMessageInput] = useState('');

	const groupName = params.conversationName!
	const connector = Connector.getInstance(groupName)

	const { events, SendMessage } = connector;

	useEffect(() => {
		const handleReceivedMessage = (message: IMessageGroup) => {
			console.log(`Message -> ${message.text} sent to ${groupName}`)
			setMessages(prev => [...prev, message])
		};

		const handleShowConversation = (conversationMessages: IMessageGroup[]) => {
			console.log(conversationMessages)
			setMessages(conversationMessages);
		}

		events(handleReceivedMessage, handleShowConversation)
	}, [events]);

	const handleEmojiClick = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmoji = (emojiObject: any) => {
		setMessageInput(messageInput + emojiObject.emoji);
	};

	const handleSend = () => {
		if (messageInput.trim() !== '') {
			const message: ISendMessage = {
				username: userState.user.username,
				text: messageInput,
				timestamp: getCurrTime()
			}
			SendMessage(message, groupName);
			setMessageInput('');
		}
	};

	return (
		<Card className={styles.chat_main}>
			<div style={{ background: '#fff', color: 'black', height: '85vh', overflowY: 'scroll' }}>
				{messages && messages.length === 0 ? <p>Type to start chatting</p> : ""}
				{messages.map((message) => (
					<Message message={message} key={message.id}/>
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
					placeholder={groupName == "global" ? `Type a message for everyone to see!` : `Type a message in ${groupName}`}
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
		</Card>
	);
};

export default Chat;
