import { Checkbox, Form, Input, Radio, Button, Card, Flex, DatePicker, Switch } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { ACCOUNT_STATUS } from '../../../utils/constants';
import { parseDateFromDDMMYYYY } from '../../../utils/parseDateFromDDMMYYYY';
import { formatDatetimeDDMMYYYY } from '../../../utils/formatDatetimeDDMMYYYY';
import dayjs from 'dayjs';
import { updateUserInfo } from '../../../features/account/accountSlice';

const GeneralAccountInfo = () => {
    const dispatch = useAppDispatch();
    const { status, userDetail } = useAppSelector(state => state.account);
    const [edit, setEdit] = useState(false);

    const onFinish = (values: any) => {
        const formData={...values,birthday:dayjs(values.birthday).format("DD-MM-YYYY")};
        dispatch(updateUserInfo(formData));
        console.log(formData)
    }

    return (

        <Flex vertical gap={20} >
            <Flex justify='start' gap={10}>
                <span>Cập nhật</span>
                <Switch
                    checked={edit}
                    onChange={(e) => setEdit(!edit)}
                />

            </Flex>
            <Flex vertical align='center'>
                <Form
                    onFinish={onFinish}
                    initialValues={{
                        ...userDetail,
                        birthday:dayjs(userDetail?.birthday).format("DD-MM-YYYY")
                    }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    style={{ width: '80%' }}
                    disabled={!edit}
                >
                    <Form.Item name='id' hidden>
                        <Input hidden />
                    </Form.Item>
                    <Form.Item name='fullname' label="Full Name" >
                        <Input bordered={edit} disabled={!edit} />
                    </Form.Item>
                    <Form.Item name='email' label="Email">
                        <Input bordered={edit} disabled={!edit} type="email" />
                    </Form.Item>

                    <Form.Item name='phone' label="Phone">
                        <Input bordered={edit} disabled={!edit} type="number" />
                    </Form.Item>

                    <Form.Item name='gender' label="Gender">
                        <Radio.Group disabled={!edit}>
                            <Radio value={0}> Nam </Radio>
                            <Radio value={1}> Nữ </Radio>
                            <Radio value={2}> Khác </Radio>
                        </Radio.Group>
                    </Form.Item>

                    {edit && <Form.Item name='birthday' label="Birthday">
                        <DatePicker
                            disabled={!edit}
                            // disabledDate={(current) => current && current < moment().startOf('day')}
                            format="DD-MM-YYYY"
                            placeholder="Chọn ngày đi"
                            style={{ width: "100%" }}
                            size="large" />
                    </Form.Item>}
                    {!edit && formatDatetimeDDMMYYYY(userDetail?.birthday ?? null)}
                    {edit && <Flex justify='center'>

                        <Button loading={status === ACCOUNT_STATUS.PENDING_UPDATE_INFO} type="primary" size="large" style={{ width: 300, color: '#fff', backgroundColor: '#FF5733' }} htmlType="submit">
                            Cập nhật thông tin
                        </Button>
                    </Flex>}
                </Form>
            </Flex>

        </Flex>

    )
}

export default GeneralAccountInfo