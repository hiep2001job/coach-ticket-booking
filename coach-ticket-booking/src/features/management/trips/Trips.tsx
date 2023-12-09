import { faGear, faWrench, faAngleDown, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Dropdown, Button, Row, Col, Card, Flex, Pagination, Divider, Table, Modal, Input, Select, Tag, DatePicker, InputNumber, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'

import agent from '../../../app/api/agent';
import { useFormAlign } from '../../../app/hooks/useFormAlign';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { MANAGEMENT_STATUS } from '../../../utils/constants';
import { getAllTrips, createTrip, updateTrip } from '../managementAsyncThunkMethods';
import { setTripManagementParams } from '../managmentSlice';
import { Trip } from '../../../app/models/trip';
import { formatDatetimeHMDDMMYYYY } from '../../../utils/formatDatetimeHMDDMMYYYY';
import dayjs from 'dayjs';

// @ts-ignore
import VNnum2words from 'vn-num2words';
import { formatCurrency } from '../../../utils/formatCurrency';

const Trips = () => {
    const dispatch = useAppDispatch();
    const { status, tripParams, trips, metaData } = useAppSelector(state => state.management);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [priceString, setPriceString] = useState('');

    const [form] = Form.useForm();
    const formAlign = useFormAlign();

    const columns: ColumnsType<Trip> = useMemo(() => [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Chuyến',
            render: (_, record) => (<span>{record.fromOffice + ' => ' + record.toOffice}</span>)
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
            key: 'available',
            dataIndex: 'available',
            title: 'Ghế trống',
            render: (_, record) => (<span>{record.availableSeatNumber}</span>)
        },
        {
            key: 'route',
            dataIndex: 'route',
            title: 'Tuyến',
            render: (_, record) => (<span>{record.fromOffice + ' => ' + record.toOffice}</span>)
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Trạng thái',
            render: (_, record) => (<span>{
                {
                    0: <Tag color="#108ee9">Đã lên lịch</Tag>,
                    1: <Tag color="#cccc00">Đang thực hiện</Tag>,
                    2: <Tag color="#87d068">Đã hoàn thành</Tag>,
                    3: <Tag color="#f50">Đã hủy</Tag>,
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

    //fetch all trips
    useEffect(() => {
        dispatch(getAllTrips());
    }, [dispatch, tripParams])




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
        dispatch(setTripManagementParams({ pageNumber: page, pageSize: pageSize }));
    }



    return (
        <>
            <Row gutter={[18, 20]}>
                <Col span={24}>
                    <Card bordered style={{ padding: "0" }}>
                        <Flex vertical justify='space-between'>
                            <Flex wrap='wrap' align='center' className='mb-2' justify='space-between'>
                                <h2 style={{ margin: 0 }}>Danh sách chuyến</h2>
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
                                <Flex gap={10}>

                                    <Button
                                        onClick={() => {
                                            setEditing(false);
                                            setIsOpenModal(true);
                                            setPriceString('');
                                            form.resetFields();
                                        }}
                                        type='primary'
                                        size='large'
                                        style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#FF5733' }} >
                                        <FontAwesomeIcon icon={faPlus} className='mr-2' />
                                        Thêm tuyến
                                    </Button>

                                    <Button
                                        onClick={() => { setIsFilter(!isFilter) }}
                                        type={isFilter ? 'primary' : 'default'}
                                        size='large'
                                        style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#FF5733' }} >
                                        <FontAwesomeIcon icon={faFilter} className='mr-2' />
                                        Lọc
                                    </Button>
                                </Flex>
                            </Flex>
                            <Divider style={{ margin: '0.5rem 0' }} />

                            {isFilter && (<>
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
                                        prefix={<SearchOutlined />} />
                                    <Select
                                        onChange={handleFilerStatus}
                                        style={{ minWidth: '11rem' }}
                                        size="large" placeholder="Trạng thái"
                                        options={[
                                            { value: '-1', label: 'Tất cả' },
                                            { value: '0', label: 'Hoạt động' },
                                            { value: '1', label: 'Không hoạt động' }
                                        ]} /> */}
                                </Flex><Divider />
                            </>)}
                            <Flex vertical align='center'>
                                <Table
                                    scroll={{ y: 450 }}
                                    pagination={false}
                                    loading={status === MANAGEMENT_STATUS.PENDING_FETCH_TRIPS}
                                    style={{ width: '100%' }} columns={columns} dataSource={trips!}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            </Row>
            {/* Creating modal */}
            <Modal
                confirmLoading={status === MANAGEMENT_STATUS.PENDING_CREATE_TRIP
                    || status === MANAGEMENT_STATUS.PENDING_EDIT_TRIP}
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

export default Trips


