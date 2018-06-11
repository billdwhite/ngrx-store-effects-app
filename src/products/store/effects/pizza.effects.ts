import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable} from "rxjs";
import { switchMap, map, catchError  } from "rxjs/operators";
import * as pizzaActions from "../actions/pizzas.action";
import * as fromServices from '../../services';
import {Pizza} from '../../models/pizza.model';

@Injectable()
export class PizzaEffects {

  constructor(private actions$: Actions,
              private pizzaService: fromServices.PizzasService) {}

  @Effect({dispatch: true})  // can add dispatch false if we don't want to dispatch an action
  loadPizzas$ = this.actions$ // needs to retun an action
    .ofType(pizzaActions.LOAD_PIZZAS) // mark it as an effect and return an action
    .pipe(
        switchMap(() =>  {  // switchmap switches to a brand new stream
            return this.pizzaService
                .getPizzas()
                .pipe(
                    map((pizzas: Pizza[]): pizzaActions.LoadPizzasSuccess => {
                        return new pizzaActions.LoadPizzasSuccess(pizzas); // send this back to the reducer
                    }),
                    catchError((error): Observable<pizzaActions.LoadPizzasFail> => {
                        return Observable.of(new pizzaActions.LoadPizzasFail(error));
                    })
                );
        })
    );
}
