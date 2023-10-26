import { requests } from "./agent";

export const Office={
    //customer
    fetch:()=>requests.get('office'),
    create:(data:FormData)=>requests.post('office', data),
}