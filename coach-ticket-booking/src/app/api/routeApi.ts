import { createFormData, requests } from "./agent";

export const Route={
    //customer
    fetch:(search:string)=>requests.get('route',new URLSearchParams(Object.entries({search}))),
    fetchPaginated:(params:URLSearchParams)=>requests.get('route/paginated',params),
    create:(data:any)=>requests.post('route', data),
    getById:(id:string)=>requests.get(`route/${id}`),
    update:(data:any)=>requests.put(`route/${data.id}`,data)
}