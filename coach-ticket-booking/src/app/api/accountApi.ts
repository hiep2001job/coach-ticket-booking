import { requests } from "./agent";

//Account methods
export const Account = {
  login: (values: any) => requests.post("auth/login", values),
  register: (values: any) => requests.post("auth/register", values),
  currentUser: () => requests.get("accounts/info"),
  fetchUserAddress: () => requests.get("addresses/user-address"),
  fetchUserBookings:(status:any)=>requests.get('booking/my-bookings',status)
};
