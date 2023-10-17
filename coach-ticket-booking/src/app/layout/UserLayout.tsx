import { Button, Card } from "antd";
import { Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppMenu from "../components/menu/AppMenu";
import { UserOutlined } from "@ant-design/icons";
import "./UserLayout.css";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const UserLayout = () => {
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

        <div className="bnt-login">
          <Button>
            <UserOutlined />
            Đăng nhập / Đăng ký
          </Button>
        </div>
        <div className="appmenu">
          <AppMenu />
        </div>
      </Card>

      <Outlet />

      <Footer />
    </>
  );
};

export default UserLayout;
