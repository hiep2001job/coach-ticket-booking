export interface BookingCreateDto {
  tripID: string;
  transshipAddress: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  bookingDetails: BookingDetailCreateDto[];
}

interface BookingDetailCreateDto {
  seatID: string;
}

export interface BookingResult {
  id: string;
  bookingCode: string;
  ticketNumber: number;
  cost: number;
  fee: number;
  status: number;
  transshipAddress?: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  seatNames: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  departureDate: string;
  from: string;
  to: string;
  paymentUrl?: string;
  createDate: string;
  paymentExpireTime?: string;
}
