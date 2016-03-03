import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

@Directive({
    selector: 'router-outlet'
})

export class AuthenticatedRouterOutlet extends RouterOutlet {

    /** Routes open to the public */
    publicRoutes: Object;
    private parentRouter: Router;

    constructor(_elementRef: ElementRef,
                _loader: DynamicComponentLoader,
                _parentRouter: Router,
                @Attribute('name') nameAttr: string) {

        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            'login': true,
        };

    }

    activate(instruction: ComponentInstruction) {

        if (this.publicRoutes[instruction.urlPath]) {
            return super.activate(instruction);
        }

        var loginInstruction = this.parentRouter.generate(['/Login']);

        return super.activate(loginInstruction.component);
    }
}