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
  on(listRemoveProduct, (state, {productId}) => listRemoveProductState(state, productId))
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
  const filteredProducts = state.results.filter((item) => {
    return item.data && item.data.title;
  }) as ProductInterface[];
  const results = [...filteredProducts, newProduct].sort((item, next) => {
    if (item.data.title && next.data.title && item.data.title.toLowerCase() > next.data.title.toLowerCase()) {
      return 1;
    }
    return -1;
  });
  return {
    ...state,
    ready: true,
    results: [...results],
    numResults: state.numResults + 1,
  } as ProductState;
}

export function listRemoveProductState(state: ProductState, productId: string): ProductState {
  const filteredResults = state.results.filter((value) => {
    return value.data && value.data.title && value.id !== productId;
  });
  const sortedResults = filteredResults.sort((item, next) => {
    if (item.data.title && next.data.title && item.data.title.toLowerCase() > next.data.title.toLowerCase()) {
      return 1;
    }
    return -1;
  });
  return {
    ...state,
    ready: true,
    results: [...sortedResults],
    numResults: state.numResults - 1,
  } as ProductState;
}

export function listCompleteState(state: ProductState, products: ProductInterface[]): ProductState {
  const filteredProducts = products.filter((item) => {
    return item.data && item.data.title;
  });
  const results = filteredProducts.sort((item, next) => {
    if (item.data.title && next.data.title && item.data.title.toLowerCase() > next.data.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return {
    ...state,
    ready: true,
    results: [...results],
    numResults: results.length
  } as ProductState;

}




