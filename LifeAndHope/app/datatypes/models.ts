import {UUIDGenerator} from "./interfaces";


export interface Sponsor {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    join_date: Date;
    address: string;
}


export interface Child {
    id: string;
    first_name: string;
    last_name: string;
    sex: string;
    date_of_birth: Date;
    account_number: string;
    school_id: string;
    description: string;
}


export interface Note {
    table_name: string;
    instance_id: string;
    text: string;
    date: Date;
}
