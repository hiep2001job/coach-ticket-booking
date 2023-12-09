import { createFormData, requests } from "./agent";

export const Coach={
    //customer
    fetch:(value:string)=>requests.get('coach',new URLSearchParams(Object.entries({value}))),
    fetchPaginated:(params:URLSearchParams)=>requests.get('coach/paginated',params),
    create:(data:any)=>requests.post('coach', data),
    getById:(id:string)=>requests.get(`coach/${id}`),
    update:(data:any)=>requests.putForm(`coach/${data.id}`,createFormData(data))
}