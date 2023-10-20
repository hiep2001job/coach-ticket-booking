export interface Trip {
  id: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  departureDate: string;
  fromOffice: string;
  toOffice: string;
  coachType: string;
  availableSeatNumber: number;
  duration: number;
}



export interface TripSearchParams {
  destOfficeId: string;
  originOfficeId: string;
  departureDate: string;
  ticketCount: number;
  floor?: number[];
  seatType?: number[];
  seatLine?: number[];
  departureType?: number[];
}
