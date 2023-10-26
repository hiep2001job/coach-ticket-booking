import { Seat } from "./seat";

//For trip search
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
 //For trip detail
interface OfficeInRoute {
  officeId: string;
  name: string;
  address: string;
  order: number;
  arrivalTime: number;
}

export interface TripDetail {
  id: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  departureDate: string;
  fromOffice: string;
  toOffice: string;
  coachType: string;
  duration: number;
  seats: Seat[];
  offices: OfficeInRoute[];
}