import React, {createContext, useContext} from 'react';
import { cloneDeep } from 'lodash';

const initialState = {
    cart: []
};

useReducer = (red) => {
    return {
        state: initialState,
        dispatch: (action) => {
            Object.assign(initialState, red(initialState, action));
        }
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newCart = cloneDeep(state.cart);
            newCart.push(action.cartItem);
            return {
                ...state,
                cart: newCart
            };
        default:
        return state;
    }
};

export const StateContext = createContext();
export const StateProvider = ({children}) =>(
  <StateContext.Provider value={useReducer(reducer)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);




