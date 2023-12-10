import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Connector from "../shared/signalr-conn"

import Message from './Message';
import styles from "../styles/Components/Chat.module.css"

import { IMessage } from '../ts/interfaces';

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
	const [messages, setMessages] = useState<IMessage[]>([{ text: `Hello, ${userState.user.firstName}!`, timestamp: getCurrTime(), sender: params.username }]);
	const [messageInput, setMessageInput] = useState('');

	const { PushMessage, events } = Connector();
	useEffect(() => {
		events((message) => {
			console.log(message);
			const newMessage: IMessage = {
				text: message,
				timestamp: getCurrTime(),
				sender: userState.user.username,
			};
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
			const newMessage: IMessage = {
				text: messageInput,
				timestamp: getCurrTime(),
				sender: `${userState.user.firstName} ${userState.user.lastName}`,
			};
			PushMessage(newMessage.text);
			setMessageInput('');
		}
	};

	return (
		<Card className={styles.chat_main}>
			<div style={{ background: '#fff', color: 'black', height: '85vh', overflowY: 'scroll' }}>
				{messages.map((message, index) => (
					<Message message={message} index={index} params={params} />
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
					placeholder={`Type a message to ${params.username}`}
					style={{
						padding: '15px',
						borderRadius: '4px',
						border: 'solid 1px #d9d9d9',
						background: '#fff',
						color: '#fff',
						fontSize: '16px',

					}}

					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					onPressEnter={handleSend}
					suffix={
						<>
							<Button onClick={handleEmojiClick}>
								<SmileOutlined />
							</Button>
							{showEmojiPicker ? (
								<div className="emoji-picker-upwards">
									<EmojiPicker onEmojiClick={handleEmoji} width='900' />
								</div>
							) : null}
							<Button onClick={handleSend}>
								<SendOutlined className="site-form-item-icon" />
							</Button>
						</>
					}
				/>
			</div>
		</Card>
	);
};

export default Chat;
