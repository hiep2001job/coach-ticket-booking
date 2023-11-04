import React from "react";
import Container from "../../app/components/container/Container";
import { Card, Col, List, MenuProps, Row, Space, Typography } from "antd";
import { Link, Outlet, Route, Router, Routes } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import LogoutButton from "../../app/components/logoutbutton/LogoutButton";
const data: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link
        style={{ width: '100%', padding: '1rem' }}
        to='/tai-khoan/thong-tin-chung'>
        <UserOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Thông tin tài khoản
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link
        style={{ width: '100%', padding: '1rem' }}
        to='/tai-khoan/lich-su-mua-ve'>
        <ShoppingCartOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Lịch sử mua vé
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link
        style={{ width: '100%', padding: '1rem' }}
        to='/tai-khoan/dia-chi'>
        <ShoppingCartOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Địa chỉ của bạn
      </Link>
    ),
  },
  {
    key: '4',
    label: (
      <Link
        style={{ width: '100%', padding: '1rem' }}
        to='/tai-khoan/dat-lai-mat-khau'>
        <ShoppingCartOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Đặt lại mật khẩu
      </Link>
    ),
  },
  {
    key: '5',
    label: (
      <LogoutButton />
    ),
  },

];
const AccountInformation = () => {
  return (
    <>
      <Container>
        <Row gutter={[18, 20]} style={{ marginTop: 30, translate: '0 -7rem' }}>
          <Col md={{ span: 8 }} style={{ padding: "0 0.5rem 0 0" }}>

            <Card style={{ border: "1px solid orange", zIndex: 1000, position: 'relative', boxShadow: "2px", outline: "8px solid rgba(170,46,8,.1)" }}>
              <List

                bordered
                dataSource={data}
                renderItem={(item: any) => (
                  <List.Item style={{ padding: '0' }}>
                    {item.label}
                  </List.Item>
                )}
              />
            </Card>

          </Col>
          <Col md={{ span: 16 }}>
            <Card style={{ border: "1px solid orange", zIndex: 1000, position: 'relative', boxShadow: "2px", outline: "8px solid rgba(170,46,8,.1)" }}>
              <Outlet />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountInformation;
