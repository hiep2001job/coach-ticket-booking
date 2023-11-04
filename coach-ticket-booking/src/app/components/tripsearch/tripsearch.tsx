import React, { useEffect, useState } from "react";
import "./tripsearch.css";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Flex,
    Form,
    Radio,
    Row,
    Select,
    Typography,

} from "antd";
import 'moment/locale/vi';
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import SwapButon from "../swapbutton/SwapButon";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { fetchOfficesAsync, searchTripsAsync, setSearchTitle, setTripParams } from "../../../features/booking/bookingSlice";
import { parseDateFromDDMMYYYY } from "../../../utils/parseDateFromDDMMYYYY";


// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


moment.locale("vi");

const TripSearch = () => {
    const { offices, officesLoaded, tripParams, status, searchTitle } = useAppSelector(state => state.booking)
    const dispatch = useAppDispatch();
    // Handle is return 
    const [isReturn, setIsReturn] = useState<boolean>(false);

    // Handle from - to
    const [officesOptions, setOfficesOptions] = useState<{ label: string; value: string }[]>([]);

    const handleSwapFromToValues = () => {
        dispatch(setTripParams({ originOfficeId: tripParams.destOfficeId, destOfficeId: tripParams.originOfficeId }))
    };

    //fetch offices at benning
    useEffect(() => {
        if (!officesLoaded) dispatch(fetchOfficesAsync());
        setOfficesOptions(
            offices.map(
                (office) => ({ label: office.name, value: office.id })
            )
        );
    }, [dispatch, offices, officesLoaded])

    //handle search submit
    const onFinish = (values: any) => {
        values.departureDate = values.departureDate.format('DDMMYYYY')
        values.originOfficeId = values.originOfficeId.value;
        values.destOfficeId = values.destOfficeId.value;
        if (!values.ticketCount) values.ticketCount = 1;

        let fromOfficeLable = officesOptions.find(item => item.value === values.originOfficeId)?.label;
        let toOfficeLable = officesOptions.find(item => item.value === values.destOfficeId)?.label;

        dispatch(setSearchTitle(`${fromOfficeLable} - ${toOfficeLable}`));
        dispatch(setTripParams(values));
        dispatch(searchTripsAsync());
    };


    return (
        <>
            <Row style={{ margin: "2rem 0 -7rem 0", paddingBottom:'2rem', translate: '0 -7rem' }}>
                <Col lg={{ span: 16, offset: 4 }} md={{ span: 20, offset: 2 }} span={22} offset={1} >
                    <Card loading={!officesLoaded} style={{ border: "1px solid orange",zIndex:1000,position:'relative', boxShadow: "2px", outline: "8px solid rgba(170,46,8,.1)" }}>
                        {/* <Flex gap="middle" align="flex-start" justify="space-between">
                            <Radio.Group style={{ textAlign: "center" }}>
                                <Radio checked={!isReturn} onClick={() => setIsReturn(!isReturn)}><Typography.Text strong>Một chiều</Typography.Text></Radio>
                                <Radio checked={isReturn} onClick={() => setIsReturn(isReturn)}><Typography.Text strong>Khứ hồi</Typography.Text></Radio>
                            </Radio.Group>
                            <Typography.Link strong style={{ fontWeight: "bolder", color: "orange" }}>Hướng dẫn mua vé</Typography.Link>
                        </Flex> */}
                        <Form
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            <Row style={{ margin: "1.5rem 0 0" }}>
                                <Col md={12} style={{ padding: "0 0.5rem" }}>
                                    <Flex align="center">
                                        <Flex flex={1}>
                                            <Form.Item
                                                style={{ width: "100%", translate: '0.5rem' }}
                                                label="Điểm đi"
                                                name='originOfficeId'
                                                rules={[{ required: true, message: "Vui lòng nhập điểm đi" }]}
                                            >
                                                <Select
                                                    size="large"
                                                    showSearch
                                                    placeholder="Chọn điểm đi"
                                                    labelInValue
                                                    value={tripParams.originOfficeId}
                                                    filterOption={filterOption}
                                                    options={[...officesOptions]}
                                                />
                                            </Form.Item>
                                        </Flex>
                                        <Flex>
                                            <SwapButon onClick={handleSwapFromToValues} />
                                        </Flex>
                                        <Flex flex={1}>
                                            <Form.Item
                                                label="Điểm đến"
                                                style={{ width: "100%", translate: '-0.5rem' }}
                                                name='destOfficeId'
                                                rules={[{ required: true, message: "Vui lòng nhập điểm đến" }]}
                                            >
                                                <Select
                                                    size="large"
                                                    showSearch
                                                    placeholder="Chọn điểm đến"
                                                    labelInValue
                                                    value={tripParams.destOfficeId}
                                                    filterOption={filterOption}
                                                    options={[...officesOptions]}
                                                />
                                            </Form.Item>
                                        </Flex>
                                    </Flex>
                                </Col>

                                <Col md={6} style={{ padding: "0 0.5rem" }}>
                                    <Form.Item
                                        label="Ngày đi"
                                        name='departureDate'
                                        rules={[{ required: true, message: "Vui lòng chọn ngày đi" }]}
                                    >
                                        <DatePicker
                                            // disabledDate={(current) => current && current < moment().startOf('day')}
                                            format="DD-MM-YYYY"
                                            value={parseDateFromDDMMYYYY(tripParams.departureDate)}
                                            placeholder="Chọn ngày đi"
                                            style={{ width: "100%" }}
                                            size="large" />
                                    </Form.Item>
                                </Col>
                                <Col md={6} style={{ padding: "0 0.5rem" }}>
                                    <Form.Item
                                        label="Số vé"
                                        name='ticketCount'
                                    >
                                        <Select
                                            size="large"
                                            value={tripParams.ticketCount}
                                            defaultValue={tripParams.ticketCount}
                                            options={Array.from({ length: 5 }, (_, index) => ({
                                                value: index + 1,
                                                label: index + 1,
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}  >
                                    <Button loading={status === 'pendingSearchTripsAsync'} type="primary" htmlType="submit" style={{ display: "block", margin: "0 auto", minWidth: "250px", height: "110%", zIndex: 1000, translate: "0 100%", backgroundColor: "#f87c1c", borderRadius: "100px" }} icon={<SearchOutlined />} size="large">
                                        <Typography.Text strong style={{ color: "white", fontSize: "1.1em" }}>Tìm chuyến xe</Typography.Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TripSearch;
