import { Col, Row } from 'antd'
import React from 'react'
import Container from '../container/Container'

import TripFilter from '../tripfilter/TripFilter';
import TripCard from '../tripcard/TripCard';
import { useAppSelector } from '../../../store/configureStore';
import Empty from '../empty/Empty';


const TripList = () => {
    const { trips, searchTitle } = useAppSelector(state => state.booking)
    return (
        <Container>
            <Row style={{ marginTop: 10 }}>
                <Col md={{ span: 8 }} style={{ padding: "0 1rem 0 0" }}>
                    <TripFilter />
                </Col>
                <Col md={{ span: 16 }}>
                    <span className='mt-3' style={{ display:'block',textTransform:'uppercase',fontSize: '1.2em', fontWeight: 'bold' }}>{searchTitle} ({trips.length})</span>
                    {trips.length > 0 && trips.map((trip) => (<TripCard key={trip.id} {...trip} />))}
                    {trips.length === 0 && <Empty />}
                </Col>
            </Row>
        </Container>
    )
}

export default TripList