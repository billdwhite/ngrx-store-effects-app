import {createSelector, REDUCER_FACTORY} from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/toppings.reducer";
import {Topping} from "../../models/topping.model";

export const getToppingsState = createSelector(
    fromFeature.getProductsState,
    (state: fromFeature.ProductsState): fromToppings.ToppingsState => {
        return state.toppings;
    }
);

export const getToppingsEntities = createSelector(
    getToppingsState,
    fromToppings.getToppingEntities
);

export const getAllToppings = createSelector(
    getToppingsEntities,
    (entities) => {
        return Object.keys(entities).map((id) => {
            return entities[parseInt(id, 10)];
        });
    }
);

export const getToppingsLoaded = createSelector(
    getToppingsState,
    fromToppings.getToppingLoaded
);

export const getToppingsLoading = createSelector(
    getToppingsState,
    fromToppings.getToppingLoading
);
