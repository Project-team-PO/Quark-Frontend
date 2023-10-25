import { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Button } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const people = [
    { name: 'Yami', id: 1 },
    { name: 'Kayzz', id: 2 },
    { name: 'korekso', id: 3 },
    { name: 'Kacper Mańczyk', id: 4},
    { name: 'Damian Nussbaum', id: 5}
];

const Chat = () => {
    return (
        <div style={{ height: '100%' }}>
            {/* <div style={{ background: '#36393f', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }}>
                Chat
            </div> */}
            <div style={{ background: '#2f3136', color: 'white' ,height: '90%'}}>
                Messages go here
            </div>
            <div style={{ background: '#36393f', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '17px' }}>
                <input type="text" placeholder="Type a message" style={{ flexGrow: 1, padding: '12px', borderRadius: '4px', border: 'none', background: '#40444b', color: '#fff', fontSize: '16px' }} />
                <Button type="primary" style={{ marginLeft: '8px' }}>Send</Button>
            </div>
        </div>
    );
};

const Home = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', color: '#fff', fontSize: '24px' }}>
                    Quark
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="0" icon={<UserOutlined />}>
                        People
                        <Badge count={5} style={{ marginLeft: '8px' }} />
                    </Menu.Item>
                    {people.map(person => (
                        <Menu.Item key={person.id} icon={<UserOutlined />}>
                            {person.name}
                        </Menu.Item>
                    ))
                    }
                    <Menu.Item key="chat" icon={<MessageOutlined />} onClick={toggleChat}>
                        Chat
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ background: '#36393f'}}>
                <Header style={{ background: '#36393f', padding: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '64px', paddingRight: '24px', paddingLeft: '12px' }}>
                        <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: '16px' }} />
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Kacper Mańczyk</span>
                    </div>
                </Header>
                
                {showChat ? 
                <Content style={{ margin: '0px' }}>
                  <Chat />
                </Content>
                : 
                <Content style={{ margin: '16px' }}>
                    <div style={{ background: '#fff', padding: '24px', minHeight: '360px' }}>
                        Content goes here
                    </div>
                </Content>
                }
            </Layout>
        </Layout>
    );
};

export default Home;
