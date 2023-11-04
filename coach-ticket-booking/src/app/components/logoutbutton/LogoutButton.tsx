import React from 'react'
import { useAppDispatch } from '../../../store/configureStore'
import { signOut } from '../../../features/account/accountSlice';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutButton = () => {
    const dispatch = useAppDispatch();
    return (
        <div style={{cursor:'pointer',width:'100%',padding:'1rem'}} onClick={() => dispatch(signOut())}>
            <LogoutOutlined
                className='mr-2'
                style={{ fontSize: '1.5em', fontWeight: 'bold',padding:'0.5rem' }}
            />LogoutButton</div>
    )
}

export default LogoutButton