import {Sponsor, Child} from './../datatypes/models'
import {UUIDGenerator, PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './databaseService'

declare var uuid:UUIDGenerator; // Tell typescript that there is a variable called 'uuid' in its scope


/** Responsible for retrieving and updating data */
export class DataService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getTables(){
        this.get('/tables').then(function (response) {
            var data : any = response.data.data;
            data.forEach(function (item) {
                console.log('<p>' + item.name + '</p>');
            })
        }).catch(function (response) {
            //TODO: catch exceptions?
        });
    }

    public static getChildren(): PromiseType {
        return this.get('/child?fields=*');
    }


    /**
     * Add a new child to the database. An UUID will be generated and assigned before the request is sent.
     *
     * @param {Child} child Child to be added to the database
     * @returns {PromiseType}
     */
    public static addChild(child: Child): PromiseType {
        child.id = uuid.v4();
        return this.post('/child', [child]);
    }

    /**
     * Add a new sponsor to the database. An UUID will be generated and assigned before the request is sent.
     *
     * @param {Sponsor} sponsor Sponsor to be added to the database
     * @returns {PromiseType}
     */
    public static addSponsor(sponsor: Sponsor): PromiseType {
        sponsor.id = uuid.v4();
        return this.post('/sponsor', [sponsor]);
    }
}
