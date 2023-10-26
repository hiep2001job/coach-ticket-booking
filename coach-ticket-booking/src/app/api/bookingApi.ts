import { createFormData, requests } from "./agent";

export const Booking={
    //customer
    create:(data:any)=>requests.post('booking/create', data),
    processPaymentReturn:(data:URLSearchParams)=>requests.get('booking/payment-callback',data)
}