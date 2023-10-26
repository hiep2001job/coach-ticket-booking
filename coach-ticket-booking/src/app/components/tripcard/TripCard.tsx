
import { Card, Flex, Typography, Divider, Button } from 'antd'
import PickUpIcon from '../../../img/pickup.svg';
import StationIcon from '../../../img/station.svg';
import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { duration } from 'moment';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatTimeHMFromTimestamp } from '../../../utils/formatTimeHM';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { fetchTripDetailAsync, setBookingStep, setTripId } from '../../../features/booking/bookingSlice';
import { BOOKINGS_STEP } from '../../../utils/constants';

interface TripProps {
    id: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    departureDate: string;
    fromOffice: string;
    toOffice: string;
    coachType: string;
    availableSeatNumber: number;
    duration: number;
}

const TripCard = (props: TripProps) => {
    const dispatch=useAppDispatch();

    const handleClickTrip = (tripId: string) => {
        dispatch(setTripId(tripId));
        dispatch(fetchTripDetailAsync(tripId));
    }

    return (
        <Card style={{ width: "100%", marginTop: 16, border: "1px solid #DDE2E8", fontWeight: "bold", fontSize: "1.3em" }} >
            <Flex justify='space-between'>
                <Typography.Text>{formatTimeHMFromTimestamp(props.departureTime)}</Typography.Text>
                <Flex align='center' style={{ width: "80%" }}>
                    <img src={PickUpIcon} alt='pickupicon'></img>
                    <span style={{ border: "0 0 1px 0", borderBottomStyle: "dotted", flex: "1 1 0%" }}></span>
                    <span style={{ textAlign: "center" }}>{props.duration} giờ<br />(Asian/Ho Chi Minh)</span>
                    <span style={{ border: "0 0 1px 0", borderBottomStyle: "dotted", flex: "1 1 0%" }}></span>
                    <img src={StationIcon} alt='stationicon'></img>
                </Flex>
                <Typography.Text>{formatTimeHMFromTimestamp(props.arrivalTime)}</Typography.Text>
            </Flex>
            <Flex justify='space-between'>
                <Typography.Text>{props.fromOffice}</Typography.Text>
                <Typography.Text>{props.toOffice}</Typography.Text>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
                <Flex align='center'>
                    <Typography.Text style={{ color: "red" }}>{formatCurrency(props.price)}</Typography.Text>
                    <span style={{ height: "6px", width: "6px", borderRadius: "6px", backgroundColor: "#C8CCD3", margin: "0 3px" }}></span>
                    <Typography.Text style={{ color: "#333" }}>{props.coachType}</Typography.Text>
                    <span style={{ height: "6px", width: "6px", borderRadius: "6px", backgroundColor: "#C8CCD3", margin: "0 3px" }}></span>
                    <Typography.Text style={{ color: "red" }}>{props.availableSeatNumber} chỗ trống</Typography.Text>
                </Flex>
                <Button onClick={() => handleClickTrip(props.id)} type="primary" style={{ minWidth: "150px", bottom: "-100%", backgroundColor: "#f87c1c", borderRadius: "100px" }} size="large">
                    <Typography.Text strong style={{ color: "white" }}>Chọn chuyến</Typography.Text>
                </Button>
            </Flex>
        </Card>
    )
}

export default TripCard