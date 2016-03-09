import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';

@Component({
    selector: 'Hovedside',
    templateUrl: 'app/components/views/Hovedside.html',
    directives: []
})

export class HovedsideComponent {
    // Do fancy stuff
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
