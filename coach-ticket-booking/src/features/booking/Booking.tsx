import { Alert, Button, Card, Checkbox, Col, Divider, Flex, Input, Modal, Popover, Radio, Row, Select, Space, Tabs, Typography, notification } from 'antd'
import React, { useState } from 'react'
import Container from '../../app/components/container/Container'
import Seat from '../../app/components/seat/Seat';
import { DownloadOutlined, QuestionCircleFilled } from '@ant-design/icons';
import Title from 'antd/es/skeleton/Title';
import './Booking.css';
import { formatCurrency } from '../../utils/formatCurrency';
import { useScreenSize } from '../../app/hooks/useScreenSize';
import TabPane from 'antd/es/tabs/TabPane';
import Loading from '../../app/components/Loading';

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
    { seatName: 'B09', status: 0 },
    { seatName: 'B10', status: 0 },
    { seatName: 'B11', status: 0 },
    { seatName: 'B12', status: 0 },
    { seatName: 'B13', status: 0 },
    { seatName: 'B14', status: 0 },
    { seatName: 'B15', status: 0 },
    { seatName: 'B16', status: 0 },
    { seatName: 'B17', status: 0 },
];

// Filter `option.label` match the user type `input`
const filterPickUpOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const Booking = () => {
    const isLargeScreen = useScreenSize();

    //Dropoff 
    const [dropOffTranship, setDropOffTranship] = useState(false);
    //Seat
    const [seats, setseats] = useState([...seatList]);
    const handleSeatClick = (seat: any) => {
        if (seat.status === 1) return; //if disabled return

        if (seat.status === 0) {
            if (selectingSeats.length === 5) {
                notification.warning({ message: 'Chỉ chọn tối đa 5 ghế', duration: 1 });
                return;
            }

            setseats(seats.map(item => {
                if (item.seatName === seat.seatName) {
                    return { ...item, status: 2 };
                }
                return item;
            }));
            console.log(seat, 'clicked');
        }; //if active 

        if (seat.status === 2) {
            setseats(seats.map(item => {
                if (item.seatName === seat.seatName) {
                    return { ...item, status: 0 };
                }
                return item;
            }));
            console.log(seat, 'clicked');
        }; //if selecting

        toggleSeat(seat);

    }

    //Privacy
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    //Selecting seats
    const [selectingSeats, setSelectingSeats] = useState<any>([])

    const toggleSeat = (seat: any) => {
        let isExisted = selectingSeats.find((s: any) => s.seatName === seat.seatName);

        if (isExisted)
            setSelectingSeats(selectingSeats.filter((s: any) => s.seatName !== seat.seatName));
        else
            setSelectingSeats([...selectingSeats, seat]);
    }
    //payment
    const [isPaying, setIsPaying] = useState(false);

    const handlePaymentClick = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);

            // dispatch booking create and then redirect to payment page
            const url = 'https://example.com'; // Replace with your desired URL

            // Open the new window
            window.open(url, '_blank');
        }, 1500);
    }

    if (isLargeScreen)
        return (
            <Container>
                < Row gutter={[16, 20]} >
                    <Col md={{ span: 16 }}>
                        <Card className='mt-2' style={{ border: "1px solid #DDE2E8", padding: '0.5rem' }}>
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
                            <Flex className='mt-2' vertical justify='space-between'>
                                <Flex gap={20} className='pl-3'>
                                    {/* floor 1 */}
                                    <Flex flex={1} vertical align='center'>
                                        <span style={{ fontWeight: 'bold', translate: '-9px' }}>Tầng dưới</span>
                                        <Row gutter={[20, 5]}>
                                            {seats.map((seat) =>
                                                seat.seatName.startsWith('A') &&
                                                <Col
                                                    key={seat.seatName}
                                                    span={seat.seatName.includes('01') ? 16 : 8}>
                                                    <Seat onClick={() => handleSeatClick(seat)} {...seat} />
                                                </Col>
                                            )}
                                        </Row >
                                    </Flex>
                                    <Divider type='vertical' style={{ height: "0" }} />
                                    {/* floor 2 */}
                                    <Flex align='center' vertical flex={1}>
                                        <span style={{ fontWeight: 'bold', translate: '-9px' }}>Tầng trên</span>
                                        <Row gutter={[20, 5]}>
                                            {seats.map((seat) =>
                                                seat.seatName.startsWith('B') &&
                                                <Col
                                                    key={seat.seatName}
                                                    span={seat.seatName.includes('01') ? 16 : 8}>
                                                    <Seat onClick={() => handleSeatClick(seat)} {...seat} />
                                                </Col>
                                            )}
                                        </Row >
                                    </Flex>
                                </Flex>

                                <Flex flex={1} gap={20} className='mt-5' justify='center'>
                                    <Flex gap={10} align='center'>
                                        <span style={{ display: "block", width: "1.5rem", height: "1.5rem", borderRadius: 6, backgroundColor: "#D5D9DD" }}></span>
                                        <Typography.Text style={{ fontWeight: "bold" }}>
                                            Đã bán
                                        </Typography.Text>
                                    </Flex>
                                    <Flex gap={10} align='center'>
                                        <span style={{ display: "block", width: "1.5rem", height: "1.5rem", borderRadius: 6, backgroundColor: "#D3F3FF" }}></span>
                                        <Typography.Text style={{ fontWeight: "bold" }}>
                                            Còn trống
                                        </Typography.Text>
                                    </Flex>
                                    <Flex gap={10} align='center'>
                                        <span style={{ display: "block", width: "1.5rem", height: "1.5rem", borderRadius: 6, backgroundColor: "#FDEDE8" }}></span>
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
                            <Flex className='mt-2'>
                                <Flex flex={1} vertical>
                                    <span style={{ textTransform: 'uppercase' }}>Điểm đón</span>
                                    <Flex justify='space-between' className='mt-2'>
                                        <Radio.Group size='large' value={1}>
                                            <Radio value={1}>Điểm đón</Radio>
                                            <Radio disabled value={2}>Trung chuyển</Radio>
                                        </Radio.Group>
                                    </Flex>
                                    <Select
                                        size='large'
                                        className='mt-2'
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
                                    <Flex justify='space-between' className='mt-2'>
                                        <Radio.Group size='large' onChange={(e) => { setDropOffTranship(e.target.value === 2) }} defaultValue={1}>
                                            <Radio value={1}>Điểm đón</Radio>
                                            <Radio value={2}>Trung chuyển</Radio>
                                        </Radio.Group>
                                    </Flex>
                                    {dropOffTranship ?
                                        <Input size='large' placeholder='Nhập điểm đi' className='mt-2' /> :
                                        <Select
                                            size='large'
                                            className='mt-2'
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
                            {/* Pickup Dropoff info */}

                            {/* Customer info */}
                            <Flex className='mt-2' >
                                <Flex vertical flex={1}>
                                    <Flex justify='space-between'>
                                        <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Thông tin khách hàng

                                        </span>
                                    </Flex>
                                    <Flex vertical className='mt-3'>
                                        <div>
                                            <span >Họ và tên <span style={{ color: 'red' }}>*</span></span>
                                            <Input allowClear size='large' placeholder='Nhập họ tên' />
                                        </div>

                                        <div className='mt-3' >
                                            <span>Số điện thoại<span style={{ color: 'red' }}>*</span></span>
                                            <Input allowClear size='large' placeholder='Nhập số điện thoại' />
                                        </div>
                                        <div className='mt-3'>
                                            <span  >Email<span style={{ color: 'red' }}>*</span></span>
                                            <Input allowClear size='large' placeholder='Nhập email' />
                                        </div>

                                    </Flex>
                                </Flex>
                                <Flex flex={1} vertical className='pl-3 pr-3'>
                                    <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>ĐIỀU KHOẢN & LƯU Ý</p>
                                    <p style={{ textAlign: 'justify' }}>
                                        (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành,
                                        mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống FUTA BUS LINE.
                                        Vui lòng liên hệ Trung tâm tổng đài 1900 6067 để được hỗ trợ.
                                    </p>
                                    <p style={{ textAlign: 'justify' }}>
                                        (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển 1900 6918 trước khi đặt vé.
                                        Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.
                                    </p>
                                </Flex>
                            </Flex>
                            {/* Privacy */}
                            <Flex className='mt-2'>
                                <div className='mt-3'>
                                    <Checkbox><span style={{ cursor: 'pointer', color: 'orange' }} onClick={() => setPrivacyModalOpen(true)}>Chấp nhận điều khoản đặt vé</span> & chính sách bảo mật thông tin của FUTABusline</Checkbox>
                                </div>
                                <Modal
                                    title={<span style={{ textAlign: 'center', display: 'block', fontSize: '1.3rem', fontWeight: 'bold' }}>Quyền Và Nghĩa Vụ Của Khách Hàng</span>}
                                    style={{ top: 20 }}
                                    open={privacyModalOpen}
                                    onCancel={() => setPrivacyModalOpen(false)}
                                    footer={null}
                                    width={1000}

                                >
                                    <Flex>
                                        <div style={{ maxHeight: '450px', overflow: 'auto', textAlign: 'justify' }} className="pl-4 pr-4 pb-4">

                                            <p className="terms-text">
                                                Được tham khảo những thông tin cơ bản liên quan đến việc chọn và đặt vé như: tên hãng xe, tuyến xe, mã số ghế, phương thức và thời hạn thanh toán.
                                            </p>

                                            <p className="terms-text">
                                                Thông tin cá nhân của khách hàng trên FUTABUS.VN được FUTABUS.VN cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin khách hàng của FUTABUS.VN.
                                            </p>
                                            <p className="terms-text">
                                                - Việc thu thập và sử dụng thông tin của khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
                                            </p>

                                            <p className="terms-text">
                                                Khách hàng có thể gửi khiếu nại trực tiếp đến bộ phận hỗ trợ khách hàng của FUTABUS.VN. Khi nhận được khiếu nại của hành khách, bộ phận hỗ trợ khách hàng của FUTABUS.VN sẽ chuyển ngay khiếu nại đó đến Hãng xe bằng các phương thức nhanh nhất và yêu cầu giải quyết.
                                            </p>

                                            <p className="terms-text">
                                                Khách hàng cần phải thường xuyên đọc và tuân theo các Chính sách và Quy định đang được đăng trên FUTABUS.VN để có thể hiểu và thực hiện được các Chính sách và Quy định tại thời điểm đó.
                                            </p>

                                            <p className="terms-text">
                                                Khách hàng đồng ý không truy cập (hoặc cố truy cập) bất kỳ các dịch vụ nào bằng bất kỳ các phương tiện nào khác ngoài giao diện được cung cấp bởi FUTABUS.VN.
                                            </p>

                                            <p className="terms-text">
                                                Khách hàng đồng ý rằng sẽ không tiến hành bất kỳ hoạt động nào quấy nhiễu hoặc phá các dịch vụ.
                                            </p>

                                            <p className="terms-text">
                                                Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống FUTA BUS LINE.
                                            </p>

                                            <p className="terms-text">
                                                &nbsp;Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc hủy/đổi vé.
                                            </p>

                                            <p className="terms-text">
                                                Mọi trường hợp có hành vi gian lận, hack, phá hoại hệ thống, ... Chúng tôi sẽ không giải quyết và sẽ chuyển cơ quan chức năng xử lý theo pháp luật.
                                            </p>

                                            <p className="terms-text">
                                                &nbsp;Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ số điện thoại{' '}
                                                <a target="_self" rel="" href="tel:1900 6067">
                                                    <span className="terms-orange-text">1900 6918</span>
                                                </a>
                                                <span className="terms-text"> trước khi đặt vé. Chúng tôi sẽ không đón / trung chuyển tại những địa điểm xe trung chuyển không thể tới được!</span>
                                            </p>

                                            <p className="terms-text">
                                                Thí sinh đi thi đại học vui lòng mang theo{' '}
                                                <span className="terms-orange-text">CMND và GIẤY BÁO THI</span>. Mọi trường hợp gian lận mua vé không phải thí sinh công ty Phương Trang sẽ KHÔNG chịu trách nhiệm cung cấp vé và hoàn trả tiền.
                                            </p>
                                        </div>
                                    </Flex>
                                </Modal>
                            </Flex>
                            <Divider />
                            <Flex justify='space-between'>
                                {/* cost */}
                                <Flex>
                                    {formatCurrency(selectingSeats.length * 165000)}
                                </Flex>
                                {/* action buttons */}
                                <Flex gap={10}>
                                    <Button danger shape="round" size='middle'>
                                        Hủy
                                    </Button>
                                    <Button onClick={handlePaymentClick} loading={isPaying} type="primary" style={{ backgroundColor: '#ef5222' }} shape="round" size='middle'>
                                        Thanh Toán
                                    </Button>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>
                    <Col md={{ span: 8 }} >
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
                                    <Flex>{selectingSeats.length} Ghế</Flex>
                                </Flex>
                                <Flex className='mt-3' justify='space-between'>
                                    <Flex>Số ghế</Flex>
                                    <Flex>{selectingSeats.map((seat: any) => seat.seatName).join(', ')}</Flex>
                                </Flex>
                                <Flex className='mt-3' justify='space-between'>
                                    <Flex>Tổng tiền lượt đi</Flex>
                                    <Flex>{formatCurrency(selectingSeats.length * 165000)}</Flex>
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
                                    <Flex>{formatCurrency(selectingSeats.length * 165000)}</Flex>
                                </Flex>
                                <Flex className='mt-3' justify='space-between'>
                                    <Flex>Phí thanh toán</Flex>
                                    <Flex>0đ</Flex>
                                </Flex>
                                <Divider />
                                <Flex justify='space-between'>
                                    <Flex>Tổng tiền</Flex>
                                    <Flex>{formatCurrency(selectingSeats.length * 165000)}</Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>
                </Row >
            </Container >
        )

    return (
        <div className="medium-screen-content">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                    <Card title="Card 1">Content for Card 1</Card>
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    <Card title="Card 2">Content for Card 2</Card>
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    <Card title="Card 3">Content for Card 3</Card>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Booking