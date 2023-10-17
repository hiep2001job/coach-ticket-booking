import React, { useState } from 'react'
import SeatActive from '../../../img/seat_active.svg'
import SeatDisabled from '../../../img/seat_disabled.svg'
import SeatSelecting from '../../../img/seat_selecting.svg'

interface SeatProps {
    seatName: string,
    status: number,
    onClick:()=>void
}

const seatImage: Record<string, string>={
    '0':SeatActive,
    '1':SeatDisabled,
    '2':SeatSelecting
}

const seatStyle:React.CSSProperties = {
    position: 'relative',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    
};

const iconStyle:React.CSSProperties = {
    width: '40px',
};

const textStyle:React.CSSProperties = {
    position: 'absolute',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#A2ABB3',
    margin:'auto auto auto 7px'
    
};

const Seat = (props: SeatProps) => {
    return (
        <div onClick={props.onClick} style={{...seatStyle,cursor:props.status!==1?'pointer':'not-allowed'}} >
            <img src={seatImage[props.status]} alt="seat icon" style={iconStyle} />
            <span style={textStyle}>{props.seatName}</span>
        </div>
    )
}

export default Seat