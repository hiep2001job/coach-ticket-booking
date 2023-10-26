import { Button, Card } from "antd";
import { Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppMenu from "../components/menu/AppMenu";
import { UserOutlined } from "@ant-design/icons";
import "./UserLayout.css";
import { useAppSelector } from "../../store/configureStore";
import { BOOKINGS_STEP } from "../../utils/constants";
import BookingHeader from "../components/bookingheader/BookingHeader";

const UserLayout = () => {
  const { bookingStep } = useAppSelector(state => state.booking);

  return (
    <>
      {/* <Header /> */}
      <Card className="card-header">
        <div className="img-logo">
          <img
            src="https://futabus.vn/_next/static/media/logo_new.8a0251b8.svg"
            width="280px"
            height="auto"
            alt=""
          />
        </div>
        {bookingStep === BOOKINGS_STEP.SEARCH_TRIPS &&
          <>
            <div className="bnt-login">
              <Button>
                <UserOutlined />
                Đăng nhập / Đăng ký
              </Button>
            </div>
            <div className="appmenu">
              <AppMenu />
            </div>
          </> ||
          <BookingHeader />
        }
      </Card>

      <Outlet />

     
    </>
  );
};

export default UserLayout;
