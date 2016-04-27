import {DatabaseService} from "./database.service";
//import {Promise} from "../datatypes/models";
import {Transaction} from "../datatypes/models";
import {UUIDGenerator} from "../datatypes/interfaces";

var uuid:UUIDGenerator;

/** Responsible for retrieving and updating data */
export class TransactionService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getTransaction(parameter : string) : Promise<any> {
        let requestUrl = '/transaction?fields=*' + parameter;
        console.log(requestUrl)
        return super.get(requestUrl);
    }

    public static getTransactionsToChild(childId : string) : Promise<Array<Transaction>> {
        return new Promise((resolve, reject) => {
            return this.getTransaction('&filters=child%D\'' + childId + '\'&&&')
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


}