export interface Office {
  id: string;
  name: string;
  address: string;
  townName:string;
}

export interface OfficeSearchParams {
  name: string;
  address: string;
  townName:string;
  pageNumber:number;
  pageSize:number;
}
