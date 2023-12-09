import { faGear, faWrench, faAngleDown, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Tag, Dropdown, Button, Row, Col, Card, Flex, Pagination, Divider, Table, Modal, Input, Select, DatePicker, Typography, InputNumber } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import agent from '../../../app/api/agent';
import { useFormAlign } from '../../../app/hooks/useFormAlign';
import { Trip } from '../../../app/models/trip';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { MANAGEMENT_STATUS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDatetimeHMDDMMYYYY } from '../../../utils/formatDatetimeHMDDMMYYYY';
import { getAllTrips, createTrip, updateTrip, getAllBookings } from '../managementAsyncThunkMethods';
import { setBookingManagementParams, setTripManagementParams } from '../managmentSlice';

import dayjs from 'dayjs';
// @ts-ignore
import VNnum2words from 'vn-num2words';
import { BookingResult } from '../../../app/models/booking';
import { SearchOutlined } from '@ant-design/icons';
import { filter } from 'lodash';

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



const Bookings = () => {
    const dispatch = useAppDispatch();
    const { status, tripParams, trips, bookings, bookingManagementParams, metaData } = useAppSelector(state => state.management);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [priceString, setPriceString] = useState('');

    const [form] = Form.useForm();
    const formAlign = useFormAlign();

    const columns: ColumnsType<BookingResult> = useMemo(() => [
        {
            key: 'customer',
            dataIndex: 'customer',
            title: 'Khách hàng',
            render: (_, record) => (<span>{record.phoneNumber} <br />{record.email} <br />{record.fullname} </span>)
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Chuyến',
            render: (_, record) => (<span>{`${record.from} => ${record.to}`}</span>)
        },
        {
            key: 'departureDate',
            dataIndex: 'departureDate',
            title: 'Khởi hành - Đến nơi',
            render: (_, record) => (<span>{`${formatDatetimeHMDDMMYYYY(record.departureTime)} `}
                {` => `}
                {`${formatDatetimeHMDDMMYYYY(record.arrivalTime)}`}</span>)
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Giá',
            render: (_, record) => (<span>{formatCurrency(record.price)}</span>)
        },
        {
            key: 'ticketCount',
            dataIndex: 'ticketCount',
            title: 'Số vé',
            render: (_, record) => (<span>{record.ticketNumber} ({record.seatNames})</span>)
        },
        {
            key: 'total',
            dataIndex: 'total',
            title: 'Tổng',
            render: (_, record) => (<span>{formatCurrency(record.cost)}</span>)
        },


        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            render: (_, record) => (<span>{
                {
                    0: <Tag color="#cccc00">Đang chờ thanh toán</Tag>,
                    1: <Tag color="#87d068">Đã thanh toán</Tag>,
                    2: <Tag color="#f50">Hết hạn thanh toán</Tag>,
                    3: <Tag color="#3498DB">Đã hoàn thành chuyến đi</Tag>,
                    4: <Tag color="#f50">Đã hủy</Tag>,
                }[record.status]
            }</span >)
        },
        {
            key: 'action',
            render: (_, record) => (<Dropdown menu={{
                items: [
                    { key: 'edit', label: <span onClick={() => startEditing(record.id)}><FontAwesomeIcon icon={faGear} className='mr-1' /> Chỉnh sửa</span> },
                    { key: 'display', label: <span><FontAwesomeIcon icon={faWrench} className='mr-1' /> Ẩn/hiện</span> },
                ]
            }} placement="bottomRight">
                <Button loading={isLoading}><FontAwesomeIcon icon={faAngleDown} className='mr-1' /> Thao tác</Button>
            </Dropdown>)
        },
    ], []);

    //fetch all bookings
    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch, bookingManagementParams])




    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    //filter values
    const [isFilter, setIsFilter] = useState<Boolean>(false)


    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    /////create form
    //route
    const [routeList, setRouteList] = useState([]);
    useEffect(() => {
        agent.Route.fetch("")
            .then((routes) => {
                setRouteList(routes)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    //coach
    const [coachList, setCoachList] = useState([]);
    useEffect(() => {
        agent.Coach.fetch("")
            .then((data) => {
                setCoachList(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleSubmitForm = () => {
        form
            .validateFields()
            .then((values) => {
                const formData = {
                    ...values,
                    arrivalTime: dayjs(values.arrivalTime).format("DD-MM-YYYY HH:mm"),
                    departureTime: dayjs(values.departureTime).format("DD-MM-YYYY HH:mm")
                }

                if (!editing)
                    dispatch(createTrip(formData))
                        .then(() => dispatch(setTripManagementParams({ pageNumber: 1 })))
                else
                    dispatch(updateTrip(formData))
                        .then(() => dispatch(setTripManagementParams({ pageNumber: 1 })))
            })
            .catch((errorInfo) => {
                console.log('Form validation failed:', errorInfo);
            });
        setPriceString('');
    }
    //Edit 
    const startEditing = (id: string) => {
        setIsLoading(true);
        setIsOpenModal(true);

        agent.Trip.getById(id)
            .then((trip: any) => {
                form.resetFields();
                form.setFieldsValue({
                    id: trip.id,
                    routeID: trip.routeID,
                    departureTime: dayjs(trip.departureTime),
                    arrivalTime: dayjs(trip.arrivalTime),
                    price: trip.price,
                    coachID: trip.coachID,
                    status: trip.status
                });
                setEditing(true);
                setIsLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setIsLoading(false);
            });
    }
    //pagination
    const handlePageChange = (page: number, pageSize: number) => {
        dispatch(setBookingManagementParams({ pageNumber: page, pageSize: pageSize }));
    }

    //Handle search
    const [searchPhones, setSearchPhones] = useState([]);
    const handleSearchPhone = (value: string) => {
        if (value)
            agent.Account.getSearchPhone({ phone: value })
                .then((phones) => {
                    setSearchPhones(phones);
                    console.log(phones);
                })
                .catch((err) => {
                    console.log(err);
                })
    }
    const handleChangePhone = (value: string) => {
        if (value)
            dispatch(setBookingManagementParams({ phone: value }));
        else
            dispatch(setBookingManagementParams({ pageNumber: 1, phone: '' }));
    }

    return (
        <>
            <Row gutter={[18, 20]}>
                <Col span={24}>
                    <Card bordered style={{ padding: "0" }}>
                        <Flex vertical justify='space-between'>
                            <Flex wrap='wrap' align='center' className='mb-2' justify='space-between'>
                                <h2 style={{ margin: 0 }}>Danh sách đặt vé</h2>
                                <Flex gap={10} align='center'>
                                    <FontAwesomeIcon style={{ fontSize: '2em' }} icon={faFilter} />
                                    {/* <Input
                                        onChange={handleFilerName}
                                        size="large"
                                        placeholder="Tìm theo tên"
                                        prefix={<SearchOutlined />} />
                                    <Input
                                        onChange={handleFilerAddress}
                                        size="large"
                                        placeholder="Tìm theo địa chỉ"
                                        prefix={<SearchOutlined />} /> */}
                                    <Select
                                        showSearch
                                        allowClear
                                        onSearch={handleSearchPhone}
                                        onChange={handleChangePhone}
                                        filterOption={filterOption}
                                        style={{ minWidth: '15rem' }}
                                        size="large" placeholder="Tìm theo số điện thoại"
                                        options={searchPhones.map((phone) => ({ value: phone, label: phone }))} />
                                </Flex>
                                {metaData !== null &&
                                    <Flex>
                                        <Pagination
                                            className='mt-3'
                                            pageSizeOptions={[5, 10, 20, 50]}
                                            total={metaData?.totalCount}
                                            pageSize={metaData?.pageSize}
                                            current={metaData.currentPage}
                                            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total}`}
                                            defaultPageSize={20}
                                            defaultCurrent={1}
                                            showSizeChanger
                                            onChange={handlePageChange}
                                        />
                                    </Flex>}
                            </Flex>
                            <Divider />
                            <Flex vertical align='center'>
                                <Table
                                    scroll={{ y: 450 }}
                                    pagination={false}
                                    loading={status === MANAGEMENT_STATUS.PENDING_FETCH_BOOKINGS}
                                    style={{ width: '100%' }} columns={columns} dataSource={bookings!}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            </Row>
            {/* Creating modal */}
            <Modal
                confirmLoading={status === MANAGEMENT_STATUS.PENDING_CREATE_ROUTES
                    || status === MANAGEMENT_STATUS.PENDING_EDIT_ROUTES}
                title={<p style={{ textAlign: 'center', margin: 0 }}> {editing && 'Chỉnh sửa chuyến' || 'Thêm chuyến'}</p>}
                okText="Lưu"
                centered
                width={1000}
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
                open={isOpenModal}
                onOk={handleSubmitForm}
                onCancel={() => setIsOpenModal(false)}
            >
                <Card style={{ margin: 0, padding: 0 }} loading={isLoading}>
                    <Form {...formAlign} form={form} >
                        <Form.Item name='id' >
                            <Input type='hidden' />
                        </Form.Item>
                        <Form.Item label="Tuyến xe" name='routeID' rules={[
                            { required: true, message: "Chọn tuyến xe" },
                        ]}>
                            <Select
                                placeholder="Chọn tuyến xe"
                                size='large'
                                showSearch
                                filterOption={filterOption}

                                options={routeList?.map((route: any) => ({ value: route.id, label: `${route.fromOffice.name} => ${route.toOffice.name}` }))}
                            />
                        </Form.Item>
                        <Form.Item label="Xe" name='coachID' rules={[
                            { required: true, message: "Chọn xe" },
                        ]}>
                            <Select
                                size='large'
                                placeholder="Chọn xe"
                                showSearch
                                filterOption={filterOption}
                                options={coachList?.map((coach: any) => ({ value: coach.id, label: `${coach.coachCode} (Số ${coach.coachNumber})` }))}
                            />
                        </Form.Item>
                        <Form.Item label={<span>Giờ khởi hành <br /> (ngày-tháng-năm giờ:phút)</span>} name='departureTime' rules={[
                            { required: true, message: "Chọn ngày giờ khởi hành" },
                        ]}>
                            <DatePicker
                                // disabledDate={(current) => current && current < moment().startOf('day')}
                                format="DD-MM-YYYY HH:mm"
                                // value={parseDateFromDDMMYYYY(tripParams.departureDate)}
                                placeholder="Chọn ngày giờ khởi hành"
                                showTime
                                style={{ width: "100%" }}
                                size="large" />
                        </Form.Item>
                        <Form.Item label={<span>Giờ đến nơi <br /> (ngày-tháng-năm giờ:phút)</span>} name='arrivalTime' rules={[
                            { required: true, message: "Chọn ngày giờ đến nơi" },
                        ]}>
                            <DatePicker
                                // disabledDate={(current) => current && current < moment().startOf('day')}
                                format="DD-MM-YYYY HH:mm"
                                // value={parseDateFromDDMMYYYY(tripParams.departureDate)}
                                showTime

                                placeholder="Chọn ngày giờ đến nơi"
                                style={{ width: "100%" }}
                                size="large" />
                        </Form.Item>
                        <Form.Item colon={false} style={{ margin: 0 }} label=" ">
                            <Typography.Text style={{ marginLeft: '10px' }} >{priceString}</Typography.Text>
                        </Form.Item>
                        <Form.Item label="Giá (VND)" name='price' rules={[
                            { required: true, message: "Nhập giá" },
                        ]}>
                            <InputNumber
                                size='large'
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value?.replace(/(,*)/g, '') ?? 0}
                                placeholder='Nhập giá chuyến'
                                onChange={(value) => setPriceString(VNnum2words(parseInt(value?.toString() ?? '')) + ' đồng')}
                            />

                        </Form.Item>

                        <Form.Item label="Trạng thái" name='status'>
                            <Select
                                placeholder="Chọn trạng thái"
                                options={[
                                    { value: 0, label: "Lên lịch" },
                                    { value: 1, label: "Đang thực hiện" },
                                    { value: 2, label: "Đã hoàn thành" },
                                    { value: 3, label: "Đã hủy" },
                                ]}
                                style={{ width: "100%" }}
                                size="large" />
                        </Form.Item>


                    </Form>
                </Card>
            </Modal>

        </>
    )
}


export default Bookings