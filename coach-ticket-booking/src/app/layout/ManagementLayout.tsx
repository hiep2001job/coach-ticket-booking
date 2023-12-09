import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, MenuProps } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTicket, faUsers,faRoute, faBus, faBuilding } from '@fortawesome/free-solid-svg-icons';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
  { key: '1', icon: <FontAwesomeIcon icon={faHouse} />, label: <Link to='/quan-ly'>Trang chủ</Link> },
  // { key: '2', icon: <FontAwesomeIcon icon={faUsers} />, label: <Link to='/quan-ly/khach-hang'>Khách hàng</Link> },
  { key: '3', icon: <FontAwesomeIcon icon={faTicket} />, label: <Link to='/quan-ly/dat-ve'>Đặt vé</Link> },
  { key: '4', icon: <FontAwesomeIcon icon={faBuilding} />, label: <Link to='/quan-ly/van-phong'>Văn phòng</Link> },
  { key: '5', icon: <FontAwesomeIcon icon={faRoute} />, label: <Link to='/quan-ly/tuyen-duong'>Tuyến đường</Link> },
  { key: '6', icon: <FontAwesomeIcon icon={faBus} />, label: <Link to='/quan-ly/chuyen-xe'>Chuyến xe</Link> },
];


const ManagementLayout: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{
          height: '32px',
          margin: '16px',
          backgroundColor: 'rgba(255,255,255,.2)',
          borderRadius: '6px',
          textAlign: 'center',
          color: 'white',
          padding: '0.3rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}  >COACHLINEZ</div>
        <Menu
          defaultSelectedKeys={['1']}         
          mode='vertical'
          theme='light'
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagementLayout;