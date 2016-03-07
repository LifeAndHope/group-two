import {UUIDGenerator} from "./interfaces";

export class Sponsor {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    join_date: Date;
    address: string;
}


export class Child {

    constructor(public id: string,
                public first_name: string,
                public last_name: string,
                public sex: string,
                public date_of_birth: Date,
                public account_number: string,
                public school_id: string,
                public description: string) {

    }
}


export class Note {
    table_name: string;
    instance_id: string;
    text: string;
    date: Date;
}
