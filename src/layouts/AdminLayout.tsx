import React, { useState } from 'react';
import { Layout, theme, Image } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet } from 'react-router-dom';
import { Menu } from 'antd/lib';
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';


type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Sider } = Layout;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}


const items: MenuItem[] = [
    getItem(<NavLink to="/admin/dashboard" >Dashboard</NavLink>, '1', <DesktopOutlined />),
    getItem(<NavLink to="/admin/statistics" >Statistics</NavLink>, '2', <PieChartOutlined />),
    getItem('Managers', 'sub1', <UserOutlined />, [
        getItem(<NavLink to="/admin/managers/tom" >Tom</NavLink>, '3'),
        getItem(<NavLink to="/admin/managers/bill" >Bill</NavLink>, '4'),
        getItem(<NavLink to="/admin/managers/alex" >Alex</NavLink>, '5'),
    ]),
    getItem('Teams', 'sub2', <TeamOutlined />, [
        getItem(<NavLink to="/admin/teams/hr" >HR Department</NavLink>, '6'),
        getItem(<NavLink to="/admin/teams/it" >IT Team</NavLink>, '8'),
    ])
];

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </React.Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;