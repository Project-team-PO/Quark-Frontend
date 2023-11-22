import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import UserProfile from '../pages/UserProfile';
import { RootState } from '../app/store';
import { VideoCameraOutlined, PushpinOutlined, PhoneOutlined } from '@ant-design/icons';

           
interface ChatProps {
    username: string;
}

interface Message {
    text: string;
    timestamp: string;
    sender: string;
}

const Chat: React.FC<ChatProps> = ({ username }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{text: 'Hello', timestamp: '12:00', sender: 'Yami'}]);
    const [messageInput, setMessageInput] = useState('');
    const activeUser = useSelector((state: RootState) => state.users.activeUser);

    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
        
    };

    const handleEmoji = (emojiObject: any, event:any) => {
        setMessageInput(messageInput + emojiObject.emoji);
    };
    
    const handleSend = () => {
        if (messageInput.trim() !== '') {
            const newMessage: Message = {
                text: messageInput,
                timestamp: new Date().toLocaleTimeString(),
                sender: username,
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    };

    return (
        <>
            <div style={{ background: '#fff' }}>
                <div style={{display: 'flex', justifyContent: 'space-between',  padding: '9px' }}>
                    <div style={{ }}>
                        <UserProfile selectedUsername={activeUser} />
                    </div>
                    <div style={{ marginLeft: '110svh', padding: '11px' }}>
                        <PhoneOutlined style={{ marginRight: '10px' }} />
                        <VideoCameraOutlined style={{ marginRight: '10px' }} />
                        <PushpinOutlined />
                    </div>
                </div>
            </div>
            <div style={{ background: '#FAF9F6', color: 'black', height: '90vh', overflowY: 'scroll' }}>
            {messages.map((message, index) => (
                <div key={index} style={{ marginLeft: 5, marginRight: 6 }}>
                    <div
                        style={{
                            display: 'block',
                            wordWrap: 'break-word', 
                            fontSize: 20,
                        }}
                    >
                        <span style={{ fontSize: 10, color: 'gray' }}>{message.sender}</span>
                        <div
                            style={{
                                backgroundColor: message.sender === username ? '#0084ff' : '#f0f0f0',
                                color: message.sender === username ? 'white' : 'black',
                                borderRadius: 10,
                                padding: 10,
                            }}
                        >
                            <p style={{ margin: 0 }}>{message.text}</p>
                            <span style={{ fontSize: 10 }}>{message.timestamp}</span>
                        </div>
                        
                    </div>
                </div>
            ))}

            </div>
            <div
                style={{
                    background: '#FAF9F6',
                    height: '5vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}
            >
                <Input
                    type="text"
                    placeholder={`Type a message to ${username}`}
                    style={{
                        flexGrow: 1,
                        padding: '12px',
                        borderRadius: '4px',
                        border: 'none',
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
        </>
    );
};

export default Chat;
