import {Sponsor, Child, Note, Transaction} from './../datatypes/models'
import {UUIDGenerator} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'
//import {Promise} from "../datatypes/models";
import {FileService} from "./file.service";

declare var uuid:UUIDGenerator; // Tell typescript that there is a variable called 'uuid' in its scope


/** Responsible for retrieving and updating data */
export class DataService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getChildren(): Promise<any> {
        return this.getInstancesFromTable('child');
    }

    public static getChildById(id: string): Promise<any> {
        return this.getInstancesFromTable('child', "id = '" + id + "'");
    }
    
    public static getSponsors() : Promise<any> {
        return this.getInstancesFromTable('sponsor')
    }

    public static getSponsorById(id: string): Promise<any> {
        return this.getInstancesFromTable('sponsor', "id = '" + id + "'");
    }

    private static getInstancesFromTable(tableName: string, filters?: string): Promise<any> {
        let filterComponent = "";

        if (filters) {
            filterComponent = "&filters=" + filters
        }

        return super.get("/" + tableName + "?fields=*" + filterComponent)
    }


    public static getNote(tableName : string, instanceId : string) : Promise<any> {
        let requestUrl = '/note?fields=*&filters=table_name%3D\''+ tableName +'\'%20AND%20instance_id%3D\''+ instanceId +'\'&&&'

        return super.get(requestUrl)
    }

    public static getNotesFromChild(childId : string): Promise<any> {
        return this.getNote('child', childId);
    }

    public static getTransaction(parameter : string) : Promise<any> {
        let requestUrl = '/transaction?fields=*' + parameter;

        return super.get(requestUrl);
    }

    public static getTransactionsToChild(childId : string) : Promise<Array<Transaction>> {
        return new Promise((resolve, reject) => {
            return this.getTransaction('&filters=child%3D\'' + childId + '\'&&&')
                .then(
                    response =>{
                        let transactions: Array<Transaction> = [];
                        for (let i = 0; i < response.data.data.length; i++){
                            let transaction: Transaction = response.data.data[i];
                            transactions.push(transaction);
                        }
                        resolve(transactions);
                    }
                )
                .catch(reject)
        }) ;
    }

    public static getTransactionsFromSponsor(sponsorId : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            return this.getTransaction('&filters=sponsor%3D\'' + sponsorId + '\'&&&')
                .then(
                    response =>{
                        let transactions: Array<Transaction> = [];
                        for (let i = 0; i < response.data.length; i++){
                            let transaction: Transaction = response.data.data;
                            transactions.push(transaction);
                        }
                        resolve(transactions);
                    }
                )
                .catch(reject)
        });
    }

    /**
     * Add a new child to the database. A UUID will be generated and assigned before the request is sent.
     *
     * @param {Child} child Child to be added to the database
     * @returns {Promise}
     */
    public static addChild(child: Child): Promise<any> {
        child.id = uuid.v4();
        let validateChild = this.validateChild(child);
        return super.post('/child', [validateChild]);
    }

    private static validateChild(child: Child) : Child{
        let validatedChild = child

        for(var item in validatedChild){
            if(validatedChild[item] == null){
                if(item === "school_id" || item === "description"){
                    delete validatedChild[item]
                }
                else{
                    validatedChild[item] = ""
                }
            }
        }

        return validatedChild
    }

    /**
     * Add a new sponsor to the database. A UUID will be generated and assigned before the request is sent.
     *
     * @param {Sponsor} sponsor Sponsor to be added to the database
     * @returns {Promise}
     */
    public static addSponsor(sponsor: Sponsor): Promise<any> {
        sponsor.id = uuid.v4();
        return super.post('/sponsor', [sponsor]);
    }

    /**
     * Add a new note to the database
     *
     * @param {Note} note Note to be added to the database
     * @returns {Promise}
     */
    public static addNote(note: Note): Promise<any> {
        return super.post('/note', [note]);
    }

    /**
     * Add a new transaction to the database
     *
     * @param {Transaction} transaction Transaction to be added to the database
     * @returns {Promise}
     */
    public static addTransaction(transaction: Transaction) : Promise<any> {
        transaction.id = uuid.v4();
        let verifiedTransaction = this.verifiedTransaction(transaction);
        return super.post('/transaction', [verifiedTransaction]);
    }

    private static verifiedTransaction(transaction: Transaction){
        let verifiedTransaction = transaction;

        for(var item in verifiedTransaction){
            console.log(item);
            if(verifiedTransaction[item] == null){
                if(item === "receipt" || item === "amount_received" || item === "date_received") {
                    delete verifiedTransaction[item]
                }
            }
            if(item === "receipt" && verifiedTransaction[item].length == 0){
                delete verifiedTransaction[item]
            }
        }

        return verifiedTransaction
    }

    public static updateChild(child: Child) : Promise<any> {
        let updatedChild = {
            first_name: child.first_name,
            last_name: child.last_name,
            gender: child.gender,
            date_of_birth: child.date_of_birth,
            account_number: child.account_number,
            school_name: child.school_name,
            grade: child.grade,
            school_address: child.school_address,
            description: child.description,
            sponsor: child.sponsor,
            filter: {id: child.id}
        };

        updatedChild = this.validateUpdatedChild(updatedChild);

        return super.put('/child', updatedChild);
    }

    private static validateUpdatedChild(updatedChild: any){
        let validatedUpdatedChild = updatedChild

        for(var item in validatedUpdatedChild){
            if(validatedUpdatedChild[item] == null){
                if(item === "school_id"){
                    //TODO: school_id should be able to be null, but currently gets error 500
                    delete validatedUpdatedChild[item]
                }
                else if(item === "date_of_birth"){
                    validatedUpdatedChild[item] = new Date()
                }
                else{
                    validatedUpdatedChild[item] = ""
                }
            }
        }

        return validatedUpdatedChild
    }

    public static updateSponsor(sponsor: Sponsor) : Promise<any>{
        let updateSponsor = {
            last_name: sponsor.last_name,
            first_name: sponsor.first_name,
            phone: sponsor.phone,
            email: sponsor.email,
            join_date: sponsor.join_date,
            address: sponsor.address,
            child: sponsor.child,
            filter:{
                id: sponsor.id
            }
        };

        updateSponsor = this.validateUpdatedSponsor(updateSponsor)

        return super.put('/sponsor', updateSponsor)
    }

    private static validateUpdatedSponsor(updateSponsor){
        let validatedUpdatedSponsor = updateSponsor;

        //TODO: phone, email and address are nullable. 

        return validatedUpdatedSponsor
    }

    public static deleteChild(child): Promise<void> {
        return super.delete("/child", {
            "filter": {
                "id": child.id
            }
        });
    }

    public static deleteSponsor(sponsor): Promise<void> {
        return super.delete("/sponsor", {
            "filter": {
                "id": sponsor.id
            }
        });
    }
}
