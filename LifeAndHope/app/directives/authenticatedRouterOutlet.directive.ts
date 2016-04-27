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

    private loginRouteName = "SignIn";
    private defaultRouteName = "Children";

    constructor(elementRef: ElementRef,
                loader: DynamicComponentLoader,
                parentRouter: Router,
                @Attribute('name') nameAttr: string) {

        super(elementRef, loader, parentRouter, nameAttr);

        this.parentRouter = parentRouter;
        this.publicRoutes = {
            "signin": true,
        };

    }

    activate(instruction: ComponentInstruction) {
        /* The user is already logged in. Redirect to the default route */
        if (instruction.urlPath === this.loginRouteName.toLowerCase() && AccountService.isAuthenticated()) {
            this.parentRouter.navigate([this.defaultRouteName]);
            return super.activate(instruction);
        }

        /* The user is not authenticated. Redirect to login */
        if (!this.publicRoutes[instruction.urlPath] && !AccountService.isAuthenticated()) {
            this.parentRouter.navigate([this.loginRouteName]);
            return super.activate(instruction);
        }

        /* Nothing to see here. Move along */
        return super.activate(instruction);
    }
}