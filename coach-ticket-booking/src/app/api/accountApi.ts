import { requests } from "./agent";

//Account methods
export const Account = {
  login: (values: any) => requests.post("auth/login", values),
  register: (values: any) => requests.post("auth/register", values),
  currentUser: () => requests.get("auth/currentUser"),
  fetchUserAddress: () => requests.get("auth/savedAddress"),
};
