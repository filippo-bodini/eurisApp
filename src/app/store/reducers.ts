import {ProductInterface} from '../interfaces/product.interface';

import {Action, createReducer, on} from '@ngrx/store';
import { listAddProduct, listComplete, listReset, listRemoveProduct, listAddStore} from './actions';
import {ProductState} from './state';
import {StoreInterface} from '../interfaces/store.interface';

const initialState: ProductState = {
  shopName: '',
  ready: false,
  results: [],
  numResults: 0,

};

export const ProductReducer = createReducer(
  initialState,
  on(listReset, (state) => initialState),
  on(listAddProduct, (state, {newProduct}) => listAddProductState(state, newProduct)),
  on(listAddStore, (state, {store}) => listAddShopName(state, store)),
  on(listComplete, (state, {products}) => listCompleteState(state, products)),
  on(listRemoveProduct, (state, {product}) => listRemoveProductState(state, product))
);

export function reducer(state: any, action: Action): ProductState {
  return ProductReducer(state, action);
}

/**
 * State reducers
 */

export function listAddShopName(state: ProductState, shop: StoreInterface): ProductState {
  return {
    ...state,
    shopName: shop.data.name,
    ready: !!state.results.length,
    results: [...state.results],
    numResults: state.numResults,
  } as ProductState;
}

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
  console.log(results);
  console.log(state);
  return {
    ...state,
    ready: true,
    results: [...state.results, ...results],
    numResults: results.length
  } as ProductState;

}




