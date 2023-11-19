import { useState } from 'react';
import { Layout, Menu, Badge, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserProfile from './UserProfile';
import Chat from '../components/Chat';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import UserSearch from '../components/UserSearch';
import { useSelector } from 'react-redux';
import { User } from '../types/types';


const { Header, Content, Sider } = Layout;

  
const people: User[] = [
    { name: 'Yami', id: 1 },
    { name: 'Kayzz', id: 2 },
    { name: 'korekso', id: 3 },
    { name: 'Kacper Mańczyk', id: 4},
    { name: 'Damian Nussbaum', id: 5},
    { name: 'bartek', id: 6},
    { name: 'pawel', id: 7},
    { name: 'kuba', id: 8},
    { name: 'michal', id: 9},
    { name: 'ola', id: 10},
    { name: 'kasia', id: 11},
    { name: 'Jhon', id: 12},
    { name: 'Doe', id: 13},
    { name: 'Jane', id: 14},
    { name: 'albert', id: 15},
    { name: 'kamil', id: 16},
    { name: 'yamada', id: 17},
    { name: 'asuka', id: 18},
    
    
];


const items: MenuProps['items'] = [
    {
      key: '1',
      type: 'group',
      label: 'Basic settings',
      children: [
        {
          key: '1-1',
          label: 'Change Theme',
        },
        {
          key: '1-2',
          label: 'Mute Notifications',
        },
      ],
    },
  ];


const Home = () => {
    const [showChat, setShowChat] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState(''); 
    //@ts-ignore
    const users: User[] = useSelector(state => state.users.users);

    const handlePersonClick = (username: string) => {
        setShowChat(true);
        setSelectedUsername(username); 
    };
    
    console.log(users);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', color: '#fff', fontSize: '24px' }}>
                   <img src='quarkLogo.png' style={{ width: '6.7rem', height: '2.5rem'}} />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                    <Menu.Item key="0" icon={<UserOutlined />} onClick={()=>setShowChat(false)}>
                        People
                        <Badge count={100} style={{ marginLeft: '8px' }} />
                    </Menu.Item>
                    {users.map(person => (
                    <Menu.Item key={person.id} icon={<UserOutlined />} onClick={() => handlePersonClick(person.name)}>
                        {person.name}
                    </Menu.Item>
                    ))}
                </Menu>
                <footer  style={{display: 'flex', alignItems: 'bottom'}}>
                    <Dropdown menu={{ items }} placement="topRight" arrow>
                        <Button type="primary" style={{width: '12rem',margin: '5px', position: 'absolute', bottom: 0}}>Settings</Button>                
                    </Dropdown>
                </footer>
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
                        <UserSearch users={people} />
                    </div>
                </Content>
                }
                
            </Layout>
        </Layout>
    );
};

export default Home;
