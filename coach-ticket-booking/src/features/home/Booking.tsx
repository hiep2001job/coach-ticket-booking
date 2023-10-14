import { Button, Card, Col, Divider, Flex, Input, Popover, Radio, Row, Select, Typography } from 'antd'
import React, { useState } from 'react'
import Container from '../../app/components/container/Container'
import Seat from '../../app/components/seat/Seat';
import { QuestionCircleFilled } from '@ant-design/icons';

const seatList = [
    { seatName: 'A01', status: 1 },
    { seatName: 'A02', status: 1 },
    { seatName: 'A03', status: 1 },
    { seatName: 'A04', status: 1 },
    { seatName: 'A05', status: 1 },
    { seatName: 'A06', status: 1 },
    { seatName: 'A07', status: 1 },
    { seatName: 'A08', status: 1 },
    { seatName: 'A09', status: 1 },
    { seatName: 'A10', status: 1 },
    { seatName: 'A11', status: 1 },
    { seatName: 'A12', status: 1 },
    { seatName: 'A13', status: 1 },
    { seatName: 'A14', status: 1 },
    { seatName: 'A15', status: 0 },
    { seatName: 'A16', status: 0 },
    { seatName: 'A17', status: 0 },
    { seatName: 'B01', status: 0 },
    { seatName: 'B02', status: 0 },
    { seatName: 'B03', status: 0 },
    { seatName: 'B04', status: 1 },
    { seatName: 'B05', status: 1 },
    { seatName: 'B06', status: 1 },
    { seatName: 'B07', status: 1 },
    { seatName: 'B08', status: 1 },
    { seatName: 'B09', status: 2 },
    { seatName: 'B10', status: 2 },
    { seatName: 'B11', status: 1 },
    { seatName: 'B12', status: 1 },
    { seatName: 'B13', status: 1 },
    { seatName: 'B14', status: 1 },
    { seatName: 'B15', status: 1 },
    { seatName: 'B16', status: 1 },
    { seatName: 'B17', status: 1 },
];

