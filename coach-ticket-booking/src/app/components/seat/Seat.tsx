import React, { useState } from 'react'
import SeatActive from '../../../img/seat_active.svg'
import SeatDisabled from '../../../img/seat_disabled.svg'
import SeatSelecting from '../../../img/seat_selecting.svg'
import './Seat.css'

interface SeatProps {
    seatName: string,
    status: number,
    onClick: () => void
}

const seatImage: Record<string, string> = {
    0: SeatActive,
    1: SeatDisabled,
    2: SeatSelecting
}

const Seat = (props: SeatProps) => {
    return (
        <div onClick={props.onClick} className='seat' style={{ cursor: props.status !== 1 ? 'pointer' : 'not-allowed' }} >
            <img src={seatImage[props.status]} alt="seat icon" className='seat-icon' />
            <span className='seat-text'>{props.seatName}</span>
        </div>
    )
}

export default Seat