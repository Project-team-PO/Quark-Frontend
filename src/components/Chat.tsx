import React, { useState, useEffect } from 'react';
import { Button, Card, Tooltip, Input } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import Connector from "../shared/signalr-conn"
import Message from './Message';
import styles from "../styles/Components/Chat.module.css"

import { IMessageGroup, ISendMessage } from '../ts/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setMessages } from '../app/slices/messages.slice';

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
	const [messageInput, setMessageInput] = useState('');

	const currentGroup = params.conversationName!;

	const dispatch = useDispatch();

	const connector = Connector.getInstance()

	const { chatEvents, SendMessage, OpenConversation } = connector;

	const { messages } = useSelector((state: any) => state.messages);

	useEffect(() => {
		const handleReceivedMessage = (message: IMessageGroup) => {
			console.log(`Message -> ${message.text} sent to ${currentGroup}`)
			dispatch(addMessage(message))
		};

		const handleShowConversation = (conversationMessages: IMessageGroup[]) => {
			console.log(conversationMessages)
			dispatch(setMessages(conversationMessages))
		}

		OpenConversation(currentGroup)

		chatEvents(handleReceivedMessage, handleShowConversation)

		return () => {
			chatEvents(() => { }, () => { })
		}
	}, [currentGroup, chatEvents, OpenConversation]);

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
			SendMessage(message, currentGroup);
			setMessageInput('');
		}
	};

	return (
		<Card className={styles.chat_main}>
			<div style={{ background: '#fff', color: 'black', height: '85vh', overflowY: 'scroll' }}>
				{messages && messages.length === 0 ? <p>Type to start chatting</p> : ""}
				{messages.map((message: IMessageGroup) => (
					<Message message={message} key={message.id} />
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
					placeholder={`Write a message to the members of ${currentGroup} group!`}
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