// Filter `option.label` match the user type `input`
const filterPickUpOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const Booking = () => {
    const [dropOffTranship, setDropOffTranship] = useState(false);
    return (
        <Container>
            <Row gutter={[16, 20]}>
                <Col md={{ span: 16 }}>
                    <Card style={{ marginTop: 16, border: "1px solid #DDE2E8" }}>
                        {/* trip info */}
                        <Flex justify='space-between'>
                            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Chọn ghế</span>
                            <Popover
                                placement="bottomLeft"
                                title={<span>"Thông tin xe"</span>}
                                trigger="click"
                                content={<span>Thông tin xe nè</span>}
                            >
                                <Typography.Link >Thông tin xe</Typography.Link>
                            </Popover>

                        </Flex>
                        {/* booking detail */}
                        <Flex style={{ marginTop: 16 }}>
                            <Flex flex={2} gap={20}>
                                {/* floor 1 */}
                                <Flex flex={1} vertical align='center'>
                                    <span style={{ fontWeight: 'bold', translate: '-9px' }}>Tầng dưới</span>
                                    <Row gutter={[20, 5]}>
                                        {seatList.map((seat) =>
                                            seat.seatName.startsWith('A') &&
                                            <Col span={seat.seatName.includes('01') ? 16 : 8}><Seat {...seat} /></Col>
                                        )}
                                    </Row >
                                </Flex>
                                {/* floor 2 */}
                                <Flex align='center' vertical flex={1}>
                                    <span style={{ fontWeight: 'bold', translate: '-9px' }}>Tầng trên</span>
                                    <Row gutter={[20, 5]}>
                                        {seatList.map((seat) =>
                                            seat.seatName.startsWith('B') &&
                                            <Col span={seat.seatName.includes('01') ? 16 : 8}><Seat {...seat} /></Col>
                                        )}
                                    </Row >
                                </Flex>
                            </Flex>
                            <Flex flex={1} vertical gap={20} style={{ marginTop: 16 }}>
                                <Flex gap={10} align='center'>
                                    <span style={{ display: "block", width: "1rem", height: "1rem", borderRadius: 6, backgroundColor: "#D5D9DD" }}></span>
                                    <Typography.Text style={{ fontWeight: "bold" }}>
                                        Đã bán
                                    </Typography.Text>
                                </Flex>
                                <Flex gap={10} align='center'>
                                    <span style={{ display: "block", width: "1rem", height: "1rem", borderRadius: 6, backgroundColor: "#D3F3FF" }}></span>
                                    <Typography.Text style={{ fontWeight: "bold" }}>
                                        Còn trống
                                    </Typography.Text>
                                </Flex>
                                <Flex gap={10} align='center'>
                                    <span style={{ display: "block", width: "1rem", height: "1rem", borderRadius: 6, backgroundColor: "#FDEDE8" }}></span>
                                    <Typography.Text style={{ fontWeight: "bold" }}>
                                        Đang chọn
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Divider />
                        {/* Pickup Dropoff info */}
                        <Flex justify='space-between'>
                            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Thông tin đón trả
                                <Popover
                                    placement="top"
                                    title={<span>"Thông tin xe"</span>}
                                    trigger="click"
                                    content={<span>Thông tin xe nè</span>}
                                >
                                    <QuestionCircleFilled style={{ margin: "0 0 0 0.5rem" }} />
                                </Popover>
                            </span>
                        </Flex>
                        {/* Pickup Dropoff detail */}
                        <Flex style={{ marginTop: 16 }}>
                            <Flex flex={1} vertical>
                                <span style={{ textTransform: 'uppercase' }}>Điểm đón</span>
                                <Flex justify='space-between' style={{ marginTop: 10 }}>
                                    <Radio.Group size='large' value={1}>
                                        <Radio value={1}>Điểm đón</Radio>
                                        <Radio disabled value={2}>Trung chuyển</Radio>
                                    </Radio.Group>
                                </Flex>
                                <Select
                                    size='large'
                                    style={{ marginTop: 10 }}
                                    showSearch
                                    placeholder="Chọn điểm đón"
                                    optionFilterProp="children"
                                    filterOption={filterPickUpOption}
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'tom',
                                            label: 'Tom',
                                        },
                                    ]}
                                />
                            </Flex>
                            <Divider type='vertical' />
                            <Flex flex={1} vertical>
                                <span style={{ textTransform: 'uppercase' }}>Điểm trả</span>
                                <Flex justify='space-between' style={{ marginTop: 10 }}>
                                    <Radio.Group size='large' onChange={(e) => { setDropOffTranship(e.target.value === 2) }} defaultValue={1}>
                                        <Radio value={1}>Điểm đón</Radio>
                                        <Radio value={2}>Trung chuyển</Radio>
                                    </Radio.Group>
                                </Flex>
                                {dropOffTranship ?
                                    <Input size='large' placeholder='Nhập điểm đi' style={{ marginTop: 10 }} /> :
                                    <Select
                                        size='large'
                                        style={{ marginTop: 10 }}
                                        showSearch
                                        placeholder="Chọn điểm đón"
                                        optionFilterProp="children"
                                        filterOption={filterPickUpOption}
                                        options={[
                                            {
                                                value: 'jack',
                                                label: 'Jack',
                                            },
                                            {
                                                value: 'lucy',
                                                label: 'Lucy',
                                            },
                                            {
                                                value: 'tom',
                                                label: 'Tom',
                                            },
                                        ]}
                                    />
                                }
                            </Flex>
                        </Flex>

                        <Divider />
                        {/* Customer info */}
                        <Flex>
                            <Flex flex={1} vertical>

                            </Flex>
                            <Flex flex={1} vertical>

                            </Flex>
                        </Flex>


                    </Card>
                </Col>
                <Col md={{ span: 8 }} >
                    <Card style={{ width: "100%", marginTop: 16, border: "1px solid #DDE2E8" }}>

                    </Card>
                </Col>
            </Row>
        </Container>

    )
}

export default Booking