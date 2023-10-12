import { Avatar, Button, Card, Checkbox, Col, Divider, Flex, Row, Skeleton, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import Container from '../container/Container'

import { DeleteFilled, SearchOutlined } from '@ant-design/icons';
import TripFilter from '../tripfilter/TripFilter';


const TripList = () => {
    const [loading, setLoading] = useState(false);

    const onChange = (checked: boolean) => {
        setLoading(!checked);
    };
    return (
        <>
            <Container>
                <Row style={{ marginTop: 30 }}>
                    <Col md={{ span: 8 }} style={{ padding: "0 1rem 0 0" }}>
                       <TripFilter/>
                    </Col>
                    <Col md={{ span: 16 }}>
                        
                        
                    </Col>
                </Row>

            </Container>
        </>

    )
}

export default TripList