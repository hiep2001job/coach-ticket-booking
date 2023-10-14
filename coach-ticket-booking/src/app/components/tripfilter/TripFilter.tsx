import { DeleteFilled } from '@ant-design/icons'
import { Card, Flex, Typography, Button, Checkbox, Divider } from 'antd'
import React from 'react'
import './TripFilter.css'

const departureTimeOptions = [
    {
        value: "00:00 - 06:00", label: "Sáng sớm 00:00 - 06:00"
    },
    {
        value: "06:00 - 12:00", label: "Buổi sáng 06:00 - 12:00"
    },
    {
        value: "12:00 - 18:00", label: "Buổi chiều 12:00 - 18:00"
    },
    {
        value: "18:00 - 24:00", label: "Buổi tối 18:00 - 24:00"
    }
];
const coachTypeOptions = [
    {
        value: "ghe", label: "Ghế"
    },
    {
        value: "giuong", label: "Giường"
    },
    {
        value: "limousine", label: "Limousine"
    },
];
const seatLineOptions = [
    {
        value: "front", label: "Hàng đầu"
    },
    {
        value: "middle", label: "Hàng giữa"
    },
    {
        value: "tail", label: "Hàng cuối"
    },
];
const seatFloorOptions = [
    {
        value: "top", label: "Tầng trên"
    },
    {
        value: "bottom", label: "Tầng dưới"
    },
];

const TripFilter = () => {
    return (
        <Card style={{ marginTop: 16, backgroundColor: "#F8F9F9" }}>
            <Flex justify='space-between' align='center'>
                <Typography.Text strong style={{ fontSize: "1.1em", fontWeight: "lighter" }} >BỘ LỌC TÌM KIẾM</Typography.Text >
                <Button type='link' danger style={{ fontSize: "1.1em", fontWeight: "lighter" }}>Bỏ Lọc <DeleteFilled /></Button>
            </Flex>

            <p style={{ fontWeight: "bold", marginTop: 30 }}>Giờ đi</p>
            <Flex vertical>
                {departureTimeOptions.map((departureTimeOption) =>
                    (<Checkbox className='app-checkbox' value={departureTimeOption.value}>{departureTimeOption.label}</Checkbox>))}
            </Flex>

            <Divider />
            <p style={{ fontWeight: "bold", marginTop: 16 }}>Loại xe</p>
            <Flex gap={6}>
                {coachTypeOptions.map((coachTypeOption) =>
                    (<Button className='option-button' value={coachTypeOption.value} type='primary'>{coachTypeOption.label}</Button>))}
            </Flex>

            <Divider />
            <p style={{ fontWeight: "bold", marginTop: 16 }}>Hàng ghế</p>
            <Flex gap={6}>
                {seatLineOptions.map((seatLineOption) =>
                    (<Button className='option-button-active' value={seatLineOption.value} type='primary'>{seatLineOption.label}</Button>))}
            </Flex>

            <Divider />
            <p style={{ fontWeight: "bold", marginTop: 16 }}>Tầng</p>
            <Flex gap={6}>
                {seatFloorOptions.map((seatFloorOption) =>
                    (<Button className='option-button' value={seatFloorOption.value} type='primary'>{seatFloorOption.label}</Button>))}
            </Flex>

        </Card>
    )
}

export default TripFilter