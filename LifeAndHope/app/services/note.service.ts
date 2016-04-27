import {DatabaseService} from "./database.service";
import {Promise} from "../datatypes/models";
import {Note} from "../datatypes/models";



/** Responsible for retrieving and updating notes */
export class NoteService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getNote(tableName : string, instanceId : string) : Promise<any> {
        let requestUrl = '/note?fields=*&filters=table_name%3D\''+ tableName +'\'%20AND%20instance_id%3D\''+ instanceId +'\'&&&'

        return super.get(requestUrl)
    }

    public static getNotesFromChild(childId : string): Promise<any> {
        return this.getNote('child', childId);
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
}