import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Container from '../container/Container';
import { Button, Card, Col, Divider, Flex, Radio, Result, Row, Typography } from 'antd';
import VnPay from '../../../img/vnpay.svg'
import ZaloPay from '../../../img/zalo.svg'
import { CreditCardFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { formatDatetimeHMDDMMYYYY } from '../../../utils/formatDatetimeHMDDMMYYYY';
import { formatCurrency } from '../../../utils/formatCurrency';
import { BOOKINGS_STATUS } from '../../../utils/constants';
import { processPaymentReturnAsync, setBookingStatus } from '../../../features/booking/bookingSlice';



const Payment = () => {
    const dispatch = useAppDispatch();

    const { bookingResult, status } = useAppSelector(state => state.booking);

    const [paymentStatus, setPaymentStatus] = useState<string>('idle');

    const [paymentMethod, setPaymentMethod] = useState<string>('VNPay');

    const handlePayClick = () => {
        dispatch(setBookingStatus(BOOKINGS_STATUS.PENDING_PAY_BOOKING));
        openNewWindow();
    }

    ///open new payment window
    const [childWindow, setChildWindow] = useState<Window | null>(null);

    // Function to open a new window
    const openNewWindow = () => {

        const newWindow = window.open(bookingResult?.paymentUrl, '_blank', 'width=800, height=700');
        setChildWindow(newWindow);
    };

    // Add an event listener to listen for messages from the child window
    useEffect(() => {
        if (childWindow) {
            const receiveMessage = (event: MessageEvent) => {
                if (event.source === childWindow) {
                    console.log(event.data);
                    let queryParams = new URLSearchParams(event.data);
                    dispatch(processPaymentReturnAsync(queryParams))
                        .then(() => {
                            setPaymentStatus('processed');
                        }).catch(() => {
                            setPaymentStatus('error')
                        });
                }
            };

            window.addEventListener('message', receiveMessage);

            return () => {
                window.removeEventListener('message', receiveMessage);
            };
        }
    }, [childWindow, dispatch]);

    if (paymentStatus === 'processed')
        return <Result
            status="success"
            title={`Thanh toán thành công Mã đặt chỗ: ${bookingResult?.bookingCode}.`}
            subTitle={` Thông tin vé đã được gửi đến email của bạn!`}
            extra={[
                <Button type="default" key="console">
                    Quay lại trang chủ
                </Button>,
                <Link to='/tai-khoan/lich-su-mua-ve'>
                    <Button type="primary" key="console">
                        Xem các đơn đặt chỗ của tôi
                    </Button>
                </Link>

            ]}
        />
    if (paymentStatus === 'error')
        return <Result
            status="error"
            title="Xảy ra lỗi khi thanh toán"
            subTitle={`Mã đặt chỗ: ${bookingResult?.bookingCode}. Thanh toán thất bại, vui lòng thử lại sau!`}
            extra={[
                <Button type="primary" key="console">
                    Quay lại trang chủ
                </Button>,
                <Button type="default" key="console">
                    Xem các đơn đặt chỗ của tôi
                </Button>
            ]}
        />


    if (!bookingResult) return <Navigate to='/' />

    return (
        <Container>
            <Row gutter={[16, 20]}>
                <Col span={24} md={{ span: 8 }}>
                    <Card className='mt-2' style={{ width: "100%",minHeight:'19rem', border: "1px solid #DDE2E8" }}>
                        <Flex vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Thông tin hành khách</span>
                            </Flex>
                            <Flex className='mt-4' justify='space-between'>
                                <Flex>Họ và tên:</Flex>
                                <Flex>{bookingResult.fullname}</Flex>
                            </Flex>
                            <Flex className='mt-2' justify='space-between'>
                                <Flex>Số điện thoại:</Flex>
                                <Flex>{bookingResult.phoneNumber}</Flex>
                            </Flex>
                            <Flex className='mt-2' justify='space-between'>
                                <Flex>Email:</Flex>
                                <Flex>{bookingResult.email}</Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
                <Col span={24} md={{ span: 8 }} >
                    <Card className='mt-2' style={{ width: "100%",minHeight:'19rem', border: "1px solid #DDE2E8" }}>
                        <Flex vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Thông tin lượt đi</span>
                            </Flex>
                            <Flex className='mt-4' justify='space-between'>
                                <Flex>Tuyến xe:</Flex>
                                <Flex>{bookingResult?.from} ⇒ {bookingResult?.to}</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Thời gian:</Flex>
                                <Flex>{formatDatetimeHMDDMMYYYY(bookingResult!.departureTime)}</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Số lượng ghế:</Flex>
                                <Flex>{bookingResult.seatNames.split(',').length} Ghế</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Số ghế:</Flex>
                                <Flex>{bookingResult.seatNames}</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Tổng tiền lượt đi:</Flex>
                                <Flex> {formatCurrency(bookingResult.cost)}</Flex>
                            </Flex>

                        </Flex>
                    </Card>
                </Col>
                <Col span={24} md={{ span: 8 }} >
                    <Card className='mt-2' style={{ width: "100%",minHeight:'19rem', border: "1px solid #DDE2E8" }}>
                        <Flex vertical>
                            <Flex justify='space-between'>
                                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Chi tiết giá</span>
                            </Flex>
                            <Flex className='mt-4' justify='space-between'>
                                <Flex>Giá vé lượt đi:</Flex>
                                <Flex>{formatCurrency(bookingResult.price)}</Flex>
                            </Flex>
                            <Flex className='mt-3' justify='space-between'>
                                <Flex>Phí thanh toán:</Flex>
                                <Flex>{formatCurrency(bookingResult.fee)}</Flex>
                            </Flex>
                            <Divider />
                            <Flex justify='space-between'>
                                <Flex>Tổng tiền:</Flex>
                                <Flex>{bookingResult.cost}</Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
                <Col span={16} offset={4} className='mt-1'>
                    <Card className='mt-2' style={{ width: "100%", border: "1px solid #DDE2E8" }}>
                        <Flex>
                            <Flex flex={1} vertical>
                                <Flex justify='center'>
                                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Chọn phương thức thanh toán</span>
                                </Flex>
                                <Radio.Group>
                                    <Flex vertical gap={20} className='mt-3 ml-3'>

                                        <Radio value='VNPay' onChange={(e) => { setPaymentMethod(e.target.value) }}>
                                            <Flex align='center' gap={15}>
                                                <img src={VnPay} style={{ width: '3rem', height: '3rem' }} alt='vnpay icon' />
                                                <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>VNPay</span>
                                            </Flex>
                                        </Radio>
                                        {/* <Radio value='ZaloPay' onChange={(e) => { setPaymentMethod(e.target.value) }}>
                                        <Flex align='center' gap={15}>
                                            <img src={ZaloPay} style={{ width: '3rem', height: '3rem' }} alt='zalopay icon' />
                                            <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>ZaloPay</span>
                                        </Flex>
                                    </Radio> */}
                                    </Flex>
                                </Radio.Group>
                                <Flex justify='center'>
                                    <Button type="primary"
                                        onClick={handlePayClick}
                                        loading={paymentStatus === 'processing'}
                                        style={{ display: "block", margin: "0 auto", minWidth: "250px", height: "110%", bottom: "-100%", backgroundColor: "#f87c1c", borderRadius: "100px" }}
                                        icon={<CreditCardFilled />} size="large">
                                        <Typography.Text strong style={{ color: "white", fontSize: "1.1em" }}>Thanh Toán</Typography.Text>
                                    </Button>
                                </Flex>
                            </Flex>
                            <Flex flex={1}>
                            </Flex>
                        </Flex>

                    </Card>

                </Col>




            </Row>
        </Container>
    );
}

export default Payment
