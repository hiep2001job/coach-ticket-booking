import { SwapOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './swapbutton.css'
interface SwapButonProps {
    onClick: () => void
}

const SwapButon = (props: SwapButonProps) => {
    const [isRotated, setIsRotated] = useState(false);

    const handleMouseEvent = () => {
        setIsRotated(!isRotated);
    };

    return (
        <div
            onClick={props.onClick}
            onMouseDown={handleMouseEvent}
            onMouseLeave={handleMouseEvent}
            className={`circle-box ${isRotated ? 'rotate' : ''}`}>
            <SwapOutlined className="swap-icon" />
        </div>
    )
}

export default SwapButon