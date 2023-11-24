import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';

interface Message {
    text: string;
    timestamp: string;
    sender: string |undefined;
}

const Chat: React.FC = () => {
    const params = useParams();
    console.log(params.username)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ text: 'Hello', timestamp: '12:00', sender: 'Yami' }]);
    const [messageInput, setMessageInput] = useState('');

    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);

    };

    const handleEmoji = (emojiObject: any) => {
        setMessageInput(messageInput + emojiObject.emoji);
    };

    const handleSend = () => {
        if (messageInput.trim() !== '') {
            const newMessage: Message = {
                text: messageInput,
                timestamp: new Date().toLocaleTimeString(),
                sender: params.username,
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    };

    return (
        <div>
            <div style={{ background: '#FAF9F6', color: 'black', height: '85vh', overflowY: 'scroll' }}>
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
                                    backgroundColor: message.sender === params.username ? '#0084ff' : '#f0f0f0',
                                    color: message.sender === params.username ? 'white' : 'black',
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
        </div>
    );
};

export default Chat;
