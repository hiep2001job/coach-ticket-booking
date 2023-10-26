import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../loading/Loading';
import { useAppDispatch } from '../../../store/configureStore';

const PaymentResult = () => {

    const dispatch = useAppDispatch();

    const [processing, setProcessing] = useState(true);

    const location = useLocation();

    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);

    useEffect(() => {        
        // Send a message to the old window
        window.opener.postMessage(queryParams.toString(), '*');
        // Close the new window
        window.close();
    }, [dispatch, queryParams])

    if (processing) return <Loading />

    return (
        <></>
    )
}

export default PaymentResult