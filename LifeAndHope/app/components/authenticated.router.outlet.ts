import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {AccountService} from "../services/account.service";

@Directive({
    selector: 'router-outlet'
})

export class AuthenticatedRouterOutlet extends RouterOutlet {

    /** Routes open to the public */
    publicRoutes: Object;
    private parentRouter: Router;

    constructor(elementRef: ElementRef,
                loader: DynamicComponentLoader,
                parentRouter: Router,
                @Attribute('name') nameAttr: string) {

        super(elementRef, loader, parentRouter, nameAttr);

        this.parentRouter = parentRouter;
        this.publicRoutes = {
            'login': true,
        };

    }

    activate(instruction: ComponentInstruction) {
        if (this.publicRoutes[instruction.urlPath] || AccountService.isAuthenticated()) {
            return super.activate(instruction);
        }

        this.parentRouter.navigate(['Login']);

        return super.activate(instruction);
    }
}