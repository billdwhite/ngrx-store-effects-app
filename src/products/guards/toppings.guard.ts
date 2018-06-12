import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, take, filter, catchError, switchMap} from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate {


    constructor(private store: Store<fromStore.ProductsState>) {}



    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => { // if switchmap executes, then the checkStore has completed meaning the pizzas have effectively loaded
                return Observable.of(true);
            }),
            catchError((error) => {
                return Observable.of(false);
            })
        )
    }


    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getToppingsLoaded)
            .pipe(
                tap(loaded => { // tap has no effect on filter below
                    if (!loaded) {
                        this.store.dispatch(new fromStore.LoadToppings());
                    }
                }),
                filter(loaded => {
                    return loaded;  // if loaded is false, the stream will not continue; so here we are effectively waiting for this stream to return true
                }),
                take(1) // will call observable complete once it passed the filter
            );
    }
}