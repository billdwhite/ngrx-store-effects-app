import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import * as fromStore from "../../store";
import {Pizza} from "../../models/pizza.model";
import {Topping} from "../../models/topping.model";

@Component({
    selector: "product-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["product-item.component.scss"],
    template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {

    pizza$: Observable<Pizza>;
    toppings$: Observable<Topping[]>;
    visualise$: Observable<Pizza>;

    
    constructor(private store: Store<fromStore.ProductsState>) {}


    ngOnInit() {
        this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
            // when the component is loaded we want to show the toppings; we load
            tap((pizza: Pizza=null) => { // 'tap' steps out of an observable stream and anything done there doesn't return anything to the stream (no stream mutation)
                const pizzaExists: boolean = !!(pizza && pizza.toppings);  // is it an existing pizza or a new one?
                const toppings: number[] = pizzaExists 
                                           ? pizza.toppings.map(topping => {
                                                 return topping.id;
                                             }) 
                                           : [];
                this.store.dispatch(new fromStore.VisualizeToppings(toppings));
            }) 
        );
        this.toppings$ = this.store.select(fromStore.getAllToppings);
        this.visualise$ = this.store.select(fromStore.getPizzaVisualized);
    }


    onSelect(event: number[]) {
        console.log('onSelect:::', event);
        this.store.dispatch(new fromStore.VisualizeToppings(event));
    }


    onCreate(event: Pizza) {
        this.store.dispatch(new fromStore.CreatePizza(event));
    }


    onUpdate(event: Pizza) {
        this.store.dispatch(new fromStore.UpdatePizza(event));
    }


    onRemove(event: Pizza) {
        const remove = window.confirm("Are you sure?");
        if (remove) {
            this.store.dispatch(new fromStore.RemovePizza(event));
        }
    }
}
