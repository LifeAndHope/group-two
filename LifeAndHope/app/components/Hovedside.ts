import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {Child} from "../datatypes/models";
import {DataService} from "../services/data.service";
import { RouterLink } from 'angular2/router';

@Component({
    selector: 'Hovedside',
    templateUrl: 'app/components/views/Hovedside.html',
    directives: [RouterLink]
})

export class HovedsideComponent {
    // Do fancy stuff

    children: Array<Child> = [];

    constructor() {
        DataService.getChildren()
            .then(response => {
                this.children = response.data.data;
            })
    }

    barn(){
        console.log("BarnVisning")
    }

    Fadder(){
        console.log("FadderVisning")
    }

    addChild(){
        console.log("AddChild")
    }


}


/**BarnVisning.onclick = function() {
    alert(HovedsideComponent.barn())
}

FadderVisning.onclick = function() {
    alert(HovedsideComponent.Fadder())
}

addChild.onclick = function() {
    alert(HovedsideComponent.addChild())
}**/
