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

    public id: string;
    public first_name: string;
    public last_name: string;
    public sex: string;
    public date_of_birth: Date;
    public account_number: string;
    public school_id: string;
    public description: string;

    constructor(id: string,
                first_name: string,
                last_name: string,
                sex: string,
                date_of_birth: Date,
                account_number: string,
                school_id: string,
                description: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.sex = sex;
        this.date_of_birth = date_of_birth;
        this.account_number = account_number;
        this.school_id = school_id;
        this.description = description;
    }
}


export class Note {
    table_name: string;
    instance_id: string;
    text: string;
    date: Date;
}
