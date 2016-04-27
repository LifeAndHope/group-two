import {DatabaseService} from "./database.service";
//import {Promise} from "../datatypes/models"; //FIXME: Causes error. Maybe a problem with polyfills
import {Sponsor} from "../datatypes/models";
import {uuid} from "../datatypes/interfaces";

export class SponsorService extends DatabaseService {

    // Override the apiName used to create the base URL
    protected static apiName: string = 'data';


    public static getSponsors(filter: string = "") : Promise<any> {
        let filterComponent = "";

        if (filter) {
            filterComponent = "&filters=" + filter
        }

        return super.get("/sponsor?fields=*" + filterComponent)
    }

    public static getSponsorById(id: string): Promise<any> {
        return this.getSponsors("id = '" + id + "'")
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

    public static updateSponsor(sponsor: Sponsor) : Promise<any>{
        let updateSponsor = {
            last_name: sponsor.last_name,
            first_name: sponsor.first_name,
            phone: sponsor.phone,
            email: sponsor.email,
            join_date: sponsor.join_date,
            address: sponsor.address,
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

    public static deleteSponsor(sponsor): Promise<void> {
        return super.delete("/sponsor", {
            "filter": {
                "id": sponsor.id
            }
        });
    }
}
