import {DatabaseService} from "./database.service";
//import {Promise} from "../datatypes/models";
import {Child} from "../datatypes/models";
import {Sponsor} from "../datatypes/models";
import {UUIDGenerator} from "../datatypes/interfaces";

var uuid:UUIDGenerator;

export class ChildService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getChildren(filter: string = "") : Promise<any> {
        let filterComponent = "";

        if (filter) {
            filterComponent = "&filters=" + filter
        }

        return super.get("/child?fields=*" + filterComponent)
    }

    public static getChildById(id: string): Promise<any> {
        return this.getChildren("id = '" + id + "'")
    }

    public static getChildrenForSponsor(sponsor: Sponsor): Promise<any> {
        return new Promise( (resolve, reject) => {

            /* Normal request did not work when filtering null values */
            let query = {
                fields : {
                    sponsor_has_child : ["*"],
                },
                tables : ["sponsor_has_child"],
                filter : "sponsor_id='" + sponsor.id + "' AND to_date IS NULL",
            };

            this.post("/query", query)
                .then(response => {
                    let connections = response.data.data;

                    let childPromises = connections.map(connection => ChildService.getChildById(connection["sponsor_has_child.child_id"]));

                    Promise.all(childPromises)
                        .then(responses => {
                            let children = responses.map(response => response.data.data[0]);
                            resolve(children);
                        })
                        .catch(reject)
                })
                .catch(reject)
        });
    }



    public static deleteChild(child): Promise<void> {
        return super.delete("/child", {
            "filter": {
                "id": child.id
            }
        });
    }

    public static updateChild(child: Child) : Promise<any> {
        let updatedChild = {
            first_name:     child.first_name,
            last_name:      child.last_name,
            gender:         child.gender,
            date_of_birth:  child.date_of_birth,
            account_number: child.account_number,
            school_name:    child.school_name,
            grade:          child.grade,
            school_address: child.school_address,
            description:    child.description,
            filter: {
                id: child.id
            }
        };

        updatedChild = this.validateUpdatedChild(updatedChild);

        return super.put('/child', updatedChild);
    }

    private static validateUpdatedChild(updatedChild: any) {
        let validatedUpdatedChild = updatedChild

        for (var item in validatedUpdatedChild) {
            if (validatedUpdatedChild[item] == null) {
                //if(item === "school_id"){
                //    //TODO: school_id should be able to be null, but currently gets error 500
                delete validatedUpdatedChild[item]
                //}
                //else if(item === "date_of_birth"){
                //    validatedUpdatedChild[item] = new Date()
                //}
                //else{
                //    validatedUpdatedChild[item] = ""
                //}
            }
        }

        return validatedUpdatedChild
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

}