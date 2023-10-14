import React, { useState } from 'react'
import SeatActive from '../../../img/seat_active.svg'
import SeatDisabled from '../../../img/seat_disabled.svg'
import { Button } from 'antd'

interface SeatProps {
    seatName: string,
    status: number
}

const seatStyle:React.CSSProperties = {
    position: 'relative',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    
};

const iconStyle:React.CSSProperties = {
    width: '32px',
};

const textStyle:React.CSSProperties = {
    position: 'absolute',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#A2ABB3',
    margin:'auto auto auto 7px',
    
};

const Seat = (props: SeatProps) => {
    return (
        <div style={{...seatStyle,cursor:props.status===0?'pointer':'not-allowed'}} >
            <img src={props.status===0?SeatActive:SeatDisabled} alt="seat icon" style={iconStyle} />
            <span style={textStyle}>{props.seatName}</span>
        </div>
    )
}

export default Seat