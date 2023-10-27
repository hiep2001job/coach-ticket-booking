import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './AppMenu.css';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: <Link to={'/'}>TRANG CHỦ</Link>,
    key: 'home',
    // icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/contact'}>TRA CỨU VÉ</Link>,
    key: 'tra-cuu-ve',
    
    // icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/news'}>TIN TỨC</Link>,
    key: 'news',
    // icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/contact'}>LIÊN HỆ</Link>,
    key: 'contact',
    // icon: <HomeOutlined />,
  },
  {
    label: 'VỀ CHÚNG TÔI',
    key: 'about_us',
    // icon: <HomeOutlined />,
  },
];

const AppMenu: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='MenuLayout mt-3 mb-3'/>
}
export default AppMenu;