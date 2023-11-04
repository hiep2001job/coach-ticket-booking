import React, { useState } from "react";
import { Tabs, Form, Input, Button, Row, Col, Card } from "antd";
import { LockFilled, PhoneFilled, PhoneOutlined, UserOutlined, } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import { registerUser, signInUser } from "./accountSlice";
import './Login.css';
import { ACCOUNT_STATUS } from "../../utils/constants";

const { TabPane } = Tabs;

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");

  const dispatch = useAppDispatch();
const {status}=useAppSelector(state=>state.account)

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onLoginFinish = (values: string) => {
    dispatch(signInUser(values))
  };
  const onRegisterFinish = (values: string) => {
    dispatch(registerUser(values))
  };

  return (
    <Row align="middle">
      <Col span={24} md={16} lg={12} style={{ margin: "auto" }} >
        <Card style={{ border: "1px solid orange", zIndex: 1000, position: 'relative', boxShadow: "2px", outline: "8px solid rgba(170,46,8,.1)", margin: "4rem 1rem" }}>
          <Tabs
            centered
            activeKey={activeTab}
            onChange={handleTabChange}
          >
            {/* Start Sign In */}
            <TabPane
              tab={<span style={{
                fontWeight: '16pt',
                textTransform: 'uppercase',
                color: '#FF5733'
              }}>
                <PhoneFilled />Đăng nhập tài khoản
              </span>}
              key="signin" >
              <Form
                name="signin-form"
                onFinish={onLoginFinish}
              >
                <Form.Item
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input style={{ padding: "10px", backgroundColor: "transparent" }} size="large" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password style={{ padding: "10px", border: "2px solid light-red" }} size="large" prefix={<LockFilled />} />
                </Form.Item>

                <Form.Item>
                  <Button loading={status===ACCOUNT_STATUS.PENDING_LOGIN} type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            {/* Start Sign Up */}
            <TabPane tab={<span style={{
              textTransform: 'uppercase',
              fontWeight: '16pt',
              color: '#FF5733'
            }}>Đăng ký</span>} key="signup">
              <Form
                name="signup-form"
                onFinish={onRegisterFinish}
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              >
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password style={{ padding: "10px", border: "2px solid light-red" }} size="large" prefix={<LockFilled />} />
                </Form.Item>

                <Form.Item>
                  <Button loading={status===ACCOUNT_STATUS.PENDING_RESGITER} type="primary" htmlType="submit">
                    Tạo tài khoản
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
