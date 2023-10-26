import { useCallback, useEffect, useState } from "react";
import { ConfigProvider, Layout, Menu, Space } from "antd";
import Loading from "../components/loading/Loading";
import UserLayout from "../layout/UserLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../features/account/Login";
import Home from "../../features/home/Home";
import { Content } from "antd/es/layout/layout";
// import Register from "../../features/account/Register";
import NotFound from "../errors/NotFound";
import locale from 'antd/locale/vi_VN';
import AccountInformation from "../../features/account_information/AccountInformation";
import '../../App.css';
import { useAppDispatch } from "../../store/configureStore";
import ManagementLayout from "./ManagementLayout";
import Payment from "../components/payment/Payment";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PaymentResult from "../components/payment/PaymentResult";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  //initial app
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [dispatch, initApp])


  if (loading) return <Loading />;

  return (
    <ConfigProvider locale={locale} >
      <Space
        direction="vertical"
        style={{ width: "100%", height: "100vh",  }}
        size={[0, 48]}      >
        <Layout style={{backgroundColor:'white',height:'100vh'}}>
          <Content>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="/accountinformation" element={<AccountInformation />} />
                <Route path="/thanh-toan/:bookingCode" element={<Payment />} />
                <Route path="/payment-return" element={<PaymentResult />} />
              </Route>

              <Route path="/manage" element={<ManagementLayout />}>
                <Route index element={<NotFound />} />
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
