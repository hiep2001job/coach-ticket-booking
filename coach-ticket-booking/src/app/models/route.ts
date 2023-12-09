export interface Route {
  id: string;
  fromOfficeID: string;
  toOfficeID: string;
  createDate: string;
  status: number;
  fromOffice: {
    id: string;
    name: string | null;
    address: string | null;
    townName: string | null;
  };
  toOffice: {
    id: string;
    name: string | null;
    address: string | null;
    townName: string | null;
  };
}

export interface RoutesParams{
    pageNumber:number;
    pageSize:number;
}