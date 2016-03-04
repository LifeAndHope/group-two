import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

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

        if (this.publicRoutes[instruction.urlPath]) {
            return super.activate(instruction);
        }

        const loginInstruction = this.parentRouter.generate(['/Login']);

        return super.activate(loginInstruction.component);
    }
}