import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore'
import { Flex } from 'antd';
import { formatToVietnameseDate } from '../../../utils/formatToVietnameseDate';
import { LeftOutlined } from '@ant-design/icons';
import Container from '../container/Container';
import { setBookingStep } from '../../../features/booking/bookingSlice';
import { BOOKINGS_STEP } from '../../../utils/constants';

const BookingHeader = () => {
    const { searchTitle, tripDetail } = useAppSelector(state => state.booking);
    const dispatch = useAppDispatch();

    const handleBackClick = () => {
        dispatch(setBookingStep(BOOKINGS_STEP.SEARCH_TRIPS));
    }

    return (
        <Container>
            <Flex style={{ color: 'white', fontWeight: 'normal' }} justify='space-between' align='start'>
                <Flex onClick={handleBackClick} style={{cursor:'pointer', fontWeight: 'bold' }} className='mt-4'>
                    <LeftOutlined />
                    <span>Quay lại</span>
                </Flex>
                <Flex vertical align='center' justify='flex-start'>
                    <h1>{searchTitle}</h1>
                    <h3>{formatToVietnameseDate(tripDetail!.departureDate)||''}</h3>
                </Flex>
                <Flex>
                    &nbsp;
                </Flex>
            </Flex>
        </Container>
    )
}

export default BookingHeader