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
    label: <Link to={'/tai-khoan/lich-su-mua-ve'}>VÉ CỦA TÔI</Link>,
    key: 'lich-su-mua-ve',
    
    // icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/tai-khoan/thong-tin-chung'}>TÀI KHOẢN</Link>,
    key: 'thong-tin-chung',    
    // icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/tai-khoan/thong-tin-chung'}>DANH SÁCH ĐỊA CHỈ</Link>,
    key: 'thong-tin-chung',    
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