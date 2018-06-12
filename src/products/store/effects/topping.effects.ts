import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Observable} from "rxjs";
import { switchMap, map, catchError  } from "rxjs/operators";

import {Topping} from '../../models/topping.model';
import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
    
    constructor(private actions$: Actions,
                private toppingsService: fromServices.ToppingsService) {
        

    }


    @Effect()
    loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS)
        .pipe(
            switchMap(() => {
                return this.toppingsService.getToppings().pipe(
                    map((toppings: Topping[]) => {
                        return new toppingsActions.LoadToppingsSuccess(toppings);
                    }),
                    catchError((error) => {
                        return Observable.of(new toppingsActions.LoadToppingsFail(error));
                    })
                );
            })
        );
}