import { TripManagenmentParams } from "../models/trip";
import { requests } from "./agent";

export const Trip = {
  //customer
  search: (params: URLSearchParams) =>
    requests.get("trip/trips-search", params),
  getById: (id: string) => requests.get(`trip/${id}`),
  getDetailById: (id: string) => requests.get(`trip/trips-detail/${id}`),
  //admin
  getAllTrips: (params: TripManagenmentParams) =>
    requests.get(`trip/trips`, new URLSearchParams(Object.entries(params))),
  create: (data: any) => requests.post("trip", data),
  update: (data: any) => requests.put("trip/" + data.id, data),
};
