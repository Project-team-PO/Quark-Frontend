import { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Button } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import { Tooltip, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import { SmileOutlined } from '@ant-design/icons';
import UserProfile from './UserProfile';

const { Header, Content, Sider } = Layout;
type ChatProps = {
    username: string;
};
  
const people = [
    { name: 'Yami', id: 1 },
    { name: 'Kayzz', id: 2 },
    { name: 'korekso', id: 3 },
    { name: 'Kacper Mańczyk', id: 4},
    { name: 'Damian Nussbaum', id: 5}
];

const Chat: React.FC<ChatProps>  = ({username}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmoji = (event: any, emojiObject: any) => {
        console.log(emojiObject);
    };
    return (
        <div style={{ height: '100%' }}>
            <div style={{ background: '#FAF9F6', color: 'black' ,height: '90%'}}>
                <p style={{ padding: 30}}>Messages to {username}</p>
            </div>
            <div style={{ background: '#FAF9F6', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <Input type="text"  placeholder={`Type a message to ${username}`} style={{ flexGrow: 1, padding: '12px', borderRadius: '4px', border: 'none', background: '#fff', color: '#fff', fontSize: '16px' }} 
                 suffix={
                    <>
                    <Button onClick={handleEmojiClick} ><SmileOutlined />{showEmojiPicker ? <div className="emoji-picker-upwards" ><EmojiPicker onEmojiClick={handleEmoji} /></div> : null}</Button>
                    <Button><SendOutlined className="site-form-item-icon"/></Button>
                    </>
                  }
                  
                 />
            </div>
        </div>
    );
};

const Home = () => {
    const [showChat, setShowChat] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState(''); 

    const handlePersonClick = (username: string) => {
        setShowChat(true);
        setSelectedUsername(username); 
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', color: '#fff', fontSize: '24px' }}>
                   <img src='quarkLogo.png' style={{ width: '6.7rem', height: '2.5rem'}} />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="0" icon={<UserOutlined />} onClick={()=>setShowChat(false)}>
                        People
                        <Badge count={5} style={{ marginLeft: '8px' }} />
                    </Menu.Item>
                    {people.map(person => (
                    <Menu.Item key={person.id} icon={<UserOutlined />} onClick={() => handlePersonClick(person.name)}>
                        {person.name}
                    </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout style={{ background: '#fff'}}>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '64px', paddingRight: '24px', paddingLeft: '12px' }}>

                        <UserProfile selectedUsername={selectedUsername} />
                    </div>
                </Header>
                
                {showChat ? 
                <Content style={{ margin: '0px' }}>
                  <Chat username={selectedUsername}/>
                </Content>
                : 
                <Content style={{ margin: '16px' }}>
                    <div style={{ background: '#F9F6EE', padding: '24px', minHeight: '360px' }}>
                        Content goes here
                    </div>
                </Content>
                }
            </Layout>
        </Layout>
    );
};

export default Home;
