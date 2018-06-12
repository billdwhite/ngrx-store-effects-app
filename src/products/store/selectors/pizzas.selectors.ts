import {createSelector} from "@ngrx/store";
import {Pizza} from "../../models/pizza.model";
import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppingsSelectors from "./toppings.selectors";

// pizzas state
export const getPizzaState = createSelector(
    fromFeature.getProductsState,
    (state: fromFeature.ProductsState) => {
        return state.pizzas;
    }
);


export const getPizzasEntities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
);


export const getSelectedPizza = createSelector(
    getPizzasEntities, // using feature state
    fromRoot.getRouterState, // combined with router state
    (entities, router): Pizza => {
        return router.state && entities[router.state.params.pizzaId];
    }
);


export const getPizzaVisualized = createSelector(
    getSelectedPizza,
    fromToppingsSelectors.getToppingsEntities,
    fromToppingsSelectors.getSelectedToppings,
    (pizza, toppingEntities, selectedToppings) => {
        // because selectedToppings is just the Ids, useu the toppingEntites to get the actual topping
        const toppings = selectedToppings.map(id => toppingEntities[id]);
        return { ...pizza, toppings }; // returns a visualized pizza with selected toppings
    }
);


export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
    return Object.keys(entities).map(
        (id): any => {
            return entities[parseInt(id, 10)];
        }
    );
});


export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);


export const getPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
