import {Params, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}


export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}


export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer
};


export const getRouterState = 
    createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');


export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl>{
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        // create a new object based on properties of the router
        const { url } = routerState;// es6 destructing an import: same as "const url = routerState.url;"
        const { queryParams } = routerState.root;
        let state: ActivatedRouteSnapshot = routerState.root;
        // drill down to last segment of url...
        while(state.firstChild) { // while there is a firstChild, keep iterating through routerStateTree
            state = state.firstChild; 
        }
        // ...and then get params
        const params = state.params;

        // new state representation which is generated each time a navigation occurs
        return {
            url,
            queryParams,
            params
        };
    }
}