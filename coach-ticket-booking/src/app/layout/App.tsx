import { useCallback, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Layout, Menu, Space, theme } from 'antd';
import Loading from '../components/Loading';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import NotFound from '../errors/NotFound';
import Home from '../../features/home/Home';




function App() {
    //   const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

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


    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#7dbcea',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#108ee9',
    };

    const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#3ba0e9',
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
    };

    if (loading) return <Loading message='Initializing app...' />

    return (
        <ConfigProvider
            theme={{
                // 1. Use dark algorithm
                algorithm: theme.darkAlgorithm,

                // 2. Combine dark algorithm and compact algorithm
                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <Header style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="demo-logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={new Array(15).fill(null).map((_, index) => {
                                const key = index + 1;
                                return {
                                    key,
                                    label: `nav ${key}`,
                                };
                            })}
                        />
                    </Header>
                    <Content style={contentStyle}>
                        <Routes >
                            {/* Public routes */}

                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='*' element={<NotFound />} />

                            {/* Authentication required routes */}

                            {/* <Route element={<AuthWrapper />}>
                        <Route path='/checkout' element={<CheckoutWrapper />} />
                        <Route path='/orders' element={<Orders />} />
                    </Route> */}

                            {/* Authentication required routes */}
                            {/* Role Admin required */}

                            {/* <Route element={<AuthWrapper roles={["Admin"]} />}>
                        <Route path='/inventory' element={<Inventory />} />
                    </Route> */}

                        </Routes>
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout></Space>
        </ConfigProvider>
        // <ThemeProvider theme={theme}>
        //     <ToastContainer position='bottom-right' hideProgressBar />
        //     <CssBaseline />
        //     <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        //     <Container>
        //         <Routes >
        //             {/* Public routes */}
        //             <Route path='/' element={<Catalog />} />
        //             {/* <Route path='/catalog' element={<Catalog />} /> */}
        //             <Route path='/catalog/:id' element={<ProductDetail />} />
        //             <Route path='/about' element={<About />} />
        //             <Route path='/contact' element={<Contact />} />
        //             <Route path='/server-error' element={<ServerError />} />
        //             <Route path='/basket' element={<BasketPage />} />
        //             <Route path='/login' element={<Login />} />
        //             <Route path='/register' element={<Register />} />
        //             <Route path='*' element={<NotFound />} />

        //             {/* Authentication required routes */}
        //             <Route element={<AuthWrapper />}>
        //                 <Route path='/checkout' element={<CheckoutWrapper />} />
        //                 <Route path='/orders' element={<Orders />} />
        //             </Route>

        //             {/* Authentication required routes */}
        //             {/* Role Admin required */}
        //             <Route element={<AuthWrapper roles={["Admin"]} />}>
        //                 <Route path='/inventory' element={<Inventory />} />
        //             </Route>

        //         </Routes>
        //     </Container>
        // </ThemeProvider>

    );
}

export default App;
