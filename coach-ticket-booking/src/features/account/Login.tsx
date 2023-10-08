import React, { useState } from "react";
import { Tabs, Form, Input, Button, Row, Col, Image, Card, Space } from "antd";
import { LockFilled, PhoneOutlined, UserOutlined, } from '@ant-design/icons';
import { useAppDispatch } from "../../store/configureStore";
import { signInUser } from "./accountSlice";

const { TabPane } = Tabs;

function Login() {
  const [activeTab, setActiveTab] = useState("signin");

  const dispatch=useAppDispatch();


  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onFinish = (values: string) => {
    dispatch(signInUser(values))
  };

  return (
    <Row align="middle">      
      <Col span={24} md={16} lg={12} style={{margin:"auto"}} >       
        <Card style={{margin:"4rem 1rem"}}>
          <Tabs
            centered
            activeKey={activeTab}
            onChange={handleTabChange}
          >
            {/* Start Sign In */}
            <TabPane tab="SIGN IN" key="signin" >
              <Form
                name="signin-form"
                onFinish={onFinish}
              >
                <Form.Item
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a valid phone!",
                    },
                  ]}
                >
                  <Input style={{ padding: "10px", backgroundColor:"transparent" }} size="large" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input.Password style={{ padding: "10px", border: "2px solid light-red" }} size="large" prefix={<LockFilled />} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            {/* Start Sign Up */}
            <TabPane tab="SIGN UP" key="signup">
              <Form
                name="signup-form"
                onFinish={onFinish}
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              >
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone!",
                    },
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>       
      </Col>
    </Row>
  );
}

export default Login;
