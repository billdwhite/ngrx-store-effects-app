import {createSelector} from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import {Pizza} from '../../models/pizza.model';

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
  export const getAllPizzas = createSelector(
      getPizzasEntities,
      (entities) => {
          return Object.keys(entities).map((id): any => {
              return entities[parseInt(id, 10)];
          });
      }
  );
  export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
  );
  export const getPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
  );
  