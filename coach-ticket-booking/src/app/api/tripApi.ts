import { requests } from "./agent";

export const Trip={
    //customer
    search:(params:URLSearchParams)=>requests.get('trip/trips-search',params),
    getById:(id:string)=>requests.get(`trip/${id}`),
    //admin
}