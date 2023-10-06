import React, { useState } from "react";
import { Tabs, Form, Input, Button, Row, Col, Image } from "antd";
import { PhoneOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

function App() {
  const [activeTab, setActiveTab] = useState("signin");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onFinish = (values: string) => {
    console.log("Received values:", values);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "400px",
          border: "1px solid black",
          borderRadius: "20px",
          backgroundColor: "white",
          marginTop: "20px",
        }}
      >
        <Row>
          <Col span={10}>
            <Image
              width={400}
              src="https://storage.googleapis.com/futa-busline-cms-dev/logo_Text_fd1a850bb9/logo_Text_fd1a850bb9.svg"
            />
            <Image
              width={400}
              src="https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg"
            />
          </Col>
          <Col span={14}>
            <div
              style={{
                width: "100%",
                height: "400px",
                // border: "1px solid black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                style={{
                  width: "100%",
                  // height: "400px",
                  // border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Start Sign In */}
                <TabPane tab="SIGN IN" key="signin" style={{width: "100%"}}>
                  <Form
                    name="signin-form"
                    onFinish={onFinish}
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                  >
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid phone!",
                        },
                      ]}
                    >
                      <Input prefix={<PhoneOutlined />}/>
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
                      <Input.Password prefix={<PhoneOutlined />} />
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
                       <Input prefix={<PhoneOutlined />}/>
                    </Form.Item>                  

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Sign Up
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
