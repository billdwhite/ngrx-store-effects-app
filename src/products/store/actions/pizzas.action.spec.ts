import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', () => { // describe block allows us to write a test; can nest them to printout results nicely in the console

    describe('LoadPizzas Actions', () => {
        describe('LoadPizzas', () => {
            it('should create an action', () => {
                const action = new fromPizzas.LoadPizzas();
                expect({...action}).toEqual({ // create a new object and spread out action into it
                    type: fromPizzas.LOAD_PIZZAS
                });
            });
        });

        describe('LoadPizzasFail', () => {
            it('should create an action', () => {
                const payload = { message: 'Load Error'};
                const action: fromPizzas.LoadPizzasFail = new fromPizzas.LoadPizzasFail(payload);
                expect({...action}).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_FAIL,
                    payload: payload
                });
            });
        });

        describe('LoadPizzasSuccess', () => {
            it('should create an action', () => {
                const payload = [
                    {
                      "name": "Blazin' Inferno",
                      "toppings": [
                        {
                          "id": 10,
                          "name": "pepperoni"
                        },
                        {
                          "id": 9,
                          "name": "pepper"
                        },
                        {
                          "id": 3,
                          "name": "basil"
                        },
                        {
                          "id": 4,
                          "name": "chili"
                        },
                        {
                          "id": 7,
                          "name": "olive"
                        },
                        {
                          "id": 2,
                          "name": "bacon"
                        },
                        {
                          "id": 1,
                          "name": "anchovy"
                        },
                        {
                          "id": 5,
                          "name": "mozzarella"
                        },
                        {
                          "id": 6,
                          "name": "mushroom"
                        },
                        {
                          "id": 11,
                          "name": "sweetcorn"
                        },
                        {
                          "id": 12,
                          "name": "tomato"
                        },
                        {
                          "id": 8,
                          "name": "onion"
                        }
                      ],
                      "id": 1
                    },
                    {
                      "name": "Seaside Surfin'",
                      "toppings": [
                        {
                          "id": 6,
                          "name": "mushroom"
                        },
                        {
                          "id": 7,
                          "name": "olive"
                        },
                        {
                          "id": 2,
                          "name": "bacon"
                        },
                        {
                          "id": 3,
                          "name": "basil"
                        },
                        {
                          "id": 1,
                          "name": "anchovy"
                        },
                        {
                          "id": 8,
                          "name": "onion"
                        },
                        {
                          "id": 11,
                          "name": "sweetcorn"
                        },
                        {
                          "id": 9,
                          "name": "pepper"
                        },
                        {
                          "id": 5,
                          "name": "mozzarella"
                        }
                      ],
                      "id": 2
                    },
                    {
                      "name": "Plain Ol' Pepperoni",
                      "toppings": [
                        {
                          "id": 10,
                          "name": "pepperoni"
                        }
                      ],
                      "id": 3
                    },
                    {
                      "name": "test2134",
                      "toppings": [
                        {
                          "id": 5,
                          "name": "mozzarella"
                        },
                        {
                          "id": 6,
                          "name": "mushroom"
                        },
                        {
                          "id": 7,
                          "name": "olive"
                        },
                        {
                          "id": 8,
                          "name": "onion"
                        }
                      ],
                      "id": 4
                    }
                  ];
                const action = new fromPizzas.LoadPizzasSuccess(payload);
                expect({...action}).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_SUCCESS,
                    payload: payload
                });
            });
        });
    });
});