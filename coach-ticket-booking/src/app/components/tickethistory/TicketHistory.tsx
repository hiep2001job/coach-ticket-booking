import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { fetUserBookingsAsync, setBookingStep } from '../../../features/booking/bookingSlice';
import { BookingResult } from '../../models/booking';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDatetimeHMDDMMYYYY } from '../../../utils/formatDatetimeHMDDMMYYYY';
import { BOOKINGS_STEP } from '../../../utils/constants';


const columns: ColumnsType<BookingResult> = [
    {
        title: 'Mã vé',
        dataIndex: 'bookingCode',
    },
    {
        title: 'Số vé',
        dataIndex: 'ticketNumber',
    },
    {
        title: 'Tuyến đường', // Combined column title
        render: (text, record) => `${record.from} => ${record.to}`,
    },
    {
        title: 'Ngày đi',
        render: (text, record) => formatDatetimeHMDDMMYYYY(record.departureTime),
    },
    {
        title: 'Số tiền',
        dataIndex: 'cost',
        render: (text, record) => formatCurrency(record.cost),
    },
    {
        title: 'Thanh toán',
        render: (text, record) => 'VNPAY',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
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
        title: 'Thao tác',
        render: (text, record) => '',
    },
];


const TicketHistory = () => {
    const dispatch = useAppDispatch();
    const { userBookings } = useAppSelector(state => state.booking)

    useEffect(() => {
        dispatch(setBookingStep(BOOKINGS_STEP.SEARCH_TRIPS));
        dispatch(fetUserBookingsAsync());

    }, [dispatch])

    return (
        <>
            {userBookings && (<Table
                columns={columns}
                dataSource={userBookings}
                bordered

            />)}
        </>

    )
}

export default TicketHistory