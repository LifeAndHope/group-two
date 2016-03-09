import {bootstrap} from 'angular2/platform/browser'
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {App}   from './components/app'
import {FORM_PROVIDERS} from 'angular2/common';

bootstrap(App, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);