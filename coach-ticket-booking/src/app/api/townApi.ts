import { requests } from "./agent";

export const Town={
    //customer
    fetch:()=>requests.get('town')
}