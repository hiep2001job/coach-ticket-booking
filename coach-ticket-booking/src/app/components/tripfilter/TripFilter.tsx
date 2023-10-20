import { DeleteFilled } from '@ant-design/icons'
import { Card, Flex, Typography, Button, Checkbox, Divider } from 'antd'
import React, { useEffect } from 'react'
import './TripFilter.css'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { searchTripsAsync, setTripParams } from '../../../features/booking/bookingSlice';

const departureTimeOptions = [
    {
        value: 0, label: "Sáng sớm 00:00 - 06:00"
    },
    {
        value: 1, label: "Buổi sáng 06:00 - 12:00"
    },
    {
        value: 2, label: "Buổi chiều 12:00 - 18:00"
    },
    {
        value: 3, label: "Buổi tối 18:00 - 24:00"
    }
];
const coachTypeOptions = [
    {
        value: 0, label: "Limousine"
    },
    {
        value: 1, label: "Giường"
    },
    {
        value: 2, label: "Ghế"
    }


];
const seatLineOptions = [
    {
        value: 0, label: "Hàng đầu"
    },
    {
        value: 1, label: "Hàng giữa"
    },
    {
        value: 2, label: "Hàng cuối"
    },
];
const seatFloorOptions = [
    {
        value: 0, label: "Tầng trên"
    },
    {
        value: 1, label: "Tầng dưới"
    },
];

const TripFilter = () => {
    const dispatch = useAppDispatch();
    const { tripParams, tripFilterApplied } = useAppSelector(state => state.booking);

    const addOrRemoveValue = (arr: number[], value: number) => {
        const index = arr.indexOf(value);
        const newArray = [...arr]; // Create a new array      
        if (index === -1) {
            // Value does not exist in the array, so add it
            newArray.push(value);
        } else {
            // Value exists in the array, so remove it
            newArray.splice(index, 1);
        }
        return newArray;
    }

    //handle depaturetype select
    const handleDepartureChange = (option: any) => {
        const newOptions = addOrRemoveValue(tripParams.departureType!, option.value);
        console.log(newOptions);
        dispatch(setTripParams({ departureType: [...newOptions] }));
    }

    //handle seatType select
    const handleCoachTypeChange = (option: any) => {
        const newOptions = addOrRemoveValue(tripParams.seatType!, option.value);
        dispatch(setTripParams({ seatType: [...newOptions] }));
    }

    //handle seatType select
    const handleSeatLineChange = (option: any) => {
        const newOptions = addOrRemoveValue(tripParams.seatLine!, option.value);
        dispatch(setTripParams({ seatLine: [...newOptions] }));
    }

    //handle floor select
    const handleFloorChange = (option: any) => {
        const newOptions = addOrRemoveValue(tripParams.floor!, option.value);
        dispatch(setTripParams({ floor: [...newOptions] }));
    }

    //handle clear filters
    const handleClearFilter = () => {
        dispatch(setTripParams({ departureType: [], floor: [], seatType: [], seatLine: [] }));
    }

    //trigger search when change filter
    useEffect(() => {
        if (!tripFilterApplied) dispatch(searchTripsAsync());
    }, [dispatch, tripFilterApplied])


    return (
        <Card style={{ marginTop: 16, backgroundColor: "#F8F9F9" }}>
            <Flex justify='space-between' align='center'>
                <Typography.Text strong style={{ fontSize: "1.1em", fontWeight: "lighter" }} >BỘ LỌC TÌM KIẾM</Typography.Text >
                <Button type='link' onClick={handleClearFilter} danger style={{ fontSize: "1.1em", fontWeight: "lighter" }}>Bỏ Lọc <DeleteFilled /></Button>
            </Flex>

            <p style={{ fontWeight: "bold", marginTop: 30 }}>Giờ đi</p>
            <Flex vertical>
                {departureTimeOptions.map((departureTimeOption, index) =>
                (<Checkbox
                    key={index}
                    checked={tripParams.departureType!.indexOf(departureTimeOption.value) >= 0}
                    className='app-checkbox'
                    onClick={() => handleDepartureChange(departureTimeOption)}
                    value={departureTimeOption.value}>
                    {departureTimeOption.label}
                </Checkbox>))}
            </Flex>

            <Divider />
            <p style={{ fontWeight: "bold", marginTop: 16 }}>Loại xe</p>
            <Flex gap={6} wrap="wrap">
                {coachTypeOptions.map((coachTypeOption, index) =>
                (<Button
                    key={index}
                    className={tripParams.seatType!.indexOf(coachTypeOption.value) >= 0 ? 'option-button-active' : 'option-button'}
                    value={coachTypeOption.value}
                    onClick={() => handleCoachTypeChange(coachTypeOption)}
                    type='primary'>
                    {coachTypeOption.label}
                </Button>))}
            </Flex>

            <Divider />
            <p style={{ fontWeight: "bold", marginTop: 16 }}>Hàng ghế</p>
            <Flex gap={6} wrap="wrap">
                {seatLineOptions.map((seatLineOption, index) =>
                (<Button
                    key={index}
                    className={tripParams.seatLine!.indexOf(seatLineOption.value) >= 0 ? 'option-button-active' : 'option-button'}
                    value={seatLineOption.value}
                    onClick={() => handleSeatLineChange(seatLineOption)}
                    type='primary'>{seatLineOption.label}
                </Button>))}
            </Flex>

            <Divider />
            <p style={{ fontWeight: "bold", marginTop: 16 }}>Tầng</p>
            <Flex gap={6} wrap="wrap">
                {seatFloorOptions.map((seatFloorOption, index) =>
                (<Button
                    key={index}
                    className={tripParams.floor!.indexOf(seatFloorOption.value) >= 0 ? 'option-button-active' : 'option-button'}
                    value={seatFloorOption.value}
                    onClick={() => handleFloorChange(seatFloorOption)}
                    type='primary'>
                    {seatFloorOption.label}
                </Button>))}
            </Flex>

        </Card>
    )
}

export default TripFilter