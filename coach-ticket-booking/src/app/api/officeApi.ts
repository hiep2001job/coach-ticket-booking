import { createFormData, requests } from "./agent";

export const Office={
    //customer
    fetch:()=>requests.get('office'),
    fetchPaginated:(params:URLSearchParams)=>requests.get('office/paginated',params),
    create:(data:any)=>requests.post('office', data),
    getById:(id:string)=>requests.get(`office/${id}`),
    update:(data:any)=>requests.putForm(`office/${data.id}`,createFormData(data))
}