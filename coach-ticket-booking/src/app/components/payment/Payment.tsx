import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Container from '../container/Container';
import { Card, Col, Divider, Flex, Radio, Row } from 'antd';
import VnPay from '../../../img/vnpay.svg'
import ZaloPay from '../../../img/zalo.svg'

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('VNPay');
    
    let { bookingCode } = useParams();

    return (
        <Container>
            <Row gutter={[16, 20]}>
                <Col md={16} className='mt-4'>
                    <Flex>
                        <Flex flex={1} vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Chọn phương thức thanh toán</span>
                            </Flex>
                            <Radio.Group>
                                <Flex vertical gap={20} className='mt-3'>
                                    
                                    <Radio value='VNPay'  onChange={(e) => { setPaymentMethod(e.target.value) }}>
                                        <Flex align='center' gap={15}>
                                            <img src={VnPay} style={{ width: '3rem', height: '3rem' }} alt='vnpay icon' />
                                            <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>VNPay</span>
                                        </Flex>
                                    </Radio>
                                    <Radio value='ZaloPay' onChange={(e) => { setPaymentMethod(e.target.value) }}>
                                        <Flex align='center' gap={15}>
                                            <img src={ZaloPay} style={{ width: '3rem', height: '3rem' }} alt='zalopay icon' />
                                            <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>ZaloPay</span>
                                        </Flex>
                                    </Radio>
                                </Flex>
                            </Radio.Group>
                        </Flex>
                        <Flex flex={1}>

                        </Flex>
                    </Flex>
                </Col>
                <Col md={{ span: 8 }} >
                    <Card className='mt-2' style={{ width: "100%", border: "1px solid #DDE2E8" }}>
                        <Flex vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Thông tin hành khách</span>
                            </Flex>
                            <Flex className='mt-4' justify='space-between'>
                                <Flex>Họ và tên</Flex>
                                <Flex>Nguyễn Thành Hiệp</Flex>
                            </Flex>
                            <Flex className='mt-2' justify='space-between'>
                                <Flex>Số điện thoại</Flex>
                                <Flex>0362 550 694</Flex>
                            </Flex>
                            <Flex className='mt-2' justify='space-between'>
                                <Flex>Email</Flex>
                                <Flex>thanhhiep77777@gmail.com</Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Card className='mt-2' style={{ width: "100%", border: "1px solid #DDE2E8" }}>
                        <Flex vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Thông tin lượt đi</span>
                            </Flex>
                            <Flex className='mt-4' justify='space-between'>
                                <Flex>Tuyến xe</Flex>
                                <Flex>O Mon ⇒ Sai Gon</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Thời gian</Flex>
                                <Flex>04:00 16-10-2023</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Số lượng ghế</Flex>
                                <Flex>1 Ghế</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Số ghế</Flex>
                                <Flex>A01</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Tổng tiền lượt đi</Flex>
                                <Flex> 165000</Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Card className='mt-2' style={{ width: "100%", border: "1px solid #DDE2E8" }}>
                        <Flex vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Chi tiết giá</span>
                            </Flex>
                            <Flex className='mt-4' justify='space-between'>
                                <Flex>Giá vé lượt đi</Flex>
                                <Flex>165.000đ</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Phí thanh toán</Flex>
                                <Flex>0đ</Flex>
                            </Flex>
                            <Divider />
                            <Flex justify='space-between'>
                                <Flex>Tổng tiền</Flex>
                                <Flex>165.000đ</Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Payment
