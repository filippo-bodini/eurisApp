import {ProductInterface} from '../interfaces/product.interface';

import {Action, createReducer, on} from '@ngrx/store';
import { listAddProduct, listComplete, listReset, listRemoveProduct} from './actions';
import {ProductState} from './state';

const initialState: ProductState = {
  ready: false,
  results: [],
  numResults: 0,

};

export const ProductReducer = createReducer(
  initialState,
  on(listReset, (state) => initialState),
  on(listAddProduct, (state, {newProduct}) => listAddProductState(state, newProduct)),
  on(listComplete, (state, {products}) => listCompleteState(state, products)),
  on(listRemoveProduct, (state, {product}) => listRemoveProductState(state, product))
);

export function reducer(state: any, action: Action): ProductState {
  return ProductReducer(state, action);
}

/**
 * State reducers
 */

export function listAddProductState(state: ProductState, newProduct: ProductInterface): ProductState {
  return {
    ...state,
    ready: true,
    results: [...state.results, newProduct],
    numResults: state.numResults + 1,
  } as ProductState;
}

export function listRemoveProductState(state: ProductState, product: ProductInterface): ProductState {
  const filteredResults = state.results.filter((value) => {
    return value.id !== product.id;
  });
  return {
    ...state,
    ready: true,
    results: [...filteredResults],
    numResults: state.numResults - 1,
  } as ProductState;
}

export function listCompleteState(state: ProductState, products: ProductInterface[]): ProductState {
  const results = products;
  // Return the new state
  return {
    ...state,
    ready: true,
    results: [...state.results, ...results],
    numResults: results.length
  } as ProductState;

}




