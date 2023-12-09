import { BookingManagenmentParams } from "../models/booking";
import { createFormData, requests } from "./agent";

export const Booking={
    //customer
    create:(data:any)=>requests.post('booking/create', data),
    processPaymentReturn:(data:URLSearchParams)=>requests.get('booking/payment-callback',data),
    getBookingHistory:()=>requests.get(`booking/my-bookings`),

    //admin
    getAll:(params: BookingManagenmentParams) =>
    requests.get(`booking`, new URLSearchParams(Object.entries(params))),
}