import { requests } from "./agent";

//Account methods
export const Account = {
  login: (values: any) => requests.post("auth/login", values),
  register: (values: any) => requests.post("auth/register", values),
  currentUser: () => requests.get("accounts/info"),
  updateUserInfo:(values:any)=>requests.post("accounts/update-info",values),
  fetchUserAddress: () => requests.get("addresses/user-address"),
  fetchUserBookings:(status:any)=>requests.get('booking/my-bookings',status),

  //Admin
  fetchCustomers: (params:any) => requests.get("accounts/customers",new URLSearchParams(Object.entries(params))),
  getSearchPhone: (params:any) => requests.get("accounts/search-phone",new URLSearchParams(Object.entries(params))),
};
