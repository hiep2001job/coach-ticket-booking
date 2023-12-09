
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Button, MenuProps } from 'antd'
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { Link } from 'react-router-dom';
import LogoutButton from '../../app/components/logoutbutton/LogoutButton';
import { useDispatch } from 'react-redux';
import { signOut } from './accountSlice';


const SignedInMenu = () => {
  const dispatch = useAppDispatch();
  const { userDetail } = useAppSelector(state => state.account)

  const items: MenuProps['items'] = useMemo(() => [
    {
      key: '1',
      label: (
        <Link
          to='/tai-khoan/thong-tin-chung'>
          <UserOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Thông tin tài khoản
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link
          to='/tai-khoan/lich-su-mua-ve'>
          <ShoppingCartOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Lịch sử mua vé
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link
          to='/tai-khoan/dia-chi'>
          <ShoppingCartOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Địa chỉ của bạn
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link
          to='/tai-khoan/dat-lai-mat-khau'>
          <ShoppingCartOutlined className='mr-2' style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }} />Đặt lại mật khẩu
        </Link>
      ),
    },
    {
      key: '5',
      label: (
        <div style={{ cursor: 'pointer', width: '100%' }} onClick={() => dispatch(signOut())}>
          <LogoutOutlined
            className='mr-2'
            style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '0.5rem' }}
          />LogoutButton</div>
      ),
    },

  ], []);

  return (
    <Dropdown menu={{ items }} placement="bottomRight" >

      <span style={{
        fontSize: '1.1em',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}
        className='mt-2'>
        <UserOutlined style={{ fontSize: '1.5em', marginRight: '0.5rem' }} />
        {userDetail?.fullname}
      </span>

    </Dropdown>
  )
}

export default SignedInMenu