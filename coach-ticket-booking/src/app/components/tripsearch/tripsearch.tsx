import React, { useState } from "react";
import "./tripsearch.css";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Flex,
    Form,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Typography,

} from "antd";
import 'moment/locale/vi';
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import SwapButon from "../swapbutton/SwapButon";


const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


moment.locale("vi");

const TripSearch = () => {

    // Handle is return 
    const [isReturn, setIsReturn] = useState(1);
    const handleIsReturnChange = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setIsReturn(e.target.value);
    };

    // Handle from - to
    const [from, setFrom] = useState<string>();
    const [to, setTo] = useState<string>();
    const handleSwapFromToValues = () => {
        // Swap the values of value1 and value2
        setFrom(to);
        setTo(from);
    };


    return (
        <>
            <Row style={{ margin: "2rem 0 0" }}>
                <Col lg={4} md={2} span={1}></Col>
                <Col lg={16} md={20} span={22} >
                    <Card style={{ border: "1px solid orange", boxShadow: "2px", outline: "8px solid rgba(170,46,8,.1)" }}>
                        <Flex gap="middle" align="flex-start" justify="space-between">
                            <Radio.Group onChange={handleIsReturnChange} value={isReturn} style={{ textAlign: "center" }}>
                                <Radio value={false}><Typography.Text strong>Một chiều</Typography.Text></Radio>
                                <Radio value={true}><Typography.Text strong>Khứ hồi</Typography.Text></Radio>
                            </Radio.Group>
                            <Typography.Link strong style={{ fontWeight: "bolder", color: "orange" }}>Hướng dẫn mua vé</Typography.Link>
                        </Flex>
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
                                            >
                                                <Select
                                                    size="large"
                                                    showSearch
                                                    placeholder="Chọn điểm đi"
                                                    optionFilterProp="children"
                                                    value={from}
                                                    onChange={(value)=>setFrom(value)}
                                                    filterOption={filterOption}
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
                                            </Form.Item>
                                        </Flex>
                                        <Flex>
                                            <SwapButon onClick={handleSwapFromToValues} />
                                        </Flex>
                                        <Flex flex={1}>
                                            <Form.Item
                                                label="Điểm đến"
                                                style={{ width: "100%", translate: '-0.5rem' }}
                                            >
                                                <Select
                                                    size="large"
                                                    showSearch
                                                    placeholder="Chọn điểm đến"
                                                    optionFilterProp="children"
                                                    value={to}
                                                    onChange={(value)=>setTo(value)}
                                                    filterOption={filterOption}
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
                                            </Form.Item>
                                        </Flex>
                                    </Flex>
                                </Col>

                                <Col md={6} style={{ padding: "0 0.5rem" }}>
                                    <Form.Item
                                        label="Ngày đi"
                                    >
                                        <DatePicker format="DD-MM-YYYY" placeholder="Chọn ngày đi" style={{ width: "100%" }} size="large" />
                                    </Form.Item>
                                </Col>
                                <Col md={6} style={{ padding: "0 0.5rem" }}>
                                    <Form.Item
                                        label="Số vé"
                                    >
                                        <Select
                                            size="large"
                                            defaultValue={{ value: 1, label: 1 }}
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
                                    <Button type="primary" style={{ display: "block", margin: "0 auto", minWidth: "250px", height: "110%", bottom: "-100%", backgroundColor: "#f87c1c", borderRadius: "100px" }} icon={<SearchOutlined />} size="large">
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
