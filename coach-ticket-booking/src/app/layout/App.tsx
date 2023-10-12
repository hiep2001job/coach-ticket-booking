import { useState } from "react";
import { ConfigProvider, Layout, Menu, Space } from "antd";
import Loading from "../components/Loading";
import UserLayout from "../layout/UserLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../features/account/Login";
import Home from "../../features/home/Home";
import { Header, Content } from "antd/es/layout/layout";
import Register from "../../features/account/Register";
import NotFound from "../errors/NotFound";
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';


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

  // const headerStyle: React.CSSProperties = {
  //     textAlign: 'center',
  //     color: '#fff',
  //     height: 64,
  //     paddingInline: 50,
  //     lineHeight: '64px',
  //     backgroundColor: '#7dbcea',
  // };

  // const contentStyle: React.CSSProperties = {
  //     textAlign: 'center',
  //     minHeight: 120,
  //     lineHeight: '120px',
  //     color: 'red',
  //     // backgroundColor: '#108ee9',
  // };

  // const siderStyle: React.CSSProperties = {
  //     textAlign: 'center',
  //     lineHeight: '120px',
  //     color: '#fff',
  //     // backgroundColor: '#3ba0e9',
  // };

  // const footerStyle: React.CSSProperties = {
  //     textAlign: 'center',
  //     color: '#fff',
  //     // backgroundColor: '#7dbcea',
  // };

  if (loading) return <Loading message="Initializing app..." />;

  return (
    <ConfigProvider locale={locale}>
      <Space
        direction="vertical"
        style={{ width: "100%", height: "100%" }}
        size={[0, 48]}      >
        <Layout>          
          <Content>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="*" element={<NotFound />} />

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
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

export default App;
