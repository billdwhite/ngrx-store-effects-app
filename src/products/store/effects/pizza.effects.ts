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
  loadPizzas$ = this.actions$ // needs to reun an action
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


    @Effect()
    createPizza$ = this.actions$ 
        .ofType(pizzaActions.CREATE_PIZZA)
        .pipe(
            map((action: pizzaActions.CreatePizza) => action.payload), // gets the action; we are only interested in the payload, so we map to get the action
            switchMap((pizza: Pizza) => {
                return this.pizzaService.createPizza(pizza).pipe(
                    map((pizza: Pizza) => {
                        // pizza saved and return from server
                        return new pizzaActions.CreatePizzaSuccess(pizza);
                    }),
                    catchError((error) => {
                        return Observable.of(new pizzaActions.CreatePizzaFail(error));
                    })
                )
            })
        );


    @Effect()
    updatePizza$ = this.actions$
        .ofType(pizzaActions.UPDATE_PIZZA) // oftype takes a string so we use a constant
        .pipe(
            map((action: pizzaActions.UpdatePizza) => action.payload),
            switchMap((pizza) => {
                return this.pizzaService.updatePizza(pizza)
                    .pipe(
                        map((pizza: Pizza) => {
                            return new pizzaActions.UpdatePizzaSuccess(pizza);
                        }),
                        catchError((error) => {
                            return Observable.of(new pizzaActions.UpdatePizzaFail(error));
                        }
                    )
                )
            })
        );


    @Effect()
    removePizza$ = this.actions$ 
        .ofType(pizzaActions.REMOVE_PIZZA)
        .pipe(
            map((action: pizzaActions.RemovePizza) => action.payload),
            switchMap((pizza) => {
                return this.pizzaService.removePizza(pizza)
                    .pipe(
                        map(() => { // no arg because remove call to service returns nothing
                            return new pizzaActions.RemovePizzaSuccess(pizza);
                        }),
                        catchError((error) => {
                            return Observable.of(new pizzaActions.RemovePizzaFail(error));
                        })
                    )
            })
        );
}
