import { useCallback, useEffect, useState } from "react";
import { ConfigProvider, Layout, Space } from "antd";
import Loading from "../components/loading/Loading";
import UserLayout from "../layout/UserLayout";
import { Route, Routes } from "react-router-dom";
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
import AuthWrapper from "./AuthWrapper";
import GeneralAccountInfo from "../components/generalaccountinfo/GeneralAccountInfo";
import TicketHistory from "../components/tickethistory/TicketHistory";
import Dashboard from "../../features/management/dashboard/Dashboard";
import Offices from "../../features/management/office/Offices";
import TripRoutes from "../../features/management/route/Routes";
import Trips from "../../features/management/trips/Trips";
import Bookings from "../../features/management/bookings/Bookings";
import Customers from "../../features/management/customer/Customers";

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
        style={{ width: "100%", height: "100vh", }}
        size={[0, 48]}      >
        <Layout style={{ backgroundColor: 'white', height: '100vh' }}>
          <Content>
            <Routes>
              {/* Public routes */}


              <Route path="/" element={<UserLayout />}>
                <Route path="login" element={<Login />} />
                <Route index element={<Home />} />
                <Route path="thanh-toan/:bookingCode" element={<Payment />} />
                <Route path="payment-return" element={<PaymentResult />} />

                {/* Authentication required routes */}
                <Route element={<AuthWrapper roles={['Customer']} />}>
                  <Route path="tai-khoan" element={<AccountInformation />} >
                    <Route index element={<GeneralAccountInfo />} />
                    <Route path='thong-tin-chung' element={<GeneralAccountInfo />} />
                    <Route path='lich-su-mua-ve' element={<TicketHistory />} />
                    <Route path='dia-chi' element={<GeneralAccountInfo />} />
                  </Route>
                </Route>
              </Route>
              {/* Management - Authentication required routes */}
              <Route path="quan-ly" element={<ManagementLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="khach-hang" element={<Customers />} />
                <Route path="van-phong" element={<Offices />} />
                <Route path="tuyen-duong" element={<TripRoutes />} />
                <Route path="chuyen-xe" element={<Trips />} />
                <Route path="xe" element={<Dashboard />} />
                <Route path="lien-he" element={<Dashboard />} />
                <Route path="dat-ve" element={<Bookings />} />
                <Route path="tin-tuc" element={<Dashboard />} />

              </Route>

              <Route path="*" element={<NotFound />} />


            </Routes>
          </Content>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

export default App;
