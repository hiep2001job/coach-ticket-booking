import { Button, Card, Col, Divider, Dropdown, Flex, Form, Input, Modal, Pagination, Row, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Office } from '../../../app/models/office';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import { faAngleDown, faFilter, faGear, faPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { MANAGEMENT_STATUS } from '../../../utils/constants';

import { useFormAlign } from '../../../app/hooks/useFormAlign';
import agent from '../../../app/api/agent';
import { Route } from '../../../app/models/route';
import { fetchRoutesAsync, fetchFullOfficesAsync, createRouteAsync, updateRouteAsync } from '../managementAsyncThunkMethods';
import { setRouteParams } from '../managmentSlice';




const TripRoutes = () => {
    const dispatch = useAppDispatch();
    const { routes, status, offices, metaData, routesParams, fullOfficeLoaded, fullOffice } = useAppSelector(state => state.management);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const [form] = Form.useForm();
    const formAlign = useFormAlign();

    const columns: ColumnsType<Route> = useMemo(() => [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tuyến',
            render: (_, record) => (<span>{record.fromOffice.name + ' => ' + record.toOffice.name}</span>)
        },
        {
            key: 'name',
            dataIndex: 'address',
            title: 'Địa chỉ',
            render: (_, record) => (<span>{`${record.fromOffice.name} (${record.fromOffice.address})`}
                <br />
                {` => `}
                <br />{`${record.toOffice.name} (${record.toOffice.address})`}</span>)

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

    useEffect(() => {
        dispatch(fetchRoutesAsync());
    }, [dispatch, routesParams])




    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    //filter values
    const [isFilter, setIsFilter] = useState<Boolean>(false)
    // const handleFilerName = debounce((e) => {
    //     dispatch(setOfficeParams({ name: e.target.value, pageNumber: 1 }));
    // }, 400);
    // const handleFilerAddress = debounce((e) => {
    //     dispatch(setOfficeParams({ address: e.target.value, pageNumber: 1 }));
    // }, 400);
    // const handleFilerStatus = debounce((value) => {
    //     dispatch(setOfficeParams({ status: value, pageNumber: 1 }));
    // }, 400);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    //create form
    const [selectedDepartureId, setSelectedDepartureId] = useState<string>('');
    const [depatureOptions, setDepatureOptions] = useState<Office[] | null>([]);
    const [destOptions, setDestOptions] = useState<Office[] | null>([]);

    useEffect(() => {
        if (!fullOfficeLoaded)
            dispatch(fetchFullOfficesAsync());
        setDepatureOptions([...fullOffice!]);
        setDestOptions(fullOffice!.filter((office: Office) => office.id !== selectedDepartureId));

    }, [dispatch, fullOffice, fullOfficeLoaded, selectedDepartureId]);

    const handleSubmitForm = () => {
        form
            .validateFields()
            .then((values) => {
                if (!editing)
                    dispatch(createRouteAsync(values))
                else
                    dispatch(updateRouteAsync(values))
                console.log(values);
            })
            .catch((errorInfo) => {
                console.log('Form validation failed:', errorInfo);
            });

    }
    //Edit 
    const startEditing = (id: string) => {
        setIsLoading(true);
        setIsOpenModal(true);

        agent.Route.getById(id)
            .then((route: any) => {
                form.resetFields();
                form.setFieldsValue({ ...route });
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
        dispatch(setRouteParams({ pageNumber: page, pageSize: pageSize }));
    }

    return (
        <>
            <Row gutter={[18, 20]}>
                <Col span={24}>
                    <Card bordered style={{ padding: "0" }}>
                        <Flex vertical justify='space-between'>
                            <Flex wrap='wrap' align='center' className='mb-2' justify='space-between'>
                                <h2 style={{ margin: 0 }}>Danh sách văn phòng</h2>
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
                                    loading={status === MANAGEMENT_STATUS.PENDING_FETCH_ROUTES}
                                    style={{ width: '100%' }} columns={columns} dataSource={routes!}
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
                title={<p style={{ textAlign: 'center', margin: 0 }}> {editing && 'Chỉnh sửa tuyến' || 'Thêm tuyến'}</p>}
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
                        <Form.Item label="Xuất phát" name='fromOfficeID' rules={[
                            { required: true, message: "Nhập tên văn phòng" },
                        ]}>
                            <Select
                                size='large'
                                showSearch
                                filterOption={filterOption}
                                onChange={(value) => setSelectedDepartureId(value)}
                                options={depatureOptions?.map((office) => ({ value: office.id, label: `${office.name} (${office.address})` }))}
                            />
                        </Form.Item>

                        <Form.Item label="Đích đến" name='toOfficeID' rules={[
                            { required: true, message: "Nhập tên văn phòng" },
                        ]}>
                            <Select
                                size='large'
                                showSearch
                                filterOption={filterOption}
                                options={destOptions?.map((office) => ({ value: office.id, label: `${office.name} (${office.address})` }))} />
                        </Form.Item>
                        <Form.List name="officesInRoute">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Card
                                            title={"Văn phòng điểm dừng " + fields.length}
                                            extra={<MinusCircleOutlined onClick={() => remove(name)} />}
                                            key={key}
                                            className='mb-3'>
                                            <Form.Item
                                                wrapperCol={{ span: 16 }}
                                                labelCol={{ span: 8 }}
                                                {...restField}
                                                name={[name, 'officeId']}
                                                label='Văn phòng'
                                                rules={[{ required: true, message: 'Vui lòng chọn điểm điểm dừng' }]}
                                            >
                                                <Select
                                                    size='large'
                                                    options={fullOffice?.map((office) => ({ value: office.id, label: `${office.name} (${office.address})` }))}
                                                    placeholder="Chọn văn phòng điểm dừng" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Thứ tự'
                                                initialValue={fields.length}
                                                {...restField}
                                                name={[name, 'order']}
                                                rules={[{ required: true, message: 'Vui lòng nhập thứ tự hiển thị' }]}
                                            >
                                                <Input
                                                    size='large'
                                                    type='number'
                                                    placeholder="Nhập thời gian đến" />
                                            </Form.Item>
                                            <Form.Item
                                                label='Thời gian đến (h)'

                                                {...restField}
                                                name={[name, 'arrivalTime']}
                                                rules={[{ required: true, message: 'Vui lòng nhập thời gian đến' }]}
                                            >
                                                <Input
                                                    size='large'
                                                    type='number'
                                                    placeholder="Nhập thời gian đến" />
                                            </Form.Item>

                                        </Card>
                                    ))}
                                    <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm văn phòng
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                    </Form>
                </Card>
            </Modal>

        </>
    )
}

export default TripRoutes