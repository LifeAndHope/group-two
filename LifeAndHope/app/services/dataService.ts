import {Sponsor, Child, Note, FileReference} from './../datatypes/models'
import {UUIDGenerator, PromiseType} from './../datatypes/interfaces'
import {DatabaseService} from './databaseService'

declare var uuid:UUIDGenerator; // Tell typescript that there is a variable called 'uuid' in its scope


/** Responsible for retrieving and updating data */
export class DataService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';

    public static getChildren(): PromiseType {
        return super.get('/child?fields=*');
    }

    public static getSponsor() : PromiseType{
        return super.get('/sponsor?fields=*')
    }

    public static getNote(tableName : string, instanceId : string) : PromiseType{
        let requestUrl = '/note?fields=*&filters=table_name%3D\''+ tableName +'\'%20AND%20instance_id%3D\''+ instanceId +'\'&&&'

        return super.get(requestUrl)
    }

    public static getNotesFromChild(childId : string): PromiseType {
        return this.getNote('child', childId);
    }


    /**
     * Add a new child to the database. A UUID will be generated and assigned before the request is sent.
     *
     * @param {Child} child Child to be added to the database
     * @returns {PromiseType}
     */
    public static addChild(child: Child): PromiseType {
        child.id = uuid.v4();
        return super.post('/child', [child]);
    }

    /**
     * Add a new sponsor to the database. A UUID will be generated and assigned before the request is sent.
     *
     * @param {Sponsor} sponsor Sponsor to be added to the database
     * @returns {PromiseType}
     */
    public static addSponsor(sponsor: Sponsor): PromiseType {
        sponsor.id = uuid.v4();
        return super.post('/sponsor', [sponsor]);
    }

    /**
     * Add a new note to the database
     *
     * @param {Note} note Note to be added to the database
     * @returns {PromiseType}
     */
    public static addNote(note: Note): PromiseType {
        return super.post('/note', [note]);
    }

    /**
     * Add a new file reference to the database
     *
     * @param {FileReference} fileReference File reference to be added to the database
     * @returns {PromiseType}
     */
    public static addFileReference(fileReference: FileReference): PromiseType {
        return super.post('/file', [fileReference]);
    }
}
