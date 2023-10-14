import { Col, Row } from 'antd'
import React, { useState } from 'react'
import Container from '../container/Container'

import TripFilter from '../tripfilter/TripFilter';
import TripCard from '../tripcard/TripCard';


const TripList = () => {
    return (
        <>
            <Container>
                <Row style={{ marginTop: 30 }}>
                    <Col md={{ span: 8 }} style={{ padding: "0 1rem 0 0" }}>
                       <TripFilter/>
                    </Col>
                    <Col md={{ span: 16 }}>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>                        
                    </Col>
                </Row>

            </Container>
        </>

    )
}

export default TripList