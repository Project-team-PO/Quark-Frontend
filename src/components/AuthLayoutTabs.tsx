import React from 'react';
import { Tabs } from 'antd';
import { Outlet, Link } from 'react-router-dom';

import PATH from '../routes/urls';

const tabs = [
  {
    name: "Sign In",
    url: PATH.SIGN_IN,
  },
  {
    name: "Activate account",
    url: PATH.ACTIVATE_ACCOUNT,
  }
]

const AuthLayoutTabs: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={tabs.map((tab, i) => {
      const id = String(i + 1);
      return {
        label: (
          <Link to={tab.url}>
            {tab.name}
          </Link>
        ),
        key: id,
        children: <Outlet />,
      };
    })}
  />
);

export default AuthLayoutTabs;