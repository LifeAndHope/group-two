import {DatabaseService} from "./database.service";
//import {Promise} from "../datatypes/models";
import {Sponsor} from "../datatypes/models";
//import {uuid} from "../datatypes/interfaces";
import {Child} from "../datatypes/models";
import {SponsorHasChild} from "../datatypes/models";
import {UUIDGenerator} from "../datatypes/interfaces";


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

    public static getSponsorsForChild(child: Child): Promise<any> {
        return new Promise( (resolve, reject) => {

            /* Normal request did not work when filtering null values */
            let query = {
                fields : {
                    sponsor_has_child : ["*"],
                },
                tables : ["sponsor_has_child"],
                filter : "child_id='" + child.id + "' AND to_date IS NULL",
            };

            this.post("/query", query)
                .then(response => {
                    let connections = response.data.data;
                    let sponsorPromises = connections.map(connection => SponsorService.getSponsorById(connection["sponsor_has_child.sponsor_id"]));

                    Promise.all(sponsorPromises)
                        .then(responses => {
                            let sponsors = responses.map(response => response.data.data[0]);
                            resolve(sponsors);
                        })
                        .catch(reject)
                })
                .catch(reject)

        });
    }

    /*
     *  Sponsoring children
     */

    /** Create a connection between a child and a sponsor */
    public static beginSponsoringChild(sponsor: Sponsor, child: Child): Promise<void> {
        return new Promise( (resolve, reject) => {
            let connection: SponsorHasChild = {
                id:         uuid.v4(),
                child_id:   child.id,
                sponsor_id: sponsor.id,
                from_date:  new Date()
            };

            /* We only need to support a single child per sponsor, and a single sponsor per child for now.
             * Disconnect all existing connections before adding the new */
            this.stopSponsoringChildren(sponsor)
                .then( () => {
                    this.stopSponsoring(child)
                        .then( () => {
                            this.post("/sponsor_has_child", [connection])
                                .then(resolve)
                                .catch(reject)
                        })
                        .catch(reject)
                })
                .catch(reject)
        });

    }

    /** End the connection between a sponsor and a child by assigning the to_date parameter */
    public static stopSponsoringChild(sponsor: Sponsor, child: Child): Promise<void> {
        return this.stopSponsoringForFilter({
            child_id:   child.id,
            sponsor_id: sponsor.id
        })
    }

    /** End all connections for a sponsor by assigning the to_date parameter */
    public static stopSponsoringChildren(sponsor: Sponsor): Promise<void> {
        return this.stopSponsoringForFilter({
            sponsor_id: sponsor.id
        })
    }

    /* Kremt, kremt. Lekre navn på disse funksjonene. Burde de ligget i en egen komponent? */
    /** End all connections for a child by assigning the to_date parameter */
    public static stopSponsoring(child: Child): Promise<void> {
        return this.stopSponsoringForFilter({
            child_id: child.id
        })
    }

    private static stopSponsoringForFilter(filter: Object): Promise<any> {
        let query = {
            to_date: new Date(),
            filter: filter
        };

        return this.put('/sponsor_has_child', query);
    }

    /* ****************** */


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
