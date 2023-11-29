import React, { useState } from 'react';
import { Layout, Image } from 'antd';
import Quark from "../assets/Quark.png"
import QuarkSmall from "../assets/QuarkSmall.png"
import UserProfile from '../pages/UserProfile';

import styles from "../styles/Layouts/HomeLayout.module.css"
import UserMenu from '../components/UserMenu';
import SettingsMenu from '../components/SettingsMenu';
import { Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const HomeLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout_main}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {collapsed ? <Image src={QuarkSmall} preview={false} width={64} className={styles.layout_title_small} /> :
          <Image src={Quark} preview={false} width={200} className={styles.layout_title} />}
        <div className={styles.layout_menus}>
          <UserMenu />
          <SettingsMenu />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '64px', paddingRight: '24px', paddingLeft: '12px', background: "#f5f5f5" }}>
            <UserProfile />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;