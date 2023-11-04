// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
// import { useAppDispatch, useAppSelector } from '../../store/configureStore';
// import { signOut } from './accountSlice';
// import { clearBasket } from '../basket/basketSlice';
// import { Link } from 'react-router-dom';

// export default function SignedInMenu() {
//     const dispatch = useAppDispatch();
//     const { user } = useAppSelector(state => state.account);

//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event: any) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <>
//             <Button
//                 color='inherit'
//                 onClick={handleClick}
//                 sx={{ typography: 'h6' }}
//             >
//                 {user?.email}
//             </Button>
//             <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 TransitionComponent={Fade}
//             >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem component={Link} to='/orders'>My orders</MenuItem>
//                 <MenuItem onClick={()=>{
//                     dispatch(signOut());
//                     dispatch(clearBasket());
//                 }}>Logout</MenuItem>
//             </Menu>
//         </>
//     );
// }
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Button, MenuProps } from 'antd'
import React from 'react'
import { useAppSelector } from '../../store/configureStore';
import { Link } from 'react-router-dom';
import LogoutButton from '../../app/components/logoutbutton/LogoutButton';
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link
        to='/tai-khoan/thong-tin-chung'>
        <UserOutlined className='mr-2' style={{fontSize:'1.5em',fontWeight:'bold',padding:'0.5rem'}} />Thông tin tài khoản
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link
        to='/tai-khoan/lich-su-mua-ve'>
       <ShoppingCartOutlined className='mr-2' style={{fontSize:'1.5em',fontWeight:'bold',padding:'0.5rem'}} />Lịch sử mua vé
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link
        to='/tai-khoan/dia-chi'>
       <ShoppingCartOutlined className='mr-2'  style={{fontSize:'1.5em',fontWeight:'bold',padding:'0.5rem'}} />Địa chỉ của bạn
      </Link>
    ),
  },
  {
    key: '4',
    label: (
      <Link
        to='/tai-khoan/dat-lai-mat-khau'>
       <ShoppingCartOutlined className='mr-2' style={{fontSize:'1.5em',fontWeight:'bold',padding:'0.5rem'}} />Đặt lại mật khẩu
      </Link>
    ),
  },
  {
    key: '5',
    label: (
      <LogoutButton/>
    ),
  },

];

const SignedInMenu = () => {
  const { userDetail } = useAppSelector(state => state.account)
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