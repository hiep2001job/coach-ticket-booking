import React from "react";
import Container from "../../app/components/container/Container";
import { Card, Col, Row, Space } from "antd";
import Account from "../../app/components/Information/Account";

const AccountInformation = () => {
  return (
    <>
      <Container>
        <Row style={{ marginTop: 30 }}>
          <Col md={{ span: 8 }} style={{ padding: "0 1rem 0 0" }}>
            <Space direction="vertical" size={16}>
              <Card title="Nố Nồ" style={{ width: 300 }}>
               cái menu của t
              </Card>
            </Space>
          </Col>
          <Col md={{ span: 16 }}>
            <Space direction="vertical" size={24}>
              <Card title="Account Information" style={{ width: "100vh" }}>
               <Account />
              </Card>
            </Space>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountInformation;
