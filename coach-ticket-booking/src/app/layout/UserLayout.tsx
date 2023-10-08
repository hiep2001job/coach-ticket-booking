import { Button, Card } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import MenuLayout from "../components/menu/MenuLayout";
import { UserOutlined } from "@ant-design/icons";


const UserLayout = () => {
  return (
    <>
        {/* <Header /> */}
        
        <Card style={{ width: '100%',height: 'auto', backgroundColor:'#F2754E' }}> 
            <Button ><UserOutlined />Đăng nhập / Đăng ký</Button>
            <MenuLayout />
        </Card>

        <Outlet />
        <Footer />
    </>
  );
};

export default UserLayout;
