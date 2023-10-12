import React, { useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  // Upload,
  Row,
  Col,
} from 'antd';

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

const Account = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Update
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 800 }}
      >
        <br />
        <Row>

          <Col span={8}>
            <Form.Item>
              <Avatar size={180} icon={<UserOutlined />} />
            </Form.Item>

            {/* <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item> */}

          </Col>

          <Col span={16}>
            <Form.Item label="Full Name">
              <Input />
            </Form.Item>

            <Form.Item label="Email">
              <Input type="email" />
            </Form.Item>

            <Form.Item label="Phone">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Gender">
              <Radio.Group>
                <Radio value="0"> Nam </Radio>
                <Radio value="1"> Nữ </Radio>
                <Radio value="2"> Khác </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Birthday">
              <Input type="date" />
            </Form.Item>

            <Form.Item label="Address">
              <Input />
            </Form.Item>
            <Button type="primary" size="large" style={{ width: 300 }} htmlType="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Account;
