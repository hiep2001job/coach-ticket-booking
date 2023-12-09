import { Button, Flex } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppMenu from "../components/menu/AppMenu";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../store/configureStore";
import { BOOKINGS_STEP } from "../../utils/constants";
import BookingHeader from "../components/bookingheader/BookingHeader";
import HomeBanner from '../../img/home_banner.png';
import SignedInMenu from "../../features/account/SignedInMenu";
import Logo from '../../img/logo.png'

const UserLayout = () => {
  const { bookingStep } = useAppSelector(state => state.booking);
  const { user } = useAppSelector(state => state.account);
  const navigate = useNavigate();



  return (
    <>
      {/* <Header /> */}
      <Flex vertical style={{ backgroundColor: '#F87C1C', backgroundImage: `url(${HomeBanner})`, minHeight: '180px', height: '220px' }}>
        <Flex align="start" justify="space-evenly">
          <p style={{ fontSize: '1.1em', color: 'white', fontWeight: 'bold' }}>Tổng đài: 19000091</p>
          <img
            src={Logo}
            width="280px"
            height="auto"
            alt=""
          />
          {(user === null &&
            <Button className="mt-3" shape="round" onClick={() => { navigate('/login') }}>
              <UserOutlined />
              Đăng nhập / Đăng ký
            </Button>) ||
            <SignedInMenu />
          }

        </Flex>
        <Flex vertical>
          {(bookingStep === BOOKINGS_STEP.SEARCH_TRIPS &&
            <AppMenu />
          ) ||
            <BookingHeader />
          }
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};

export default UserLayout;
