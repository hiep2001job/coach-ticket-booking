

export interface User {
    email: string;
    token: string;
    roles?: string[];
}

export interface UserDetail {
    id: string;
    status: number;
    email: string;
    phone: string | null;
    gender: string | null;
    birthday: string | null;
    fullname:string|null;
    addresses: Address[];
  }
  
  interface Address {
    id: string;
    name: string;
    content: string;
    isPrimary: boolean;
  }

  export interface BookingManagenmentParams{
    pageSize?:number,
    currentPage?:number,   
    phone?:string
  }