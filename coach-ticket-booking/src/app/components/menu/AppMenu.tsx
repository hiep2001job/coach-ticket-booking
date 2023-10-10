import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './AppMenu.css';

const items: MenuProps['items'] = [
  {
    label: 'HOME',
    key: 'home',
    // icon: <HomeOutlined />,
  },
  {
    label: 'MANAGE BOOKING',
    key: 'manage_booking',
    // icon: <HomeOutlined />,
  },
  {
    label: 'NEWS',
    key: 'news',
    // icon: <HomeOutlined />,
  },
  {
    label: 'CONTACT',
    key: 'contact',
    // icon: <HomeOutlined />,
  },
  {
    label: 'ABOUT US',
    key: 'about_us',
    // icon: <HomeOutlined />,
  },
  {
    label: 'BOOKING',
    key: 'booking',
    // icon: <HomeOutlined />,
  }
  
];

const AppMenu: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='MenuLayout'/>
}
export default AppMenu;