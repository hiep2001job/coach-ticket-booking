
import { Card, Flex, Typography, Divider, Button } from 'antd'
import PickUpIcon from '../../../img/pickup.svg';
import StationIcon from '../../../img/station.svg';
import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';

interface TripProps {

}



const TripCard = () => {
    const navigate = useNavigate();

    const handleClickTrip = (tripId: string) => {
        navigate({pathname:"/dat-ve",search: createSearchParams({
            foo: "bar"
        }).toString()});
    }

    return (
        <Card style={{ width: "100%", marginTop: 16, border: "1px solid #DDE2E8", fontWeight: "bold", fontSize: "1.3em" }} >
            <Flex justify='space-between'>
                <Typography.Text>15:30</Typography.Text>
                <Flex align='center' style={{ width: "80%" }}>
                    <img src={PickUpIcon} alt='pickupicon'></img>
                    <span style={{ border: "0 0 1px 0", borderBottomStyle: "dotted", flex: "1 1 0%" }}></span>
                    <span style={{ textAlign: "center" }}>4 giờ<br />(Asian/Ho Chi Minh)</span>
                    <span style={{ border: "0 0 1px 0", borderBottomStyle: "dotted", flex: "1 1 0%" }}></span>
                    <img src={StationIcon} alt='stationicon'></img>
                </Flex>
                <Typography.Text>19:30</Typography.Text>
            </Flex>
            <Flex justify='space-between'>
                <Typography.Text>VP Thốt Nốt</Typography.Text>
                <Typography.Text>Bến xe Miền Tây</Typography.Text>
            </Flex>
            <Divider />
            <Flex justify='space-between'>
                <Flex align='center'>
                    <Typography.Text style={{ color: "red" }}>165.000đ</Typography.Text>
                    <span style={{ height: "6px", width: "6px", borderRadius: "6px", backgroundColor: "#C8CCD3", margin: "0 3px" }}></span>
                    <Typography.Text style={{ color: "#333" }}>Limousince</Typography.Text>
                    <span style={{ height: "6px", width: "6px", borderRadius: "6px", backgroundColor: "#C8CCD3", margin: "0 3px" }}></span>
                    <Typography.Text style={{ color: "red" }}>27 chỗ trống</Typography.Text>
                </Flex>
                <Button onClick={() => handleClickTrip('ssfsdfsdf')} type="primary" style={{ minWidth: "150px", bottom: "-100%", backgroundColor: "#f87c1c", borderRadius: "100px" }} size="large">
                    <Typography.Text strong style={{ color: "white" }}>Chọn chuyến</Typography.Text>
                </Button>
            </Flex>
        </Card>
    )
}

export default TripCard