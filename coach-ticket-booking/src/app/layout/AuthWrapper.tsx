// import React from 'react'
// import { useAppSelector } from '../../store/configureStore'
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

// interface Props{
//     roles?:string[]
// }

// const AuthWrapper = ({roles}:Props) => {
//     const { user } = useAppSelector(state => state.account);
//     const location = useLocation();

//     if (!user) return <Navigate to="/login" state={{ from: location }} replace />

//     if (!roles?.some((r: string) => user.roles?.includes(r))) {
//         toast.error("Not authorized to access this area");
//         return <Navigate to="/catalog" state={{ from: location }} replace />
//     }

//     return <Outlet />;
// }

// export default AuthWrapper