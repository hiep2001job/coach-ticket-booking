// import { useCallback, useEffect, useState } from 'react';

// import './style.css';

// import Catalog from '../../features/catalog/Catalog';
// import Header from './Header';
// import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import { Route, Routes } from 'react-router-dom';
// import Home from '../../features/home/Home';
// import ProductDetail from '../../features/catalog/ProductDetail';
// import About from '../../features/about/About';
// import Contact from '../../features/contact/Contact';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ServerError from '../errors/ServerError';
// import NotFound from '../errors/NotFound';
// import BasketPage from '../../features/basket/BasketPage';
// import Loading from './Loading';
// import { useAppDispatch } from '../../store/configureStore';
// import { fetchBasketAsync } from '../../features/basket/basketSlice';
// import Login from '../../features/account/Login';
// import Register from '../../features/account/Register';
// import { fetchCurrentUser } from '../../features/account/accountSlice';
// import AuthWrapper from './AuthWrapper';
// import Orders from '../../features/order/Orders';
// import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';
// import Inventory from '../../features/admin/Inventory';


// function App() {
//   const dispatch = useAppDispatch();
//   const [loading, setLoading] = useState(true);

//   const initApp = useCallback(async () => {
//     try {
//       await dispatch(fetchCurrentUser());
//       await dispatch(fetchBasketAsync());
//     } catch (error) {
//       console.log(error);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     initApp().then(() => setLoading(false));
//   }, [dispatch, initApp])


//   const [darkMode, setDarkMode] = useState(false);
//   const paleteType = darkMode ? 'dark' : 'light';
//   const theme = createTheme({
//     palette: {
//       mode: paleteType,
//       background: {
//         default: paleteType === 'light' ? '#eaeaea' : '#121212'
//       }
//     }
//   })

//   function handleThemeChange() {
//     setDarkMode(!darkMode);
//   }

//   if (loading) return <Loading message='Initializing app...' />

//   return (
//     <ThemeProvider theme={theme}>
//       <ToastContainer position='bottom-right' hideProgressBar />
//       <CssBaseline />
//       <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
//       <Container>
//         <Routes >
//           {/* Public routes */}
//           <Route path='/' element={<Catalog />} />
//           {/* <Route path='/catalog' element={<Catalog />} /> */}
//           <Route path='/catalog/:id' element={<ProductDetail />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/server-error' element={<ServerError />} />
//           <Route path='/basket' element={<BasketPage />} />          
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='*' element={<NotFound />} />
          
//           {/* Authentication required routes */}
//           <Route element={<AuthWrapper />}>
//             <Route path='/checkout' element={<CheckoutWrapper />} />
//             <Route path='/orders' element={<Orders />} />
//           </Route>

//           {/* Authentication required routes */}
//           {/* Role Admin required */}
//           <Route element={<AuthWrapper roles={["Admin"]} />}>           
//             <Route path='/inventory' element={<Inventory />} />
//           </Route>

//         </Routes>
//       </Container>
//     </ThemeProvider>

//   );
// }

// export default App;
