import * as fromPizzas from '../actions/pizzas.action';
import {Pizza} from '../../models/pizza.model';


export interface PizzaState {
    entities: {
        [id: number] : Pizza
    }
    loaded: boolean,
    loading: boolean
}



export const initialState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false
};



export function reducer(
    state: PizzaState=initialState, 
    action: fromPizzas.PizzasAction
): PizzaState {

    switch(action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {
                ...state, 
                loading: true
            };
        }


        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }


        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            // entities:
            //
            // what we get:
            //[{id:1}, {id: 2}]
            //
            // what we want to convert it to:
            //{
            //    1: {
            //        id: 1,
            //        name: 'Pizza',
            //        toppings: []
            //    }
            //}
            //const id = 1111111111`;
            //pizza[id] 

            const pizzas = action.payload;

            const entities = pizzas.reduce(
                (entities: { [id: number]: Pizza }, pizza: Pizza) => { 
                    return {
                        ...entities,
                        [pizza.id]: pizza // es6 syntax; dynamically creates properties by id
                    };
                }, 
                {
                    ...state.entities
                }
            );

            return {
                ...state,
                loading: false, 
                loaded: true,
                entities: entities
            };
        }


        case fromPizzas.CREATE_PIZZA_SUCCESS:
        case fromPizzas.UPDATE_PIZZA_SUCCESS: {
            const pizza = action.payload;
            // creates a new state from the new pizza returne from the server
            const entities = {
                ...state.entities,
                [pizza.id]: pizza
            };
            return {
                ...state,
                entities: entities
            };
        }


        case fromPizzas.REMOVE_PIZZA_SUCCESS: {
            const pizza = action.payload;
            const { [pizza.id]: removed, ...remainingEntities } = state.entities;  // destructure the entites to get the value and destructing the result

            return {
                ...state,
                entities: remainingEntities
            }
        }


    }

    return state;
}



export const getPizzasLoading = (state: PizzaState) => {
    return state.loading;
}



export const getPizzasLoaded = (state: PizzaState) => {
    return state.loaded;
}



export const getPizzasEntities = (state: PizzaState) => {
    return state.entities;
}