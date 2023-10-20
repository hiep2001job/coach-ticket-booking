import { requests } from "./agent";

export const Office={
    //customer
    fetch:()=>requests.get('office'),
}