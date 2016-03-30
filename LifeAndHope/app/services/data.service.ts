import {Sponsor, Child, Note} from './../datatypes/models'
import {UUIDGenerator, PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './database.service'

declare var uuid:UUIDGenerator; // Tell typescript that there is a variable called 'uuid' in its scope


/** Responsible for retrieving and updating data */
export class DataService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getChildren(): PromiseType<any> {
        return this.getInstancesFromTable('child');
    }

    public static getChildById(id: string): PromiseType<any> {
        return this.getInstancesFromTable('child', "id = '" + id + "'");
    }

    public static getSponsors() : PromiseType<any> {
        return this.getInstancesFromTable('sponsor')
    }

    public static getSponsorById(id: string): PromiseType<any> {
        return this.getInstancesFromTable('sponsor', "id = '" + id + "'");
    }

    //TODO: Make me pretty
    private static getInstancesFromTable(tableName: string, filters?: string): PromiseType<any> {
        let filterComponent = "";

        if (filters) {
            filterComponent = "&filters=" + filters
        }

        return super.get("/" + tableName + "?fields=*" + filterComponent)
    }


    public static getNote(tableName : string, instanceId : string) : PromiseType<any> {
        let requestUrl = '/note?fields=*&filters=table_name%3D\''+ tableName +'\'%20AND%20instance_id%3D\''+ instanceId +'\'&&&'

        return super.get(requestUrl)
    }

    public static getNotesFromChild(childId : string): PromiseType<any> {
        return this.getNote('child', childId);
    }


    /**
     * Add a new child to the database. A UUID will be generated and assigned before the request is sent.
     *
     * @param {Child} child Child to be added to the database
     * @returns {PromiseType}
     */
    public static addChild(child: Child): PromiseType<any> {
        child.id = uuid.v4();
        return super.post('/child', [child]);
    }

    /**
     * Add a new sponsor to the database. A UUID will be generated and assigned before the request is sent.
     *
     * @param {Sponsor} sponsor Sponsor to be added to the database
     * @returns {PromiseType}
     */
    public static addSponsor(sponsor: Sponsor): PromiseType<any> {
        sponsor.id = uuid.v4();
        return super.post('/sponsor', [sponsor]);
    }

    /**
     * Add a new note to the database
     *
     * @param {Note} note Note to be added to the database
     * @returns {PromiseType}
     */
    public static addNote(note: Note): PromiseType<any> {
        return super.post('/note', [note]);
    }

    public static updateChild(child: Child) : PromiseType<any> {
        let updatedChild = {
            first_name: child.first_name,
            last_name: child.last_name,
            sex: child.sex,
            date_of_birth: child.date_of_birth.toISOString().slice(0,10),
            account_number: child.account_number,
            school_id: child.school_id,
            description: child.description,
            filter: {id: child.id}
        };

        updatedChild = this.validateUpdatedChild(updatedChild)

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
                    validatedUpdatedChild[item] = new Date().toISOString().slice(0,10)
                }
                else{
                    validatedUpdatedChild[item] = ""
                }
            }
        }

        return validatedUpdatedChild
    }

    public static updateSponsor(sponsor: Sponsor) : PromiseType<any>{
        let updateSponsor = {
            last_name: sponsor.last_name,
            first_name: sponsor.first_name,
            phone: sponsor.phone,
            email: sponsor.email,
            join_date: sponsor.join_date.toISOString().slice(0,10),
            address: sponsor.address,
            filter:{
                id: sponsor.id
            }
        }

        updateSponsor = this.validateUpdatedSponsor(updateSponsor)

        return super.put('/sponsor', updateSponsor)
    }

    private static validateUpdatedSponsor(updateSponsor){
        let validatedUpdatedSponsor = updateSponsor

        //TODO: phone, email and address are nullable. 

        return validatedUpdatedSponsor
    }
}
