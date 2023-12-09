import { Badge, Button, Card, Col, Divider, Dropdown, Flex, Form, Input, Modal, Pagination, Row, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Office } from '../../../app/models/office';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import { faAngleDown, faFilter, faGear, faPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { MANAGEMENT_STATUS } from '../../../utils/constants';
import { useFormAlign } from '../../../app/hooks/useFormAlign';
import agent from '../../../app/api/agent';
import { debounce } from 'lodash';
import { fetchOfficesAsync, fetchTownsAsync, createOfficesAsync, updateOfficesAsync } from '../managementAsyncThunkMethods';
import { setOfficeParams } from '../managmentSlice';



const data: Office[] = [
    {
        id: '1',
        name: 'John Brown',
        address: 'New York No. 1 Lake Park',
        townName: 'town name'
    },
    {
        id: '2',
        name: 'Jim Green',
        address: 'London No. 1 Lake Park',
        townName: 'town name'

    },
    {
        id: '4',
        name: 'Joe Black',
        address: 'Sydney No. 1 Lake Park',
        townName: 'town name'
    },
    {
        id: '5',
        name: 'Jim Red',
        address: 'London No. 2 Lake Park',
        townName: 'town name'

    },
];

const statusTabs =
    [
        {
            label: <span>Hoạt động  <Badge count={11} showZero color='#FF5733' /></span>,
            key: '0',

        },
        {
            label: <span>Không hoạt động  <Badge count={11} showZero color='#FF5733' /></span>,
            key: '1',

        },

    ]
    ;



const Offices = () => {
    const dispatch = useAppDispatch();
    const { offices, status, towns, metaData, officeParams } = useAppSelector(state => state.management);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const [form] = Form.useForm();
    const formAlign = useFormAlign();

    const columns: ColumnsType<Office> = useMemo(() => [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên Văn Phòng'

        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Địa Chỉ'
        },
        {
            key: 'townName',
            dataIndex: 'townName',
            title: 'Khu Vực'
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
        dispatch(fetchOfficesAsync());
    }, [dispatch, officeParams])

    useEffect(() => {
        dispatch(fetchTownsAsync());
    }, [dispatch])

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    //filter values
    const [isFilter, setIsFilter] = useState<Boolean>(false)
    const handleFilerName = debounce((e) => {
        dispatch(setOfficeParams({ name: e.target.value, pageNumber: 1 }));
    }, 400);
    const handleFilerAddress = debounce((e) => {
        dispatch(setOfficeParams({ address: e.target.value, pageNumber: 1 }));
    }, 400);
    const handleFilerStatus = debounce((value) => {
        dispatch(setOfficeParams({ status: value, pageNumber: 1 }));
    }, 400);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    //create form
    const handleSubmitForm = () => {
        form
            .validateFields()
            .then((values) => {
                if (!editing)
                    dispatch(createOfficesAsync(values))
                else
                    dispatch(updateOfficesAsync(values))
            })
            .catch((errorInfo) => {
                console.log('Form validation failed:', errorInfo);
            });

    }
    //Edit 
    const startEditing = (id: string) => {
        setIsLoading(true);
        setIsOpenModal(true);

        agent.Office.getById(id)
            .then((office: any) => {
                form.setFieldsValue({ ...office });
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
        dispatch(setOfficeParams({ pageNumber: page, pageSize: pageSize }));
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
                                            setIsOpenModal(true);
                                            form.resetFields();
                                        }}
                                        type='primary'
                                        size='large'
                                        style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#FF5733' }} >
                                        <FontAwesomeIcon icon={faPlus} className='mr-2' />
                                        Thêm văn phòng
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
                                    <Input
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
                                        ]} />
                                </Flex><Divider />
                            </>)}
                            <Flex vertical align='center'>
                                <Table
                                    scroll={{ y: 450 }}
                                    pagination={false}
                                    loading={status === MANAGEMENT_STATUS.PENDING_FETCH_OFFICES}
                                    style={{ width: '100%' }} columns={columns} dataSource={offices!}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            </Row>
            {/* Creating modal */}
            <Modal
                confirmLoading={status === MANAGEMENT_STATUS.PENDING_CREATE_OFFICES
                    || status === MANAGEMENT_STATUS.PENDING_EDIT_OFFICES}
                title={<p style={{ textAlign: 'center', margin: 0 }}> {editing && 'Chỉnh sửa văn phòng' || 'Thêm văn phòng'}</p>}
                okText="Lưu"
                centered
                open={isOpenModal}
                onOk={handleSubmitForm}
                onCancel={() => setIsOpenModal(false)}
            >
                <Card style={{ margin: 0, padding: 0 }} loading={isLoading}>
                    <Form {...formAlign} form={form} >
                        <Form.Item name='id' >
                            <Input type='hidden' />
                        </Form.Item>
                        <Form.Item label="Tên Văn Phòng" name='name' rules={[
                            { required: true, message: "Nhập tên văn phòng" },
                        ]}>
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item label="Địa chỉ" name='address' rules={[
                            { required: true, message: "Nhập địa chỉ văn phòng" },

                        ]}>
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item label="Tên Tỉnh" name='townId' rules={[
                            { required: true, message: "Chọn tỉnh" },

                        ]}>
                            <Select
                                filterOption={filterOption}
                                showSearch
                                loading={status === MANAGEMENT_STATUS.PENDING_FETCH_TOWNS} size='large'
                                placeholder='Chọn tỉnh'
                                options={towns?.map(town => ({ value: town.id, label: town.name }))} />
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>

        </>
    )
}

export default Offices