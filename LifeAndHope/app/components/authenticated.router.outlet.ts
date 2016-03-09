import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {UserService} from "../services/userService";

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
        if (this.publicRoutes[instruction.urlPath] || true) {
            return super.activate(instruction);
        }
        this.parentRouter.navigateTo(['/Login']);
    }
}